import { Router } from 'express';
import { PlantsController } from '../controllers/plant.controller.js';
import { Interceptors } from '../interceptor/interceptor.js';
import { PlantsMongoRepo } from '../repositories/plants/plants.mongo.repo.js';

export const plantRouter = Router();

const repo = PlantsMongoRepo.getInstance();
const controller = new PlantsController(repo);

plantRouter.post('/add', Interceptors.logged, controller.add.bind(controller));
