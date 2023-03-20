import { User } from '../../entities/user';

export interface UserRepo {
  create(info: User): Promise<User>;
  search(query: { key: string; value: unknown }): Promise<User[]>;
}
