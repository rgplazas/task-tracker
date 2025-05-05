/**
 * @fileoverview Componente principal de Task Tracker para gestión de tareas.
 * 
 * Este componente es el corazón de nuestra aplicación Angular 19.5 y proporciona:
 * 1. CRUD completo de tareas con validación de formularios
 * 2. Sincronización en tiempo real con Supabase
 * 3. Persistencia local usando localStorage (con soporte SSR)
 * 4. Notificaciones interactivas y accesibles
 * 5. Animaciones y efectos visuales modernos
 * 6. Soporte completo para accesibilidad (WCAG 2.1)
 * 7. Manejo de errores robusto
 * 
 * @since 2.0.0
 * @version 19.5.0
 */

// Importaciones del Core de Angular
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// Importaciones para animaciones
import { 
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
  state
} from '@angular/animations';

// Importaciones de RxJS
import { Subscription } from 'rxjs';

// Importaciones de interfaces y servicios propios
import { Task } from '../lib/interfaces';                  // Interfaz que define la estructura de una tarea
import { SupabaseService } from '../supabase.service';    // Servicio para interactuar con Supabase

// Importaciones de Angular Material
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Importaciones de componentes propios
import { SnackbarMessageComponent } from '../snackbar-message/snackbar-message.component';

/**
 * @constant taskAnimations
 * @description Animaciones para las tareas usando Angular Animations
 * 
 * Incluye dos animaciones principales:
 * 1. fadeTask: Animación de entrada/salida para tareas individuales
 * 2. listAnimation: Animación para la lista completa de tareas
 */
const taskAnimations = [
  // Animación para tareas individuales
  trigger('fadeTask', [
    // Entrada de una tarea
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10px)' }),
      animate('300ms ease-out', 
        style({ opacity: 1, transform: 'translateY(0)' })
      )
    ]),
    // Salida de una tarea
    transition(':leave', [
      animate('200ms ease-in', 
        style({ opacity: 0, transform: 'translateY(10px)' })
      )
    ])
  ]),
  
  // Animación para la lista de tareas
  trigger('listAnimation', [
    transition('* => *', [ // Cualquier cambio en la lista
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        stagger(100, [
          animate('300ms ease-out', 
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ], { optional: true })
    ])
  ])
];


/**
 * Animaciones del componente
 */
const ANIMATIONS = {
  // Animación para cada tarea individual
  fadeInUp: trigger('fadeInUp', [
    transition(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(20px)' 
      }),
      animate('0.3s ease-out', 
        style({ 
          opacity: 1, 
          transform: 'translateY(0)' 
        })
      )
    ])
  ]),

  // Animación para la lista de tareas
  listAnimation: trigger('listAnimation', [
    transition('* => *', [
      query(':enter', [
        style({ 
          opacity: 0, 
          transform: 'translateY(20px)' 
        }),
        stagger(100, [
          animate('0.3s ease-out', 
            style({ 
              opacity: 1, 
              transform: 'translateY(0)' 
            })
          )
        ])
      ], { optional: true })
    ])
  ])
};

/**
 * @Component Decorador que define las características del componente
 * 
 * @property selector - Nombre del elemento HTML para usar el componente
 * @property standalone - Indica que es un componente independiente (sin NgModule)
 * @property imports - Módulos y componentes necesarios
 * @property templateUrl - Archivo HTML que define la estructura visual
 * @property styleUrls - Archivos CSS/SCSS para los estilos
 */
@Component({
  selector: 'app-task-tracker',      // Usar como: <app-task-tracker></app-task-tracker>
  standalone: true,                   // Característica de Angular 19.5
  imports: [
    CommonModule,      // Para directivas estructurales (ngIf, ngFor)
    FormsModule,       // Para formularios y [(ngModel)]
    MatIconModule,     // Para íconos de Material
    MatInputModule,    // Para campos de entrada
    MatButtonModule,   // Para botones estilizados
    MatCardModule,     // Para tarjetas de Material
    MatCheckboxModule, // Para checkboxes
    MatFormFieldModule, // Para campos de formulario
    MatTooltipModule,  // Para tooltips informativos
    MatDialogModule    // Para diálogos de confirmación
  ],
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.scss'],
  animations: [taskAnimations],
  host: {
    'class': 'task-tracker-component',
    'role': 'main',
    '[attr.aria-label]': "'Gestor de tareas'"
  }
})

/**
 * La clase del componente implementa:
 * - OnInit: Para inicializar cosas cuando el componente se crea
 * - OnDestroy: Para limpiar cuando el componente se destruye
 */
/**
 * @class TaskTrackerComponent
 * @implements {OnInit}
 * @description Componente principal para gestionar tareas
 * 
 * Este componente maneja toda la lógica de negocio relacionada con las tareas:
 * - Carga inicial de tareas desde Supabase y localStorage
 * - Creación, edición y eliminación de tareas
 * - Sincronización entre el backend y el almacenamiento local
 * - Manejo de estados y notificaciones
 */
