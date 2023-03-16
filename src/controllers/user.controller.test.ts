import { UsersController } from './user.controller';
import {
  mockNext,
  mockReq,
  mockReq1,
  mockReq2,
  mockReq3,
  mockReq4,
  mockResp,
} from '../mocks/mockTest';
import { HTTPError } from '../errors/error';
import { Auth } from '../services/auth';

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
};

jest.mock('../config.js', () => ({
  config: {
    secret: 'test',
  },
}));
const controller = new UsersController(mockRepo);
describe('Given the user controller', () => {
  describe('When it is instantiated', () => {
    test('Then it should create a new instance', () => {
      expect(controller).toBeInstanceOf(UsersController);
    });
  });

  describe('When we call the login method', () => {
    test('If the request do not have email it should throw an error', async () => {
      controller.login(mockReq1, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have password it should throw an error', async () => {
      controller.login(mockReq2, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have name it should throw an error', async () => {
      controller.login(mockReq3, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have any data it should throw an error', async () => {
      controller.login(mockReq4, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the data was  correct it should call the search method', async () => {
      controller.login(mockReq, mockResp, mockNext);

      expect(mockRepo.search).toHaveBeenCalled();
    });
    test('If there is any user with that mail it should throw an error', async () => {
      mockRepo.search.mockResolvedValue([]);
      await controller.login(mockReq, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(401, 'Unauthorized', 'Email not found')
      );
    });
    test('If the password was incorrect then it should throw an error', async () => {
      mockRepo.search.mockResolvedValue(['test']);
      Auth.compare = jest.fn();
      (Auth.compare as jest.Mock).mockResolvedValue(false);
      await controller.login(mockReq, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(401, 'Unauthorized', 'Password not match')
      );
    });
    test('If the password was correct then it should return the resp.json', async () => {
      mockRepo.search.mockResolvedValue(['test']);
      Auth.compare = jest.fn();
      Auth.createJWT = jest.fn();
      (Auth.compare as jest.Mock).mockResolvedValue(true);
      await controller.login(mockReq, mockResp, mockNext);
      expect(mockResp.status).toHaveBeenCalled();
      expect(mockResp.json).toHaveBeenCalled();
    });
  });

  describe('When we call the login method', () => {
    test('If the request do not have email it should throw an error', async () => {
      await controller.register(mockReq1, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have password it should throw an error', async () => {
      await controller.register(mockReq2, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have name it should throw an error', async () => {
      await controller.register(mockReq3, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the request do not have any data it should throw an error', async () => {
      await controller.register(mockReq4, mockResp, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Incomplete information')
      );
    });
    test('If the data was  correct it should call the search method and resp.json', async () => {
      await controller.register(mockReq, mockResp, mockNext);

      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockResp.json).toHaveBeenCalled();
    });
  });
});
