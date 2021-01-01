import { Request, Response, NextFunction } from 'express';
import { List } from '../models';

export const listController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await List.find({});
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ msg: 'Error' })
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const listId = req.params.id;
      const data = await List.find({ listId });
      return res.json(data);
    } catch (err) {
      return res.status(404).json({ msg: 'Error' });
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await List.create(req.body, (err: Error) => {
        if (err) return next(err);
        return res.json(req.body);
      });
    } catch (error) {
      return res.status(404).json({ msg: 'Error' });
    }
  }
}