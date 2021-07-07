import { MovieEntity } from 'src/movies/entities/movie.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.BASIC,
  })
  role: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  password: string;

  @Column()
  issuer: string;

  @Column()
  expiresIn: string;

  @Column()
  subject: number;

  @OneToMany(
    () => MovieEntity,
    movies => movies.user,
    { cascade: true, eager: true },
  )
  movies: MovieEntity[];
}
