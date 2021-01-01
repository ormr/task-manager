import mongoose, { model } from 'mongoose';
import { ICard } from './types';

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  cardId: {
    required: true,
    type: String
  },
  listId: [
    {
      type: String
    }
  ],
  text: {
    required: true,
    type: String
  }
});

export const Card = model<ICard>('Card', CardSchema);