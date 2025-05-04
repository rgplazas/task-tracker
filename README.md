# 🚀 Task Tracker App

## 📋 Descripción

Task Tracker es una aplicación moderna de gestión de tareas construida con Angular 19 y Supabase. Permite a los usuarios crear, actualizar y gestionar tareas de manera eficiente con una interfaz de usuario intuitiva y almacenamiento en tiempo real.

## ✨ Características

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
