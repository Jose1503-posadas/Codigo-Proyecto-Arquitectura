import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { db } from '../../infrastructure/db'; // tu conexión a PostgreSQL

@Controller()
export class EventSubscriber {

  private async saveEventToDB(data: any) {
    await db.query(
      `INSERT INTO event_logs(
        event_type, user_id, email, timestamp, source, ip_address, user_agent, outcome, details
      ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        data.eventType,
        data.userId,
        data.email,
        data.timestamp,
        data.source,
        data.ipAddress || null,
        data.userAgent || null,
        data.outcome,
        data.details || {}
      ]
    );
  }

  @EventPattern('login')
  async handleLoginEvent(@Payload() data: any) {
    console.log('Evento LOGIN recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('logout')
  async handleLogoutEvent(@Payload() data: any) {
    console.log('Evento LOGOUT recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('deleteAccount')
  async handleDeleteAccount(@Payload() data: any) {
    console.log('Evento DELETE ACCOUNT recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('register')
  async handleRegister(@Payload() data: any) {
    console.log('Evento REGISTER recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('googleSignup')
  async handleGoogleSignup(@Payload() data: any) {
    console.log('Evento GOOGLE SIGNUP recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('passwordRecovery')
  async handlePasswordRecovery(@Payload() data: any) {
    console.log('Evento PASSWORD RECOVERY recibido:', data);
    await this.saveEventToDB(data);
  }

  @EventPattern('passwordChanged')
  async handlePasswordChanged(@Payload() data: any) {
    console.log('Evento PASSWORD CHANGED recibido:', data);
    await this.saveEventToDB(data);

    // Aquí podrías enviar un correo de confirmación si quieres
    // await sendEmailPasswordChanged(data.email);
  }
}
