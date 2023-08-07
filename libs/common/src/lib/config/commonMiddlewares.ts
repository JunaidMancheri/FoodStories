import { Express, json, urlencoded } from 'express';
import cors  from 'cors';
import morgan from 'morgan';

export function setUpCommonMiddlewares(app: Express): Express {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(json());
  app.use(urlencoded({extended:  true}));
  return app;
}