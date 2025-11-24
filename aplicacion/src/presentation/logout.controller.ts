import { Controller, Post, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { EventPublisher } from '../infrastructure/event.publisher';
import { AuthGuard } from './auth.guard';
import type { AuthRequest } from './auth-request.interface';

@Controller('auth')
export class LogoutController {
  constructor(private eventPublisher: EventPublisher) {}

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: AuthRequest, @Res() res: Response) {
    const user = req.user;

    await this.eventPublisher.publishLogout(
      { id: user.id, email: user.email },
      'web',      // fuente
      req.ip      // IP
    );

    return res.status(HttpStatus.OK).json({ message: 'Sesión cerrada' });
  }
}

