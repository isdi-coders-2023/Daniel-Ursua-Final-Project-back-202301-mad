import { NextFunction, Response } from 'express';
import { Auth, TokenPayload } from '../services/auth.js';
import { CustomRequest, Interceptors } from './interceptor.js';

jest.mock('../services/auth.js');

const mockReq = {
  get: jest.fn(),
} as unknown as CustomRequest;
const mockResp = {} as Response;
const next = jest.fn() as NextFunction;

describe('Given the interceptors class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the logged method', () => {
    describe('And called with correct parameters', () => {
      test('Then it should call next function', () => {
        (mockReq.get as jest.Mock).mockReturnValue('Bearer test');
        (Auth.verifyJWT as jest.Mock).mockResolvedValue({
          id: 'Test',
        } as TokenPayload);
        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And called with no Authorization header', () => {
      test('Then it should call next function (error)', () => {
        (mockReq.get as jest.Mock).mockReturnValue(undefined);

        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When Authorization header not start with "Bearer"', () => {
      test('Then it should call next function (error)', () => {
        (mockReq.get as jest.Mock).mockReturnValue('Test token');

        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
