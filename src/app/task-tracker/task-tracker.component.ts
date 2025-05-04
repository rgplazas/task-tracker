import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarMessageComponent } from '../snackbar-message/snackbar-message.component';
import { SupabaseService } from '../supabase.service';
import { Task } from '../lib/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
})
export class TaskTrackerComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  newTaskDescription: string = '';
  isBrowser: boolean;
  private tasksSubscription?: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('%c[TaskTracker] Construido', 'color: #4CAF50; font-weight: bold;', 'isBrowser:', this.isBrowser);
  }

  ngOnInit() {
    // Siempre inicializamos, incluso en SSR
    console.log('%c[TaskTracker] Inicializando...', 'color: #2196F3; font-weight: bold;');
    
    // En SSR, solo mostramos un estado inicial vacío
    if (!this.isBrowser) {
      console.log('[TaskTracker] Renderizado del lado del servidor, usando estado vacío');
      this.tasks = [];
      return;
    }

    console.log('%c[TaskTracker] Inicializando...', 'color: #2196F3; font-weight: bold;');
    console.log('%c[TaskTracker] A punto de suscribirse a tasks$', 'color: #2196F3; font-weight: bold;');
    
    this.tasksSubscription = this.supabaseService.tasks$.subscribe({
      next: (tasks) => {
        console.log('%c[TaskTracker] Tareas recibidas:', 'color: #4CAF50; font-weight: bold;', tasks);
        console.log('%c[TaskTracker] Tipo de tareas:', 'color: #4CAF50; font-weight: bold;', typeof tasks);
        console.log('%c[TaskTracker] ¿Es un array?', 'color: #4CAF50; font-weight: bold;', Array.isArray(tasks));
        this.tasks = tasks;
        this.showMessage('Tareas cargadas correctamente');
      },
      error: (error) => {
        console.error('%c[TaskTracker] Error de suscripción:', 'color: #f44336; font-weight: bold;', error);
        console.error('%c[TaskTracker] Detalles del error:', 'color: #f44336; font-weight: bold;', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        this.showMessage(
          error.message || 'Error al cargar las tareas. Por favor, intente nuevamente.',
          true
        );
      },
      complete: () => {
        console.log('[TaskTracker] Suscripción completada');
      }
    });
    
    console.log('[TaskTracker] Suscripción configurada');
  }

  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      data: {
        message,
        icon: isError ? 'error' : 'check_circle'
      },
      duration: 3000,
      panelClass: isError ? 'snackbar-error' : 'snackbar-success'
    });
  }

  async addTask() {
    if (!this.newTaskDescription.trim()) {
      this.showMessage('Por favor, ingrese una descripción para la tarea', true);
      return;
    }

    try {
      await this.supabaseService.addTask(this.newTaskDescription.trim());
      this.newTaskDescription = '';
      this.showMessage('Tarea agregada correctamente');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      this.showMessage('Error al agregar la tarea', true);
    }
  }

  async toggleTask(task: Task) {
    try {
      await this.supabaseService.updateTask(task.id, !task.completed);
      this.showMessage('Tarea actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      this.showMessage('Error al actualizar la tarea', true);
    }
  }

  async deleteTask(task: Task) {
    try {
      await this.supabaseService.deleteTask(task.id);
      this.showMessage('Tarea eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      this.showMessage('Error al eliminar la tarea', true);
    }
  }
}
