import { User } from './user';

type Grade = 'Low' | 'Medium' | 'High';
export type Ubication = 'Indoor' | 'Outdoor' | 'Both';

export type Plant = {
  photo: string;
  name: string;
  ubication: Ubication;
  height: number;
  lightness: Grade;
  humidity: Grade;
  difficult: Grade;
  animalFriendly: boolean;
  creator: User;
};
