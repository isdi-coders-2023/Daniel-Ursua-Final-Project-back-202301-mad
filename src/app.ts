import express from 'express';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './routers/user.router.js';

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
app.use('/', (_req, resp) => {
  resp.send({
    name: 'PlantApp',
    endpoint: '/users',
  });
});
