/**
 * @fileoverview Este archivo define las estructuras de datos fundamentales para nuestra aplicación de gestión de tareas.
 * 
 * En Angular y TypeScript, las interfaces nos permiten definir la forma que deben tener nuestros objetos,
 * lo que ayuda a detectar errores antes de que el código se ejecute y mejora la documentación.
 * 
 * Supabase es nuestra base de datos en la nube, y necesita saber exactamente qué tipo de datos
 * vamos a guardar y cómo se estructuran.
 */

/**
 * UUID (Identificador Único Universal) es un tipo especial de string que se usa para
 * identificar de manera única cada elemento en una base de datos.
 * Por ejemplo: "123e4567-e89b-12d3-a456-426614174000"
 */
export type UUID = string;

/**
 * Interfaz Task: Define la estructura que debe tener cada tarea en nuestra aplicación.
 * 
 * En Angular/TypeScript, una interfaz es como un contrato que dice qué propiedades
 * debe tener un objeto y de qué tipo deben ser.
 * 
 * @example
 * // Ejemplo de una tarea válida:
 * const tarea: Task = {
 *   id: "123e4567-e89b-12d3-a456-426614174000",
 *   description: "Completar el informe",
 *   completed: false,
 *   created_at: "2025-05-04T14:30:00Z"
 * };
 */
export interface Task {
  /**
   * Identificador único de la tarea.
   * Cada tarea tiene su propio ID que la distingue de todas las demás.
   * Este ID es generado automáticamente por Supabase.
   */
  id: UUID;

  /**
   * El texto que describe qué hay que hacer en esta tarea.
   * Por ejemplo: "Comprar leche" o "Llamar al doctor"
   */
  description: string;

  /**
   * Indica si la tarea ya fue realizada (true) o todavía está pendiente (false).
   * Este valor cambia cuando el usuario marca o desmarca el checkbox de la tarea.
   */
  completed: boolean;

  /**
   * La fecha y hora en que se creó la tarea.
   * Es opcional (indicado por el ?) porque al crear una tarea nueva,
   * Supabase se encarga de poner la fecha automáticamente.
   * Formato ejemplo: "2025-05-04T14:30:00Z"
   */
  created_at?: string;
}

/**
 * Interfaz Database: Define la estructura de nuestra base de datos en Supabase.
 * 
 * Esta interfaz es más compleja porque necesita describir no solo cómo se ven los datos,
 * sino también cómo podemos interactuar con ellos (crear, leer, actualizar, eliminar).
 * 
 * La estructura anidada (public > Tables > tasks) refleja cómo Supabase organiza los datos:
 * - public: es el esquema por defecto en Supabase
 * - Tables: contiene todas las tablas de la base de datos
 * - tasks: es nuestra tabla específica para las tareas
 */
export interface Database {
  public: {
    Tables: {
      tasks: {
        /**
         * Row define cómo se ve una tarea cuando la leemos de la base de datos.
         * Usa la interfaz Task que definimos arriba.
         */
        Row: Task;

        /**
         * Insert define qué datos necesitamos para crear una tarea nueva.
         * Omit<Task, 'id' | 'created_at'> significa que tomamos la interfaz Task
         * pero no incluimos 'id' ni 'created_at' porque esos los genera Supabase automáticamente.
         * 
         * @example
         * // Para crear una tarea solo necesitamos:
         * const nuevaTarea = {
         *   description: "Nueva tarea",
         *   completed: false
         * };
         */
        Insert: Omit<Task, 'id' | 'created_at'>;

        /**
         * Update define qué datos podemos modificar en una tarea existente.
         * Partial significa que todos los campos son opcionales - podemos actualizar
         * solo los campos que queremos cambiar.
         * 
         * @example
         * // Para marcar una tarea como completada:
         * const actualizacion = {
         *   completed: true
         * };
         */
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
    };
  };
}
