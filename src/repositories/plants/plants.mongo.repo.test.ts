import { protoPlant } from '../../entities/plant';
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
  describe('When we use the findAll method', () => {
    test('If there is no data in the collection, it should throw an error', async () => {
      (PlantModel.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(''),
      });
      const element = repo.findAll();
      await expect(element).rejects.toThrow();
    });
    test('If there is data in the collection, it should return it', async () => {
      (PlantModel.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(['data']),
      });
      const element = await repo.findAll();
      expect(element).toEqual(['data']);
    });
  });
});
