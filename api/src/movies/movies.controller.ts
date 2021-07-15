import { Controller, Get, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { MovieInputDto } from './dto/movie-input.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/user.decorator';
import { LimitMoviesPipe } from './pipes/limit-movies.pipe';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() movieInputDto: MovieInputDto,
    @GetUser('user', new LimitMoviesPipe()) user: UserEntity,
  ): Promise<MovieEntity> {
    return this.moviesService.create(movieInputDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard())
  async movies(@GetUser() user: UserEntity): Promise<MovieEntity[]> {
    return this.moviesService.movies(user);
  }
}
