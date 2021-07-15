import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { hashPassword } from './utils/hash-password';

@Injectable()
export class AuthService {
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await UserEntity.findOne({ username });

    if (user && hashPassword(password) === user.password) {
      const payload: JwtPayload = { username, password };
      const accessToken: string = await this.getToken(payload);

      await this.saveToken(user, accessToken);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials...');
    }
  }

  private async getToken(payload: JwtPayload): Promise<string> {
    const { username, password } = payload;

    try {
      const {
        data: { token },
      } = await axios.request({
        url: process.env.AUTH_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username,
          password,
        },
      });

      return token;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  private async saveToken(user: UserEntity, token: string): Promise<string> {
    let userWithThisToken = null;

    do {
      userWithThisToken = await UserEntity.findOne({ token: token });
    } while (!!userWithThisToken);

    user.token = token;
    await user.save();

    return token;
  }

}
