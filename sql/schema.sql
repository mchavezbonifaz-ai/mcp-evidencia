CREATE TABLE IF NOT EXISTS evidencias (
  id SERIAL PRIMARY KEY,
  estudiante_id VARCHAR(100) NOT NULL,
  estudiante_nombre VARCHAR(200) NOT NULL,
  grado VARCHAR(100) NOT NULL,
  area VARCHAR(150) NOT NULL,
  competencia TEXT,
  actividad TEXT NOT NULL,
  evidencia TEXT NOT NULL,
  nivel_logro VARCHAR(100),
  observaciones TEXT,
  fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_evidencias_estudiante
  ON evidencias(estudiante_id);

CREATE INDEX IF NOT EXISTS idx_evidencias_area
  ON evidencias(area);

CREATE INDEX IF NOT EXISTS idx_evidencias_fecha
  ON evidencias(fecha);