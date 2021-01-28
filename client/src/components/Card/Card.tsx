import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ItemTitle } from '../ItemTitle';
import './index.css';

interface Props {
  index: number;
  cardId: string;
  text: string;
  onValueChange: (props: {
    type: string;
    cardId: string;
    value: string;
  }) => void;
  onItemDelete: (props: { type: string; cardId: string }) => void;
}

export const Card: React.FC<Props> = ({
  index,
  cardId,
  text,
  onValueChange,
  onItemDelete,
}: Props): JSX.Element => {
  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ItemTitle
            type="card"
            onValueChange={(props) => onValueChange({ cardId, ...props })}
            onItemDelete={(props) => onItemDelete({ cardId, ...props })}
          >
            {text}
          </ItemTitle>
        </div>
      )}
    </Draggable>
  );
};
