# Dashboard Ruta Lince - UVM

Panel de administración para la aplicación Ruta Lince de la Universidad del Valle de México.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm**
- **Git**
- **Editor de código** (recomendado: IntelliJ IDEA 2025, Visual Studio Code)

## Configuración Inicial del Proyecto

### 1. Solicitar Acceso al Repositorio

Antes de clonar el proyecto, debes solicitar acceso al propietario del repositorio:

1. Contacta al administrador del proyecto
2. Proporciona tu usuario o correo de GitHub
3. Espera la confirmación de acceso como colaborador

### 2. Clonar el Repositorio

Una vez tengas los permisos, clona el proyecto (asegúrate de tener Git previamente instalado):

```bash
git clone [URL_DEL_REPOSITORIO]
```

Un tutorial sobre cómo clonar el repositorio está totalmente fuera del alcance de este archivo. Asegúrate de entender
Git y GitHub antes de continuar.

### 3. Instalar Dependencias

Usamos **npm** como gestor de paquetes, pero eres libre de usar cualquier otro.
Antes de comenzar en el desarrollo, instala las dependencias del proyecto.

**Con npm:**

```bash
npm install
```

### 4. Configurar Variables de Entorno

Cada usuario debe crear sus propios archivos de variables de entorno en la raíz del proyecto. Este proyecto utiliza
modos de Vite; los archivos relevantes son:

- `.env.development` — entorno local / desarrollo
- `.env.pre` — entorno de pre-producción (apunta al backend desplegado)

A continuación se indica cómo crear los archivos y ejemplos de contenido.

- Crear los archivos manualmente y pegar el contenido (si prefieres crearlos desde cero):

  En Windows (cmd.exe) — ejemplo rápido para crear `.env.development`:

  ```cmd
  echo VITE_API_BASE_URL=http://127.0.0.1:8000 > .env.development
  ```

  En macOS/Linux (Terminal):

  ```bash
  printf "VITE_API_BASE_URL=http://127.0.0.1:8000\n" > .env.development
  ```

2) Ejemplos de contenido (edítalos según tu entorno)

- `.env.development` (ejemplo):

  ```env
  VITE_API_BASE_URL=http://127.0.0.1:8000/api
  ```

- `.env.pre` (ejemplo):

  ```env
  VITE_API_BASE_URL=https://backend-ruta-lince.onrender.com/api
  ```

3) Qué significa cada archivo y sus implicaciones

- `.env.development` -> apunta a `localhost` o al backend local:
    - Debes tener el backend levantado en la URL/puerto configurado (`http://127.0.0.1:8000` es el que despliega por
      default uviconr en FastAPI).
    - El backend local utilizará su propia base de datos (por ejemplo, un archivo sqlite local). Los datos que veas en
      el frontend corresponderán a esa base de datos local.
    - Útil para desarrollar y probar cambios sin afectar ambientes compartidos.

- `.env.pre` -> apunta al backend desplegado en pre-producción:
    - El frontend se comunicará con el backend de pre-producción y por tanto con la base de datos de ese ambiente.
    - Ten cuidado al realizar operaciones que modifiquen datos en pre-producción.

4) Ejecutar el frontend apuntando a un ambiente específico

Este repositorio ya incluye scripts en `package.json` para facilitar el uso de modos:

- Ejecutar en modo desarrollo (usa `.env.development`):

```cmd
npm run dev
```

- Ejecutar en modo `pre` para desarrollo local apuntando al backend de pre-producción (usa `.env.pre`):

```cmd
npm run dev:pre
```

- Compilar para `pre` (build que usa las variables de `.env.pre`):

```cmd
npm run build:pre
```

Nota: `npm run build` por defecto usa el modo de Vite que definas (generalmente `production`), y `npm run preview` sirve
para previsualizar una build local.

5) Buenas prácticas

- Cada desarrollador debe crear sus propios `.env.development` y `.env.pre` locales; no compartas archivos `.env` con
  credenciales en repositorios públicos.
- Añade los `.env` locales a tu `.gitignore` si aún no están listados.
- Verifica que el backend correspondiente esté levantado y que la base de datos que use coincida con el entorno que
  estás apuntando (local sqlite para `development`, base de datos del ambiente para `pre`).

> Nota: Vite carga automáticamente variables desde `.env`, `.env.local`, `.env.<mode>`, y `.env.<mode>.local` según el
> modo usado. En este proyecto los modos relevantes son `development` y `pre`.

## Editor de Código Recomendado

Este proyecto está optimizado para trabajar con **IntelliJ IDEA 2025**, aunque también es compatible con:

- Visual Studio Code
- WebStorm
- Cualquier editor que soporte TypeScript y React

### Extensiones/Plugins Recomendados (Intellij IDEA 2025 y VSCode)

- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Ejecutar el Proyecto en Modo Desarrollo

### Windows (CMD/PowerShell/Git Bash)

```cmd
npm run dev
```

### macOS/Linux (Terminal)

```bash
npm run dev
```

El proyecto se ejecutará por defecto en: `http://localhost:5173`

## Prácticas de Colaboración

### Antes de Hacer Push

**SIEMPRE** actualiza tu rama local antes de subir cambios:

```bash
git pull origin master
# o si estás en otra rama
git pull origin [nombre-de-tu-rama]
```

### Nunca Trabajes Directamente en Master

La rama `master` está protegida. **NUNCA** hagas commits directos:

```bash
# MAL
git checkout master
git add .
git commit -m "cambios"
git push origin master

# BIEN
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "descripción del cambio"
git push origin feature/nueva-funcionalidad
```

### Nomenclatura de Ramas

Crea ramas descriptivas. Eres libre de usar el prefijo que consideres adecuado.

### Comunicación con el Equipo

1. **Antes de empezar:**
    - Informa al equipo qué funcionalidad vas a desarrollar. Generalmente, el equipo debió asignarte algo
    - Revisa si alguien más está trabajando en algo relacionado. Habrá conflictos en Git si trabajas sobre archivos en
      los que otro también trabaja

2. **Durante el desarrollo:**
    - Haz commits pequeños y frecuentes con mensajes descriptivos
    - Mantén actualizada tu rama con los cambios de `master`, más nunca actualices master directamente.

3. **Al terminar:**
    - Has push de tu rama local a una nueva rama remota para su revisión, aprobación e integración.`

## Licencia

Todos los derechos reservados por Universidad del Valle de México.

---

**¡Bienvenido al equipo de desarrollo de Dashboard Ruta Lince!**
