# Contribuyendo al proyecto ITX Mobile Shop

Este repositorio sigue una estructura profesional basada en el flujo de trabajo **Git Flow**. Aunque es un proyecto individual como parte de una prueba técnica, se ha implementado esta metodología para mantener un control claro y estructurado del desarrollo.

___

## Flujo de ramas

- `main`: código estable y listo para producción.
- `develop`: rama principal de desarrollo.
- `feature/*`: desarrollo de nuevas funcionalidades.
- `fix/*`: corrección de errores.
- `release/*`: preparación de una versión estable.
- `hotfix/*`: correcciones urgentes sobre `main`.

___

## Normas de desarrollo

- Toda nueva funcionalidad debe implementarse en una rama `feature/nombre-descriptivo`.
- Se recomienda hacer Pull Requests hacia `develop` incluso en proyectos individuales para mantener el control del historial.
- Cada commit debe seguir el estándar de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
    - `feat`: nueva funcionalidad.
    - `fix`: corrección de errores.
    - `refactor`: mejora interna sin cambio funcional.
    - `test`: añadir o mejorar tests.
    - `docs`: actualización del README u otra documentación.
    - `chore`: tareas de mantenimiento.

___

## Calidad del código

- Se deben pasar los comandos `lint` y `test` antes de cada merge.
- El código debe ser claro, modular, y cumplir con las buenas prácticas de Angular.
- Se valorará el uso de patrones arquitectónicos, como la arquitectura hexagonal, en todas las capas del proyecto.

___

## Buenas prácticas adicionales

- Commits atómicos y descriptivos.
- README siempre actualizado.
- Uso responsable del `localStorage` y de la caché con expiración.
- Tests unitarios al menos para los servicios y casos de uso principales.

___

## Contacto

Este documento está pensado para reflejar profesionalidad, orden y claridad en el desarrollo, aunque en esta prueba técnica no tenga lógica la contribución externa.
