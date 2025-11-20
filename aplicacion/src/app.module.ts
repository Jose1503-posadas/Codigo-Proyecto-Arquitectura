// src/app.module.ts
import { Module } from '@nestjs/common';
import { LoginController } from './presentation/login.controller';
import { RegisterController } from './presentation/register.controller';

@Module({
  imports: [],
  controllers: [LoginController, RegisterController], // ambos controladores
  providers: [], // vacío si no hay servicios adicionales
})
export class AppModule {}
