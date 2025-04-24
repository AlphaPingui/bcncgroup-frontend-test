# Estructura del proyecto

Este proyecto sigue una arquitectura hexagonal adaptada a FrontEnd Angular.

- `core`: configuración global y dependencias singleton.
- `domain`: modelos puros y lógica de negocio.
- `application`: casos de uso.
- `infrastructure`: servicios técnicos (API, almacenamiento).
- `ui`: componentes de interfaz reutilizables.
- `pages`: vistas principales.
- `shared`: utilidades, pipes y directivas.
