/**
 * @fileoverview Servicio que maneja la conexión con nuestra base de datos Supabase.
 * 
 * ¿Qué es un Servicio en Angular?
 * Un servicio es una clase que se encarga de una tarea específica en la aplicación.
 * En este caso, este servicio maneja toda la comunicación con nuestra base de datos.
 * Es como un "mensajero" entre nuestra aplicación y Supabase.
 * 
 * ¿Qué hace este servicio?
 * - Conecta con Supabase usando las credenciales
 * - Crea la estructura de la base de datos si no existe
 * - Permite crear, leer, actualizar y eliminar tareas
 * - Mantiene una lista actualizada de tareas en memoria
 * - Notifica a otros componentes cuando hay cambios en las tareas
 */

// Importaciones necesarias
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SUPABASE_CONFIG } from './lib/constants';
import { Database, Task } from './lib/interfaces';
import { isPlatformBrowser } from '@angular/common';

/**
 * @Injectable marca esta clase como un servicio que puede ser inyectado en otros componentes.
 * { providedIn: 'root' } significa que solo habrá una instancia de este servicio
 * compartida en toda la aplicación (esto se llama "Singleton").
 */
@Injectable({
  providedIn: 'root'
})

export class SupabaseService {
  /**
   * Cliente de Supabase que usaremos para todas las operaciones con la base de datos.
   * El símbolo ! al final significa que esta variable se inicializará después de
   * la creación de la clase (en el constructor).
   */
  private supabase!: SupabaseClient<Database>;
  
  /**
   * BehaviorSubject es como una "caja" especial que:
   * 1. Guarda el valor actual de las tareas
   * 2. Notifica a todos los interesados cuando este valor cambia
   * 3. Puede dar el último valor a los nuevos suscriptores
   * 
   * Es como un canal de noticias que siempre tiene la última noticia disponible.
   */
  private tasks = new BehaviorSubject<Task[]>([]);
  
  /**
   * Versión pública de tasks que otros componentes pueden usar para recibir
   * actualizaciones. Es como la "transmisión en vivo" de nuestras tareas.
   * 
   * Los componentes pueden suscribirse así:
   * this.supabaseService.tasks$.subscribe(tasks => {
   *   // Hacer algo con las tareas actualizadas
   * });
   */
  tasks$ = this.tasks.asObservable();
  
  /**
   * Bandera que nos ayuda a evitar inicializar la conexión con Supabase más de una vez.
   * Es como un interruptor que solo se puede encender una vez.
   */
  private initialized = false;

  /**
   * El constructor se ejecuta cuando se crea el servicio.
   * 
   * @param platformId Nos ayuda a saber si estamos en el navegador o en el servidor.
   * Esto es importante porque algunas funciones solo funcionan en el navegador
   * (como localStorage o WebSocket).
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verificamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Creamos el cliente de Supabase con nuestra configuración
        this.supabase = createClient<Database>(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.key,
          SUPABASE_CONFIG.options
        );
        // Iniciamos la conexión y cargamos los datos
        this.initialize();
      } catch (error) {
        // Si algo sale mal, notificamos el error
        this.tasks.error(error);
      }
    } else {
      // En el servidor no hacemos nada por ahora
    }
  }

  /**
   * Método privado que configura todo lo necesario para empezar a usar Supabase.
   * Se ejecuta automáticamente cuando se crea el servicio.
   * 
   * Es como el "ritual de inicio" de nuestra conexión con la base de datos:
   * 1. Verifica que no hayamos inicializado antes
   * 2. Comprueba que podemos conectar con Supabase
   * 3. Crea las tablas si no existen
   * 4. Carga las tareas iniciales
   */
  private async initialize() {
    // Si ya inicializamos, no hacemos nada
    if (this.initialized) {
      return;
    }

    try {
      // Intentamos hacer una consulta simple para ver si podemos conectar
      const { data, error } = await this.supabase.from('tasks').select('count').limit(0);
      if (error) {
        throw error;
      }

      // Si todo está bien, configuramos la base de datos y cargamos las tareas
      await this.initializeTestData();
      await this.loadTasks();
      this.initialized = true;
    } catch (error) {
      // Si algo sale mal, notificamos el error
      this.tasks.error(error);
    }
  }

  /**
   * Verifica si nuestra tabla de tareas existe en Supabase.
   * Si no existe, la crea usando una función especial en Supabase.
   * 
   * Es como preparar nuestra "libreta de tareas" antes de empezar a escribir en ella.
   * Si no tenemos libreta, creamos una nueva con el formato correcto.
   */
  private async initializeTestData() {
    // Intentamos seleccionar algo de la tabla tasks
    const { error: tableError } = await this.supabase
      .from('tasks')
      .select('count')
      .limit(0);

    // Si hay un error, puede ser porque la tabla no existe
    if (tableError) {
      if (tableError.code === '42P01') { // Este código significa "tabla no existe"
        // Llamamos a una función en Supabase que crea la tabla por nosotros
        const { error: createError } = await this.supabase
          .rpc('create_tasks_table');

        if (createError) {
          return; // Si hay error al crear la tabla, salimos
        }
      } else {
        return; // Si es otro tipo de error, salimos
      }
    }


    // Verificamos si ya hay tareas en la tabla
    const { data: existingTasks, error: selectError } = await this.supabase
      .from('tasks')
      .select('*');

    if (selectError) {
      // Si hay error al consultar las tareas, salimos
      return;
    }

    /*
    // Este código está comentado porque ya no creamos tareas de prueba automáticamente
    // Lo dejamos como referencia de cómo se podrían crear tareas de ejemplo
    if (!existingTasks?.length) {
      const testTasks = [
        { description: 'Aprender Angular', completed: false },
        { description: 'Dominar Supabase', completed: false },
        { description: 'Construir aplicaciones increíbles', completed: false }
      ];

      const { error: insertError } = await this.supabase
        .from('tasks')
        .insert(testTasks);

      if (insertError) {
        // Manejar error si la inserción falla
      }
    }*/
  }

