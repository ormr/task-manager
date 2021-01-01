import { Document } from 'mongoose';

export interface ICard extends Document {
  cardId: string;
  listId: string;
  text: string;
};

export interface IList extends Document {
  listId: string;
  boardId: string;
  title: string;
  cards: string[];
};

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