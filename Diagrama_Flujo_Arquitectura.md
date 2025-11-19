# Diagrama de Flujo y Arquitectura Detallada: Medisalud

Este documento contiene un diagrama de secuencia que detalla el funcionamiento interno y las interacciones entre los componentes de la arquitectura de Medisalud para diferentes flujos de usuario.

## Diagrama de Secuencia

```mermaid
sequenceDiagram
    participant Usuario as Usuario
    participant Navegador as Navegador
    participant Frontend as Frontend (React SPA)
    participant Backend as Backend (Node.js API)
    participant JWT as Middleware JWT
    participant Controller as Controller (Lógica de Negocio)
    participant MongoDB as Base de Datos (MongoDB)
    participant Cloudinary as Almacenamiento de Archivos

    %% --- Flujo 1: Registro de Nuevo Usuario --- %%

    autonumber
    Usuario->>Navegador: Rellena formulario de registro y envía
    Navegador->>Frontend: Captura datos del formulario (nombre, email, etc.)
    Frontend->>Backend: POST /api/user/register (con datos de usuario)
    
    Backend->>Controller: Llama a la función de registro en el controlador de usuario
    Controller->>MongoDB: Comprueba si el email ya existe para evitar duplicados
    
    alt El email no existe
        Controller->>Controller: Hashea la contraseña usando bcrypt
        opt Si se subió una imagen de perfil
            Controller->>Cloudinary: Sube el archivo de imagen
            Cloudinary-->>Controller: Devuelve la URL segura de la imagen
        end
        Controller->>MongoDB: Crea un nuevo documento de usuario en la colección
        MongoDB-->>Controller: Confirma la creación del usuario
        Controller-->>Backend: Responde que el usuario fue creado exitosamente
        Backend-->>Frontend: HTTP 201 Created (con datos del nuevo usuario)
    else El email ya existe
        Controller-->>Backend: Responde con un error de conflicto
        Backend-->>Frontend: HTTP 409 Conflict (Error: "El usuario ya existe")
    end
    
    Frontend->>Navegador: Muestra mensaje de éxito o error al usuario
    Navegador->>Usuario: Visualiza el resultado de su registro

    %% --- Flujo 2: Login de Usuario --- %%

    autonumber
    Usuario->>Navegador: Ingresa email y contraseña para iniciar sesión
    Navegador->>Frontend: Captura las credenciales
    Frontend->>Backend: POST /api/user/login (con email y password)
    
    Backend->>Controller: Llama a la función de login en el controlador
    Controller->>MongoDB: Busca al usuario por su dirección de email
    
    alt Usuario encontrado en la BD
        Controller->>Controller: Compara la contraseña ingresada con el hash almacenado (bcrypt.compare)
        alt Contraseña correcta
            Controller->>Controller: Genera un JSON Web Token (JWT) con el ID y rol del usuario
            Note right of Controller: El token tiene una firma digital y un tiempo de expiración.
            Controller-->>Backend: Login exitoso, devuelve el token generado
            Backend-->>Frontend: HTTP 200 OK { success: true, token: "jwt_token" }
            Frontend->>Navegador: Almacena el token de forma segura (ej. localStorage) y redirige al área de usuario
        else Contraseña incorrecta
            Controller-->>Backend: Error de credenciales inválidas
            Backend-->>Frontend: HTTP 401 Unauthorized (Error: "Credenciales incorrectas")
        end
    else Usuario no encontrado
        Controller-->>Backend: Error de credenciales inválidas
        Backend-->>Frontend: HTTP 401 Unauthorized (Error: "Credenciales incorrectas")
    end
    
    Frontend->>Navegador: Muestra el resultado del intento de login
    Navegador->>Usuario: Accede a la plataforma o ve un mensaje de error

    %% --- Flujo 3: Agendar una Cita (Acción Autenticada) --- %%

    autonumber
    Usuario->>Navegador: Selecciona un doctor, fecha/hora y confirma la cita
    Navegador->>Frontend: Prepara los datos de la nueva cita
    Note left of Frontend: Adjunta el token JWT guardado en la cabecera de la petición:<br/>Authorization: Bearer jwt_token
    Frontend->>Backend: POST /api/user/book-appointment (con datos de la cita y token)
    
    Backend->>JWT: El middleware de autenticación intercepta la petición
    JWT->>JWT: Verifica la firma y la fecha de expiración del token
    
    alt Token válido y verificado
        JWT->>Backend: El token es válido. Extrae los datos del usuario (ID, rol) y los añade al objeto de la petición (req.user)
        Backend->>Controller: Llama a la función de crear cita en el controlador
        Controller->>MongoDB: Crea el nuevo documento de cita, asociándolo al ID del usuario y del doctor
        MongoDB-->>Controller: Confirma la creación de la cita
        Controller-->>Backend: Responde que la cita fue creada exitosamente
        Backend-->>Frontend: HTTP 201 Created { message: "Cita agendada correctamente" }
    else Token inválido o expirado
        JWT-->>Backend: Error de autenticación
        Backend-->>Frontend: HTTP 401 Unauthorized { message: "Acceso denegado. Por favor, inicie sesión de nuevo." }
    end
    
    Frontend->>Navegador: Muestra la confirmación de la cita o un mensaje de error
    Navegador->>Usuario: Visualiza el resultado
```

---

## Diagramas de Arquitectura de Componentes

