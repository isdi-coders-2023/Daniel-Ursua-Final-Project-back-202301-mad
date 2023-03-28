import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/error.js';
import { Auth, TokenPayload } from '../services/auth.js';
import createDebug from 'debug';

const debug = createDebug('WFP:interceptor');

export interface CustomRequest extends Request {
  credentials?: TokenPayload;
}

export abstract class Interceptors {
  static logged(req: CustomRequest, _resp: Response, next: NextFunction) {
    debugger;
    try {
      debug('Logging...');
      debugger;
      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HTTPError(
          498,
          'Token expired/invalid',
          'No authorization header found'
        );

      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(
          498,
          'Token expired/invalid',
          'No Bearer in auth header'
        );

      const token = authHeader.split(' ')[1];
      const tokenPayload = Auth.verifyJWT(token);
      req.credentials = tokenPayload;
      next();
    } catch (error) {
      next(error);
    }
  }
}
