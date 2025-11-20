import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express'; // <-- 'import type' evita errores con isolatedModules
import registerUserUseCase from '../application/registerUser.usecase';

interface RegisterBody {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: RegisterBody, @Res() res: Response) {
    try {
      const result = await registerUserUseCase.execute(body);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}


