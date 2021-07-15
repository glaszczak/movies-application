import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Password' })
  password: string;
}
