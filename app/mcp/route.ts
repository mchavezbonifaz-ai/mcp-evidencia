import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { sql } from "../../lib/db";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "registrar_evidencia",
      {
        title: "Registrar evidencia",
        description:
          "Registra una evidencia de aprendizaje de un estudiante.",
        inputSchema: {
          estudiante_id: z.string().min(1),
          estudiante_nombre: z.string().min(1),
          grado: z.string().min(1),
          area: z.string().min(1),
          competencia: z.string().optional(),
          actividad: z.string().min(1),
          evidencia: z.string().min(1),
          nivel_logro: z.string().optional(),
          observaciones: z.string().optional(),
          fecha: z.string().optional()
        }
      },
      async (input) => {
        const resultado = await sql`
          INSERT INTO evidencias (
            estudiante_id,
            estudiante_nombre,
            grado,
            area,
            competencia,
            actividad,
            evidencia,
            nivel_logro,
            observaciones,
            fecha
          )
          VALUES (
            ${input.estudiante_id},
            ${input.estudiante_nombre},
            ${input.grado},
            ${input.area},
            ${input.competencia ?? null},
            ${input.actividad},
            ${input.evidencia},
            ${input.nivel_logro ?? null},
            ${input.observaciones ?? null},
            ${input.fecha ?? new Date().toISOString()}
          )
          RETURNING id, fecha
        `;

        const registro = resultado[0];

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  mensaje: "Evidencia registrada correctamente.",
                  id: registro.id,
                  fecha: registro.fecha
                },
                null,
                2
              )
            }
          ]
        };
      }
    );

    server.registerTool(
      "consultar_evidencias",
      {
        title: "Consultar evidencias",
        description:
          "Consulta evidencias de aprendizaje y permite filtrar por estudiante, grado, área, competencia y rango de fechas.",
        inputSchema: {
          estudiante_id: z.string().optional(),
          grado: z.string().optional(),
          area: z.string().optional(),
          competencia: z.string().optional(),
          fecha_desde: z.string().optional(),
          fecha_hasta: z.string().optional(),
          limite: z.number().int().min(1).max(100).default(50)
        }
      },
      async (input) => {
        const resultados = await sql`
          SELECT
            id,
            estudiante_id,
            estudiante_nombre,
            grado,
            area,
            competencia,
            actividad,
            evidencia,
            nivel_logro,
            observaciones,
            fecha
          FROM evidencias
          WHERE
            (${input.estudiante_id ?? null} IS NULL OR estudiante_id = ${input.estudiante_id})
            AND (${input.grado ?? null} IS NULL OR grado = ${input.grado})
            AND (${input.area ?? null} IS NULL OR area = ${input.area})
            AND (${input.competencia ?? null} IS NULL OR competencia = ${input.competencia})
            AND (${input.fecha_desde ?? null} IS NULL OR fecha >= ${input.fecha_desde})
            AND (${input.fecha_hasta ?? null} IS NULL OR fecha <= ${input.fecha_hasta})
          ORDER BY fecha DESC
          LIMIT ${input.limite}
        `;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  total: resultados.length,
                  evidencias: resultados
                },
                null,
                2
              )
            }
          ]
        };
      }
    );

    server.registerTool(
      "buscar_evidencias_por_estudiante",
      {
        title: "Buscar evidencias por estudiante",
        description:
          "Busca las evidencias de aprendizaje registradas para un estudiante específico.",
        inputSchema: {
          estudiante_id: z.string().min(1),
          limite: z.number().int().min(1).max(100).default(100)
        }
      },
      async (input) => {
        const resultados = await sql`
          SELECT
            id,
            estudiante_id,
            estudiante_nombre,
            grado,
            area,
            competencia,
            actividad,
            evidencia,
            nivel_logro,
            observaciones,
            fecha
          FROM evidencias
          WHERE estudiante_id = ${input.estudiante_id}
          ORDER BY fecha DESC
          LIMIT ${input.limite}
        `;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  estudiante_id: input.estudiante_id,
                  total: resultados.length,
                  evidencias: resultados
                },
                null,
                2
              )
            }
          ]
        };
      }
    );
  },
  {
    serverInfo: {
      name: "MCP de Evidencia",
      version: "1.0.0"
    },
    capabilities: {
      tools: {}
    }
  }
);

export { handler as GET, handler as POST };