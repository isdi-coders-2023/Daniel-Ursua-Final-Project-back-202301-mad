import createDebug from 'debug';
import { protoUser, User } from '../../entities/user.js';
import { Repo } from '../repo.interface.js';
import { UserModel } from './users.mongo.model.js';

const debug = createDebug('WFP:repository:users');

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
  async create(info: protoUser): Promise<User> {
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
