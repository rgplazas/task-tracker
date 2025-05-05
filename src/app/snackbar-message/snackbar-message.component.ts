/**
 * @fileoverview Componente para mostrar mensajes de notificación usando Material Snackbar.
 * Proporciona una interfaz consistente para mostrar mensajes de éxito y error
 * con iconos y estilos personalizados.
 */

import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

/**
 * Interfaz que define la estructura de los datos esperados por el componente.
 */
interface SnackbarData {
  /** Mensaje a mostrar */
  message: string;
  /** El nombre del icono de Material a mostrar (por ejemplo: 'check_circle', 'error') */
  icon: string;
}

/**
 * Componente SnackbarMessage.
 * 
 * Este es un componente "standalone", lo que significa que no necesita ser declarado
 * en un módulo de Angular. Esta es una característica nueva de Angular que hace
 * que los componentes sean más fáciles de usar y mantener.
 * 
 * El componente usa una plantilla inline (template) en lugar de un archivo separado
 * porque es muy simple y solo tiene unos pocos elementos.
 */
@Component({
  // El selector define cómo se puede usar este componente en HTML
  selector: 'app-snackbar-message',
  
  // Importamos MatIconModule porque usamos <mat-icon> en nuestra plantilla
  imports: [MatIconModule],
  
  // Este componente es standalone (no necesita un módulo)
  standalone: true,
  
  // La plantilla define la estructura HTML del componente
  template: `
    <!-- Contenedor flex para alinear el icono y el mensaje horizontalmente -->
    <div class="snackbar-content">
      <!-- 
        mat-icon es un componente de Angular Material que muestra iconos.
        El nombre del icono viene de los datos inyectados (data.icon)
      -->
      <mat-icon>{{ data.icon }}</mat-icon>
      
      <!-- El mensaje también viene de los datos inyectados (data.message) -->
      <span>{{ data.message }}</span>
    </div>
  `,
  
  // Estilos CSS específicos para este componente
  styles: [`
    /* Usamos flexbox para alinear el icono y el texto */
    .snackbar-content {
      display: flex;
      align-items: center;
      gap: 8px;              /* Espacio entre el icono y el texto */
      font-weight: 500;     /* Texto semi-negrita para mejor legibilidad */
    }
    
    /* Personalizamos el tamaño del icono */
    mat-icon {
      font-size: 20px;
    }
  `]
})
export class SnackbarMessageComponent {
  /**
   * El constructor recibe los datos que se mostrarán en el snackbar.
   * 
   * @Inject(MAT_SNACK_BAR_DATA) es un decorador que le dice a Angular que
   * debe inyectar los datos que se pasaron al abrir el snackbar.
   * 
   * Por ejemplo, cuando se abre el snackbar así:
   * snackBar.open({
   *   message: "Tarea creada",
   *   icon: "check_circle"
   * });
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) { }
}
