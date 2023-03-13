import { User } from './user';

type Grade = ['Low', 'Medium', 'High'];

export type Plant = {
  photo: string;
  name: string;
  ubication: string;
  height: number;
  lightness: Grade;
  humidity: Grade;
  difficult: Grade;
  animalFriendly: boolean;
  creator: User;
};
