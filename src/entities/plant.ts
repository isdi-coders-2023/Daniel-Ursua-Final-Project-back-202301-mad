import { User } from './user';

type Grade = 'Low' | 'Medium' | 'High';
export type Ubication = 'Indoor' | 'Outdoor' | 'Both';

export type hasId = {
  id: string;
};

export type protoPlant = {
  photo: string;
  name: string;
  ubication: Ubication;
  height: string;
  lightness: Grade;
  humidity: Grade;
  difficult: Grade;
  animalFriendly: boolean;
  creator: User;
};

export type Plant = hasId & protoPlant;
