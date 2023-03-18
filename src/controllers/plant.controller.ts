import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { Plant } from '../entities/plant';
import { HTTPError } from '../errors/error';
import { Repo } from '../repositories/repo.interface';
import jwt from 'jsonwebtoken';

const debug = createDebug('WFP:controller: plants');

export class PlantsController {
  constructor(public repo: Repo<Plant>) {
    debug('Instantiate');
  }
  async checkUser(req: Request, next: NextFunction) {
    try {
      if (!req.headers.authorization)
        throw new HTTPError(400, 'Bad request', 'Request required');
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      if (typeof decodedToken !== 'object')
        throw new HTTPError(401, 'Unauthorized', 'Invalid token');
      const userId = decodedToken.id;
      return userId;
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('add: post');
      if (
        !req.body.photo ||
        !req.body.name ||
        !req.body.ubication ||
        !req.body.height ||
        !req.body.lightness ||
        !req.body.humidity ||
        !req.body.difficult ||
        !req.body.animalFriendly
      )
        throw new HTTPError(400, 'Bad request', 'Incomplete information');
      const data = await this.repo.search({
        key: 'name',
        value: req.body.name,
      });
      if (data.length)
        throw new HTTPError(409, 'Conflict', 'Register already exist');
      const user = await this.repo.search({
        key: 'id',
        value: this.checkUser(req, next),
      });
      req.body.creator = user[0];
      this.repo.create(req.body);
      resp.status(201);
      debug('New register created');
    } catch (error) {
      next(error);
    }
  }
}
