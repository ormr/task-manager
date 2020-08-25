import React from 'react';
import './index.css';

interface Props {
  boardId: number
  id: number
  text: string
}

export const Card: React.FC<Props> = ({ boardId, id, text }: Props): JSX.Element => {
  return (
    <div className="card">
      { text }
    </div>
    );
}