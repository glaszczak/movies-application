import { Injectable } from '@nestjs/common';
import { Seed } from 'src/users/seed/seed.class';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService extends Seed {
  constructor(entityManager: EntityManager) {
    super(entityManager);
    this.addUsers();
  }
}
