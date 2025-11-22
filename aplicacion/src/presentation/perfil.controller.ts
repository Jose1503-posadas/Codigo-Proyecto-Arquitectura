// presentation/perfil.controller.ts
import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import GetPerfilUseCase from '../application/getPerfil.usecase';
import UpdatePerfilUseCase from '../application/updatePerfil.usecase';


@Controller('perfil') // rutas: /perfil
export class PerfilController {
  constructor(
    private readonly getPerfilUseCase: GetPerfilUseCase,
    private readonly updatePerfilUseCase: UpdatePerfilUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async get(@Req() req) {
    const userId = req.user.id;
    return await this.getPerfilUseCase.execute(userId);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Req() req, @Body() body) {
    const userId = req.user.id;
    const updated = await this.updatePerfilUseCase.execute(userId, body);
    return { message: 'Perfil actualizado', updated };
  }
}
