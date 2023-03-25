import { User } from './user';

export type Ubication = 'Indoor' | 'Outdoor' | 'Both';

export type hasId = {
  id: string;
};

export type protoPlant = {
  photo: string;
  name: string;
  ubication: Ubication;
  height: string;
  lightness: string;
  humidity: string;
  difficult: string;
  animalFriendly: boolean;
  creator: User;
};

export type Plant = hasId & protoPlant;
