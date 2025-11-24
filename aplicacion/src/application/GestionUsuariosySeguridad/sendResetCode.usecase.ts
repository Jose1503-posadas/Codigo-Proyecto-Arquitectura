import usuarioRepository from "../../infrastructure/GestionUsuariosySeguridad/usuario.repository";
import resetCodeRepository from "../../infrastructure/GestionUsuariosySeguridad/resetCode.repository";
import { emailService } from '../../infrastructure/GestionUsuariosySeguridad/email.service';
import ResetCode from "../../domain/GestionUsuariosySeguridad/reset-code.entity";

function generateRandomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const sendResetCodeUseCase = {
  async execute(email: string) {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) throw new Error("No existe un usuario con ese correo");

    const code = generateRandomCode();
    const entity = new ResetCode(email, code);

    await resetCodeRepository.save(email, code, entity.expiresAt);

    // Instanciamos el servicio de email
    const emailSvc = new emailService();
    await emailSvc.sendResetPassword(email, code);

    return { message: "Código enviado al correo" };
  },
};

export default sendResetCodeUseCase;
