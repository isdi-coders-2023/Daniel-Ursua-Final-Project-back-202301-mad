import debug from 'debug';
import { User } from '../../entities/user';
import { Repo } from '../repo.interface';
import { UserModel } from './users.mongo.model';

export class UsersMongoRepo implements Repo<User> {
  private static instance: UsersMongoRepo;

  public static getInstance(): UsersMongoRepo {
    if (!UsersMongoRepo.instance) {
      UsersMongoRepo.instance = new UsersMongoRepo();
    }

    return UsersMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }
  async create(info: User): Promise<User> {
    debug('Create');
    const data = await UserModel.create(info);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<User[]> {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }
}
