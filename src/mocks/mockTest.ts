import { Response, Request } from 'express';

export const mockReq = {
  body: {
    email: 'test email',
    passwd: 'test passwd',
    name: 'test name',
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
      difficult: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      height: 20,
      lightness: 'medium',
      humidity: 'high',
      difficult: 'easy',
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
      difficult: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      lightness: 'medium',
      humidity: 'high',
      difficult: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      humidity: 'high',
      difficult: 'easy',
      animalFriendly: true,
    },
  },
  {
    body: {
      photo: 'http://test.com/test.jpg',
      name: 'Test plant',
      height: 20,
      lightness: 'medium',
      difficult: 'easy',
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
      difficult: 'easy',
    },
  },
];

export const mockPlantsComplete = {
  body: {
    photo: 'http://test.com/test.jpg',
    name: 'Test plant',
    ubication: 'test',
    height: 20,
    lightness: 'medium',
    humidity: 'high',
    difficult: 'easy',
    animalFriendly: true,
  },
} as unknown as Request;
