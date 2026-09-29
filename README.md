# MCP de Evidencia

Servidor MCP con Streamable HTTP para registrar y consultar evidencias de aprendizaje.

## Herramientas

1. `registrar_evidencia`
2. `consultar_evidencias`
3. `buscar_evidencias_por_estudiante`

## Despliegue en Vercel

1. Sube este proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Crea una base de datos PostgreSQL en Neon.
4. Ejecuta `sql/schema.sql` en Neon.
5. En Vercel > Settings > Environment Variables agrega:
   `DATABASE_URL=...`
6. Haz Deploy.

Endpoint MCP:

`https://TU-DOMINIO.vercel.app/mcp`

## Desarrollo local

```bash
npm install
npm run dev
```

## Prueba del endpoint

Después de desplegar:

```bash
MCP_URL=https://TU-DOMINIO.vercel.app/mcp npm run test:mcp
```

> Este servidor no implementa autenticación. No uses datos reales de estudiantes hasta añadir autenticación y controles de acceso apropiados.
update
