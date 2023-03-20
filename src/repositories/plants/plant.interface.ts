import { Plant } from '../../entities/plant';

export interface PlantRepo {
  create(info: Plant): Promise<Plant>;
  search(query: { key: string; value: unknown }): Promise<Plant[]>;
  findAll(): Promise<Plant[]>;
}
