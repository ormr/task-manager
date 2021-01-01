import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './BoardPage.css';

import { IState, IList, IDrag } from '../actions/constants';
import { moveCardItem } from '../actions/cardsActions';
import { AddItem } from '../components/AddItem';
import { List } from '../components/List/List';
import { ErrorPage } from './ErrorPage';
import { getLists } from '../actions/listsActions';

interface Props {
  boardId: string;
  lists: IList[];
  moveCardItem: (props: IDrag) => void;
  getLists: (props: { boardId: string }) => void;
}

const BoardPageView: React.FC<Props> = ({
  boardId,
  lists,
  moveCardItem,
  getLists,
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

  if (!lists) {
    return <ErrorPage />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-page">
        <Link to="/">Back</Link>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="lists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map(({ listId, cards, name }, index) => {
                return (
                  <List
                    key={listId}
                    listId={listId}
                    boardId={boardId}
                    cards={cards}
                    title={name}
                    index={index}
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

const mapStateToProps = ({ lists }: IState) => {
  return { lists };
};

export const BoardPage = connect(mapStateToProps, { getLists, moveCardItem })(
  BoardPageView
);
