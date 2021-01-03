import React from 'react';
import { Title } from './Title';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './index.css';

import { ICard } from '../../actions/constants';
import { Card } from '../Card';
import { AddCard } from '../Card/AddCard';

interface Props {
  cards: ICard[];
  boardId: string;
  listId: string;
  title: string;
  index: number;
}

export const List: React.FC<Props> = ({
  cards,
  boardId,
  listId,
  title,
  index,
}: Props): JSX.Element => {
  const listBody = cards ? (
    <React.Fragment>
      <Title boardId={boardId} listId={listId}>
        {title}
      </Title>
      <div className="list-item-inner">
        {cards.map((card, index) => {
          return !card ? null : (
            <Card
              key={card.cardId}
              cardId={card.cardId}
              boardId={boardId}
              listId={listId}
              text={card.text}
              index={index}
            />
          );
        })}
      </div>
    </React.Fragment>
  ) : null;

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={listId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list-item"
              >
                {listBody}
                {provided.placeholder}
                <AddCard boardId={boardId} listId={listId} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
