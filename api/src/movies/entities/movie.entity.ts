import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  movieId: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;
  
  @Column()
  title: string;

  @Column()
  released: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Exclude()
  @ManyToOne(
    () => UserEntity,
    user => user.movies,
  )
  @JoinColumn({name: "userId"})
  user: UserEntity;
}
