// usuario.repository.ts
import { db } from './db';
import bcrypt from 'bcrypt';
import type Usuario from '../domain/usuario.entity';

export default {
  async findByEmail(email: string) {
    const result = await db.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    return result.rows[0] || null;
  },

  async save(usuario: Usuario) {
    const existing = await this.findByEmail(usuario.email);
    if (existing) {
      throw new Error('El usuario ya está registrado'); // <- mensaje amigable
    }

    const hash = await bcrypt.hash(usuario.password, 10);
    const query = `
      INSERT INTO usuarios (nombre, apellido, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, apellido, email, created_at
    `;
    const values = [usuario.nombre, usuario.apellido, usuario.email, hash];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};
