import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { MovieEntity } from './entities/movie.entity';

export interface MovieDetails {
  title: string;
  released: string;
  genre: string;
  director: string;
}

@Injectable()
export class MoviesService {
  async add(title: string) {
    const details = await this.fetchMovieDetails(title);

    if (!details) {
      throw new NotFoundException('No details for that movie');
    }

    const movie = new MovieEntity();
    movie.title = details['Title'];
    movie.released = details['Released'];
    movie.genre = details['Genre'];
    movie.director = details['Director'];
    return movie.save();
  }

  async movies(username: string, password: string): Promise<MovieEntity[]> {
    return MovieEntity.find();
  }

  async fetchMovieDetails(title: string): Promise<MovieDetails> {
    const url = `${process.env.API_URL}/?t=${title}&apikey=${process.env.API_KEY}`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (e) {
      console.log('ERRROR', e);
    }
  }

  private async authorizeUser(
    username: string,
    password: string,
  ): Promise<string> {
    try {
      const {
        data: { token },
      } = await axios.request({
        url: process.env.AUTH_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username,
          password,
        },
      });

      return token;
    } catch (e) {
      console.log('ERROR', e);
    }
  }
}
