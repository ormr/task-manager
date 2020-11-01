import { Request, Response, NextFunction } from 'express';
import { Board } from '../models'

export const boardController = {
  getAll: async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const data = await Board.find({});
      console.log(data)
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ msg: 'Error' })
    }
  },
  create: async (_req: Request, res: Response, _next: NextFunction) => {

  }
}