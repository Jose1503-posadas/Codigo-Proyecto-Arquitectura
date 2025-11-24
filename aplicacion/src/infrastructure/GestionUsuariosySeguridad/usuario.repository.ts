import { db } from '../db';
import bcrypt from 'bcrypt';
import type Usuario from '../../domain/GestionUsuariosySeguridad/usuario.entity';

const usuarioRepository = {
  async findByEmail(email: string) {
    const result = await db.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    return result.rows[0] || null;
  },

  async save(usuario: Usuario) {
    const existing = await this.findByEmail(usuario.email);
    if (existing) {
      throw new Error('El usuario ya está registrado');
    }

    const hash = await bcrypt.hash(usuario.password, 10);
    const result = await db.query(
      `
      INSERT INTO usuarios (nombre, apellido, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, apellido, email, created_at
    `,
      [usuario.nombre, usuario.apellido, usuario.email, hash]
    );

    return result.rows[0];
  },

  async saveGoogleUser(usuario: Usuario) {
    const result = await db.query(
      `
      INSERT INTO usuarios (nombre, apellido, email, password, provider)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, apellido, email, provider, created_at
    `,
      [usuario.nombre, usuario.apellido, usuario.email, null, 'google']
    );

    return result.rows[0];
  },

  async delete(id: number) {
    await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
  },

  async findById(id: number) {
    const result = await db.query(
      'SELECT id, nombre, apellido, email, provider FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },
};

export default usuarioRepository;
