import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserEntity, UserRole } from 'src/users/entities/user.entity';
import * as moment from 'moment';
import { MovieEntity } from '../entities/movie.entity';

@Injectable()
export class LimitMoviesPipe implements PipeTransform {
  async transform(user: UserEntity) {
    const date = moment(new Date()).format('YYYY-MM-DD');

    const monthFirstDay = moment(date)
      .startOf('month')
      .format('YYYY-MM-DD');

    const monthLastDay = moment(date)
      .endOf('month')
      .format('YYYY-MM-DD');

    const moviesQuery = await MovieEntity.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .where({ user })
      .andWhere('movies.createdAt >= :after', {
        after: monthFirstDay,
      })
      .andWhere('movies.createdAt < :before', {
        before: monthLastDay,
      });

    const [_movies, count] = await moviesQuery.getManyAndCount();

    if (count >= 5 && user.role === UserRole.BASIC) {
      throw new BadRequestException(
        `You have too many movies: (${count}) in the last 30 days.`,
      );
    }
    return user;
  }
}
