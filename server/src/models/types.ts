import { Document } from 'mongoose';

export interface IBoard extends Document {
  id: string;
  title: string;
  lists: string[];
};

export interface ICard extends Document {
  id: string;
  listId: string;
  text: string;
};

export interface IList extends Document {
  boardId: string;
  id: string;
  title: string;
  cards: string[];
};