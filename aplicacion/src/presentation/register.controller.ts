import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import registerUserUseCase from '../application/registerUser.usecase';
import { generateToken } from '../application/generateToken';
import { EventPublisher } from '../infrastructure/event.publisher';

interface RegisterBody {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Controller('auth')
export class RegisterController {
  constructor(private eventPublisher: EventPublisher) {}

  @Post('register')
  async register(@Body() body: RegisterBody, @Res() res: Response) {
    try {
      const result = await registerUserUseCase.execute(body);

      // Generar token inmediatamente después de registrar
      const token = generateToken(result.user);

      // Publicar evento de registro (simple: solo user y source)
      await this.eventPublisher.publishRegister(
        { id: result.user.id, email: result.user.email },
        'web'
      );

      return res.status(HttpStatus.CREATED).json({
        message: "Registro exitoso",
        token,
        user: result.user,
      });

    } catch (err: any) {
      // En caso de error, solo publicamos con correo (sin ID)
      await this.eventPublisher.publishRegister(
        { id: '', email: body.email },
        'web'
      );

      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
