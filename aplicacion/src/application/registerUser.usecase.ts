// src/application/registerUser.usecase.ts
import Usuario from '../domain/usuario.entity';
import usuarioRepository from '../infrastructure/usuario.repository';

const registerUserUseCase = {
  async execute({ nombre, apellido, email, password }: any) {
    // Crear entidad
    const usuario = new Usuario(nombre, apellido, email, password);

    // Guardar en BD
    const usuarioGuardado = await usuarioRepository.save(usuario);

    // Devolver un objeto "user" compatible con el controlador
    return {
      user: {
        id: usuarioGuardado.id,
        nombre: usuarioGuardado.nombre,
        apellido: usuarioGuardado.apellido,
        email: usuarioGuardado.email,
      },
    };
  },
};

export default registerUserUseCase;
