import { protoUser } from '../../entities/user';
import { UserModel } from './users.mongo.model';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./users.mongo.model.ts');
const mockUser = {
  name: 'test',
  email: 'test',
} as protoUser;
describe('Given the users mongo repo', () => {
  const repo = UsersMongoRepo.getInstance();

  describe('When instantiated', () => {
    test('Then it should make a new instance', () => {
      expect(repo).toBeInstanceOf(UsersMongoRepo);
    });
  });
  describe('When we use the create method', () => {
    test('Then it should call create method of usermodel and create a new user', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
      const element = await repo.create(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(element).toEqual(mockUser);
    });
  });
  describe('When we use the search method', () => {
    test('Then it should call find method and return the user', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue(mockUser);

      const element = await repo.search({ key: 'name', value: 'test' });

      expect(UserModel.find).toHaveBeenCalled();
      expect(element).toEqual(mockUser);
    });
  });
});
