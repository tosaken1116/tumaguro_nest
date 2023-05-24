import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserSchema } from 'src/users/users.type';
import { JwtPayloadType, JwtSchema } from './auth.type';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createJWT(userId: Pick<ResponseUserSchema, 'id'>): Promise<JwtSchema> {
    const payload: JwtPayloadType = { userId };
    return { jwt: this.jwtService.sign(payload) };
  }
}
