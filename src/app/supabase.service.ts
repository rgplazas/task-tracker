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


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.supabase = createClient<Database>(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.key,
          SUPABASE_CONFIG.options
        );
        this.initialize();
      } catch (error) {
        this.tasks.error(error);
      }
    } else {

    }
  }

  private async initialize() {
    if (this.initialized) {

      return;
    }

    try {
      const { data, error } = await this.supabase.from('tasks').select('count').limit(0);
      if (error) {
        throw error;
      }

      await this.initializeTestData();
      await this.loadTasks();
      this.initialized = true;
    } catch (error) {
      this.tasks.error(error);
    }
  }

  private async initializeTestData() {

    
    // Verificar si la tabla tasks existe
    const { error: tableError } = await this.supabase
      .from('tasks')
      .select('count')
      .limit(0);

    if (tableError) {
      if (tableError.code === '42P01') { // tabla no existe
        const { error: createError } = await this.supabase
          .rpc('create_tasks_table');

        if (createError) {
          return;
        }
      } else {
        return;
      }
    }


    const { data: existingTasks, error: selectError } = await this.supabase
      .from('tasks')
      .select('*');

    if (selectError) {

      return;
    }

    /*if (!existingTasks?.length) {

      const testTasks = [
        { description: 'Aprender Angular', completed: false },
        { description: 'Dominar Supabase', completed: false },
        { description: 'Construir aplicaciones increíbles', completed: false }
      ];

      const { error: insertError } = await this.supabase
        .from('tasks')
        .insert(testTasks);

      if (insertError) {
      }
    }*/
  }



  private async loadTasks() {
    try {
      const response = await this.supabase
        .from('tasks')
        .select('id,description,completed,created_at')
        .order('created_at', { ascending: false });

      if (response.error) {
        throw response.error;
      }

      const tasks = response.data || [];
      this.tasks.next(tasks);
    } catch (error) {
      this.tasks.error(error);
    }
  }

  async addTask(description: string): Promise<void> {
    try {

      const { data, error } = await this.supabase
        .from('tasks')
        .insert([{ description, completed: false }])
        .select();

      if (error) {
        throw error;
      }
      await this.loadTasks();
    } catch (error) {
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
      throw error;
    }
  }
}
