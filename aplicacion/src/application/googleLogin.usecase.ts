// src/application/googleLogin.usecase.ts
import usuarioRepository from '../infrastructure/usuario.repository';
import { GoogleService } from '../infrastructure/google.service';
import Usuario from '../domain/usuario.entity';

const googleService = new GoogleService(); // instanciamos la clase

const loginWithGoogleUseCase = {
  async execute(idToken: string) {
    const data = await googleService.verifyGoogleToken(idToken);

    let usuario = await usuarioRepository.findByEmail(data.email);

    if (!usuario) {
      // Crear usuario sin contraseña
      const nuevo = new Usuario(data.nombre, data.apellido, data.email, "google_oauth");
      console.log("Creando usuario Google:", nuevo); // <- verifica aquí
      usuario = await usuarioRepository.saveGoogleUser(nuevo);
    }

    return {
      message: "Login con Google exitoso",
      email: usuario.email,
    };
  }
}

export default loginWithGoogleUseCase;
