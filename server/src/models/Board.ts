import mongoose, { model } from 'mongoose';
import { IBoard } from './types';

const Schema = mongoose.Schema;

export const BoardShema = new Schema({
  boardId: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  lists: {
    type: [
      {
        listId: {
          required: true,
          type: String
        },
        name: {
          required: true,
          type: String
        },
        cards: {
          type: [
            {
              cardId: {
                required: true,
                type: String
              },
              text: {
                required: true,
                type: String
              }
            }
          ],
          required: true
        }
      }
    ],
    required: true
  }
});

export const Board = model<IBoard>('Board', BoardShema);