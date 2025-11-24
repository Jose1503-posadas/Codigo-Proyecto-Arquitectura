import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventSubscriber {
  @EventPattern('login')
  handleLoginEvent(@Payload() data: any) {
    console.log('Evento LOGIN recibido:', data);
  }

  @EventPattern('logout')
  handleLogoutEvent(@Payload() data: any) {
    console.log('Evento LOGOUT recibido:', data);
  }

  @EventPattern('deleteAccount')
  handleDeleteAccount(@Payload() data: any) {
    console.log('Evento DELETE ACCOUNT recibido:', data);
  }

  @EventPattern('register')
  handleRegister(@Payload() data: any) {
    console.log('Evento REGISTER recibido:', data);
  }

  @EventPattern('googleSignup')
  handleGoogleSignup(@Payload() data: any) {
    console.log('Evento GOOGLE SIGNUP recibido:', data);
  }

  @EventPattern('passwordRecovery')
  handlePasswordRecovery(@Payload() data: any) {
    console.log('Evento PASSWORD RECOVERY recibido:', data);
  }

  @EventPattern('passwordChanged')
  handlePasswordChanged(@Payload() data: any) {
    console.log('Evento PASSWORD CHANGED recibido:', data);
    // Aquí podrías enviar un correo de confirmación o log de auditoría
  }
}
