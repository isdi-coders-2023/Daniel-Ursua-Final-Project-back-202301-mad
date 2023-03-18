import createDebug from 'debug';
import { Plant, protoPlant } from '../../entities/plant';
import { Repo } from '../repo.interface';
import { PlantModel } from './plants.mongo.model';

const debug = createDebug('WFP:repository:plants');

export class PlantsMongoRepo implements Repo<Plant> {
  private static instance: PlantsMongoRepo;

  public static getInstance(): PlantsMongoRepo {
    if (!PlantsMongoRepo.instance) {
      PlantsMongoRepo.instance = new PlantsMongoRepo();
    }
    return PlantsMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }
  async create(info: protoPlant): Promise<Plant> {
    debug('Create');
    const data = await PlantModel.create(info);
    return data;
  }
  async search(query: { key: string; value: unknown }): Promise<Plant[]> {
    debug('Search');
    const data = await PlantModel.find({ [query.key]: query.value });
    return data;
  }
}
