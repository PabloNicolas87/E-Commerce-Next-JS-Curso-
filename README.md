# E-Commerce App - Next.js

Este proyecto es una aplicación de comercio electrónico construida con **Next.js**, utilizando **Firebase** para la gestión de datos y almacenamiento de imágenes. Los usuarios pueden ver detalles de productos, agregar productos al carrito y navegar por la galería de imágenes de los productos.

## 🚀 Enlace de Despliegue

Puedes ver la aplicación en funcionamiento en el siguiente enlace:

https://e-commerce-next-js-curso.vercel.app

## 📋 Características

- Listado de productos con imágenes.
- Vista detallada de productos con información como título, descripción, categoría y precio.
- Añadir productos al carrito de compras.
- Integración con Firebase Firestore para gestionar los datos de los productos.
- Carga dinámica de imágenes desde Firebase Storage.
- Responsive y optimizada para dispositivos móviles.
- SEO dinámico para cada producto usando metadata generada con Next.js.

## 🛠️ Tecnologías Utilizadas

- **Next.js**: Framework de React para SSR y SSG.
- **Firebase Firestore**: Base de datos NoSQL en tiempo real para almacenar productos.
- **Firebase Storage**: Almacenamiento de imágenes.
- **Tailwind CSS**: Framework CSS para estilos rápidos y personalizables.
- **Swiper**: Biblioteca para implementar un carrusel de imágenes interactivo.

## 🚀 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/e-commerce-next-js.git
   
2. Navega al directorio del proyecto:

   ```bash
   cd e-commerce-next-js

3. Instala las dependencias:

   ```bash
   npm install

4. Crea un archivo .env.local en la raíz del proyecto y configura tus credenciales de Firebase:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev

6. Abre tu navegador y navega a http://localhost:3000.
   
📝 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
