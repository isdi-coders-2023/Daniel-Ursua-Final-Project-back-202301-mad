import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { User } from '../entities/user.js';
import { Repo } from '../repositories/repo.interface.js';
import { HTTPError } from '../errors/error.js';
import { Auth, TokenPayload } from '../services/auth.js';
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
      const payload: TokenPayload = {
        id: data[0].id,
        email: data[0].email,
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
      debug('Login successful');
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('post register');
      if (!req.body.email || !req.body.passwd || !req.body.name) {
        throw new HTTPError(400, 'Bad request', 'Incomplete information');
      }
      console.log(req.body.email, req.body.passwd, req.body.name);
      console.log(await Auth.hash(req.body.passwd));
      req.body.passwd = await Auth.hash(req.body.passwd);
      req.body.plantList = [];
      req.body.myPlants = [];
      const data = await this.repo.create(req.body);
      console.log(data);
      resp.json({
        results: [data],
      });
      debug('Register successful');
    } catch (error) {
      next(error);
    }
  }
}
