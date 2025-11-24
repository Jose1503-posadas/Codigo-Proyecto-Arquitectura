import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { LoginController } from './presentation/login.controller';
import { RegisterController } from './presentation/register.controller';
import { GoogleLoginController } from './presentation/authGoogle.controller';
import { UserAccountController } from './presentation/userAccount.controller';
import { PerfilController } from './presentation/perfil.controller';
import { MeController } from './presentation/me.controller';
import { ForgotPasswordController } from './presentation/forgotPassword.controller';
import { ResetPasswordController } from './presentation/resetPassword.controller';
import { LogoutController } from './presentation/logout.controller';
import { AuthGuard } from './presentation/auth.guard';


import { GoogleService } from './infrastructure/google.service';
import { EventSubscriber } from './infrastructure/event.subscriber';
import { EventPublisher } from './infrastructure/event.publisher';


import usuarioRepository from './infrastructure/usuario.repository';
import perfilRepository from './infrastructure/perfil.repository';

import { GetPerfilUseCase } from './application/getPerfil.usecase';
import UpdatePerfilUseCase  from './application/updatePerfil.usecase';
import { DeleteUserUseCase } from './application/deleteUser.usecase';

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
