import usuarioRepository from '../infrastructure/usuario.repository';
import perfilRepository from '../infrastructure/perfil.repository';

export class GetPerfilUseCase {
  async execute(usuarioId: number) {
    const usuario = await usuarioRepository.findById(usuarioId);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const perfil = await perfilRepository.findByUserId(usuarioId);

    // Combinar datos de usuario y perfil
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      provider: usuario.provider,
      perfil: perfil || { telefono: '', direccion: '', ciudad: '', pais: '' },
    };
  }
}

export default GetPerfilUseCase;
