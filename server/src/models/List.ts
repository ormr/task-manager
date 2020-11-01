import mongoose, { model } from 'mongoose';
import { IList } from './types';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
  boardId: {
    type: String
  },
  id: {
    type: Schema.Types.ObjectId
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

export const List = model<IList>('list', ListSchema)