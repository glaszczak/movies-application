import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MovieInputDto } from './dto/movie-input.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/user.decorator';
import { LimitMoviesPipe } from './pipes/limit-movies.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ status: 201, description: 'Movie created' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard())
  async create(
    @Body() movieInputDto: MovieInputDto,
    @GetUser('user', new LimitMoviesPipe()) user: UserEntity,
  ): Promise<MovieEntity> {
    return this.moviesService.create(movieInputDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200, description: 'OK' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard())
  async movies(@GetUser() user: UserEntity): Promise<MovieEntity[]> {
    return this.moviesService.movies(user);
  }
}
