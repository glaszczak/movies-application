import { UserRole } from 'src/users/entities/user.entity';

export class AuthCredentialsDto {
  userId: string;
  username: string;
  password: string;
  role: UserRole;
}
