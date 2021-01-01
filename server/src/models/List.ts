import mongoose, { model } from 'mongoose';
import { IList } from './types';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listId: {
    required: true,
    type: String
  },
  boardId: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  cards: [
    {
      type: String
    }
  ]
});

export const List = model<IList>('List', ListSchema)