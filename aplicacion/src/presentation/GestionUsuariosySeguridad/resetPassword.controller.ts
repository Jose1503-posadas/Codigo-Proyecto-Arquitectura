// src/presentation/resetPassword.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import bcrypt from 'bcrypt';
import resetCodeRepository from '../../infrastructure/GestionUsuariosySeguridad/resetCode.repository';
import usuarioRepository from '../../infrastructure/GestionUsuariosySeguridad/usuario.repository';
import { db } from '../../infrastructure/db';
import { EventPublisher } from '../../infrastructure/GestionUsuariosySeguridad/event.publisher';

@Controller('auth')
export class ResetPasswordController {
  constructor(private readonly eventPublisher: EventPublisher) {}

  @Post('reset-password')
  async resetPassword(
    @Body('code') code: string,
    @Body('password') newPassword: string,
    @Res() res: Response,
  ) {
    console.log(`🟦 Petición atendida por: ${process.env.BACKEND_NAME}`);
    try {
      // 1️⃣ Buscar el código de reseteo
      const record = await resetCodeRepository.find(code);
      if (!record) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "Código inválido" });
      }

      const now = new Date();
      if (now > new Date(record.expires_at)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: "El código ha expirado" });
      }

      // 2️⃣ Hashear nueva contraseña
      const hash = await bcrypt.hash(newPassword, 10);

      // 3️⃣ Actualizar contraseña en la DB
      await db.query(
        `UPDATE usuarios SET password=$1 WHERE email=$2`,
        [hash, record.email]
      );

      // 4️⃣ Eliminar el código usado
      await resetCodeRepository.delete(code);

      // 5️⃣ Obtener usuario para el evento
      const user = await usuarioRepository.findByEmail(record.email);
      if (user) {
        await this.eventPublisher.publishPasswordChanged(
          { id: user.id.toString(), email: user.email }, 
          'web' // o 'mobile'
        );
      }

      return res.status(HttpStatus.OK).json({ message: "Contraseña actualizada correctamente" });
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }
}
