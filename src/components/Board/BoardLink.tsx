import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface Props {
  id: number
  title: string
};

export const BoardLink: React.FC<Props> = ({ id, title }: Props): JSX.Element => {
  return (
    <div className="board">
      <h3>{title}</h3>
      <Link to={"/board/" + id }>Go</Link>
    </div>
  );
}