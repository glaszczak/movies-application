import { MovieEntity } from 'src/movies/entities/movie.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

export enum UserRole {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BASIC,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  token: string | null;

  @OneToMany(
    () => MovieEntity,
    movies => movies.user,
    { cascade: true, eager: true },
  )
  movies: MovieEntity[];
}
