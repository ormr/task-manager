import express from 'express';
import { boardController } from '../../controllers'

const boardRouter = express.Router();

boardRouter.get('/', boardController.getAll);

export {
  boardRouter
};