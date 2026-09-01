# ASUS Smart Devices

ASUS Smart Devices es un proyecto web desarrollado para consultar diferentes computadores ASUS y encontrar información básica sobre cada equipo.

La idea principal del proyecto es tener un catálogo sencillo donde se puedan visualizar los dispositivos disponibles, realizar búsquedas, aplicar filtros y consultar el detalle de cada computador.

## Funcionalidades

Actualmente el proyecto permite:

* Visualizar un catálogo de computadores ASUS.
* Consultar los equipos organizados desde la base de datos.
* Buscar computadores por nombre o modelo.
* Filtrar los equipos por categoría.
* Consultar el detalle de un dispositivo.
* Visualizar información como modelo, descripción, precio y fecha de lanzamiento.
* Consultar los comentarios realizados sobre un dispositivo.
* Agregar una opinión y una calificación de 1 a 5 estrellas.

## Tecnologías utilizadas

Para el desarrollo utilicé:

**Frontend**

* React
* Vite
* CSS

**Backend**

* Node.js
* Express

**Base de datos**

* SQLite
* better-sqlite3

## Organización del proyecto

El proyecto está dividido principalmente en dos partes:

```text
asus-smart-devices/
├── backend/
├── frontend/
├── docs/
└── README.md
```

El **frontend** contiene la interfaz que utiliza el usuario para navegar por el catálogo.

El **backend** se encarga de recibir las solicitudes, consultar la base de datos y devolver la información al frontend.

La carpeta **docs** contiene documentación adicional del proyecto, como el Modelo Entidad-Relación de la base de datos.

## Arquitectura

Para organizar el backend utilicé una arquitectura por capas.

El flujo principal es:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Base de datos
```

Esto permite separar las responsabilidades y mantener el código más organizado.

## Base de datos

La base de datos almacena la información relacionada con los computadores ASUS y los datos necesarios para el funcionamiento del proyecto.

Las principales entidades son:

* Brands
* Devices
* Specifications
* Users
* Comments
* Images

El diseño de las tablas y sus relaciones se encuentra representado en el Modelo Entidad-Relación ubicado en:

```text
docs/modelo-entidad-relacion.png
```

## Ejecutar el proyecto

### Backend

Desde una terminal:

```bash
cd backend
npm install
npm start
```

El backend se ejecuta en:

```text
http://localhost:3001
```

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend se puede abrir desde:

```text
http://localhost:5173
```

Para utilizar correctamente el proyecto deben estar ejecutándose tanto el frontend como el backend.

## API

Algunos de los endpoints utilizados son:

```text
GET /api/devices
GET /api/devices/:id
GET /api/comments/:deviceId
POST /api/comments/:deviceId
```

También es posible realizar búsquedas y filtros sobre el listado de dispositivos.

Por ejemplo:

```text
GET /api/devices?search=vivobook
GET /api/devices?category=Portátil
```

## Diseño

Para la interfaz elegí una estética inspirada en los equipos ASUS orientados a gaming, utilizando fondos oscuros y detalles en tonos violeta y magenta.

El objetivo fue mantener el catálogo sencillo de utilizar, pero darle una identidad visual relacionada con el tipo de productos mostrados.

## Estado del proyecto

El proyecto cuenta con las funciones principales de consulta, búsqueda, filtros, detalle y comentarios conectadas a la base de datos.

Como posibles mejoras futuras se podrían agregar funciones como administración completa de dispositivos, autenticación de usuarios y gestión de imágenes desde el sistema.
