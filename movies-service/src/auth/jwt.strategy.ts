import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

interface AuthPayload {
  userId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
