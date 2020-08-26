import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import './BoardsPage.css';

import { moveCardItem } from '../actions/card';
import { IDrag } from '../actions/constants';
import { AddList } from '../components/List/AddList'
import { List } from '../components/List/List';
import { ErrorPage } from './ErrorPage';

interface Props {
  id: number
  reducer: any
  moveCardItem: (props: IDrag) => void
}

const BoardPageView: React.FC<Props> = ({ id, reducer, moveCardItem }: Props): JSX.Element => {

  if (!reducer[id]) {
    return (
      <ErrorPage />
    );
  }

  const boardId = +id;

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
  }

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    moveCardItem({
      boardId: id,
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId
    })    
  }

return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="boards">
      <Link to="/">
        <svg
          width="22"
          height="15"
          viewBox="0 0 22 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="6" width="19.5" height="2" fill="#C4C4C4" />
          <rect
            x="1.24609"
            y="5.832"
            width="10.2376"
            height="1.70709"
            transform="rotate(45 1.24609 5.832)"
            fill="#C4C4C4"
          />
          <rect
            x="0.0394287"
            y="7.03177"
            width="9.94445"
            height="2"
            transform="rotate(-45 0.0394287 7.03177)"
            fill="#C4C4C4"
          />
        </svg>
      </Link>
      {reducer[boardId].lists.map(({ id, title }: any, index: number) => (
        <List key={index} listId={index} boardId={boardId} title={title} />
      ))}
      <AddList boardId={boardId} />
    </div>
  </DragDropContext>
);
}

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  };
};

export const BoardPage = connect(mapStateToProps, { moveCardItem })(BoardPageView);
