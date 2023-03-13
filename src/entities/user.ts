import { Plant } from './plant';

export type User = {
  name: string;
  email: string;
  passwd: string;
  plantList: Plant[];
  myPlants: Plant[];
};
