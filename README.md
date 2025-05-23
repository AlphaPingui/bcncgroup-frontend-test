# ITX Mobile Shop (Front-End Test)

Este proyecto es una prueba técnica realizada para una posición de FullStack Developer. La aplicación simula una pequeña tienda de dispositivos móviles, permitiendo visualizar productos, consultar detalles, y añadirlos a una cesta de compra.

> Esta prueba se ha realizado en Angular.

___

## Arquitectura

El proyecto sigue una arquitectura hexagonal adaptada al frontend, separando claramente la lógica de negocio, la infraestructura de acceso a datos, los casos de uso y la interfaz de usuario. Este enfoque busca facilitar la escalabilidad, mantenibilidad y testabilidad del código.

- `/app /core`: Servicios globales, guards, interceptores
- `/domain`: Modelos y lógica de negocio (entidades)
- `/application`: Casos de uso
- `/infrastructure`: Servicios para APIs, almacenamiento local
- `/ui`: Componentes reutilizables (Header, Search...)
- `/pages`: Vistas principales (Listado, Detalles)
- `/shared`: Pipes, directivas, utilidades

___

## Scripts disponibles

```bash
npm start        # Modo desarrollo
npm run build    # Compilación para producción
npm run test     # Ejecutar tests
npm run lint     # Linter y comprobación de estilo
```
___

## Tecnologías utilizadas

- Angular 19+
- RxJS
- Angular Router
- SCSS
- LocalStorage API (con expiración)
- Arquitectura  Hexagonal
- Git y Conventional Commits
- Testing con Jasmine y Karma

___

## Como ejecutar el proyecto

1. Clonar este repositorio

2. Instalar dependencias: `npm install`

3. Levantar el entorno de desarrollo: `npm start`

___

## Flujo de trabajo con Git

Este proyecto sigue el modelo de ramas basado en Git Flow:

- `main`: contiene el código estable y listo para producción.
- `develop`: rama de integración donde se agrupan todas las funcionalidades antes de ser lanzadas.
- `feature/*`: ramas para el desarrollo de nuevas funcionalidades.
- `fix/*`: ramas para corregir errores puntuales.
- `release/*`: ramas para preparar versiones de producción.
- `hotfix/*`: ramas para arreglos urgentes en producción.

Cada nueva funcionalidad se desarrollará en su propia rama `feature/nombre-de-la-funcionalidad`, que posteriormente se integrará en `develop` mediante Pull Request.

## Estructura de commits

Este repositorio sigue el estándar de commits convencionales para mejorar la legibilidad y la trazabilidad:

- `feat`: nueva funcionalidad.
- `fix`: corrección de errores.
- `refactor`: mejora interna sin cambio funcional.
- `test`: añadir o mejorar tests.
- `docs`: actualización del README u otra documentación.
- `chore`: tareas de mantenimiento.

___

## Linting y calidad de código

Este proyecto utiliza **ESLint** como linter principal para TypeScript y templates de Angular.

Para lanzar el linter:
```bash
npm run lint
```

Para corregir automáticamente problemas detectables:
```bash
npm run lint -- --fix
```

___

## Estilos y maquetación con Tailwind CSS

Este proyecto utiliza **Tailwind CSS** como sistema de maquetación y diseño de interfaz.

La instalación se ha hecho manualmente según la guía oficial, usando `postcss` con una configuración personalizada en `.postcssrc.json`.

Las capas de estilos se han importado en `src/styles.scss` de forma explícita:

```scss
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

Tailwind se usa principalmente para:

- Layouts (flex, grid, gap, etc.)
- Tipografía y espaciado
- Componentes responsive

Los estilos específicos y visuales finos se desarrollan en archivos SCSS separados por componente.

___

## Diseño responsive y enfoque mobile-first

El diseño de esta aplicación sigue un enfoque **mobile-first**, asegurando una experiencia óptima en dispositivos móviles como prioridad.

- Se ha utilizado **Tailwind CSS** para implementar una estructura responsive mediante utilidades como `sm:`, `md:`, `lg:`, `xl:`, asegurando una progresión fluida hacia pantallas mayores.
- Todos los componentes y páginas están pensados para **adaptarse correctamente** a distintos tamaños de pantalla.
- El diseño ha sido creado con el objetivo de mantener una **UX clara y accesible**, sin depender de frameworks visuales pesados.

El layout se adapta desde dispositivos móviles hasta pantallas grandes, manteniendo proporciones, jerarquía y usabilidad en todo momento.

---

## Testing

Este proyecto utiliza **Jasmine y Karma** para pruebas unitarias de componentes, servicios y casos de uso.

Los tests se encuentran junto a los componentes bajo el sufijo `.spec.ts`. Están orientados a validar:

- La creación y renderizado correcto de componentes.
- El flujo de datos entre inputs y outputs.
- Casos de uso con lógica desacoplada y testable.

Para ejecutar los tests:

```bash
npm run test
```

Para generar un informe de cobertura:

```bash
npm run test:coverage
```

___

## Licencia

Este proyecto está licenciado bajo la MIT License.