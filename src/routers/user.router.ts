import { Router } from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { UsersMongoRepo } from '../repositories/users/users.mongo.repo.js';

export const userRouter = Router();

const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

userRouter.post('/register', controller.register.bind(controller));
userRouter.post('/login', controller.login.bind(controller));
