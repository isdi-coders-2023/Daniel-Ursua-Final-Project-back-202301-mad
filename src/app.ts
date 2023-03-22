import express, { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './routers/user.router.js';
import { plantRouter } from './routers/plant.router.js';
import { CustomError } from './errors/error.js';

const debug = createDebug('WFP:APP');

export const app = express();
app.disable('x_powered-by');
debug('Starting');

app.use(morgan('dev'));
app.use(express.static('public'));
const corsOriginis = {
  origin: '*',
};
app.use(cors(corsOriginis));
app.use(express.json());

app.use('/users', userRouter);
app.use('/plants', plantRouter);
app.use('/', (_req, resp) => {
  resp.send({
    name: 'PlantApp',
    endpoint: ['/users', '/plants'],
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal Server Error';
    resp.status(status);
    debug('Error: ', status, statusMessage);
    debug(error.name, ': ', error.message);

    resp.json({
      error: [{ status, statusMessage }],
    });
  }
);
