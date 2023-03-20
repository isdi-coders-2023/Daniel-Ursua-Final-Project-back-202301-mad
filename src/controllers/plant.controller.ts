import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { HTTPError } from '../errors/error.js';
import jwt from 'jsonwebtoken';
import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';
import { PlantRepo } from '../repositories/plants/plant.interface.js';

const debug = createDebug('WFP:controller: plants');

export class PlantsController {
  constructor(public repo: PlantRepo) {
    debug('Instantiate');
  }

  async add(Customreq: Request, resp: Response, next: NextFunction) {
    try {
      debug('add: post');
      if (
        !Customreq.body.photo ||
        !Customreq.body.name ||
        !Customreq.body.ubication ||
        !Customreq.body.height ||
        !Customreq.body.lightness ||
        !Customreq.body.humidity ||
        !Customreq.body.difficult ||
        !Customreq.body.animalFriendly
      )
        throw new HTTPError(400, 'Bad request', 'Incomplete information');
      const data = await this.repo.search({
        key: 'name',
        value: Customreq.body.name,
      });
      if (data.length)
        throw new HTTPError(409, 'Conflict', 'Register already exist');
      Customreq.body.creator = Customreq.credentials.id;
      const result = await this.repo.create(Customreq.body);
      debug('New register created');
      resp.status(201);
      resp.json({
        results: [result],
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll: get');
      const result = await this.repo.findAll;
      resp.status(200);
      return result;
    } catch (error) {
      next(error);
    }
  }
}
