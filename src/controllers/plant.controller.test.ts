import { HTTPError } from '../errors/error';
import { PlantsController } from './plant.controller';
import jwt from 'jsonwebtoken';
import { mockReq5, mockNext, mockReq6 } from '../mocks/mockTest';

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
};

const plantsController = new PlantsController(mockRepo);
describe('Given the PlantsController', () => {
  describe('When it is instantiated', () => {
    test('Then it should create a new instance', () => {
      expect(plantsController).toBeInstanceOf(PlantsController);
    });
  });
  describe('When we use the checkUser method', () => {
    test('If we do not have authorization it should throw an error', () => {
      plantsController.checkUser(mockReq5, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(400, 'Bad request', 'Request required')
      );
    });
    test('If our authorization is correct, it should call the jwt.verify method', () => {
      jwt.verify = jest.fn();
      plantsController.checkUser(mockReq6, mockNext);
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
});
