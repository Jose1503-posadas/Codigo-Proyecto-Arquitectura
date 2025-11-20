// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController], // Aquí pones tu controlador de auth
  providers: [],                // Vacío si no hay servicios adicionales
})
export class AppModule {}
