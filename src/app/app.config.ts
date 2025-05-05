/**
 * @fileoverview Configuración principal de la aplicación Task Tracker.
 * 
 * Este archivo es el punto central de configuración de nuestra aplicación Angular 19.5.
 * Aquí definimos todas las capacidades y servicios que la aplicación necesita para funcionar.
 * 
 * ¿Qué es la configuración de la aplicación?
 * Es como el "panel de control" donde activamos o desactivamos diferentes
 * características de Angular. Por ejemplo:
 * - Animaciones para efectos visuales
 * - Sistema de navegación entre páginas
 * - Capacidad para hacer peticiones HTTP
 * - Optimizaciones de rendimiento
 */

// Importaciones necesarias de Angular
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Proveedor para animaciones

// Importaciones de Angular Material
import { provideAnimations } from '@angular/platform-browser/animations';  // Soporte para animaciones
import { provideHttpClient, withFetch } from '@angular/common/http';  // Cliente HTTP para comunicación con APIs

// Cliente HTTP para comunicación con el backend
// Esencial para interactuar con Supabase y hacer
// operaciones CRUD (Crear, Leer, Actualizar, Eliminar)

// Sistema de enrutamiento (navegación)
// Permite crear una aplicación de una sola página (SPA)
// donde la navegación es fluida sin recargas
// Configura las rutas definidas en app.routes.ts

// Proveedor para animaciones
// Necesario para los efectos visuales de Angular Material
// como las transiciones suaves y los diálogos animados

// Soporte para Server-Side Rendering (SSR)
// Mejora el rendimiento inicial y el SEO de la aplicación
import { provideClientHydration } from '@angular/platform-browser';

/**
 * Configuración principal de la aplicación Task Tracker.
 * 
 * ¿Qué son los providers?
 * Los providers son como "servicios" o "herramientas" que nuestra aplicación necesita.
 * Cada provider tiene una función específica:
 * 
 * 1. provideAnimations():
 *    - Habilita las animaciones en toda la aplicación
 *    - Usado por Angular Material para efectos visuales suaves
 *    - Mejora la experiencia del usuario (UX)
 * 
 * 2. provideRouter(routes):
 *    - Configura el sistema de navegación
 *    - Permite cambiar entre componentes sin recargar la página
 *    - Las rutas se definen en app.routes.ts
 * 
 * 3. provideHttpClient(withFetch()):
 *    - Permite hacer peticiones HTTP a Supabase
 *    - Usa la moderna API Fetch para mejor rendimiento
 *    - Esencial para operaciones CRUD con la base de datos
 * 
 * 4. provideClientHydration():
 *    - Optimiza el rendimiento con Server-Side Rendering
 *    - Mejora la carga inicial de la aplicación
 *    - Ayuda con el SEO y dispositivos lentos
 */
/**
 * @constant appConfig
 * @type {ApplicationConfig}
 * @description Configuración principal de la aplicación Task Tracker
 * 
 * Esta constante define todos los proveedores necesarios para que la aplicación funcione:
 * - Router: Para la navegación entre componentes
 * - Animations: Para efectos visuales y transiciones
 * - HttpClient: Para comunicación con Supabase y otras APIs
 * 
 * @example
 * bootstrapApplication(AppComponent, appConfig)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor del sistema de enrutamiento
    provideRouter(routes),
    
    // Proveedor de animaciones para efectos visuales
    provideAnimations(),
    
    // Proveedor del cliente HTTP para comunicación con APIs

    // Cliente HTTP para Supabase
    // withFetch() usa la API moderna de navegador
    provideHttpClient(withFetch()),

    // Optimización para Server-Side Rendering
    // Mejora el rendimiento inicial y SEO
    provideClientHydration()
  ]
};
