import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SUPABASE_CONFIG } from './lib/constants';
import { Database, Task } from './lib/interfaces';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  private supabase!: SupabaseClient<Database>;
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();
  private initialized = false;

  // Para debug
  /*private debugSubscription = this.tasks$.subscribe(
    tasks => console.log('%c[DEBUG] Tasks emitted:', 'color: #9C27B0; font-weight: bold;', tasks),
    error => console.error('%c[DEBUG] Tasks error:', 'color: #f44336; font-weight: bold;', error),
    () => console.log('%c[DEBUG] Tasks completed', 'color: #9C27B0; font-weight: bold;')
  );*/

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      //console.log('%c[Supabase] Inicializando servicio...', 'color: #FF9800; font-weight: bold;');
      try {
        //console.log('%c[Supabase] Usando la configuración:', 'color: #FF9800; font-weight: bold;', {
        //  url: SUPABASE_CONFIG.url,
        //  options: SUPABASE_CONFIG.options
        //});
        
        this.supabase = createClient<Database>(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.key,
          SUPABASE_CONFIG.options
        );
        
        //console.log('Cliente de base de datos creada con éxito');
        this.initialize();
      } catch (error) {
        //console.error('Error al inicializar Supabase:', error);
        this.tasks.error(error);
      }
    } else {
      console.log('%c[Supabase] Contexto del lado del servidor, omitiendo la inicialización', 'color: #FF9800; font-weight: bold;');
    }
  }

  private async initialize() {
    if (this.initialized) {
      console.log('Servicio ya inicializado');
      return;
    }

    try {
      console.log('Iniciando inicialización del servicio...');
      
      // Verificar conexión
      const { data, error } = await this.supabase.from('tasks').select('count').limit(0);
      if (error) {
        console.error('Error al conectar con Supabase:', error);
        throw error;
      }
      console.log('Conectado exitosamente a Supabase');

      await this.initializeTestData();
      await this.loadTasks();
      this.initialized = true;
      console.log('Inicialización del servicio completada');
    } catch (error) {
      console.error('Error en la inicialización:', error);
      this.tasks.error(error);
    }
  }

  private async initializeTestData() {
    console.log('Verificando estructura de la base de datos...');
    
    // Verificar si la tabla tasks existe
    const { error: tableError } = await this.supabase
      .from('tasks')
      .select('count')
      .limit(0);

    if (tableError) {
      console.error('Error al verificar la tabla de tareas:', tableError);
      if (tableError.code === '42P01') { // tabla no existe
        console.log('Creando tabla de tareas...');
        const { error: createError } = await this.supabase
          .rpc('create_tasks_table');

        if (createError) {
          console.error('Error al crear la tabla de tareas:', createError);
          return;
        }
        console.log('Tabla de tareas creada exitosamente');
      } else {
        return;
      }
    }

    console.log('Verificando tareas existentes...');
    const { data: existingTasks, error: selectError } = await this.supabase
      .from('tasks')
      .select('*');

    if (selectError) {
      console.error('Error al verificar tareas existentes:', selectError);
      return;
    }

    if (!existingTasks?.length) {
      console.log('No se encontraron tareas, agregando datos de prueba...');
      const testTasks = [
        { description: 'Aprender Angular', completed: false },
        { description: 'Dominar Supabase', completed: false },
        { description: 'Construir aplicaciones increíbles', completed: false }
      ];

      const { error: insertError } = await this.supabase
        .from('tasks')
        .insert(testTasks);

      if (insertError) {
        console.error('Error al agregar tareas de prueba:', insertError);
      } else {
        console.log('Tareas de prueba agregadas exitosamente');
      }
    } else {
      console.log(`Se encontraron ${existingTasks.length} tareas existentes`);
    }
  }



  private async loadTasks() {
    console.log('%c[loadTasks] Iniciando...', 'color: #2196F3; font-weight: bold;');
    try {
      console.log('%c[loadTasks] Realizando petición a Supabase...', 'color: #2196F3; font-weight: bold;');
      const response = await this.supabase
        .from('tasks')
        .select('id,description,completed,created_at')
        .order('created_at', { ascending: false });

      console.log('[loadTasks] Respuesta de Supabase:', response);

      if (response.error) {
        console.error('[loadTasks] Error de Supabase:', response.error);
        throw response.error;
      }

      const tasks = response.data || [];
      console.log('[loadTasks] Tareas a emitir:', tasks);
      this.tasks.next(tasks);
      console.log('[loadTasks] Tareas emitidas');
    } catch (error) {
      console.error('[loadTasks] Error:', error);
      this.tasks.error(error);
    }
  }

  async addTask(description: string): Promise<void> {
    try {
      console.log('Agregando tarea:', description);
      const { data, error } = await this.supabase
        .from('tasks')
        .insert([{ description, completed: false }])
        .select();

      if (error) {
        console.error('Error al agregar tarea:', error);
        throw error;
      }

      console.log('Tarea agregada:', data);
      await this.loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async updateTask(id: string, completed: boolean): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;
      await this.loadTasks();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await this.loadTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  }
}
