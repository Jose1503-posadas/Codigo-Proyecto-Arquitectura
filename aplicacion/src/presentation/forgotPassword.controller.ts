// src/presentation/forgotPassword.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import sendResetCodeUseCase from "../application/sendResetCode.usecase";
import { EventPublisher } from "../infrastructure/event.publisher";
import usuarioRepository from "../infrastructure/usuario.repository";

@Controller("auth")
export class ForgotPasswordController {
  constructor(private readonly eventPublisher: EventPublisher) {}

  @Post("forgot-password")
  async forgot(@Body("email") email: string, @Res() res: Response) {
    try {
      // 1️⃣ Buscar usuario por email
      const user = await usuarioRepository.findByEmail(email);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: "Usuario no encontrado" });
      }

      // 2️⃣ Ejecutar la lógica de envío del código
      const result = await sendResetCodeUseCase.execute(email);

      // 3️⃣ Publicar evento de recuperación de contraseña
      await this.eventPublisher.publishPasswordRecovery(
        { id: user.id.toString(), email: user.email }, // id como string
        "web" // o "mobile" según corresponda
      );

      return res.status(HttpStatus.OK).json(result);
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}

