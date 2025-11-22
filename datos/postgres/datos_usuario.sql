CREATE TABLE perfil_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  ciudad VARCHAR(100),
  pais VARCHAR(100)
);

ALTER TABLE perfil_usuario ADD CONSTRAINT unique_usuario UNIQUE (usuario_id);
