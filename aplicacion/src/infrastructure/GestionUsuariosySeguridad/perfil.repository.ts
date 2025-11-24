// infrastructure/perfil.repository.ts
import { Injectable } from "@nestjs/common";
import { db } from "../db";
import Perfil from "../../domain/GestionUsuariosySeguridad/perfil.entity";

const perfilRepository = {
  async findByUserId(usuarioId: number) {
    const result = await db.query(
      "SELECT * FROM perfil_usuario WHERE usuario_id = $1",
      [usuarioId]
    );
    return result.rows[0] || null;
  },

  async upsert(perfil: Perfil) {
    const result = await db.query(
      `
      INSERT INTO perfil_usuario (usuario_id, telefono, direccion, ciudad, pais)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (usuario_id)
      DO UPDATE SET telefono = $2, direccion = $3, ciudad = $4, pais = $5
      RETURNING *;
      `,
      [
        perfil.usuarioId,
        perfil.telefono,
        perfil.direccion,
        perfil.ciudad,
        perfil.pais,
      ]
    );

    return result.rows[0];
  },

  async deleteByUserId(usuarioId: number) {
    await db.query("DELETE FROM perfil_usuario WHERE usuario_id = $1", [
      usuarioId,
    ]);
  },
};

export default perfilRepository;
