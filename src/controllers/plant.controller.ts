import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { Plant } from '../entities/plant.js';
import { HTTPError } from '../errors/error.js';
import { Repo } from '../repositories/repo.interface.js';
import jwt from 'jsonwebtoken';
import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';

const debug = createDebug('WFP:controller: plants');

export class PlantsController {
  constructor(public repo: Repo<Plant>) {
    debug('Instantiate');
  }
  async checkUser(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Searching');
      if (!req.headers.authorization)
        throw new HTTPError(400, 'Bad request', 'Request required');
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      if (typeof decodedToken !== 'object')
        throw new HTTPError(401, 'Unauthorized', 'Invalid token');
      const userMail = decodedToken.email;
      resp.status(200);
      return userMail;
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
      const userMail = await this.checkUser(req, resp, next);
      const userRepo = UsersMongoRepo.getInstance();
      const user = await userRepo.search({
        key: 'email',
        value: userMail,
      });
      req.body.creator = user[0];
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
}
