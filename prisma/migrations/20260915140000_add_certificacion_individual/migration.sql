-- NULL conserva la configuración del curso; true/false la reemplaza para el alumno.
ALTER TABLE "inscripciones" ADD COLUMN "certificacion_habilitada" BOOLEAN;
