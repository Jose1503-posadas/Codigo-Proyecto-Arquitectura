import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import usuarioRepository from '../../infrastructure/GestionUsuariosySeguridad/usuario.repository';

@Controller('auth')
export class MeController {
  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req) {
    const userId = req.user.id;
    const user = await usuarioRepository.findById(userId);
    return user;
  }
}
