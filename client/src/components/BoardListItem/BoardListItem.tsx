import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { ReactComponent as DeleteIcon } from '../../assets/svg/DeleteIcon.svg';

interface Props {
  boardId: string;
  title: string;
  onBoardClick: () => void;
}

export const BoardListItem: React.FC<Props> = ({
  boardId,
  title,
  onBoardClick,
}: Props) => {
  return (
    <div className="board">
      <Link className="board__link" to={`/board/${boardId}`}>
        <h3>{title}</h3>
      </Link>
      <button className="delete-list--button" onClick={() => onBoardClick()}>
        <span className="delete-list--icon">
          <DeleteIcon />
        </span>
      </button>
    </div>
  );
};
