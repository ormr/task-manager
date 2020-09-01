import React from 'react';
import { Title } from './Title';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './index.css';

import { ICard } from '../../actions/constants';
import { Card } from '../Card';
import { AddCard } from '../Card/AddCard';

interface Props {
  cards: (ICard | undefined)[]
  listId: string
  title: string
  index: number
}

export const List: React.FC<Props> = ({
  cards,
  listId,
  title,
  index
}: Props): JSX.Element => {
  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listId)}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="list-item"
              >
                <Title listId={listId}>{title}</Title>
                <div className="list-item-inner">
                  {cards.map((card: (ICard | undefined), index: number) => {
                    if (!card) {
                      return null;
                    } else {
                      const { id, text } = card;
                      return <Card key={id} id={id} index={index} text={text} />;
                    }
                  })}
                </div>
                {provided.placeholder}
                <AddCard listId={listId} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};