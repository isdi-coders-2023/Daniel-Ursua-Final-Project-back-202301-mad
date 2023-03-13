import { Plant } from './plant';

export type User = {
  name: string;
  email: string;
  password: string;
  plantList: Plant[];
  myPlants: Plant[];
};
