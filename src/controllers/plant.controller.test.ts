import { HTTPError } from '../errors/error';
import { PlantsController } from './plant.controller';
import {
  mockNext,
  mockPlants,
  mockResp,
  mockPlantsComplete,
  mockReq,
  mockEditPlant,
  mockReqPa,
  mockReqGetParams,
  mockReqGetParamsF,
  mockReqId,
  mockReqPaId,
} from '../mocks/mockTest';

const mockRepo = {
  create: jest.fn(),
  search: jest.fn(),
  findAll: jest.fn(),
  edit: jest.fn(),
  findById: jest.fn(),
  deleteById: jest.fn(),
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
});
describe('Given the add method', () => {
  describe('And any of the conditions are missing', () => {
    test('Then it should throw an error', () => {
      mockPlants.forEach((plant) => {
        const req = { body: plant } as any;
        plantsController.add(req, mockResp, mockNext);
        expect(mockNext).toHaveBeenCalledWith(
          new HTTPError(400, 'Bad request', 'Incomplete information')
        );
      });
    });
  });
  describe('And we have all the conditions', () => {
    test('Then it should call the search method', async () => {
      mockRepo.search.mockResolvedValue(['test']);
      await plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
  describe('And the register already exist', () => {
    test('Then it should create it', async () => {
      mockRepo.search.mockResolvedValue([]);
      mockRepo.create.mockResolvedValue('test');
      await plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockResp.status).toHaveBeenCalled();
      expect(mockResp.json).toHaveBeenCalled();
    });
  });
  describe('And the register already exist', () => {
    test('Then it should throw an error', async () => {
      mockRepo.search.mockResolvedValue(['test']);
      mockRepo.create.mockResolvedValue('test');
      await plantsController.add(mockPlantsComplete, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(409, 'Conflict', 'Register already exist')
      );
    });
  });
});
describe('Given the getAll method', () => {
  describe('And the request have the correct params', () => {
    test('It should call find all method with the params', async () => {
      await plantsController.getAll(mockReqGetParams, mockResp, mockNext);
      expect(mockRepo.findAll).toHaveBeenCalledWith(1, 1);
    });
  });
  describe('And the request do not have the correct params', () => {
    test('It should call find all method with default value', async () => {
      await plantsController.getAll(mockReqGetParamsF, mockResp, mockNext);
      expect(mockRepo.findAll).toHaveBeenCalledWith(1, 5);
    });
  });
  describe('And there is an error', () => {
    test('It should throw an error', async () => {
      mockRepo.findAll.mockRejectedValue(new Error());
      await plantsController.getAll(mockReq, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});

describe('Given the editPlant method', () => {
  describe('And there is no register to edit', () => {
    test('Then it should throw an error', async () => {
      mockRepo.edit.mockReturnValue(undefined);
      await plantsController.editPlant(mockReq, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(404, 'Register not found', 'Register not found')
      );
    });
  });
  describe('And there is a register to edit', () => {
    test('Then it should return an updated register', async () => {
      mockRepo.edit.mockReturnValue(mockEditPlant);
      await plantsController.editPlant(mockPlantsComplete, mockResp, mockNext);
      expect(mockResp.json).toHaveBeenCalledWith({ results: [mockEditPlant] });
    });
  });
});
describe('Given the get by id method', () => {
  describe('And there is no id to find', () => {
    test('Then it should throw an error', async () => {
      mockRepo.findById.mockReturnValue(undefined);
      await plantsController.getById(mockReqPa, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(404, 'Register not found', 'Id not found')
      );
    });
  });
  describe('And there is an id', () => {
    test('Then it should return the plant', async () => {
      mockRepo.findById.mockResolvedValue(mockPlantsComplete);
      await plantsController.getById(mockReqPa, mockResp, mockNext);
      expect(mockResp.json).toHaveBeenCalledWith({
        results: [mockPlantsComplete],
      });
    });
  });

  describe('And there is an id', () => {
    test('Then it should return the plant', async () => {
      mockRepo.findById.mockResolvedValue(mockPlantsComplete);
      await plantsController.getById(mockReqPa, mockResp, mockNext);
      expect(mockResp.json).toHaveBeenCalledWith({
        results: [mockPlantsComplete],
      });
    });
  });
});
describe('Given the delete by id method', () => {
  describe('And there is no id to delete', () => {
    test('Then it should throw an error', async () => {
      mockRepo.deleteById.mockReturnValue('test');
      await plantsController.deletePlant(mockReqPaId, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalledWith(
        new HTTPError(404, 'Id not found', 'Id not found')
      );
    });
  });
  describe('And there is an id to delete', () => {
    test('Then it should throw a response', async () => {
      mockRepo.deleteById.mockReturnValue('test');
      await plantsController.deletePlant(mockReqId, mockResp, mockNext);
      expect(mockResp.json).toHaveBeenCalled();
    });
  });
});
