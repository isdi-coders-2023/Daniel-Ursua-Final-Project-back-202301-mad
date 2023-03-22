import { Plant } from '../../entities/plant';

export interface PlantRepo {
  create(info: Plant): Promise<Plant>;
  search(query: { key: string; value: unknown }): Promise<Plant[]>;
  findAll(): Promise<Plant[]>;
  edit(info: Partial<Plant>): Promise<Plant>;
  findById(id: string): Promise<Plant>;
}
