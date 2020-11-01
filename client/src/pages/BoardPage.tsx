import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './BoardPage.css';

import { IState, IBoard, IList, ICard, IDrag } from '../actions/constants';
import { moveCardItem } from '../actions/cardsActions';
import { AddItem } from '../components/AddItem';
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
          Back
        </Link>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div className="lists" {...provided.droppableProps} ref={provided.innerRef}>
            {
              listOrders.map((id: string, index: number) => {
                const list = lists.find((list: IList) => list.id === id);

                if (list) {
                  if (list.cards === undefined) return null;
                  const listsCards = list.cards.map(
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
          <AddItem item="list" boardId={boardId}/>
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
