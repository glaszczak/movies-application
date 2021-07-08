import { Controller, Get, Post, Body } from '@nestjs/common';
import { MovieInputDto } from './dto/movie-input.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() body: MovieInputDto): Promise<MovieEntity> {
    return this.moviesService.add(body.title);
  }

  @Get()
  async movies(@Body() body: MovieInputDto): Promise<MovieEntity[]> {
    return this.moviesService.movies(body.userName, body.password);
  }
}
