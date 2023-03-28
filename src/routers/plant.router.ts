import { Router } from 'express';
import { PlantsController } from '../controllers/plant.controller.js';
import { Interceptors } from '../interceptor/interceptor.js';
import { PlantsMongoRepo } from '../repositories/plants/plants.mongo.repo.js';

export const plantRouter = Router();

const repo = PlantsMongoRepo.getInstance();
const controller = new PlantsController(repo);

plantRouter.post('/add', Interceptors.logged, controller.add.bind(controller));
plantRouter.patch(
  '/edit',
  Interceptors.logged,
  controller.editPlant.bind(controller)
);
plantRouter.get('/', Interceptors.logged, controller.getAll.bind(controller));
plantRouter.get(
  '/:id',
  Interceptors.logged,
  controller.getById.bind(controller)
);
plantRouter.delete(
  '/',
  Interceptors.logged,
  controller.deletePlant.bind(controller)
);
