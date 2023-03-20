import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { HTTPError } from '../errors/error.js';
import { PlantRepo } from '../repositories/plants/plant.interface.js';
import { CustomRequest } from '../interceptor/interceptor.js';

const debug = createDebug('WFP:controller: plants');

export class PlantsController {
  constructor(public repo: PlantRepo) {
    debug('Instantiate');
  }

  async add(req: CustomRequest, resp: Response, next: NextFunction) {
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
      req.body.creator = req.credentials?.id;
      const result = await this.repo.create(req.body);
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
      const result = await this.repo.findAll();
      resp.status(200);
      return result;
    } catch (error) {
      next(error);
    }
  }
}
