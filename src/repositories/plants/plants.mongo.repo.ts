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
  async deleteById(id: string): Promise<void> {
    debug('Delete');
    const data = await PlantModel.findByIdAndDelete(id).exec();
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: ID not found'
      );
  }
  async findAll(page: number, elements: number): Promise<Plant[]> {
    debugger;
    debug('Get all');
    const data = await PlantModel.find(
      {},
      {
        photo: 1,
        name: 1,
        location: 1,
      }
    )
      .limit(elements)
      .skip((Math.max(page, 1) - 1) * elements)
      .exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Not found');
    return data;
  }
  async edit(plant: Partial<Plant>): Promise<Plant> {
    debug('Edit');
    const updatedPlant = await PlantModel.findByIdAndUpdate(plant.id, plant, {
      new: true,
    }).exec();
    if (!updatedPlant)
      throw new HTTPError(
        404,
        'Not found',
        'Update not possible: id not found'
      );

    debug('Plant updated!');
    return updatedPlant;
  }
  async findById(id: string): Promise<Plant> {
    debug('Get by id');
    const plantSelected = await PlantModel.findById(id)
      .populate('creator')
      .exec();
    if (!plantSelected) {
      throw new HTTPError(404, 'Not found', 'Register not found');
    }
    debug('ID found!');
    return plantSelected;
  }
}
