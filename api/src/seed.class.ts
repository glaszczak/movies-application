import { EntityManager } from 'typeorm';
import { UserEntity, UserRole } from './users/entities/user.entity';
import { hashPassword } from './users/utils/hash-password';

export class Seed {
  constructor(private readonly entityManager: EntityManager) {}

  fakeIt<T>(entity: any): void {
    this.addData(this.userData(), entity);
  }

  private addData<T>(data: Array<Partial<T>>, entity: any): void {
    this.entityManager
      .save<T, T>(entity, data as any)
      .then((savedData: Array<Partial<T>>) => {
      })
      .catch(console.error);
  }

  private userData(): Array<Partial<UserEntity>> {
    const user1 = {
      name: process.env.USER_1_NAME,
      role: UserRole.BASIC,
      passwordHash: hashPassword(process.env.USER_1_PASSWORD),
      issuer: 'https://www.netguru.com/',
      subject: 1,
    };

    const user2 = {
      name: process.env.USER_2_NAME,
      role: UserRole.PREMIUM,
      passwordHash: hashPassword(process.env.USER_2_PASSWORD),
      issuer: 'https://www.netguru.com/',
      subject: 2,
    };

    return [user1, user2];
  }
}
