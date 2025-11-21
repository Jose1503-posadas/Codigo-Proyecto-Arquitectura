import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from "express";
import loginWithGoogleUseCase from '../application/googleLogin.usecase';

@Controller('auth')
export class GoogleLoginController {
  @Post('google')
  async loginGoogle(@Body() body: { token: string }, @Res() res: Response) {
    try {
      const result = await loginWithGoogleUseCase.execute(body.token);
      return res.status(HttpStatus.OK).json(result);

    } catch (err: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
