/**
 * @fileoverview Configuración de rutas de la aplicación Task Tracker.
 * 
 * ¿Qué son las rutas en Angular?
 * Las rutas permiten navegar entre diferentes páginas o vistas en una aplicación
 * de una sola página (SPA). Es como tener diferentes "páginas" sin recargar
 * el navegador.
 * 
 * Por ejemplo:
 */

// Importación del tipo Routes de Angular
import { Routes } from '@angular/router';

/**
 * @constant routes
 * @type {Routes}
 * @description Define todas las rutas disponibles en la aplicación
 * 
 * Cada ruta puede tener:
 * - path: URL de la ruta
 * - loadComponent: Función que carga el componente (lazy loading)
 * - canActivate: Guardias para protección de rutas
 * - data: Metadatos adicionales
 */
export const routes: Routes = [
    // Cuando la URL está vacía, redirigir a /home
    {
        path: '',              // URL vacía (ejemplo: http://localhost:4200)
        redirectTo: 'home',    // Redirigir a la ruta 'home'
        pathMatch: 'full'      // La URL debe estar completamente vacía
    },

    // Ruta principal que muestra el TaskTracker
    {
        path: 'home',          // URL: /home
        // Carga dinámica (lazy loading) del componente
        // Solo se descarga cuando el usuario navega a esta ruta
        loadComponent: () => import('./task-tracker/task-tracker.component')
            .then(m => m.TaskTrackerComponent)
    },

    // Ruta comodín: captura cualquier URL no definida
    {
        path: '**',            // Cualquier ruta no definida
        redirectTo: 'home'     // Redirigir a home
    }
];
