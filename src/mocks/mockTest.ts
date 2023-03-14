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
} as unknown as Response;

export const mockNext = jest.fn();
