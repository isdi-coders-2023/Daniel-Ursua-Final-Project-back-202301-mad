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
        !req.body.difficult
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
  async editPlant(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('edit: patch');
      const result = await this.repo.edit(req.body);
      if (!result) {
        throw new HTTPError(404, 'Register not found', 'Register not found');
      }
      debug('Register updated');
      resp.status(201);
      resp.json({
        results: [result],
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getId: get');
      const result = await this.repo.findById(req.params.id);
      if (!result) {
        throw new HTTPError(404, 'Register not found', 'Id not found');
      }
      debug('Id found');
      resp.status(302);
      resp.json({
        results: [result],
      });
    } catch (error) {
      next(error);
    }
  }
}
