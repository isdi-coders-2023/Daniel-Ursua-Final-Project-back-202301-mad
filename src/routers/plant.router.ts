import { Router } from 'express';
import { PlantsController } from '../controllers/plant.controller';
import { PlantsMongoRepo } from '../repositories/plants/plants.mongo.repo';

export const plantRouter = Router();

const repo = PlantsMongoRepo.getInstance();
const controller = new PlantsController(repo);

plantRouter.post('/add', controller.add.bind(controller));
