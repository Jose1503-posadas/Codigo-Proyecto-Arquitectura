-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    provider VARCHAR(20) DEFAULT 'local',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla perfil_usuario
CREATE TABLE IF NOT EXISTS perfil_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    UNIQUE (usuario_id)
);

-- Tabla reset_codes
CREATE TABLE IF NOT EXISTS reset_codes (
    email VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    PRIMARY KEY (email, code)
);

-- Tabla event_logs
CREATE TABLE IF NOT EXISTS event_logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50),
    user_id VARCHAR(50),
    email VARCHAR(255),
    timestamp TIMESTAMP DEFAULT NOW(),
    source VARCHAR(20),
    ip_address VARCHAR(50),
    user_agent TEXT,
    outcome VARCHAR(20),
    details JSONB
);
