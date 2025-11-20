import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import loginUserUseCase from '../application/loginUser.usecase';

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
      return res.status(HttpStatus.OK).json(result);
    } catch (err: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
