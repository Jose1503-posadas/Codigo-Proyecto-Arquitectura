import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from "express";
import loginWithGoogleUseCase from '../application/googleLogin.usecase';
import { generateToken } from '../application/generateToken';

@Controller('auth')
export class GoogleLoginController {
  @Post('google')
  async loginGoogle(@Body() body: { token: string }, @Res() res: Response) {
    try {
      const result = await loginWithGoogleUseCase.execute(body.token);

      const token = generateToken(result.user);

      return res.status(HttpStatus.OK).json({
        message: "Login Google exitoso",
        token,
        user: result.user,
      });

    } catch (err: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
