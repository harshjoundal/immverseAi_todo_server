import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from '../../config/config'
import { NestMiddleware ,Next,Req,Res} from '@nestjs/common';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
        throw new UnauthorizedException();    }
    try {
      const decoded = jwt.verify(token, config.secret_key);
      request['Token_decoaded'] = decoded
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request){
    const token = request?.headers?.authorization;
    return token;
  }
}