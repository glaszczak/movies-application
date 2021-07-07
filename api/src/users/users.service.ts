import { Injectable } from '@nestjs/common';
import { Seed } from 'src/seed.class';
import { EntityManager } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends Seed{
  constructor(entityManager: EntityManager) {
    super(entityManager);
    this.fakeIt(UserEntity);
  }

  async findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
