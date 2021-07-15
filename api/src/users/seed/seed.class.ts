import { EntityManager } from 'typeorm';
import { hashPassword } from '../../auth/utils/hash-password';
import { UserEntity } from '../entities/user.entity';
import { usersSeed } from './user.seed';

export class Seed {
  constructor(private readonly entityManager: EntityManager) {}
  async addUsers() {
    for (const user of usersSeed) {
      const findUser = await UserEntity.findOne(user.userId);

      if (!findUser) {
        const newUser = new UserEntity();

        newUser.userId = user.userId;
        newUser.username = user.username;
        newUser.role = user.role;
        newUser.password = hashPassword(user.password);

        await newUser.save();
      }
    }
  }
}
