import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { LoginController } from './presentation/GestionUsuariosySeguridad/login.controller';
import { RegisterController } from './presentation/GestionUsuariosySeguridad/register.controller';
import { GoogleLoginController } from './presentation/GestionUsuariosySeguridad/authGoogle.controller';
import { UserAccountController } from './presentation/GestionUsuariosySeguridad/userAccount.controller';
import { PerfilController } from './presentation/GestionUsuariosySeguridad/perfil.controller';
import { MeController } from './presentation/GestionUsuariosySeguridad/me.controller';
import { ForgotPasswordController } from './presentation/GestionUsuariosySeguridad/forgotPassword.controller';
import { ResetPasswordController } from './presentation/GestionUsuariosySeguridad/resetPassword.controller';
import { LogoutController } from './presentation/GestionUsuariosySeguridad/logout.controller';
import { AuthGuard } from './presentation/GestionUsuariosySeguridad/auth.guard';


import { GoogleService } from './infrastructure/GestionUsuariosySeguridad/google.service';
import { EventSubscriber } from './infrastructure/GestionUsuariosySeguridad/event.subscriber';
import { EventPublisher } from './infrastructure/GestionUsuariosySeguridad/event.publisher';


import usuarioRepository from './infrastructure/GestionUsuariosySeguridad/usuario.repository';
import perfilRepository from './infrastructure/GestionUsuariosySeguridad/perfil.repository';

import { GetPerfilUseCase } from './application/GestionUsuariosySeguridad/getPerfil.usecase';
import UpdatePerfilUseCase  from './application/GestionUsuariosySeguridad/updatePerfil.usecase';
import { DeleteUserUseCase } from './application/GestionUsuariosySeguridad/deleteUser.usecase';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'user_events',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [
    LoginController,
    RegisterController,
    GoogleLoginController,
    UserAccountController,
    PerfilController,
    MeController,
    ForgotPasswordController,
    ResetPasswordController,
    EventSubscriber, // tu subscriber que escucha RabbitMQ
    LogoutController,
  ],
  providers: [
    GoogleService,
    GetPerfilUseCase,
    UpdatePerfilUseCase,
    DeleteUserUseCase,
    EventPublisher,
    AuthGuard,
    {
      provide: 'UsuarioRepository',
      useValue: usuarioRepository,
    },
    {
      provide: 'PerfilRepository',
      useValue: perfilRepository,
    },
  ],
})
export class AppModule {}
