import createDebug from 'debug';
import { Plant, protoPlant } from '../../entities/plant.js';
import { HTTPError } from '../../errors/error.js';
import { PlantRepo } from './plant.interface.js';
import { PlantModel } from './plants.mongo.model.js';

const debug = createDebug('WFP:repository:plants');

export class PlantsMongoRepo implements PlantRepo {
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
    const data = await PlantModel.find({ [query.key]: query.value }).exec();
    return data;
  }
  async findAll(): Promise<Plant[]> {
    debug('Get all');
    const data = await PlantModel.find().exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Not found');
    return data;
  }
}
//Código recordatorio
//TODO Añadir el método getbyId para utilizarlo para rellenar el detalle. En ese método tendré que popular el campo creator.
