import { Request, Response, NextFunction, request, response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../models'

export const boardController = {
  getAll: async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const boards = await Board.find();
      const newBoards = boards.map(({ boardId, title, lists }) => {

        const newLists = lists.map((list) => list.listId);

        return {
          boardId,
          title,
          lists: newLists
        };
      })
      return res.json(newBoards);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  getBoard: async (req: Request, res: Response, _next: NextFunction) => {
    const { board_id: boardId } = req.params;

    try {
      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  addBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body;

      const newBoard = {
        boardId: uuidv4(),
        title,
        lists: []
      }

      await Board.create(newBoard, (err: Error) => {
        if (err) return next(err);
        return res.json(newBoard);
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  addList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId } = req.params;
      const { name } = req.body;
      const board = await Board.findOne({ boardId });

      if (!board) {
        console.log(boardId, name, board);
        return res.status(404).json({ msg: 'Board is not found' });
      }

      const newList = {
        listId: uuidv4(),
        name,
        cards: []
      }

      board.lists.push(newList);

      await board.save();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  addCard: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId, list_id: listId } = req.params;
      const { text } = req.body;
      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      const list = board.lists.find((list) => list.listId === listId);

      if (!list) {
        return res.status(404).json({ msg: 'List is not found' });
      }

      const newCard = {
        cardId: uuidv4(),
        text
      };

      list.cards.unshift(newCard);

      await board.save();

      return res.json(board);

    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  updateBoard: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId } = req.params;
      const { title } = req.body;

      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      board.title = title;

      board.save();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  updateList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId, list_id: listId } = req.params;
      const { name } = req.body;

      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      const listIndex = board.lists.findIndex((list) => list.listId === listId);

      const list = board.lists[listIndex];

      if (!list) {
        return res.status(404).json({ msg: 'List is not found' });
      }

      list.name = name;

      board.save();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  updateCard: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId, list_id: listId, card_id: cardId } = req.params;
      const { text } = req.body;

      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      const listIndex = board.lists.findIndex((list) => list.listId === listId);

      const list = board.lists[listIndex];

      if (!list) {
        return res.status(404).json({ msg: 'List is not found' });
      }

      const cardIndex = list.cards.findIndex((card) => card.cardId === cardId);

      const card = list.cards[cardIndex];

      card.text = text;

      board.save();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  drag: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId } = req.params;
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = req.body;

      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      if (type === 'list') {
        const pulledOutlist = board.lists.splice(droppableIndexStart, 1);
        board.lists.splice(droppableIndexEnd, 0, ...pulledOutlist);
      }

      if (type === 'DEFAULT') {
        if (droppableIdStart === droppableIdEnd) {
          const list = board.lists.find((list) => droppableIdStart === list.listId);

          if (!list) {
            return res.status(404).json({ msg: 'List is not found' });
          }

          const cards = list.cards.splice(droppableIndexStart, 1);
          list.cards.splice(droppableIndexEnd, 0, ...cards);
        }

        if (droppableIdStart !== droppableIdEnd) {
          const listStart = board.lists.find((list) => droppableIdStart === list.listId);

          if (!listStart) {
            return res.status(404).json({ msg: 'List is not found' });
          }

          const card = listStart.cards.splice(droppableIndexStart, 1);
          const list = board.lists.find((list) => droppableIdEnd === list.listId);

          if (!list) {
            return res.status(404).json({ msg: 'List is not found' });
          }

          list.cards.splice(droppableIndexEnd, 0, ...card);
        }
      }

      board.save();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  deleteBoard: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const boardId = req.params.board_id;
      const board = await Board.findOne({ boardId });

      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      board.remove();

      return res.json(board);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  deleteList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId, list_id: listId } = req.params;
      const board = await Board.findOne({ boardId });


      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      board.lists = board.lists.filter((list) => list.listId !== listId);

      await board.save();

      return res.json(board.lists);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  },
  deleteCard: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { board_id: boardId, list_id: listId, card_id: cardId } = req.params;
      const board = await Board.findOne({ boardId });


      if (!board) {
        return res.status(404).json({ msg: 'Board is not found' });
      }

      const listRemoveIndex = board.lists.findIndex((list) => list.listId === listId);

      const list = board.lists[listRemoveIndex];

      if (!list) {
        return res.status(404).json({ msg: 'List is not found' });
      }

      const newCards = list.cards.filter((card) => card.cardId !== cardId);

      list.cards = newCards;

      await board.save();

      return res.json(list.cards);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
};