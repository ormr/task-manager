import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface Props {
  id: string;
  title: string;
}

export const BoardLink: React.FC<Props> = ({
  id,
  title,
}: Props): JSX.Element => {
  return (
    <Link to={'/board/' + id} className="board">
      <h3>{title}</h3>
    </Link>
  );
};
