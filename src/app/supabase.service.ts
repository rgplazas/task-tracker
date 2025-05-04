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
  private debugSubscription = this.tasks$.subscribe(
    tasks => console.log('%c[DEBUG] Tasks emitted:', 'color: #9C27B0; font-weight: bold;', tasks),
    error => console.error('%c[DEBUG] Tasks error:', 'color: #f44336; font-weight: bold;', error),
    () => console.log('%c[DEBUG] Tasks completed', 'color: #9C27B0; font-weight: bold;')
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('%c[Supabase] Initializing service...', 'color: #FF9800; font-weight: bold;');
      try {
        console.log('%c[Supabase] Using config:', 'color: #FF9800; font-weight: bold;', {
          url: SUPABASE_CONFIG.url,
          options: SUPABASE_CONFIG.options
        });
        
        this.supabase = createClient<Database>(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.key,
          SUPABASE_CONFIG.options
        );
        
        console.log('Supabase client created successfully');
        this.initialize();
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        this.tasks.error(error);
      }
    } else {
      console.log('%c[Supabase] Server-side context, skipping initialization', 'color: #FF9800; font-weight: bold;');
    }
  }

  private async initialize() {
    if (this.initialized) {
      console.log('Service already initialized');
      return;
    }

    try {
      console.log('Starting service initialization...');
      
      // Verificar conexión
      const { data, error } = await this.supabase.from('tasks').select('count').limit(0);
      if (error) {
        console.error('Error connecting to Supabase:', error);
        throw error;
      }
      console.log('Successfully connected to Supabase');

      await this.initializeTestData();
      await this.loadTasks();
      this.initialized = true;
      console.log('Service initialization completed');
    } catch (error) {
      console.error('Error in initialization:', error);
      this.tasks.error(error);
    }
  }

  private async initializeTestData() {
    console.log('Checking database structure...');
    
    // Verificar si la tabla tasks existe
    const { error: tableError } = await this.supabase
      .from('tasks')
      .select('count')
      .limit(0);

    if (tableError) {
      console.error('Error checking tasks table:', tableError);
      if (tableError.code === '42P01') { // tabla no existe
        console.log('Creating tasks table...');
        const { error: createError } = await this.supabase
          .rpc('create_tasks_table');

        if (createError) {
          console.error('Error creating tasks table:', createError);
          return;
        }
        console.log('Tasks table created successfully');
      } else {
        return;
      }
    }

    console.log('Checking for existing tasks...');
    const { data: existingTasks, error: selectError } = await this.supabase
      .from('tasks')
      .select('*');

    if (selectError) {
      console.error('Error checking existing tasks:', selectError);
      return;
    }

    if (!existingTasks?.length) {
      console.log('No tasks found, adding test data...');
      const testTasks = [
        { description: 'Learn Angular', completed: false },
        { description: 'Master Supabase', completed: false },
        { description: 'Build awesome apps', completed: false }
      ];

      const { error: insertError } = await this.supabase
        .from('tasks')
        .insert(testTasks);

      if (insertError) {
        console.error('Error adding test tasks:', insertError);
      } else {
        console.log('Test tasks added successfully');
      }
    } else {
      console.log(`Found ${existingTasks.length} existing tasks`);
    }
  }



  private async loadTasks() {
    console.log('%c[loadTasks] Starting...', 'color: #2196F3; font-weight: bold;');
    try {
      console.log('%c[loadTasks] Making Supabase request...', 'color: #2196F3; font-weight: bold;');
      const response = await this.supabase
        .from('tasks')
        .select('id,description,completed,created_at')
        .order('created_at', { ascending: false });

      console.log('[loadTasks] Supabase response:', response);

      if (response.error) {
        console.error('[loadTasks] Supabase error:', response.error);
        throw response.error;
      }

      const tasks = response.data || [];
      console.log('[loadTasks] Tasks to emit:', tasks);
      this.tasks.next(tasks);
      console.log('[loadTasks] Tasks emitted');
    } catch (error) {
      console.error('[loadTasks] Error:', error);
      this.tasks.error(error);
    }
  }

  async addTask(description: string): Promise<void> {
    try {
      console.log('Adding task:', description);
      const { data, error } = await this.supabase
        .from('tasks')
        .insert([{ description, completed: false }])
        .select();

      if (error) {
        console.error('Error adding task:', error);
        throw error;
      }

      console.log('Task added:', data);
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
      console.error('Error updating task:', error);
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
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
