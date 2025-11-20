import { db } from './db';
import bcrypt from 'bcrypt';
import type Usuario from '../domain/usuario.entity';

export default {
  async save(usuario: Usuario) {
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
