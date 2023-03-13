import { Plant } from './plant';

export type hasId = {
  id: string;
};
export type protoUser = {
  name: string;
  email: string;
  passwd: string;
  plantList: Plant[];
  myPlants: Plant[];
};

export type User = hasId & protoUser;
