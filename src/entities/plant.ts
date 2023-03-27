import { User } from './user';

export type Location = 'Indoor' | 'Outdoor' | 'Both';

export type hasId = {
  id: string;
};

export type protoPlant = {
  photo: string;
  name: string;
  location: Location;
  height: string;
  lightness: string;
  humidity: string;
  difficulty: string;
  animalFriendly: boolean;
  creator: User;
};

export type Plant = hasId & protoPlant;
