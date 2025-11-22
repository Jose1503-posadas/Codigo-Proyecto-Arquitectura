import usuarioRepository from '../infrastructure/usuario.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUserUseCase = {
  async execute({ email, password }: { email: string; password: string }) {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    // Crear token
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      },
      process.env.JWT_SECRET || 'secret', // 🔑 igual que en el guard
      { expiresIn: '1d' }
    );

    return {
      message: 'Login exitoso',
      token,   // <--- Mándalo al frontend
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
