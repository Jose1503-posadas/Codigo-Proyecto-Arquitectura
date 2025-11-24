// aplicacion/src/presentation/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1]; // Bearer <token>

    console.log("🟦 TOKEN RECIBIDO EN BACKEND:", token);

    const secret = process.env.JWT_SECRET || 'secret';
    console.log("🔐 JWT_SECRET usado:", secret);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req['user'] = decoded; // agregamos info del usuario al request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
