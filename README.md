# Orders Demo App (Frontend)

Aplicación frontend desarrollada en **React + TypeScript** bajo la arquitectura **Atomic Design**, con un enfoque modular, escalable y mantenible.  
Su propósito es gestionar órdenes, formularios y flujos de interacción de manera eficiente y organizada.

---

## Tecnologías Principales

- **React 19** — Librería principal para la interfaz.
- **Vite** — Bundler ultrarrápido para desarrollo y build.
- **TypeScript** — Tipado estático para mayor robustez.
- **TailwindCSS 4** — Framework CSS para estilos utilitarios.
- **React Hook Form + Zod** — Manejo y validación de formularios.
- **Radix UI + Lucide Icons** — Componentes accesibles y personalizables.

---

## Instalación y ejecución.

Instalar dependencias con `npm install` y ejecutar el proyecto con `npm run dev`

---

## Estructura del Proyecto

La estructura sigue el principio de **Atomic Design**, dividiendo los componentes por nivel de abstracción:

---

## Scripts Disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el servidor de desarrollo con Vite |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build localmente |
| `npm run lint` | Ejecuta ESLint para verificar el código |

---

## Configuración y Dependencias

### Dependencias principales:
- `react`, `react-dom`
- `react-hook-form`
- `zod`
- `react-router`
- `tailwindcss`, `@tailwindcss/vite`
- `lucide-react`
- `@radix-ui/react-*`

### Dependencias de desarrollo:
- `vite`, `@vitejs/plugin-react`
- `typescript`, `eslint`, `prettier`
- `typescript-eslint`
- `tw-animate-css`

---

## Validación de Formularios

El proyecto utiliza **React Hook Form** junto con **Zod** para:
- Validaciones basadas en esquemas.
- Tipado automático de formularios.
- Manejo limpio de errores y estados de validación.

---

## Convenciones de Nomenclatura
Componentes: PascalCase → OrderCard.tsx

Funciones y hooks: camelCase → useFetchOrders.ts

Carpetas: kebab-case → order-details/

Constantes: UPPER_CASE → ORDER_STATUSES

## Atomic Design Layers
Nivel	Descripción
Atoms	Componentes base e independientes (Button, Input)
Molecules	Combinación de atoms (SearchBar, FormField)
Organisms	Bloques completos reutilizables (OrderForm, Header)
Templates	Estructuras de página (DashboardTemplate)
Pages	Pantallas completas (Home, OrdersPage)

## Enrutamiento
Las rutas se gestionan con React Router v7, centralizadas en src/router.

## Autor
Orders Demo App Desarrollado por Josue Valbuena. Proyecto educativo y de demostración con Node.js + TypeScript.