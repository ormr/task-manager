import mongoose, { model } from 'mongoose';
import { IBoard } from './types';

const Schema = mongoose.Schema;

export const BoardShema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  lists: [
    {
      type: String
    }
  ]
});

export const Board = model<IBoard>('board', BoardShema);