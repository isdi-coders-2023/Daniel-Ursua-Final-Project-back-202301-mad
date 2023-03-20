import createDebug from 'debug';
import { protoUser, User } from '../../entities/user.js';
import { UserRepo } from './user.interface.js';
import { UserModel } from './users.mongo.model.js';

const debug = createDebug('WFP:repository:users');

export class UsersMongoRepo implements UserRepo {
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
  async create(info: protoUser): Promise<User> {
    debug('Create');
    const data = await UserModel.create(info);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<User[]> {
    debug('Search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }
}
