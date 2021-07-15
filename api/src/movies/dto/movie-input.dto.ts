import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MovieInputDto {
  @ApiProperty({ description: 'Movie title' })
  @IsString()
  @IsNotEmpty()
  title?: string;
}
