import { protoPlant } from '../../entities/plant';
import { mockEditPlant } from '../../mocks/mockTest';
import { PlantModel } from './plants.mongo.model';
import { PlantsMongoRepo } from './plants.mongo.repo';

jest.mock('./plants.mongo.model.ts');
const mockPlant = {
  name: 'test',
  email: 'test',
} as unknown as protoPlant;

beforeEach(() => {
  jest.resetAllMocks();
});
let popValue: any;
const mockPopulateExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(popValue),
  })),
});

describe('Given the plants mongo repo', () => {
  const repo = PlantsMongoRepo.getInstance();

  describe('When instantiated', () => {
    test('Then it should make a new instance', () => {
      expect(repo).toBeInstanceOf(PlantsMongoRepo);
    });
  });
  describe('When we use the create method', () => {
    test('Then it should call create method of plantmodel and create a new plant', async () => {
      (PlantModel.create as jest.Mock).mockResolvedValue(mockPlant);
      const element = await repo.create(mockPlant);
      expect(PlantModel.create).toHaveBeenCalled();
      expect(element).toEqual(mockPlant);
    });
  });
  describe('When we use the search method', () => {
    test('Then it should call find method and return the user', async () => {
      (PlantModel.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPlant),
      });
      const element = await repo.search({ key: 'name', value: 'test' });

      expect(PlantModel.find).toHaveBeenCalled();
      expect(element).toEqual(mockPlant);
    });
  });
  describe('When we use the delete method', () => {
    test('If there is an error in the data base, it should throw an error', () => {
      (PlantModel.findByIdAndDelete as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });
      const element = repo.deleteById('test id');
      expect(element).rejects.toThrow();
    });
  });
  describe('When we use the findAll method', () => {
    test('If there is no data in the collection, it should throw an error', async () => {
      (PlantModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(undefined),
          }),
        }),
      });
      const element = repo.findAll(1, 1);
      await expect(element).rejects.toThrow();
    });
    test('If there is data in the collection, it should return it', async () => {
      (PlantModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(['data']),
          }),
        }),
      });
      const element = await repo.findAll(1, 1);
      expect(element).toEqual(['data']);
    });
    test('If page param is negative, it should take the page 1', async () => {
      const mockSkip: jest.Mock = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(['data']),
      });
      const mockLimit: jest.Mock = jest.fn().mockReturnValue({
        skip: mockSkip,
      });
      const mockFind: jest.Mock = (
        PlantModel.find as jest.Mock
      ).mockReturnValue({
        limit: mockLimit,
      });
      await repo.findAll(-1, 1);
      expect(mockFind).toHaveBeenCalledWith(
        {},
        {
          photo: 1,
          name: 1,
          location: 1,
        }
      );
      expect(mockLimit).toHaveBeenCalledWith(1);
      expect(mockSkip).toHaveBeenCalledWith(0);
    });
  });
  describe('When we use the edit method', () => {
    test('If there is an error in the data base, it should throw an error', () => {
      (PlantModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });
      const element = repo.edit(mockEditPlant);
      expect(element).rejects.toThrow();
    });
    test('If there is a plant in the data base, it should return the plant updated', async () => {
      (PlantModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockEditPlant),
      });
      const element = await repo.edit(mockEditPlant);
      expect(element).toBe(mockEditPlant);
    });
  });
});
describe('Given the find by Id method', () => {
  const repo = PlantsMongoRepo.getInstance();
  describe('And there is an error in the data base', () => {
    test('Then it should throw an error', async () => {
      popValue = undefined;
      (PlantModel.findById as jest.Mock).mockImplementation(mockPopulateExec);
      const result = repo.findById('test');
      await expect(result).rejects.toThrow();
    });
  });
  describe('And there is a user with that Id', () => {
    test('Then it should return the plant', async () => {
      popValue = {};
      (PlantModel.findById as jest.Mock).mockImplementation(mockPopulateExec);
      const result = await repo.findById('1');
      expect(result).toEqual({});
    });
  });
});
