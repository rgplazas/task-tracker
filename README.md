# 🗓️ Task Tracker - Gestor de Tareas

## 📝 Descripción

Task Tracker es una aplicación web moderna para gestionar tus tareas diarias. Imagina tener una lista de tareas digital que:
- Se sincroniza automáticamente entre todos tus dispositivos
- Funciona incluso sin internet
- Tiene una interfaz moderna y fácil de usar
- Es accesible para todos los usuarios

## 🌟 ¿Por qué usar Task Tracker?

1. 🚀 **Fácil de Usar**
   - Interfaz intuitiva y amigable
   - No requiere conocimientos técnicos
   - Diseño adaptable a cualquier dispositivo

2. 🔄 **Siempre Sincronizado**
   - Tus tareas se guardan automáticamente
   - Accede desde cualquier dispositivo
   - Funciona sin internet (modo offline)

3. 🛠️ **Características Avanzadas**
   - Previene tareas duplicadas
   - Validación inteligente
   - Notificaciones claras
   - Modo oscuro automático

## 💻 ¿Qué tecnologías usa?

### Angular 19.5
¿Qué es? Un framework moderno para crear aplicaciones web.
- Desarrollado por Google
- Usado por grandes empresas como Microsoft y Samsung
- Garantiza aplicaciones rápidas y seguras

### Supabase
¿Qué es? Una alternativa moderna a Firebase.
- Base de datos en la nube
- Sincronización en tiempo real
- Totalmente gratuito para empezar

## 📍 Requisitos Previos

### Para Usuarios
Solo necesitas un navegador web moderno como:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

### Para Desarrolladores
1. **Node.js**
   - ¿Qué es? El motor que ejecuta el código
   - Descargar de: https://nodejs.org
   - Versión recomendada: 18 o superior

2. **Angular CLI**
   - ¿Qué es? Herramienta para manejar proyectos Angular
   - Instalar con: `npm install -g @angular/cli`

3. **Cuenta Supabase**
   - Registrarse en: https://supabase.com
   - Es gratis y solo toma 2 minutos

## 💻 Instalación

### Paso 1: Obtener el Código
```bash
# 1. Abrir terminal o símbolo del sistema

# 2. Ir a la carpeta donde quieres el proyecto
cd mis-proyectos

# 3. Clonar el repositorio
git clone https://github.com/tu-usuario/task-tracker.git

# 4. Entrar a la carpeta
cd task-tracker
```

### Paso 2: Instalar Dependencias
```bash
# Instalar todo lo necesario
npm install
```

### Paso 3: Configurar Supabase
1. Crear archivo `.env` en la carpeta principal
2. Agregar tus claves de Supabase:
```env
SUPABASE_URL=tu-url-de-supabase
SUPABASE_KEY=tu-clave-de-supabase
```

### Paso 4: Iniciar la Aplicación
```bash
# Iniciar servidor de desarrollo
ng serve

# Abrir en el navegador:
http://localhost:4200
```

## 💡 Guía de Uso

### Crear una Tarea
1. Escribe la descripción en el campo de texto
2. Presiona Enter o el botón "Agregar"

### Gestionar Tareas
- ✅ Marcar como completada: Click en el checkbox
- 🗑️ Eliminar tarea: Click en el botón de eliminar
- ✏️ Editar tarea: Doble click en el texto

### Validaciones
- No se permiten tareas vacías
- Mínimo 3 caracteres
- No se permiten duplicados

## 👨‍💻 Para Desarrolladores

### Estructura del Proyecto
```
src/
├── app/                # Código principal
│   ├── task-tracker/    # Componente de tareas
│   ├── services/        # Servicios (Supabase)
│   └── shared/          # Componentes compartidos
├── assets/            # Imágenes y recursos
└── environments/      # Configuración
```

### Comandos Útiles
```bash
# Desarrollo
ng serve

# Construir para producción
ng build

# Ejecutar pruebas
ng test

# Revisar código
ng lint
```

## 🔗 Enlaces Útiles

