import { Module } from '@nestjs/common';

import { LoginController } from './presentation/login.controller';
import { RegisterController } from './presentation/register.controller';
import { GoogleLoginController } from './presentation/authGoogle.controller';
import { UserAccountController } from './presentation/userAccount.controller';
import { PerfilController } from './presentation/perfil.controller';
import { GetPerfilUseCase } from './application/getPerfil.usecase';
import UpdatePerfilUseCase  from './application/updatePerfil.usecase';
import { MeController } from './presentation/me.controller';

import { GoogleService } from './infrastructure/google.service';

import usuarioRepository from './infrastructure/usuario.repository';
import perfilRepository from './infrastructure/perfil.repository';

import { DeleteUserUseCase } from './application/deleteUser.usecase';

@Module({
  imports: [],
  controllers: [
    LoginController,
    RegisterController,
    GoogleLoginController,
    UserAccountController,
    PerfilController,
    MeController,
  ],
  providers: [
    GoogleService,
    GetPerfilUseCase,
    UpdatePerfilUseCase,

    DeleteUserUseCase,
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
