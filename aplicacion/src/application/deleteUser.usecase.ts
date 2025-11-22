import { Injectable } from '@nestjs/common';
import usuarioRepository from '../infrastructure/usuario.repository';
import perfilRepository from '../infrastructure/perfil.repository';

@Injectable()
export class DeleteUserUseCase {
  async execute(usuarioId: number) {
    await perfilRepository.deleteByUserId(usuarioId);
    await usuarioRepository.delete(usuarioId);
  }
}
