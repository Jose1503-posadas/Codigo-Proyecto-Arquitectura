import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEventPayload } from '../../domain/GestionUsuariosySeguridad/userevent.payload';

@Injectable()
export class EventPublisher {
  constructor(@Inject('USER_EVENTS') private readonly client: ClientProxy) {}

  private async publish(payload: UserEventPayload) {
  await this.client.emit(payload.eventType, payload); // <- usar eventType
}

  async publishLogin(user: { id: string, email: string }, source: 'web' = 'web', ip?: string, userAgent?: string) {
    await this.publish({
      eventType: 'login',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      ipAddress: ip,
      userAgent,
      outcome: 'success',
      details: { message: 'Usuario inició sesión' },
    });
  }

  async publishLogout(user: { id: string, email: string }, source: 'web' = 'web', ip?: string) {
    await this.publish({
      eventType: 'logout',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      ipAddress: ip,
      outcome: 'success',
      details: { message: 'Usuario cerró sesión' },
    });
  }

  async publishDeleteAccount(user: { id: string, email: string }, source: 'web' = 'web') {
    await this.publish({
      eventType: 'deleteAccount',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      outcome: 'success',
      details: { message: 'Usuario eliminó su cuenta' },
    });
  }

  async publishGoogleSignup(user: { id: string, email: string }, source: 'web' = 'web') {
    await this.publish({
      eventType: 'googleSignup',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      outcome: 'success',
      details: { message: 'Usuario se registró con Google' },
    });
  }

  async publishRegister(user: { id: string, email: string }, source: 'web' = 'web') {
    await this.publish({
      eventType: 'register',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      outcome: 'success',
      details: { message: 'Usuario se registró' },
    });
  }

  async publishPasswordRecovery(user: { id: string, email: string }, source: 'web' = 'web') {
    await this.publish({
      eventType: 'passwordRecovery',
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      source,
      outcome: 'success',
      details: { message: 'Usuario solicitó recuperación de contraseña' },
    });
  }

  // src/infrastructure/event.publisher.ts
    async publishPasswordChanged(user: { id: string, email: string }, source: 'web' = 'web'){
    await this.publish({
        eventType: 'passwordChanged',
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
        source,
        outcome: 'success',
        details: { message: 'Usuario cambió su contraseña' },
    });
    }

}
