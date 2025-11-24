import sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class emailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) throw new Error("Falta SENDGRID_API_KEY en el entorno");
    sgMail.setApiKey(apiKey);
  }

  async sendResetPassword(email: string, code: string) {
    const link = `http://localhost:3000/reset-password?code=${code}`;
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM!,
      subject: "Restablecer contraseña",
      text: `Usa el siguiente enlace: ${link}`,
      html: `<p>Usa este enlace: <a href="${link}">${link}</a></p>`,
    };
    await sgMail.send(msg);
  }
}
