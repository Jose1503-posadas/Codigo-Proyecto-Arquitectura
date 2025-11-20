import usuarioRepository from '../infrastructure/usuario.repository';
import bcrypt from 'bcrypt';

const loginUserUseCase = {
  async execute({ email, password }: { email: string; password: string }) {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    return {
      message: 'Login exitoso',
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
      },
    };
  },
};

export default loginUserUseCase;
