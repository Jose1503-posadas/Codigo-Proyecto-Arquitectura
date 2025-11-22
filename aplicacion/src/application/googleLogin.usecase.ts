// src/application/googleLogin.usecase.ts
import usuarioRepository from '../infrastructure/usuario.repository';
import { GoogleService } from '../infrastructure/google.service';
import Usuario from '../domain/usuario.entity';

const googleService = new GoogleService();

const loginWithGoogleUseCase = {
  async execute(idToken: string) {
    // Verificamos token con Google
    const data = await googleService.verifyGoogleToken(idToken);
    // data esperado: { nombre, apellido, email, ... }

    let usuario = await usuarioRepository.findByEmail(data.email);
    let isNewUser = false;

    if (!usuario) {
      // Crear usuario sin contraseña (proveedor: google)
      const nuevo = new Usuario(data.nombre, data.apellido, data.email, "google_oauth");
      console.log("Creando usuario Google:", nuevo);
      usuario = await usuarioRepository.saveGoogleUser(nuevo);
      isNewUser = true;
    }

    // Opcional: puedes normalizar el objeto user que devuelves
    const user = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      // agrega otros campos que tengas en la entidad si quieres
    };

    // Devuelve un objeto con la propiedad `user` (lo que espera el controlador)
    return {
      message: "Login con Google exitoso",
      user,
      isNewUser,
    };
  }
};

export default loginWithGoogleUseCase;
