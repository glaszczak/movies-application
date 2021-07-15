import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { UserEntity } from 'src/users/entities/user.entity';
import { MovieInputDto } from './dto/movie-input.dto';
import { MovieEntity } from './entities/movie.entity';

export interface MovieDetails {
  title: string;
  released: string;
  genre: string;
  director: string;
}

@Injectable()
export class MoviesService {
  async create(
    movieInputDto: MovieInputDto,
    user: UserEntity,
  ): Promise<MovieEntity> {
    const { title } = movieInputDto;

    if (await this.isMovie(title, user)) {
      throw new NotFoundException(
        `The '${title}' movie already exist for user: ${user.username}`,
      );
    }

    const details = await this.fetchMovieDetails(title);

    if (!details) {
      throw new NotFoundException('No details for that movie');
    }

    const movie = new MovieEntity();
    movie.title = details['Title'];
    movie.released = details['Released'];
    movie.genre = details['Genre'];
    movie.director = details['Director'];
    movie.user = user;
    return movie.save();
  }

  async movies(user: UserEntity): Promise<MovieEntity[]> {
    return await MovieEntity.find({
      where: {
        user,
      },
    });
  }

  async fetchMovieDetails(title: string): Promise<MovieDetails> {
    const url = `${process.env.API_URL}/?t=${title}&apikey=${process.env.API_KEY}`;

    const { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (data.Response === 'False') {
      console.log(data.Error);
      throw new BadRequestException(data.Error);
    }

    return data;
  }

  async isMovie(title: string, user: UserEntity) {
    const movie = await MovieEntity.findOne({
      where: {
        title,
        user,
      },
    });

    return movie;
  }
}
