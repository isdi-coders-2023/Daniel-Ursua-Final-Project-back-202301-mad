import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { User } from '../entities/user.js';
import { Repo } from '../repositories/repo.interface.js';
import { HTTPError } from '../errors/error.js';
import { Auth, PayloadToken } from '../services/auth.js';
const debug = createDebug('WFP:controller:users');

export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Instantiate');
  }
  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('login:post');
      if (!req.body.email || !req.body.passwd || !req.body.name)
        throw new HTTPError(400, 'Bad request', 'Incomplete information');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');
      if (!(await Auth.compare(req.body.passwd, data[0].passwd)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
