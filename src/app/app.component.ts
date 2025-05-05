/**
 * @fileoverview Este es el componente raíz (principal) de nuestra aplicación Task Tracker.
 * 
 * ¿Qué es un componente raíz?
 * En Angular, toda aplicación tiene un componente principal que actúa como el punto
 * de entrada. Es como el tronco de un árbol del que salen todas las ramas (otros componentes).
 * 
 * Este componente:
 * 1. Define la estructura básica de la página
 * 2. Carga el componente TaskTracker que maneja las tareas
 * 3. Establece los estilos globales básicos
 * 
 * Angular 19.5 introduce varias mejoras:
 * - Componentes standalone (sin necesidad de módulos)
 * - Mejor manejo de rutas
 * - Mejor rendimiento en la hidratación del cliente
 */

/**
 * @fileoverview Este archivo contiene el componente principal (AppComponent) de la aplicación Task Tracker.
 * Angular 19.5 introduce varias características nuevas que se utilizan en este componente:
 * - Standalone Components: Componentes que no necesitan un NgModule
 * - Improved Router: Sistema de enrutamiento mejorado con lazy loading
 * - Enhanced Template Syntax: Sintaxis de plantilla mejorada para mejor rendimiento
 */

// Importaciones del framework Angular
import { Component } from '@angular/core';          // Decorador que define un componente Angular
import { RouterOutlet } from '@angular/router';     // Componente que renderiza las rutas activas

/**
 * @description Importaciones de Angular Material (UI Framework)
 * Estos módulos proporcionan componentes de interfaz de usuario pre-diseñados
 * que siguen los principios de Material Design de Google
 */
import { MatIconModule } from '@angular/material/icon';        // Para íconos de Material
import { MatButtonModule } from '@angular/material/button';    // Para botones estilizados
import { MatToolbarModule } from '@angular/material/toolbar';  // Para la barra de navegación
import { NgStyle } from '@angular/common';                     // Para binding dinámico de estilos

/**
 * @Component es un decorador que marca esta clase como un componente de Angular.
 * 
 * ¿Qué es un decorador?
 * Un decorador es como una etiqueta especial que modifica el comportamiento de una clase.
 * Es similar a los atributos en C# o las anotaciones en Java.
 * 
 * El decorador @Component:
 * - Define cómo se ve el componente (template)
 * - Cómo se usa (selector)
 * - Qué estilos tiene (styles)
 * - Qué otros componentes usa (imports)
 */
@Component({
  // El selector define cómo usamos este componente en HTML
  // En este caso, <app-root></app-root> en index.html
  selector: 'app-root',
  
  // standalone: true es una característica nueva de Angular 19
  // Significa que este componente no necesita un NgModule
  standalone: true,
  
  // Otros componentes que usamos en nuestro template
  imports: [
    RouterOutlet           // Para que funcione el enrutamiento
  ],
  
  // El template define la estructura HTML del componente
  // Usamos template strings (`) para escribir HTML multilínea
  template: `
    <!-- 
      Contenedor principal de la aplicación
      La clase app-container aplica estilos básicos de layout
    -->
    <div class="app-container">
      <!-- Título principal de la aplicación -->
      <h1>Task Tracker</h1>
      
      <!-- 
        Aquí insertamos el componente TaskTracker
        Este componente maneja toda la lógica de las tareas
      -->


      <!-- 
        router-outlet es donde se mostrarán las rutas
        Por ahora solo tenemos una ruta (home)
      -->
      <router-outlet></router-outlet>
    </div>
  `,
  
  // Estilos CSS específicos para este componente
  // Estos estilos NO afectan a otros componentes (encapsulación)
  styles: [`
    /* Variables CSS para el tema */
    :host {
      --primary-color: #6366f1;      /* Indigo moderno */
      --accent-color: #8b5cf6;       /* Violeta vibrante */
      --background-color: #f8fafc;   /* Gris muy claro */
      --text-color: #1e293b;         /* Azul oscuro */
      --border-radius: 1rem;         /* Bordes redondeados */
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
      --transition: all 0.3s ease;
    }

    /* Estilos globales */
    :host {
      display: block;
      min-height: 100vh;
      background: var(--background-color);
      color: var(--text-color);
      font-family: 'Inter', system-ui, sans-serif;
    }

    /* Contenedor principal con diseño moderno */
    .app-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-md);
      transition: var(--transition);

      /* Efecto de profundidad al pasar el mouse */
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      }

      /* Diseño responsivo */
      @media (max-width: 768px) {
        margin: 1rem;
        padding: 1.5rem;
      }
    }

    /* Título con estilo moderno y dinámico */
    h1 {
      text-align: center;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 3rem;
      letter-spacing: -0.02em;
      line-height: 1.2;
      
      /* Animación suave */
      animation: fadeIn 0.8s ease-out;
    }

    /* Animaciones */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Mejoras de accesibilidad */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `]
})

/**
 * @class AppComponent
 * @description Componente principal de la aplicación Task Tracker para 2025
 * 
 * Este componente actúa como el contenedor raíz de la aplicación y proporciona:
 * 1. Layout principal con diseño moderno y responsivo
 * 2. Navegación principal usando Angular Material
 * 3. Sistema de temas dinámico con variables CSS
 * 4. Efectos visuales modernos (glassmorphism, animaciones, gradientes)
 * 
 * @example
 * <app-root>
 *   <!-- Todo el contenido de la aplicación se renderiza aquí -->
 * </app-root>
 * 
 * @since 2.0.0
 * @version 19.5.0
 */
export class AppComponent {
  /**
   * Constructor del componente.
   * 
   * En este caso, el constructor está vacío porque no necesitamos
   * inicializar nada cuando se crea el componente.
   * 
   * En Angular 19.5, los componentes standalone son más ligeros
   * y no requieren tanta configuración inicial.
   */
  constructor() {}
}
