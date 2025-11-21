import { Module } from '@nestjs/common';
import { LoginController } from './presentation/login.controller';
import { RegisterController } from './presentation/register.controller';
import { GoogleLoginController } from './presentation/authGoogle.controller';
import { GoogleService } from './infrastructure/google.service'; // import nombrado

@Module({
  imports: [],
  controllers: [
    LoginController,
    RegisterController,
    GoogleLoginController,
  ],
  providers: [
    GoogleService, // NestJS usa la clase directamente como provider
  ],
})
export class AppModule {}
