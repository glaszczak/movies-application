import { IsNotEmpty, IsString } from 'class-validator';

export class MovieInputDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  title?: string;
}
