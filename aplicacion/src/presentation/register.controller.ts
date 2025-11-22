import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import registerUserUseCase from '../application/registerUser.usecase';
import { generateToken } from '../application/generateToken';

interface RegisterBody {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Controller('auth')
export class RegisterController {
  @Post('register')
  async register(@Body() body: RegisterBody, @Res() res: Response) {
    try {
      const result = await registerUserUseCase.execute(body);

      // ✔ Generar token inmediatamente después de registrar
      const token = generateToken(result.user);

      return res.status(HttpStatus.CREATED).json({
        message: "Registro exitoso",
        token,
        user: result.user,
      });

    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
