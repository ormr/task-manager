import { Request, Response } from 'express';
import { Card } from '../models';

export const cardController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await Card.find({});
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ msg: 'Error' })
    }
  }
}