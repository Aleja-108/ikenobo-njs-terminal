# 🌸 IKENOBO – Administrador de Productos  
Panel administrativo para gestionar productos de la marca IKENOBO.  
Incluye autenticación JWT, CRUD de productos y base de datos en Firebase Firestore.

---

## 🚀 Tecnologías utilizadas

### **Frontend**
- HTML5 + CSS3
- Bootstrap 5.3
- JavaScript Vanilla (Fetch API)
- Deploy recomendado: Vercel

### **Backend**
- Node.js + Express
- CORS configurado
- Middleware de autenticación JWT
- Rutas modularizadas (Auth / Products)
- Deploy recomendado: Render o Railway

### **Base de datos**
- Firebase Firestore
  - IDs autogenerados
  - Operaciones CRUD completas

---

## 🔐 Autenticación con JWT

El sistema incluye un inicio de sesión administrativo:
email:"test@gmail.com" - password:"123456"
lo que genera un **token JWT**.  
Ese token es requerido para crear o eliminar productos.

### **Rutas públicas**
- `POST /api/login`
- `GET /api/products`
- `GET /api/products/:id`

### **Rutas protegidas**
- `POST /api/products/create`
- `DELETE /api/products/:id`
- `PUT /api/products/:id` (para futura edición)


## 📦 Funcionalidades principales

### ✔ Autenticación JWT  
- Inicio y cierre de sesión
- Header automático `Authorization: Bearer <token>`
- Token visible en el panel

### ✔ Gestión de productos  
- Crear productos (nombre, precio, descripción)  
- Listar productos  
- Buscar producto por ID  
- Eliminar producto  
- IDs generados automáticamente por Firestore

### ✔ Pronto:
- Edición de productos  
- Soporte para subir imágenes  
- Vista pública del catálogo  

---

## 🔐 Rutas de la API

### **Públicas**
| Método | Ruta | Descripción |
|--------|-------|-------------|
| POST | `/api/login` | Inicia sesión y devuelve token |
| GET | `/api/products` | Lista todos los productos |
| GET | `/api/products/:id` | Obtiene un producto por ID |

### **Protegidas (requieren JWT)**
| Método | Ruta | Descripción |
|--------|-------|-------------|
| POST | `/api/products/create` | Crea un nuevo producto |
| DELETE | `/api/products/:id` | Elimina un producto |
| PUT | `/api/products/:id` | Edita un producto (backend listo) |

Ejemplo del header de autorización:

```json
Authorization: Bearer <token>

## 🧪 Estado actual del proyecto

| Funcionalidad | Estado |
|--------------|--------|
| Login con JWT | ✔ Completo |
| Crear producto | ✔ Completo |
| Listar productos | ✔ Completo |
| Buscar por ID | ✔ Completo |
| Eliminar producto | ✔ Completo |
| Editar producto | ➖ Backend listo, falta UI |
| Imagen opcional | ➖ Pendiente |
| Vista pública de catálogo | ➖ Pendiente |

---

## 📌 Próximas mejoras sugeridas
- Upload de imágenes a Firebase Storage  
- Vista previa del producto  
- Diseño responsive avanzado  
- Paginación y filtros  
- Dashboard con estadísticas  

---

## 
Desarrollado por **Alejandra Esteo**  
Diseño UX/UI · Frontend · Backend · Documentación