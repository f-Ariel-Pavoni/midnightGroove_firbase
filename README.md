MidnightGroove

## Descripción

**MidnightGroove** es una aplicación web desarrollada con React que simula un catálogo de discos de jazz en vinilo. Este proyecto es la evolución de la tarea de enrutamiento. Actualmente comprende todos los temas tratados en la cursada, los mismos se detallan en este documento. 

### Para las tareas 1 y 2 del módulo 3 (Integración con Firebase)

Durante la evolución del proyecto se realizó una migración desde una fuente de datos local basada en archivos JSON hacia una arquitectura utilizando servicios de Firebase.

Inicialmente el catálogo de discos se encontraba almacenado en un archivo `discos.json` dentro de la carpeta pública del proyecto. Esta estructura permitía simular una API mediante la carga de datos locales, pero presentaba limitaciones al momento de implementar operaciones administrativas y persistencia real de información.

Para solucionar esto se creó un proyecto en Firebase y se configuró **Cloud Firestore** como base de datos NoSQL. Dentro de Firestore se creó la colección `discos`, donde cada documento representa un álbum del catálogo. La información almacenada incluye datos como título, artista, año, género, sello discográfico, descripción, precio, portada y estado del registro.

La comunicación con Firestore fue encapsulada dentro de la carpeta `services/`, evitando que los componentes de React tengan conocimiento directo de la implementación de la base de datos. Para esto se utilizaron los métodos proporcionados por el SDK de Firebase:

- `collection()` para obtener referencias a las colecciones de Firestore.
- `getDocs()` para recuperar múltiples documentos.
- `query()` y `where()` para realizar consultas filtradas.
- `doc()` para trabajar con documentos específicos.
- `addDoc()` para crear nuevos registros.
- `updateDoc()` para modificar información existente.
- `deleteDoc()` para eliminar documentos.

A partir de esta implementación se construyeron los servicios necesarios para gestionar el catálogo, permitiendo realizar operaciones CRUD desde el panel administrativo.

Además, se desarrolló una herramienta auxiliar utilizando Node.js (`tools/importarDiscos.js`) que permite cargar inicialmente los datos desde el archivo JSON hacia Firestore. Esta herramienta contempla dos modos de funcionamiento: una carga completa mediante la eliminación y recreación de la colección, y una carga incremental que compara los identificadores existentes antes de insertar nuevos registros.

Para la autenticación del panel administrativo se implementó **Firebase Authentication**, reemplazando la autenticación simulada utilizada durante las primeras etapas del proyecto. Se configuró el proveedor de autenticación mediante correo electrónico y contraseña, utilizando el método `signInWithEmailAndPassword()` del SDK de Firebase.

La lógica de autenticación fue separada mediante un servicio (`authService.js`) y un hook personalizado (`useAuth.js`). El servicio se encarga de comunicarse con Firebase, mientras que el hook administra el estado del usuario autenticado, errores y acciones disponibles para los componentes.

El acceso al Dashboard administrativo fue protegido mediante rutas privadas, verificando la existencia de un usuario autenticado antes de permitir la navegación. En caso contrario, el usuario es redirigido al Login conservando la ruta original para poder continuar luego de autenticarse correctamente.



---

## Demo

Podés ver la aplicación funcionando en Netlify:

