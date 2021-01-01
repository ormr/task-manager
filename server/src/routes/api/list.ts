import express from 'express';
import { listController } from '../../controllers'

const listRouter = express.Router();

listRouter.get('/', listController.getAll);
listRouter.get('/:id', listController.getById);
listRouter.post('/', listController.create);

export {
  listRouter
};