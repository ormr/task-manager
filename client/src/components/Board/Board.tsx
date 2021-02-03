import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './index.css';

import { IState, IBoard, IDrag } from '../../actions/constants';
import {
  editCardItem,
  editCardItemProps,
  removeCardItem,
  removeCardItemProps,
  moveCardItem,
} from '../../actions/cardsActions';
import {
  editListItem,
  editListItemProps,
  removeListItem,
  removeListItemProps,
  getLists,
} from '../../actions/boardActions';

import { AddItem } from '../AddItem';
import { List } from '../List/List';
import { Error } from '../Error';
import { Spinner } from '../Spinner';

interface Props {
  boardId: string;
  board: IBoard;
  moveCardItem: (props: IDrag) => void;
  getLists: (props: { boardId: string }) => void;
  editCardItem: (props: editCardItemProps) => void;
  editListItem: (props: editListItemProps) => void;
  removeCardItem: (props: removeCardItemProps) => void;
  removeListItem: (props: removeListItemProps) => void;
}

const BoardView: React.FC<Props> = ({
  boardId,
  board,
  moveCardItem,
  getLists,
  editCardItem,
  editListItem,
  removeCardItem,
  removeListItem,
}: Props) => {
  React.useEffect(() => {
    getLists({ boardId });
  }, [getLists, boardId]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    moveCardItem({
      boardId,
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
      type,
    });
  };

  if (!board.lists) {
    return <Error />;
  }

  if (board.loading) {
    return <Spinner />;
  }

  const onItemValueChange = (props: {
    type: string;
    boardId: string;
    listId: string;
    cardId?: string;
    value: string;
  }) => {
    const { type } = props;

    if (type === 'list') {
      const { boardId, listId, value } = props;

      editListItem({ boardId, listId, name: value });
    }

    if (type === 'card') {
      const { boardId, listId, cardId, value } = props;
      if (!cardId) return;

      editCardItem({ boardId, listId, cardId, text: value });
    }
  };

  const onItemDelete = (props: {
    type: string;
    boardId: string;
    listId: string;
    cardId?: string;
  }) => {
    const { type } = props;

    if (type === 'list') {
      const { boardId, listId } = props;

      removeListItem({ boardId, listId });
    }

    if (type === 'card') {
      const { boardId, listId, cardId } = props;
      if (!cardId) return;

      removeCardItem({ boardId, listId, cardId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-page">
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="lists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.lists.map(({ listId, cards, name }, index) => {
                return (
                  <List
                    key={listId}
                    listId={listId}
                    boardId={boardId}
                    cards={cards}
                    title={name}
                    index={index}
                    onValueChange={(props) =>
                      onItemValueChange({ boardId, ...props })
                    }
                    onItemDelete={(props) =>
                      onItemDelete({ boardId, ...props })
                    }
                  />
                );
              })}
              {provided.placeholder}
              <AddItem item="list" boardId={boardId} />
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = ({ board }: IState) => {
  return { board };
};

export const Board = connect(mapStateToProps, {
  moveCardItem,
  getLists,
  editCardItem,
  editListItem,
  removeCardItem,
  removeListItem,
})(BoardView);
