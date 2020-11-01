import express from 'express';
import { listController } from '../../controllers'

const listRouter = express.Router();

listRouter.get('/', listController.getAll);

export {
  listRouter
};