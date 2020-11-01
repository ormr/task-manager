import mongoose, { model } from 'mongoose';
import { ICard } from './types';

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  id: {
    type: String
  },
  listId: [
    {
      type: String
    }
  ],
  text: {
    type: String
  }
});

export const Card = model<ICard>('card', CardSchema);