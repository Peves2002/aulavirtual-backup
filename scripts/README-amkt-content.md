# Contenido AMKT

Después de instalar dependencias y preparar Prisma, ejecutar desde la raíz del proyecto:

```sh
node scripts/apply-amkt-content.cjs
```

Usa DATABASE_URL del entorno o del archivo .env. Actualiza las portadas de los cinco cursos por slug, sin crear cursos, y reemplaza la misión y visión con los textos aprobados. Puede repetirse. Reiniciar la aplicación para renovar la caché de configuración.
