import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import loginUserUseCase from '../application/loginUser.usecase';
import { generateToken } from '../application/generateToken';

interface LoginBody {
  email: string;
  password: string;
}

@Controller('auth')
export class LoginController {
  @Post('login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    try {
      const result = await loginUserUseCase.execute(body);

      // Generar token con info del usuario
      const token = generateToken(result.user);

      return res.status(HttpStatus.OK).json({
        message: "Login exitoso",
        token,
        user: result.user,
      });
    } catch (err: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
