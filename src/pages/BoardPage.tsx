import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './BoardPage.css';

import { IState, IBoard, IList, ICard, IDrag } from '../actions/constants';
import { moveCardItem } from '../actions/cardsActions';
import { AddList } from '../components/List/AddList'
import { List } from '../components/List/List';
import { ErrorPage } from './ErrorPage';

interface Props {
  boardId: number
  boards: IBoard[]
  lists: IList[]
  cards: ICard[]
  moveCardItem: (props: IDrag) => void
}

const BoardPageView: React.FC<Props> = ({ boardId, boards, lists, cards, moveCardItem }: Props): JSX.Element => {
  
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
      type
    })    
  }

  const board = boards[boardId];

  if (!board) {
    return (
      <ErrorPage />
    );
  }
  const listOrders = board.lists;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-page">
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
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div className="lists" {...provided.droppableProps} ref={provided.innerRef}>
            {
              listOrders.map((id: string, index: number) => {
                const list = lists.find((list: IList) => list.id === id);

                if (list) {
                  const listsCards: any = list.cards.map(
                    (listCard: string) => {
                      return cards.find((item: ICard) => listCard === item.id);
                    });

                  return (
                    <List
                      key={list.id}
                      listId={list.id}
                      cards={listsCards}
                      title={list.title}
                      index={index}
                    />
                  );
                }
                return null;
              }
            )}
          {provided.placeholder}
          <AddList boardId={boardId}/>
          </div>
        )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

const mapStateToProps = ({ boards, lists, cards }: IState) => {
  return { boards, lists, cards };
};

export const BoardPage = connect(mapStateToProps, { moveCardItem })(BoardPageView);
