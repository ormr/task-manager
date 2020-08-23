import React from 'react';
import './Card.css';

interface Props {
  boardId: number
  id: number
  text: string
}

export const Card: React.FC<Props> = ({ boardId, id, text }: Props): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <b>{id}</b>
      <p>
        { text }
      </p>
    </div>
  );
}