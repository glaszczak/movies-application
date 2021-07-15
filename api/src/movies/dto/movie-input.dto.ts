import { IsNotEmpty, IsString } from 'class-validator';

export class MovieInputDto {
  @IsString()
  @IsNotEmpty()
  title?: string;
}