  /**
   * Carga todas las tareas desde Supabase y las comparte con la aplicación.
   * 
   * Este método hace lo siguiente:
   * 1. Consulta todas las tareas en Supabase
   * 2. Las ordena por fecha de creación (las más nuevas primero)
   * 3. Actualiza el BehaviorSubject con las nuevas tareas
   * 
   * Es como "refrescar" nuestra lista de tareas para asegurarnos
   * de que tenemos la información más reciente.
   */
  private async loadTasks() {
    try {
      // Hacemos la consulta a Supabase
      const response = await this.supabase
        .from('tasks')
        // Seleccionamos solo los campos que necesitamos
        .select('id,description,completed,created_at')
        // Ordenamos por fecha de creación, las más nuevas primero
        .order('created_at', { ascending: false });

      // Si hay error en la consulta, lo propagamos
      if (response.error) {
        throw response.error;
      }

      // Actualizamos el BehaviorSubject con las nuevas tareas
      // Si no hay tareas, usamos un array vacío
      const tasks = response.data || [];
      this.tasks.next(tasks);
    } catch (error) {
      // Si algo sale mal, notificamos el error
      this.tasks.error(error);
    }
  }

  /**
   * Crea una nueva tarea en la base de datos.
   * 
   * Este método:
   * 1. Recibe la descripción de la nueva tarea
   * 2. La inserta en Supabase con estado 'no completada'
   * 3. Recarga todas las tareas para actualizar la vista
   * 
   * @param description El texto que describe qué hay que hacer en la tarea
   * @throws Error si hay algún problema al crear la tarea
   * 
   * Ejemplo de uso:
   * try {
   *   await supabaseService.addTask('Comprar leche');
   *   // La tarea se creó exitosamente
   * } catch (error) {
   *   // Manejar el error
   * }
   */
  async addTask(description: string): Promise<void> {
    try {
      // Insertamos la nueva tarea en Supabase
      const { data, error } = await this.supabase
        .from('tasks')
        .insert([{ description, completed: false }])
        .select();

      // Si hay error al insertar, lo propagamos
      if (error) {
        throw error;
      }
      // Recargamos las tareas para mostrar la nueva tarea
      await this.loadTasks();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Marca una tarea como completada o no completada.
   * 
   * Este método:
   * 1. Recibe el ID de la tarea y su nuevo estado
   * 2. Actualiza la tarea en Supabase
   * 3. Recarga todas las tareas para actualizar la vista
   * 
   * @param id El identificador único de la tarea a actualizar
   * @param completed true si la tarea está completada, false si no
   * @throws Error si hay algún problema al actualizar la tarea
   * 
   * Ejemplo de uso:
   * try {
   *   await supabaseService.updateTask('123', true);
   *   // La tarea se marcó como completada
   * } catch (error) {
   *   // Manejar el error
   * }
   */
  async updateTask(id: string, completed: boolean): Promise<void> {
    try {
      // Actualizamos el estado de la tarea en Supabase
      const { error } = await this.supabase
        .from('tasks')
        .update({ completed }) // Usamos object shorthand porque la propiedad y el valor tienen el mismo nombre
        .eq('id', id);        // Actualizamos solo la tarea con este ID

      if (error) throw error;
      // Recargamos las tareas para mostrar el cambio
      await this.loadTasks();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Elimina una tarea de la base de datos.
   * 
   * Este método:
   * 1. Recibe el ID de la tarea a eliminar
   * 2. La borra de Supabase
   * 3. Recarga todas las tareas para actualizar la vista
   * 
   * @param id El identificador único de la tarea a eliminar
   * @throws Error si hay algún problema al eliminar la tarea
   * 
   * Ejemplo de uso:
   * try {
   *   await supabaseService.deleteTask('123');
   *   // La tarea se eliminó exitosamente
   * } catch (error) {
   *   // Manejar el error
   * }
   */
  async deleteTask(id: string): Promise<void> {
    try {
      // Eliminamos la tarea de Supabase
      const { error } = await this.supabase
        .from('tasks')
        .delete()           // Indica que queremos eliminar
        .eq('id', id);     // Solo la tarea con este ID

      if (error) throw error;
      // Recargamos las tareas para reflejar la eliminación
      await this.loadTasks();
    } catch (error) {
      throw error;
    }
  }
}
