import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  title: string;

  @Column()
  released: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @ManyToOne(
    () => UserEntity,
    user => user.movies,
  )
  @JoinColumn({name: "userId"})
  user: UserEntity;
}
