import express from 'express';
import { boardController } from '../../controllers'

const boardRouter = express.Router();

// Get
boardRouter.get('/all', boardController.getAll);
boardRouter.get('/:board_id', boardController.getBoard);
// Add
boardRouter.post('/', boardController.addBoard);
boardRouter.put('/:board_id/list', boardController.addList);
boardRouter.put('/:board_id/list/:list_id/card', boardController.addCard);
// Delete
boardRouter.delete('/:board_id', boardController.deleteBoard);
boardRouter.delete('/:board_id/list/:list_id', boardController.deleteList);
boardRouter.delete('/:board_id/list/:list_id/card/:card_id', boardController.deleteCard);
// Update
boardRouter.put('/update/:board_id', boardController.updateBoard);
boardRouter.put('/update/:board_id/list/:list_id', boardController.updateList);
boardRouter.put('/update/:board_id/list/:list_id/card/:card_id', boardController.updateCard);
// Drag
boardRouter.put('/drag/:board_id', boardController.drag);

export {
  boardRouter
};

