import { Response, Request } from 'express';
import { Plant } from '../entities/plant';
import { CustomRequest } from '../interceptor/interceptor';

export const mockReqGet = {
  params: {},
} as unknown as Request;

export const mockReqGetParams = {
  query: {
    page: 1,
    elements: 1,
  },
} as unknown as Request;

export const mockReqGetParamsF = {
  query: {
    page: undefined,
    elements: undefined,
  },
} as unknown as Request;

export const mockReq = {
  body: {
    email: 'test email',
    passwd: 'test passwd',
    name: 'test name',
  },
} as unknown as Request;

export const mockCustomReq = {
  body: {
    email: 'test email',
    passwd: 'test passwd',
    name: 'test name',
  },
  credentials: {
    id: 'test id',
  },
} as unknown as CustomRequest;

export const mockReqId = {
  params: {
    id: 'test',
  },
} as unknown as Request;

export const mockReq1 = {
  body: {
    passwd: 'test passwd',
    name: 'test name',
  },
} as unknown as Request;
export const mockReq2 = {
  body: {
    email: 'test email',
    name: 'test name',
  },
} as unknown as Request;
export const mockReq3 = {
  body: {
    email: 'test email',
    passwd: 'test passwd',
  },
} as unknown as Request;
export const mockReq4 = {
  body: {},
} as unknown as Request;

export const mockResp = {
  status: jest.fn(),
  json: jest.fn(),
  send: jest.fn(),
} as unknown as Response;

export const mockReq5 = {
  headers: {
    test: 'test',
  },
} as unknown as Request;

export const mockReq6 = {
  headers: {
    authorization: 'test token',
  },
} as unknown as Request;

export const mockNext = jest.fn();

export const mockPlants = [
  {
    body: {
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      lightness: 'medium',
      humidity: 'high',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      humidity: 'high',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      difficulty: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      difficulty: 'easy',
    },
  },
];

export const mockPlantsComplete = {
  body: {
    photo: 'http://test.com/test.jpg',
    name: 'Test plant',
    location: 'test',
    height: 20,
    lightness: 'medium',
    humidity: 'high',
    difficulty: 'easy',
    animalFriendly: true,
  },
  credentials: {
    id: 'test id',
  },
} as unknown as Request;

export const mockEditPlant = {
  photo: 'http://test.com/test.jpg',
  name: 'Test plant',
  lightness: 'medium',
  humidity: 'high',
  animalFriendly: true,
} as unknown as Partial<Plant>;

export const mockReqPa = {
  params: 'test',
} as unknown as Request;

export const mockReqPaId = {
  params: {
    id: '',
  },
} as unknown as Request;
