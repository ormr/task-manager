import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Text } from './Text';
import './index.css';

interface Props {
  id: string
  index: number
  text: string
}

export const Card: React.FC<Props> = ({ id, text, index }: Props): JSX.Element => {
  return (
    <Draggable draggableId={id} index={index}>
      {
        (provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="card"
          >
            <Text cardId={id}>{ text }</Text>
          </div>
        )
      }
    </Draggable>
  );
}