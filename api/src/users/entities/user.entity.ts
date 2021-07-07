import { MovieEntity } from 'src/movies/entities/movie.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
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
    enum: UserRole,
    default: UserRole.BASIC,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  passwordHash: string;

  @Column({ nullable: true, default: null })
  tokenId: string | null

  @Column()
  issuer: string;

  @Column({ nullable: true, default: null })
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