### Documentación
- [Angular](https://angular.dev)
- [Supabase](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Tutoriales
- [Angular para Principiantes](https://angular.dev/tutorials/first-app)
- [Introducción a Supabase](https://supabase.com/docs/guides/getting-started)

## 👨‍💻 Contribución
¿Quieres mejorar Task Tracker? ¡Genial!

1. Haz un Fork del proyecto
2. Crea una rama (`git checkout -b mejora/nueva-funcion`)
3. Haz commit (`git commit -m 'feat: Agrega nueva función'`)
4. Sube los cambios (`git push origin mejora/nueva-funcion`)
5. Abre un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor
Rodrigo Plazas

## 👏 Agradecimientos
- Equipo de Angular
- Comunidad de Supabase
- Todos los contribuidores

## 💬 Soporte
¿Tienes preguntas? ¿Necesitas ayuda?
- Abre un Issue en GitHub
- Envía un correo a: [tu-email]

---

💡 **Nota**: Este proyecto está en constante mejora. ¡Tus sugerencias son bienvenidas!

## Descripción
Task Tracker es una aplicación moderna de gestión de tareas desarrollada con Angular 19.5. Permite a los usuarios crear, gestionar y dar seguimiento a sus tareas diarias con una interfaz intuitiva y accesible.

## Características Principales

### Gestión de Tareas
- CRUD completo de tareas
- Validaciones avanzadas:
  - Prevención de tareas duplicadas
  - Validación de longitud mínima
  - Detección de tareas vacías
- Sincronización en tiempo real con Supabase
- Persistencia local con localStorage

- ⚡ Interfaz de usuario moderna y responsive
- 🔄 Sincronización en tiempo real con Supabase
- 🎨 Diseño Material Design
- 🌐 Gestión de estado eficiente
- 🔒 Manejo robusto de errores

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Angular CLI](https://angular.io/cli) (versión 19.x)
  ```bash
  npm install -g @angular/cli
  ```
- [Git](https://git-scm.com/) para control de versiones
- Una cuenta en [Supabase](https://supabase.com/) (gratuita)

## 🔗 Enlaces Útiles

- [Documentación de Angular](https://angular.dev/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)

## 💻 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd task-tracker
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura Supabase:
   - Crea una cuenta en [Supabase](https://supabase.com/)
   - Crea un nuevo proyecto
   - Copia las credenciales (URL y API Key)
   - Crea un archivo `.env` en la raíz del proyecto:
```env
SUPABASE_URL=tu-url-de-supabase
SUPABASE_KEY=tu-api-key-de-supabase
```

4. Configura la base de datos:
   - Ve a la sección SQL de tu proyecto en Supabase
   - Ejecuta el siguiente script:
```sql
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

## 🚀 Ejecución

1. Inicia el servidor de desarrollo:
```bash
ng serve
```

2. Abre tu navegador y visita:
```
http://localhost:4200
```

💡 **Nota**: Si encuentras problemas con SSR (Server-Side Rendering), usa:
```bash
ng serve --configuration development
```

## 🔧 Solución de Problemas

### 📡 Problemas Comunes

1. **La aplicación no carga en modo producción**
   - Causa: Conflictos con SSR (Server-Side Rendering)
   - Solución: Usa el modo desarrollo o actualiza la configuración en `angular.json`:
   ```json
   {
     "projects": {
       "task-tracker": {
         "architect": {
           "build": {
             "options": {
               "outputMode": "static"
             }
           }
         }
       }
     }
   }
   ```

2. **Error de conexión con Supabase**
   - Verifica tus credenciales en el archivo `.env`
   - Asegúrate de que la tabla `tasks` esté creada
   - Revisa los logs en la consola del navegador (F12)

3. **Problemas con localStorage**
   - La aplicación usa verificaciones de plataforma para manejar SSR
   - Si ves errores, asegúrate de que `isPlatformBrowser` esté implementado

## 📝 Comandos Útiles

### Desarrollo
```bash
# Iniciar en modo desarrollo
ng serve --configuration development

# Construir para producción
ng build --configuration production

# Ejecutar pruebas unitarias
ng test

# Generar nuevo componente
ng generate component mi-componente
```

## 📈 Mejores Prácticas

1. **Manejo de Estado**
   - Usa BehaviorSubject para estado reactivo
   - Implementa manejo de errores en servicios

2. **Rendimiento**
   - Implementa lazy loading para módulos grandes
   - Usa trackBy en ngFor para optimizar listas

3. **Seguridad**
   - No expongas las credenciales de Supabase
   - Implementa validación de entrada
   - Usa Angular Material para UI segura

## 👨‍💻 Contribución

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -am 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Envía un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
