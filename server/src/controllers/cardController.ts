import { Request, Response, NextFunction } from 'express';
import { Card } from '../models';

export const cardController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await Card.find({});
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ msg: 'Error' })
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Card.create(req.body, (err: Error) => {
        if (err) return next(err);
        return res.json(req.body);
      });
    } catch (error) {
      return res.status(404).json({ msg: 'Error' });
    }
  }

}