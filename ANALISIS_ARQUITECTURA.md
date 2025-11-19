# Análisis de Arquitectura: Medisalud

Este documento detalla la arquitectura, tecnologías y estructura del proyecto Medisalud.

## 1. Tecnologías Utilizadas

El proyecto se divide en tres componentes principales (backend, frontend, admin), cada uno con su propio conjunto de tecnologías.

### Backend (Node.js)

- **Entorno de ejecución:** Node.js
- **Framework web:** Express.js
- **Base de datos:** MongoDB con el ODM Mongoose
- **Autenticación:** JSON Web Tokens (jsonwebtoken) y `bcrypt` para el hash de contraseñas
- **Gestión de archivos:** Multer para la subida de archivos y Cloudinary para el almacenamiento en la nube
- **Variables de entorno:** `dotenv`
- **Utilidades:**
  - `cors` para la gestión de Cross-Origin Resource Sharing
  - `nodemon` para el reinicio automático en desarrollo
  - `validator` para la validación de datos

### Frontend & Admin (React)

Ambas aplicaciones cliente comparten la misma base tecnológica:

- **Framework de UI:** React
- **Bundler y servidor de desarrollo:** Vite
- **Enrutamiento:** React Router (`react-router-dom`)
- **Cliente HTTP:** Axios para las peticiones a la API
- **Estilos:** Tailwind CSS
- **Notificaciones:** `react-toastify`
- **Herramientas de desarrollo:**
  - ESLint para el linting de código

## 2. Estructura de la Arquitectura

El proyecto utiliza una **arquitectura de monorepo**, donde tres subproyectos coexisten en el mismo repositorio. La arquitectura general es de tipo **Cliente-Servidor**.

```
medisalud/
│
├── admin/            # Aplicación React para Administradores y Doctores
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/  # Contexto para el estado del Admin/Doctor
│       └── pages/    # Páginas específicas del panel de admin/doctor
│
├── backend/          # Servidor Node.js (API REST)
│   ├── config/       # Conexión a BD y servicios (Cloudinary)
│   ├── controllers/  # Lógica de negocio de la aplicación
│   ├── middlewares/  # Middlewares para autenticación y subida de archivos
│   ├── models/       # Modelos de datos para Mongoose
│   └── routes/       # Definición de las rutas de la API por rol
│
└── frontend/         # Aplicación React para Usuarios/Pacientes
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── context/  # Contexto para el estado del usuario
        └── pages/    # Páginas para el usuario final (home, doctores, etc.)
```

## 3. Diagrama de Arquitectura

El siguiente diagrama ilustra la interacción entre los diferentes componentes del sistema:

```mermaid
graph TD
    subgraph "Navegador del Usuario"
        A[Frontend (React SPA)]
        B[Admin Panel (React SPA)]
    end

    subgraph "Servidor"
        C{Backend (Node.js/Express API)}
    end

    subgraph "Base de Datos"
        D[(MongoDB)]
    end
    
    subgraph "Servicios Externos"
        E[(Cloudinary)]
    end

    A -- Peticiones HTTP/S (API REST) --> C
    B -- Peticiones HTTP/S (API REST) --> C
    C -- Lee/Escribe --> D
    C -- Almacena Imágenes --> E
```
