import express from 'express';
import { cardController } from '../../controllers'

const cardRouter = express.Router();

cardRouter.get('/', cardController.getAll);
cardRouter.post('/', cardController.create);


export {
  cardRouter
};