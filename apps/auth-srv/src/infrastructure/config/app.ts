import express from 'express';
import { setUpCommonMiddlewares } from '@common'


const app = express();

setUpCommonMiddlewares(app);


export default app;



