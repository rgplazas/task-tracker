/**
 * @fileoverview Configuración de la conexión con Supabase, nuestra base de datos en la nube.
 * 
 * ¿Qué es Supabase?
 * Supabase es como un servidor de base de datos en la nube que nos permite guardar
 * y recuperar datos sin tener que configurar nuestro propio servidor. Es similar a
 * Firebase de Google, pero usa PostgreSQL, una base de datos muy popular y potente.
 * 
 * Este archivo contiene toda la información necesaria para que nuestra aplicación
 * pueda conectarse y comunicarse con Supabase.
 */

/**
 * Importamos el tipo SupabaseClientOptions que nos ayuda a asegurarnos de que
 * nuestra configuración tiene el formato correcto que espera Supabase.
 */
import { SupabaseClientOptions } from '@supabase/supabase-js';

/**
 * SUPABASE_CONFIG: Objeto que contiene toda la configuración necesaria para
 * conectarnos a nuestra base de datos Supabase.
 * 
 * Es como la "llave y dirección" que necesitamos para acceder a nuestros datos.
 * Sin esta configuración, la aplicación no sabría dónde guardar las tareas.
 */
export const SUPABASE_CONFIG = {
  /**
   * URL única de nuestro proyecto en Supabase.
   * Cada proyecto en Supabase tiene su propia URL única, como una dirección postal.
   * Esta URL nunca cambia mientras exista el proyecto.
   */
  url: 'https://lhnyokboslhggukoxnwn.supabase.co',
  
  /**
   * Clave de acceso pública (anon key).
   * Esta clave permite que los usuarios de la aplicación puedan:
   * - Ver las tareas públicas
   * - Crear nuevas tareas
   * - Actualizar sus propias tareas
   * - Eliminar sus propias tareas
   * 
   * ¡IMPORTANTE! Esta es una clave pública y es seguro incluirla en el código,
   * ya que Supabase tiene reglas de seguridad que controlan qué pueden hacer los usuarios.
   */
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobnlva2Jvc2xoZ2d1a294bnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTAzOTcsImV4cCI6MjA2MTQyNjM5N30.0f7Y7deYoRvICJQc8O3mVALnknseb1V3Yi-g-btlczo',
  
  /**
   * Opciones adicionales para personalizar cómo funciona la conexión con Supabase.
   * Estas opciones controlan cosas como la autenticación y el formato de los datos.
   */
  options: {
    /**
     * Configuración de la base de datos.
     * El 'schema' es como una carpeta dentro de la base de datos donde
     * guardamos nuestras tablas. 'public' es el schema por defecto.
     */
    db: {
      schema: 'public'
    },

    /**
     * Configuración de la autenticación.
     * Estas opciones controlan cómo maneja la aplicación las sesiones de usuario.
     */
    auth: {
      /**
       * Cuando es true, la aplicación automáticamente renueva el token de acceso
       * antes de que expire, así el usuario no tiene que volver a iniciar sesión
       * constantemente.
       */
      autoRefreshToken: true,

      /**
       * Cuando es true, la sesión del usuario se guarda en el navegador,
       * por lo que no tiene que iniciar sesión cada vez que recarga la página.
       */
      persistSession: true,

      /**
       * Cuando es true, la aplicación busca en la URL si hay un token de sesión.
       * Esto es útil cuando el usuario acaba de iniciar sesión y es redirigido
       * de vuelta a la aplicación.
       */
      detectSessionInUrl: true
    },

    /**
     * Configuración global que se aplica a todas las peticiones a Supabase.
     */
    global: {
      /**
       * Cabeceras HTTP que se envían con cada petición.
       * 'Content-Type': 'application/json' indica que enviamos y recibimos
       * datos en formato JSON.
       */
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } as SupabaseClientOptions<'public'>
};
