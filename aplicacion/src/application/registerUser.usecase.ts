import Usuario from '../domain/usuario.entity';
import usuarioRepository from '../infrastructure/usuario.repository';

const registerUserUseCase = {
  async execute({ nombre, apellido, email, password }: any) {
    const usuario = new Usuario(nombre, apellido, email, password);
    await usuarioRepository.save(usuario);
    return { message: "Usuario registrado con éxito" };
  },
};

export default registerUserUseCase;
