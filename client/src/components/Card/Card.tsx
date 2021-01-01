import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Text } from './Text';
import './index.css';

interface Props {
  boardId: string;
  listId: string;
  cardId: string;
  index: number;
  text: string;
}

export const Card: React.FC<Props> = ({
  boardId,
  listId,
  cardId,
  text,
  index,
}: Props): JSX.Element => {
  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          <Text boardId={boardId} listId={listId} cardId={cardId}>
            {text}
          </Text>
        </div>
      )}
    </Draggable>
  );
};
