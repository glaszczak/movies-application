import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

interface AuthPayload {
  userId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject() authService: AuthService;

  constructor() {
    super({
      secretOrKey: process.env.SECRET_JWT_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthPayload): Promise<UserEntity> {
    const { userId } = payload;
    const user: UserEntity = await UserEntity.findOne({ userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
