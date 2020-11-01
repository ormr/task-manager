import express from 'express';
import { cardController } from '../../controllers'

const cardRouter = express.Router();

cardRouter.get('/', cardController.getAll);

export {
  cardRouter
};