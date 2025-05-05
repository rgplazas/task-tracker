/**
 * @fileoverview Configuración del servidor para Server-Side Rendering (SSR).
 * 
 * ¿Qué es Server-Side Rendering?
 * Es una técnica donde el servidor genera el HTML inicial de la aplicación
 * antes de enviarlo al navegador. Esto mejora:
 * - El rendimiento inicial
 * - El SEO (posicionamiento en buscadores)
 * - La experiencia en dispositivos lentos
 */

// Importaciones necesarias de Angular
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';

// Proveedor para el renderizado en el servidor
import { provideServerRendering } from '@angular/platform-server';

// Proveedor para el enrutamiento en el servidor
import { provideServerRouting } from '@angular/ssr';

// Configuración básica de la aplicación
import { appConfig } from './app.config';

// Rutas específicas para el servidor
import { serverRoutes } from './app.routes.server';

/**
 * Configuración específica para el servidor.
 * 
 * Esta configuración se aplica SOLO cuando la aplicación se ejecuta en el servidor.
 * Agrega capacidades especiales para SSR:
 * 
 * 1. provideServerRendering(): Habilita el renderizado en el servidor
 * 2. provideServerRouting(): Configura el enrutamiento para el servidor
 */
const serverConfig: ApplicationConfig = {
  providers: [
    // Habilita el renderizado en el servidor
    provideServerRendering(),

    // Configura las rutas para el servidor
    provideServerRouting(serverRoutes)
  ]
};

/**
 * Configuración final que combina:
 * - La configuración básica de la aplicación (appConfig)
 * - La configuración específica del servidor (serverConfig)
 * 
 * mergeApplicationConfig combina ambas configuraciones de forma inteligente,
 * asegurándose de que no haya conflictos.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
