import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './index.css';

import { ICard } from '../../actions/constants';
import { Card } from '../Card';
import { AddItem } from '../AddItem';
import { ItemTitle } from '../ItemTitle';

interface Props {
  cards: ICard[];
  boardId: string;
  listId: string;
  title: string;
  index: number;
  onValueChange: (props: {
    type: string;
    listId: string;
    cardId?: string;
    value: string;
  }) => void;
  onItemDelete: (props: {
    type: string;
    listId: string;
    cardId?: string;
  }) => void;
}

export const List: React.FC<Props> = ({
  cards,
  boardId,
  listId,
  title,
  index,
  onValueChange,
  onItemDelete,
}: Props): JSX.Element => {
  const listBody = cards ? (
    <React.Fragment>
      <ItemTitle
        type="list"
        onValueChange={(props) => onValueChange({ listId, ...props })}
        onItemDelete={(props) => onItemDelete({ listId, ...props })}
      >
        {title}
      </ItemTitle>
      <div className="list-item-inner">
        {cards.map((card, index) => {
          return !card ? null : (
            <Card
              key={card.cardId}
              cardId={card.cardId}
              text={card.text}
              index={index}
              onValueChange={(props) => onValueChange({ listId, ...props })}
              onItemDelete={(props) => onItemDelete({ listId, ...props })}
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
          className="list-item__draggable"
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
                <AddItem item="card" boardId={boardId} listId={listId} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
