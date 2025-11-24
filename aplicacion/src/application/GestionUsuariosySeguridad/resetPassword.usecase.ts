import bcrypt from "bcrypt";
import usuarioRepository from "../../infrastructure/GestionUsuariosySeguridad/usuario.repository";
import resetCodeRepository from "../../infrastructure/GestionUsuariosySeguridad/resetCode.repository";
import { db } from "../../infrastructure/db";

const resetPasswordUseCase = {
  async execute(code: string, newPassword: string) {
    const record = await resetCodeRepository.find(code);
    if (!record) throw new Error("Código inválido");

    const now = new Date();
    if (now > new Date(record.expires_at)) {
      throw new Error("El código ha expirado");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    // actualizar contraseña del usuario
    await db.query(
      `UPDATE usuarios SET password=$1 WHERE email=$2`,
      [hash, record.email]
    );

    await resetCodeRepository.delete(code);

    return { message: "Contraseña actualizada correctamente" };
  },
};

export default resetPasswordUseCase;
