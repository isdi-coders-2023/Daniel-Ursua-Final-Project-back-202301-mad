import { HTTPError } from '../errors/error';
import { PlantsController } from './plant.controller';
import {
  mockNext,
  mockPlants,
  mockResp,
  mockPlantsComplete,
  mockReq,
} from '../mocks/mockTest';

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
  findAll: jest.fn(),
};

const userRepoMock = {
  search: jest.fn().mockReturnValue([]),
};

jest.mock('../repositories/users/users.mongo.repo.ts', () => ({
  UsersMongoRepo: {
    getInstance: () => userRepoMock,
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});
const plantsController = new PlantsController(mockRepo);

describe('Given the PlantsController', () => {
  describe('When it is instantiated', () => {
    test('Then it should create a new instance', () => {
      expect(plantsController).toBeInstanceOf(PlantsController);
    });
  });
  describe('When we use the add method', () => {
    test('If any of the conditions are missing it should throw an error', () => {
      mockPlants.forEach((plant) => {
        const req = { body: plant } as any;
        plantsController.add(req, mockResp, mockNext);
        expect(mockNext).toHaveBeenCalledWith(
          new HTTPError(400, 'Bad request', 'Incomplete information')
        );
      });
    });
    test('If we have all the conditions, then it should call the search method', () => {
      mockRepo.search.mockResolvedValue(['test']);
      plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
  describe('When we passed all the conditions, it check if the register already exist', () => {
    test('If the register do  not exist, it should create it', async () => {
      mockRepo.search.mockResolvedValue([]);
      mockRepo.create.mockResolvedValue('test');
      await plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockResp.status).toHaveBeenCalled();
      expect(mockResp.json).toHaveBeenCalled();
    });
    test('If the register already exist, it should throw an error', async () => {
      mockRepo.search.mockResolvedValue(['test']);
      mockRepo.create.mockResolvedValue('test');
      await plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(409, 'Conflict', 'Register already exist')
      );
    });
  });
  describe('When we use the getAll method, if there is no error', () => {
    test('It should return all the data', async () => {
      mockRepo.findAll.mockResolvedValue(['test']);

      const element = await plantsController.getAll(
        mockReq,
        mockResp,
        mockNext
      );
      expect(element).toEqual(['test']);
    });
  });
  describe('When we use the getAll method, if there is an error', () => {
    test('It should throw an error', async () => {
      mockRepo.findAll.mockRejectedValue(new Error());

      await plantsController.getAll(mockReq, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
