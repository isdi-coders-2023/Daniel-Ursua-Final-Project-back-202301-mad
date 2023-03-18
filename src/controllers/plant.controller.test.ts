import { HTTPError } from '../errors/error';
import { PlantsController } from './plant.controller';
import jwt from 'jsonwebtoken';
import {
  mockReq5,
  mockNext,
  mockReq6,
  mockPlants,
  mockResp,
  mockPlantsComplete,
} from '../mocks/mockTest';

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
};

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
  describe('When we use the checkUser method without authorization', () => {
    test('Then, it should throw an error', () => {
      plantsController.checkUser(mockReq5, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Request required')
      );
    });
  });
  describe('When we use the checkUser method with authorization', () => {
    test('Then, it should call the jwt.verify method', () => {
      jwt.verify = jest.fn();
      plantsController.checkUser(mockReq6, mockNext);
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
  describe('When we have a token', () => {
    test('If it is invalid, then it should throw an error', async () => {
      jwt.verify = jest.fn();
      (jwt.verify as jest.Mock).mockResolvedValue('test');
      await plantsController.checkUser(mockReq6, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(401, 'Unauthorized', 'Invalid token')
      );
    });
    test('If it is valid, then it should return the userId', async () => {
      jwt.verify = jest.fn();
      (jwt.verify as jest.Mock).mockResolvedValue({ id: 'test' });
      const result = await plantsController.checkUser(mockReq6, mockNext);
      expect(result).toEqual('test');
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
    test('If the register do  not exist, it should throw an error', async () => {
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
});
