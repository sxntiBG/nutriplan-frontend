# Nutriplan

Nutriplan es un proyecto desarrollado en **Angular**, **Spring Boot** y **Tailwind CSS**. Analiza tus datos y crea un plan balanceado para ti en segundos.

Este repositorio corresponde al **frontend**.

---

## 🔗 Repositorios del Proyecto

| Parte    | Repositorio                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- |
| Backend  | [https://github.com/sxntiBG/nutriplan-backend](https://github.com/sxntiBG/nutriplan-backend)   |
| Frontend | [https://github.com/sxntiBG/nutriplan-frontend](https://github.com/sxntiBG/nutriplan-frontend) |

---

## ✅ Requisitos previos

Asegúrate de tener instalado en tu equipo:

| Herramienta              | Descripción                                             |
| ------------------------ | ------------------------------------------------------- |
| **Git**                  | Para clonar el repositorio                              |
| **Node.js (v18 o sup.)** | Necesario para ejecutar Angular                         |
| **Angular CLI**          | Framework CLI para crear y correr la aplicación         |
| **Editor de código**     | VS Code                        |
| **Backend activo**       | Asegúrate de que el backend de Nutriplan esté corriendo |

---

## 📥 Clonar el proyecto

```bash
git clone https://github.com/sxntiBG/nutriplan-frontend.git
```

Entrar a la carpeta del proyecto:

```bash
cd nutriplan-frontend
```

---

## 🔧 Instalación y ejecución

Instala las dependencias necesarias con:

```bash
npm install
```

Luego, inicia el servidor de desarrollo con:

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200/
```

---

## 🎨 Estilos con Tailwind CSS

Este proyecto utiliza **Tailwind CSS** para los estilos. Si deseas personalizar el diseño, puedes editar el archivo de configuración:

```
tailwind.config.js
```

Ejemplo de clase utilizada:

```html
<button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl">
  Crear Plan
</button>
```

---

## 🔐 Configuración del archivo de entorno

Este proyecto utiliza archivos de entorno de Angular para definir la **URL del backend** y otras configuraciones.

Para desarrollo, revisa el archivo `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

---

## 🚀 Compilación para producción

Para generar la versión lista para despliegue:

```bash
ng build --configuration production
```

Los archivos compilados estarán en la carpeta `dist/`.

---

## 🎉 Listo

Con esto deberías poder ejecutar y visualizar el frontend correctamente.
Si necesitas ayuda o deseas extender el proyecto, abre un **issue** o comunícate con el equipo de desarrollo.
