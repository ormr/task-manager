import { Document } from 'mongoose';

interface Card {
  cardId: string;
  text: string;
};

interface List {
  listId: string;
  name: string;
  cards: Card[]
}

export interface IBoard extends Document {
  boardId: string;
  title: string;
  lists: List[]
}