export class TaskTrackerComponent implements OnInit, OnDestroy {
  /**
   * Lista de tareas que se muestra en la interfaz.
   * Se inicializa como un array vacío y se actualiza
   * cuando recibimos datos de Supabase.
   */
  tasks: Task[] = [];
  
  /**
   * Texto que el usuario escribe para crear una nueva tarea.
   * Está conectado al campo de texto en el HTML usando [(ngModel)].
   */
  newTaskDescription: string = '';
  
  /**
   * Nos dice si estamos ejecutando en el navegador o en el servidor.
   * Esto es importante porque algunas cosas (como localStorage)
   * solo funcionan en el navegador.
   */
  isBrowser: boolean;
  
  /**
   * Guarda nuestra suscripción a los cambios en las tareas.
   * Es importante guardarla para poder cancelarla cuando
   * el componente se destruye y evitar pérdidas de memoria.
   */
  private tasksSubscription?: Subscription;

  /**
   * El constructor se llama cuando Angular crea el componente.
   * Aquí recibimos los servicios que necesitamos (inyección de dependencias).
   * 
   * @param supabaseService Para interactuar con nuestra base de datos
   * @param snackBar Para mostrar mensajes al usuario
   * @param platformId Nos dice si estamos en navegador o servidor
   */
  constructor(
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Guardamos si estamos en el navegador para usarlo después
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * ngOnInit se llama automáticamente cuando el componente está listo.
   * Es el lugar ideal para inicializar datos y suscribirnos a eventos.
   * 
   * En este caso:
   * 1. Verificamos si estamos en el navegador
   * 2. Nos suscribimos a los cambios en las tareas
   * 3. Manejamos errores y éxitos
   */
  ngOnInit() {
    // Si estamos en el servidor, solo mostramos un array vacío
    // porque no podemos conectar con Supabase desde el servidor
    if (!this.isBrowser) {
      this.tasks = [];
      return;
    }
    
    // Nos suscribimos a los cambios en las tareas
    this.tasksSubscription = this.supabaseService.tasks$.subscribe({
      // Cuando recibimos nuevas tareas
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        if (this.isBrowser) {
          try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
          } catch (error) {
            console.warn('Error al guardar en localStorage:', error);
          }
        }
        // Anunciar cambios para lectores de pantalla
        this.announceTasksChange(tasks.length);
      },
      // Si hay algún error
      error: (error: any) => {
        console.error('Error al cargar las tareas:', error);
        this.showMessage('Error al cargar las tareas. Por favor, intenta de nuevo.', true);
        // Intentar cargar tareas del localStorage como respaldo
        this.loadTasksFromLocalStorage();
      },
      // Cuando la suscripción termina
      complete: () => {
        console.log('Suscripción a tareas finalizada');
      }
    });

