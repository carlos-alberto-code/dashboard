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
Un tutorial sobre cómo clonar el repositorio está totalmente fuera del alcance de este archivo. Asegúrate de entender Git y GitHub antes de continuar.

### 3. Instalar Dependencias

Usamos **npm** como gestor de paquetes, pero eres libre de usar cualquier otro.
Antes de comenzar en el desarrollo, instala las dependencias del proyecto.

**Con npm:**
```bash
npm install
```
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

## Credenciales de Prueba

Para acceder al sistema en ambiente de desarrollo:

- **Usuario:** `111`
- **Contraseña:** `111`

> **Nota:** Estas son credenciales de desarrollo únicamente.

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
    - Revisa si alguien más está trabajando en algo relacionado. Habrá conflictos en Git si trabajas sobre archivos en los que otro también trabaja

2. **Durante el desarrollo:**
    - Haz commits pequeños y frecuentes con mensajes descriptivos
    - Mantén actualizada tu rama con los cambios de `master`, más nunca actualices master directamente.

3. **Al terminar:**
    - Has push de tu rama local a una nueva rama remota para su revisión, aprobación e integración.`

## Licencia

Todos los derechos reservados por Universidad del Valle de México.

---

**¡Bienvenido al equipo de desarrollo de Dashboard Ruta Lince!** 