// src/presentation/authGoogle.controller.ts
import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import loginWithGoogleUseCase from '../../application/GestionUsuariosySeguridad/googleLogin.usecase';
import { generateToken } from '../../application/GestionUsuariosySeguridad/generateToken';
import { EventPublisher } from '../../infrastructure/GestionUsuariosySeguridad/event.publisher';
//import { AuthRequest } from './auth-request.interface';

@Controller('auth')
export class GoogleLoginController {
  constructor(private eventPublisher: EventPublisher) {}

  @Post('google')
  async loginGoogle(
    @Body() body: { token: string },
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      const result = await loginWithGoogleUseCase.execute(body.token);

      // Generar JWT
      const token = generateToken(result.user);

      // Publicar evento de login
      await this.eventPublisher.publishLogin(
        { id: result.user.id.toString(), email: result.user.email },
        'web', // o 'mobile' según corresponda
        req.ip,
        req.headers['user-agent'] || ''
      );

      return res.status(HttpStatus.OK).json({
        message: "Login Google exitoso",
        token,
        user: result.user,
      });

    } catch (err: any) {
      // Publicar evento de fallo (opcional)
      await this.eventPublisher.publishLogin({
        id: '',
        email: '',
        outcome: 'failure',
        details: { message: err.message },
      } as any);

      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
