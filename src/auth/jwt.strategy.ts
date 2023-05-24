import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy as BaseJwtStrategy, ExtractJwt } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadType } from './auth.type';
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }
  async validate(payload: JwtPayloadType): Promise<JwtPayloadType> {
    return { userId: payload.userId };
  }
}
