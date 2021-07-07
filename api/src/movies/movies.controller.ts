import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import {  MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() body: BodyInit): Promise<MovieEntity> {
    return this.moviesService.add(body['title']);
  }

  @Get()
  async movies(): Promise<MovieEntity[]> {
    return this.moviesService.movies()
  }
}
