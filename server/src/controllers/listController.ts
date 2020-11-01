import { Request, Response } from 'express';
import { List } from '../models';

export const listController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await List.find({});
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ msg: 'Error' })
    }
  }
}