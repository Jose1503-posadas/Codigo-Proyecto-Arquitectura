import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import loginUserUseCase from '../../application/GestionUsuariosySeguridad/loginUser.usecase';
import { generateToken } from '../../application/GestionUsuariosySeguridad/generateToken';
import { EventPublisher } from '../../infrastructure/GestionUsuariosySeguridad/event.publisher'; // <-- importamos el publicador

interface LoginBody {
  email: string;
  password: string;
}

@Controller('auth')
export class LoginController {
  constructor(private eventPublisher: EventPublisher) {} // <-- inyectamos

  @Post('login')
  async login(@Body() body: LoginBody, @Res() res: Response, @Req() req: Request) {
    try {
      const result = await loginUserUseCase.execute(body);

      // Generar token con info del usuario
      const token = generateToken(result.user);

      // Publicar evento de login correctamente
      await this.eventPublisher.publishLogin(
        { id: result.user.id, email: result.user.email }, // solo usuario
        'web',                                           // source opcional
        req.ip,                                          // ip opcional
        req.headers['user-agent'] || ''                 // userAgent opcional
      );

      return res.status(HttpStatus.OK).json({
        message: "Login exitoso",
        token,
        user: result.user,
      });
    } catch (err: any) {
      // Publicar evento de fallo (opcional)
      await this.eventPublisher.publishLogin(
        { id: '', email: body.email }, // usuario parcialmente conocido
        'web',
        req.ip
      );

      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