    // Cargar tareas del localStorage si están disponibles
    if (this.isBrowser) {
      this.loadTasksFromLocalStorage();
    }
  }

  /**
   * ngOnDestroy se llama automáticamente cuando el componente va a ser destruido.
   * Es el lugar ideal para limpiar recursos y evitar pérdidas de memoria.
   * 
   * En este caso, cancelamos nuestra suscripción a las tareas para evitar que
   * sigamos recibiendo actualizaciones cuando el componente ya no existe.
   * 
   * El operador ?. (optional chaining) asegura que solo llamemos a unsubscribe
   * si la suscripción existe.
   */
  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }

  /**
   * Muestra un mensaje temporal al usuario usando el SnackBar de Angular Material.
   * 
   * Características:
   * - Mensajes accesibles para lectores de pantalla
   * - Colores semánticos según el tipo de mensaje
   * - Posición y duración configurables
   * - Soporte para acciones del usuario
   * 
   * @param message - El texto que queremos mostrar al usuario
   * @param isError - Si es true, el mensaje se muestra como error
   * @param action - Texto opcional para el botón de acción
   */
  private showMessage(message: string, isError: boolean = false, action?: string) {
    const config: MatSnackBarConfig = {
      duration: isError ? 5000 : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? 'snackbar-error' : 'snackbar-success',
      data: { message, isError },
      politeness: isError ? 'assertive' : 'polite'
    };

    const snackBarRef = this.snackBar.openFromComponent(SnackbarMessageComponent, config);

    if (action) {
      snackBarRef.onAction().subscribe(() => {
        // Manejar la acción del usuario
        console.log('Usuario interactuó con el mensaje');
      });
    }
  }

  /**
   * Referencia al formulario de nueva tarea
   */
  @ViewChild('taskForm') taskForm!: NgForm;

  /**
   * Carga las tareas almacenadas en localStorage.
   * Solo se ejecuta en el navegador para mantener compatibilidad con SSR.
   */
  private loadTasksFromLocalStorage(): void {
    if (!this.isBrowser) return;

    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    } catch (error) {
      console.warn('Error al cargar tareas desde localStorage:', error);
    }
  }

  /**
   * Anuncia cambios en la lista de tareas para lectores de pantalla.
   * @param count - Número de tareas
   */
  private announceTasksChange(count: number): void {
    const message = count === 0
      ? 'No hay tareas pendientes'
      : `${count} ${count === 1 ? 'tarea pendiente' : 'tareas pendientes'}`;
    
    // Usar aria-live para anunciar cambios
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'visually-hidden';
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);

    // Eliminar después de la animación
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 3000);
  }

  /**
   * Anuncia la creación de una nueva tarea para lectores de pantalla.
   * @param description - Descripción de la tarea creada
   */
  private announceTaskCreated(description: string): void {
    const message = `Tarea creada: ${description}`;
    
    // Usar aria-live para anunciar la creación
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.className = 'visually-hidden';
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);

    // Eliminar después de la animación
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 3000);
  }

  /**
   * Crea una nueva tarea con validación completa de formulario.
   * 
   * Proceso:
   * 1. Valida el formulario completo
   * 2. Sanitiza y normaliza la entrada
   * 3. Crea la tarea en Supabase
   * 4. Maneja éxitos y errores
   * 5. Proporciona feedback accesible
   * 
   * @returns Promise<void>
   */
  /**
   * Verifica si una tarea ya existe en la lista
   * @param description - Descripción de la tarea a verificar
   * @returns true si la tarea ya existe
   */
  private taskExists(description: string): boolean {
    return this.tasks.some(task => 
      task.description.toLowerCase().trim() === description.toLowerCase().trim()
    );
  }

  /**
   * Valida una descripción de tarea
   * @param description - Descripción a validar
   * @returns true si la descripción es válida
   */
  private validateTaskDescription(description: string): boolean {
    // Remover espacios en blanco extras
    const trimmed = description.trim();

    // Verificar si está vacía
    if (!trimmed) {
      this.showMessage('La descripción de la tarea no puede estar vacía', true);
      return false;
    }

    // Verificar longitud mínima
    if (trimmed.length < 3) {
      this.showMessage('La descripción debe tener al menos 3 caracteres', true);
      return false;
    }

    // Verificar si ya existe
    if (this.taskExists(trimmed)) {
      this.showMessage('Ya existe una tarea con esta descripción', true);
      return false;
    }

    return true;
  }

  async addTask(): Promise<void> {
    if (this.taskForm.invalid) {
      // Mostrar todos los errores de validación
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.controls[key];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const description = this.newTaskDescription.trim();
    
    // Validar la descripción
    if (!this.validateTaskDescription(description)) {
      return;
    }

    try {
      // Mostrar indicador de carga
      this.showMessage('Creando tarea...', false);

      await this.supabaseService.addTask(description);
      this.newTaskDescription = '';
      this.taskForm.resetForm();
      
      // Mostrar mensaje de éxito
      this.showMessage('Tarea creada con éxito', false, 'Deshacer');
      
      // Anunciar para lectores de pantalla
      this.announceTaskCreated(description);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      this.showMessage(
        'No se pudo crear la tarea. Por favor, intenta de nuevo.',
        true,
        'Reintentar'
      );
      this.showMessage('Error al agregar la tarea', true);
    }
  }

  /**
   * Cambia el estado de una tarea entre completada y no completada.
   * 
   * Este método se llama cuando el usuario hace clic en el checkbox
   * de una tarea. El nuevo estado será lo opuesto al estado actual
   * (si estaba completada, la marca como no completada y viceversa).
   * 
   * @param task La tarea que queremos actualizar
   */
  async toggleTask(task: Task) {
    try {
      // Actualizamos el estado en Supabase
      // !task.completed invierte el estado actual
      await this.supabaseService.updateTask(task.id, !task.completed);
      this.showMessage('Tarea actualizada correctamente');
    } catch (error) {
      // Si algo sale mal, mostramos mensaje de error
      this.showMessage('Error al actualizar la tarea', true);
    }
  }

  /**
   * Elimina una tarea de la lista.
   * 
   * Este método se llama cuando el usuario hace clic en el botón de eliminar
   * de una tarea. La tarea se elimina permanentemente de la base de datos.
   * 
   * @param task La tarea que queremos eliminar
   * 
   * Nota: En una aplicación real, podríamos querer agregar una confirmación
   * antes de eliminar la tarea, para evitar eliminaciones accidentales.
   */
  async deleteTask(task: Task) {
    try {
      // Eliminamos la tarea de Supabase
      await this.supabaseService.deleteTask(task.id);
      this.showMessage('Tarea eliminada correctamente');
    } catch (error) {
      // Si algo sale mal, mostramos mensaje de error
      this.showMessage('Error al eliminar la tarea', true);
    }
  }
}
