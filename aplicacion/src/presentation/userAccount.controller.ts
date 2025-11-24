// src/presentation/userAccount.controller.ts
import { Controller, Delete, Req, UseGuards, Res, HttpStatus } from "@nestjs/common";
import { DeleteUserUseCase } from "../application/deleteUser.usecase";
import { AuthGuard } from "./auth.guard";
import { EventPublisher } from "../infrastructure/event.publisher";
import type { Response } from "express";
import type { AuthRequest } from "./auth-request.interface";

@Controller("DeleteUser")
export class UserAccountController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly eventPublisher: EventPublisher
  ) {}

  @UseGuards(AuthGuard)
  @Delete("delete")
  async delete(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const userIdNumber = Number(req.user.id); // number para el caso de uso
      const userIdString = req.user.id;         // string para el evento
      const userEmail = req.user.email;

      // Ejecutar caso de uso
      await this.deleteUserUseCase.execute(userIdNumber);

      // Publicar evento de eliminación
      await this.eventPublisher.publishDeleteAccount({ id: userIdString, email: userEmail }, 'web');

      return res.status(HttpStatus.OK).json({ message: "Cuenta eliminada" });
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
