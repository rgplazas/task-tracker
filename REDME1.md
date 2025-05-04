# Task Tracker - Guía de Desarrollo Paso a Paso

## Parte 1: Configuración Inicial del Proyecto

1. **Crear nuevo proyecto Angular**
   ```bash
   ng new task-tracker
   ```
   - Seleccionar 'yes' para routing
   - Seleccionar 'CSS' para estilos

2. **Instalar dependencias necesarias**
   ```bash
   ng add @angular/material
   ```

3. **Estructura inicial de carpetas**
   ```
   src/
   ├── app/
   │   ├── components/
   │   ├── services/
   │   ├── interfaces/
   │   └── shared/
   ```

## Parte 2: Componentes Base y Servicios

1. **Crear interfaces necesarias**
   - Task (id, text, day, reminder)
   - User (para autenticación futura)

2. **Crear componentes principales**
   ```bash
   ng g c components/header
   ng g c components/tasks
   ng g c components/add-task
   ng g c components/task-item
   ng g c components/button
   ```

3. **Crear servicios**
   ```bash
   ng g s services/task
   ng g s services/ui
   ```

## Parte 3: Implementación de la UI Base

1. **Configurar Angular Material**
   - Importar módulos necesarios en app.module.ts
   - Configurar tema y estilos globales

2. **Implementar Header**
   - Añadir título
   - Implementar botón toggle
   - Estilizar componente

3. **Implementar Lista de Tareas**
   - Crear vista de lista
   - Añadir funcionalidad de toggle reminder
   - Implementar eliminación de tareas

## Parte 4: Formulario y Funcionalidad

1. **Implementar Formulario de Tareas**
   - Crear formulario reactivo
   - Validaciones
   - Toggle del formulario

2. **Implementar Servicios**
   - TaskService para CRUD de tareas
   - UIService para estado de la aplicación
   - Implementar almacenamiento local

## Parte 5: Mejoras y Optimizaciones

1. **Implementar Snackbar**
   - Crear componente de notificaciones
   - Integrar con acciones CRUD

2. **Optimizar Rendimiento**
   - Implementar Platform Checks
   - Lazy loading de módulos
   - Optimizar imports

3. **Mejoras de UX**
   - Añadir animaciones
   - Mejorar responsive design
   - Implementar tema oscuro/claro

## Parte 6: Testing y Despliegue

1. **Implementar Tests**
   - Unit tests para servicios
   - Component tests
   - E2E tests con Cypress

2. **Preparar para Producción**
   - Optimizar build
   - Configurar environment
   - Preparar para despliegue

## Tecnologías Utilizadas

- Angular 19.5
- Angular Material
- TypeScript
- RxJS
- LocalStorage para persistencia

## Características Principales

- CRUD completo de tareas
- Persistencia local de datos
- Diseño responsive
- Sistema de notificaciones
- Tema oscuro/claro
- Validaciones de formularios

## Próximos Pasos

- Implementar autenticación
- Añadir backend real
- Implementar categorías de tareas
- Añadir fecha de vencimiento
- Implementar filtros y búsqueda
