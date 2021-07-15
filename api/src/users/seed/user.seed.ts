import { UserRole } from "../entities/user.entity";

export const usersSeed = [
  {
    userId: 123,
    username: 'basic-thomas',
    role: UserRole.BASIC,
    password: 'sR-_pcoow-27-6PAwCD8',
  },
  {
    userId: 456,
    username: 'premium-jim',
    role: UserRole.PREMIUM,
    password: 'GBLtTyq3E_UNjFnpo9m6',
  },
];
