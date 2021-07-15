import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  released: string;

  @ApiProperty()
  @Column()
  genre: string;

  @ApiProperty()
  @Column()
  director: string;

  @Exclude()
  @ManyToOne(
    () => UserEntity,
    user => user.movies,
  )
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