A continuación se presentan los diagramas de flujo que describen la arquitectura interna de cada uno de los tres componentes principales de Medisalud.

### 1. Arquitectura del Frontend (Portal del Paciente)

Este diagrama muestra la relación entre las páginas, los componentes principales y el contexto de estado en la aplicación React del cliente.

```mermaid
graph TD
    subgraph "Frontend (Portal del Paciente)"
        direction LR
        
        subgraph "Estado Global"
            AppContext["AppContext (Gestión de Autenticación y Datos Globales)"]
        end

        subgraph "Layout y Componentes Compartidos"
            Navbar["Navbar (Navegación Principal)"]
            Footer["Footer"]
        end

        subgraph "Páginas Públicas"
            Home["Página de Inicio"]
            Login["Página de Login"]
            Doctors["Página de Doctores (Listado)"]
            About["Página Sobre Nosotros"]
            Contact["Página de Contacto"]
        end

        subgraph "Páginas Privadas (Requieren Autenticación)"
            MyProfile["Mi Perfil"]
            MyAppointments["Mis Citas"]
            Appointment["Página para Agendar Cita"]
        end

        Home --> Doctors
        Home --> Login
        
        Navbar --> Home
        Navbar --> Doctors
        Navbar --> About
        Navbar --> Contact
        Navbar --> MyProfile

        Doctors --> Appointment
        
        Login -- "Almacena Token y Actualiza Estado" --> AppContext
        AppContext -- "Provee Estado (ej. isAuth) a" --> Navbar
        AppContext -- "Habilita Acceso a" --> MyProfile
        AppContext -- "Habilita Acceso a" --> MyAppointments
        
        classDef private fill:#f9f,stroke:#333,stroke-width:2px;
        class MyProfile,MyAppointments,Appointment private;
    end
```

### 2. Arquitectura del Admin (Portal de Administración)

Este diagrama ilustra la estructura del panel de administración, utilizado tanto por administradores como por doctores, mostrando sus diferentes secciones y componentes.

```mermaid
graph TD
    subgraph "Admin (Portal de Administración y Doctores)"
        direction LR

        subgraph "Contexto de Estado"
            AdminContext["AdminContext (Datos de Admin)"]
            DoctorContext["DoctorContext (Datos de Doctor)"]
        end

        subgraph "Layout Principal"
            Sidebar["Sidebar (Menú Lateral)"]
            NavbarAdmin[Navbar]
        end

        subgraph "Páginas de Rol: Administrador"
            AdminDashboard["Dashboard General"]
            DoctorsList["Gestión de Doctores"]
            AddDoctor["Añadir/Editar Doctor"]
            PatientsList["Lista de Pacientes"]
            AllApointments["Todas las Citas del Sistema"]
        end

        subgraph "Páginas de Rol: Doctor"
            DoctorDashboard["Dashboard del Doctor"]
            DoctorAppointments["Mis Citas Agendadas"]
            DoctorProfile["Mi Perfil Profesional"]
        end

        LoginPage[Página de Login] -- "Rol Admin" --> AdminDashboard
        LoginPage -- "Rol Doctor" --> DoctorDashboard

        AdminDashboard -- "Renderiza" --> Sidebar & NavbarAdmin
        DoctorDashboard -- "Renderiza" --> Sidebar & NavbarAdmin

        Sidebar --> AdminDashboard
        Sidebar --> DoctorsList
        Sidebar --> PatientsList
        Sidebar --> AllApointments
        Sidebar --> DoctorAppointments
        Sidebar --> DoctorProfile
        
        DoctorsList --> AddDoctor
        
        classDef admin fill:#d4f1f4,stroke:#333,stroke-width:2px;
        classDef doctor fill:#fdebd0,stroke:#333,stroke-width:2px;
        class AdminDashboard,DoctorsList,AddDoctor,PatientsList,AllApointments admin;
        class DoctorDashboard,DoctorAppointments,DoctorProfile doctor;
    end
```

### 3. Arquitectura del Backend (API REST)

Este diagrama de flujo muestra el ciclo de vida de una petición HTTP a través de las diferentes capas de la API del backend.

```mermaid
graph TD
    subgraph "Backend (API REST)"
        HTTPRequest["Petición HTTP Entrante"] --> Router

        subgraph "Capa de Enrutamiento"
            Router{Router Principal}
            Router -- "/api/user/**" --> UserRoutes[Rutas de Usuario]
            Router -- "/api/admin/**" --> AdminRoutes[Rutas de Admin]
            Router -- "/api/doctor/**" --> DoctorRoutes[Rutas de Doctor]
        end

        subgraph "Capa de Middlewares"
            Middleware["Middleware(s)"]
            UserRoutes --> Middleware
            AdminRoutes --> Middleware
            DoctorRoutes --> Middleware
        end
        
        Middleware -- "Verificación (Auth JWT, Multer, etc.)" --> Controller

        subgraph "Capa de Controladores (Lógica de Negocio)"
            Controller["Controller"]
            Controller --> Model
            Controller --> CloudinaryService["Servicio Externo (Cloudinary)"]
        end

        subgraph "Capa de Modelos y Datos"
            Model["Model (Mongoose)"] --> MongoDB["Base de Datos MongoDB"]
        end
        
        CloudinaryService --> Cloudinary[(API Externa de Cloudinary)]

        Controller --> HTTPResponse["Respuesta HTTP Saliente"]
    end
```