[midnightGroove](https://midnightgroove.netlify.app/)

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- React Hook Form
- Zod
- Firebase Authentication
- Cloud Firestore
- Bootstrap 5
- React Icons
- CSS3

---

## Hooks utilizados

- **useState**
  - Manejo del estado de los formularios y componentes interactivos.

- **useParams**
  - Obtención del identificador del disco desde la URL para mostrar la información detallada de cada disco.

- **useEffect**
  - Utilizado para ejecutar cargas asíncronas de datos al montar componentes, como la obtención del catálogo y el detalle de cada disco mediante servicios.

- **useSearchParams**
  - Administración del filtro por género mediante parámetros de consulta en la URL, permitiendo compartir enlaces y conservar el estado del filtro al recargar la página.

- **useNavigate**
  - Se utilizó el hook `useNavigate` para implementar la navegación programática. El botón **"Ingresar"** del componente **AccesoAdmin** redirige al usuario a la pantalla de **Login** sin necesidad de utilizar un enlace (`<Link>`).

- **useLocation**
  - Para conservar la ruta de origen al redirigir un usuario no autenticado al Login.

---

## Estructura del proyecto

```text
src/
├── components/      # Componentes reutilizables de interfaz
├── hooks/           # Hooks personalizados para lógica de estado y datos
├── layouts/         # Estructuras compartidas de páginas
├── pages/           # Vistas principales de la aplicación
├── schemas/         # Validaciones con Zod
├── services/        # Lógica de acceso a Firebase y operaciones CRUD
├── firebase/        # Configuración de Firebase
├── App.jsx
└── main.jsx

tools/
└── importarDiscos.js # Script para carga inicial de datos en Firestore

public/
├── img/             # Recursos estáticos
└── data/            # Datos utilizados para importación inicial
```

---

## Criterios de diseño y arquitectura

### Arquitectura basada en componentes

La aplicación fue desarrollada utilizando componentes reutilizables, buscando mantener una clara separación de responsabilidades y facilitar el mantenimiento del código.

### Separación entre páginas y componentes

Las vistas principales fueron organizadas dentro de la carpeta **pages**, mientras que los elementos reutilizables de la interfaz se ubicaron en **components**.

### Layout compartido

Se implementó un **MainLayout** que contiene el `Navbar`, el `Footer` y un `<Outlet />` de React Router. Esta estructura evita repetir código entre páginas y permite utilizar rutas anidadas para renderizar el contenido correspondiente a cada ruta.

### Integración con Firebase Firestore

La aplicación utiliza **Cloud Firestore** como base de datos para almacenar y consultar el catálogo de discos.

La lógica de acceso a datos se encuentra centralizada en la carpeta **services/**, desacoplando la interfaz de usuario de la implementación de la base de datos.

Actualmente se implementan servicios como:

- `getDiscos()`
- `getDiscoById()`
- `getGeneros()`
- `authenticate()`

El archivo `public/data/discos.json` ya no es utilizado por la aplicación durante su funcionamiento. Se conserva únicamente como fuente de datos para la herramienta de importación inicial (`tools/importarDiscos.js`), que permite poblar la colección `discos` de Firestore.

### Autenticación con Firebase

La aplicación utiliza **Firebase Authentication** para gestionar el acceso al panel administrativo.

La lógica de autenticación se encuentra separada en la carpeta `services/`, desacoplando la interfaz de usuario del proveedor de autenticación.

Actualmente se implementa:

- `authService.js`
  - Centraliza las operaciones de autenticación.
  - Gestiona el inicio de sesión mediante Firebase Authentication.

- `useAuth.js`
  - Hook personalizado que encapsula la lógica de autenticación.
  - Maneja el usuario autenticado, el proceso de login y los errores asociados.

Las rutas administrativas se encuentran protegidas mediante un componente de ruta protegida, que valida la existencia de un usuario autenticado antes de permitir el acceso al Dashboard.


## Tools

El proyecto incluye herramientas auxiliares para administrar la carga inicial de datos en Firestore.

### Importación de discos

La herramienta `tools/importarDiscos.js` permite cargar los datos del catálogo desde el archivo:

```text
public/data/discos.json
```

Los datos son procesados mediante Node.js y enviados a la colección `discos` de Firestore.

### Carga inicial completa

Para eliminar la colección existente y volver a cargar todos los discos:

```bash
node tools/importarDiscos.js --reset
```

Este modo:

1. Elimina todos los documentos existentes de la colección `discos`.
2. Lee nuevamente el archivo `discos.json`.
3. Inserta todos los registros desde cero.

### Carga incremental

Sin argumentos, la herramienta verifica los discos existentes antes de insertar nuevos registros:

```bash
node tools/importarDiscos.js
```

Este modo:

1. Obtiene los documentos actuales de Firestore.
2. Compara los IDs existentes con los datos del JSON.
3. Solo agrega los discos que aún no existen en la colección.

### Ubicación

```text
tools/
└── importarDiscos.js
```

> **Nota:** Para ejecutar esta herramienta es necesario tener configuradas las variables de entorno de Firebase en el archivo `.env`.

### Generación dinámica del filtro

Las opciones del filtro por género no fueron escritas manualmente. Se generan dinámicamente a partir del catálogo mediante la función `getGeneros()`, evitando duplicar información y manteniendo sincronizada la interfaz con los datos disponibles.

### Navegación

La aplicación implementa distintas funcionalidades de React Router:

- Rutas públicas.
- Rutas dinámicas mediante `useParams`.
- Parámetros de búsqueda con `useSearchParams`.
- Rutas protegidas mediante autenticación simulada. El acceso al **Dashboard** se encuentra protegido. Si un usuario intenta acceder sin haberse autenticado, es redirigido automáticamente a la pantalla de **Login** y se muestra un modal con el mensaje, conservando la ruta de origen mediante `useLocation`. Una vez que la autenticación es exitosa, la información del usuario se almacena en `localStorage`, permitiendo mantener la sesión iniciada y acceder posteriormente al Dashboard desde el menú de navegación.
- Ruta para páginas inexistentes (404). Cuando se accede a un id de disco inexiste se muestra un not found.
- Layout compartido utilizando rutas anidadas y `<Outlet />`.

## Rutas principales

| Ruta         | Descripción                  |
| ------------ | ---------------------------- |
| `/`          | Página principal             |
| `/nosotros`  | Información del proyecto     |
| `/contacto`  | Formulario de contacto       |
| `/disco/:id` | Detalle dinámico de un disco |
| `/login`     | Acceso administrativo        |
| `/dashboard` | Panel protegido              |

### Diseño de la interfaz

Bootstrap fue utilizado como base para construir una interfaz responsive, complementándose con estilos CSS personalizados para lograr una identidad visual inspirada en un catálogo de jazz, priorizando la simplicidad, la legibilidad y la accesibilidad.

---

## Cómo ejecutar el proyecto

Clonar el repositorio:

```bash
git clone [https://github.com/f-Ariel-Pavoni/curso-react-js-tp7-enrutamiento](https://github.com/f-Ariel-Pavoni/midnightGroove_firbase)
```

Ingresar al directorio del proyecto:

```bash
cd REPOSITORIO
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173/
```

---

## Capturas de pantalla

### Página de inicio

![Página de inicio](./src/assets/img/pagina_inicio.png)

### Detalle de un disco

![Detalle de un disco](./src/assets/img/pagina_disco.png)

### Pantalla de login

![Pantalla de login](./src/assets/img/pagina_login.png)

### Dashboard protegido

![Dashboard protegido](./src/assets/img/pagina_protegida.png)

### Dashboard accesible

![Dashboard accesible](./src/assets/img/pagina_protegida_autenticado.png)

---

## Autor

**Ariel Pavoni**

Proyecto desarrollado como trabajo práctico para la **Diplomatura Full Stack - UTN Learning**.
