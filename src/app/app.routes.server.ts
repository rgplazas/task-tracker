/**
 * @fileoverview Configuración de rutas para el servidor en Task Tracker.
 * 
 * Este archivo define cómo se deben renderizar las diferentes rutas
 * cuando la aplicación se ejecuta en el servidor (SSR).
 * 
 * En Angular 19.5, tenemos tres modos de renderizado:
 * 1. Prerender: Genera el HTML en tiempo de compilación
 * 2. Dynamic: Genera el HTML en cada solicitud
 * 3. Static: Sirve contenido estático sin renderizado
 */

// Importamos los tipos necesarios de Angular SSR
import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Configuración de rutas para el servidor.
 * 
 * En este caso, usamos una configuración simple donde todas las rutas ('**')
 * se pre-renderizan. Esto significa que el HTML se genera durante el build,
 * lo que resulta en:
 * 
 * Ventajas:
 * - Máximo rendimiento para el usuario final
 * - Menor carga en el servidor en producción
 * - Excelente para SEO
 * 
 * Desventajas:
 * - El contenido no es dinámico
 * - Tiempo de build más largo
 */
export const serverRoutes: ServerRoute[] = [
  {
    // '**' significa "todas las rutas"
    path: '**',

    // Pre-renderizar todas las rutas durante el build
    renderMode: RenderMode.Prerender
  }
];
