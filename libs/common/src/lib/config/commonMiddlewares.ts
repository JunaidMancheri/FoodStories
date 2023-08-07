import { Express, json, urlencoded } from 'express';
import * as  cors  from 'cors';
import * as morgan from 'morgan';

export function setUpCommonMiddlewares(app: Express): Express {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(json());
  app.use(urlencoded({extended:  true}));
  return app;
}