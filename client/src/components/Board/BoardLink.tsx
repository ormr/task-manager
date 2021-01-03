import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';

import {
  removeBoard,
  removeBoardProps,
} from '../../actions/boardPreviewActions';

interface Props {
  boardId: string;
  title: string;
  removeBoard(boardId: removeBoardProps): void;
}

export const BoardLinkView: React.FC<Props> = ({
  boardId,
  title,
  removeBoard,
}: Props): JSX.Element => {
  return (
    <div className="board">
      <Link className="board__link" to={`/board/${boardId}`}>
        <h3>{title}</h3>
      </Link>
      <button
        className="delete-list--button"
        onClick={() => removeBoard({ boardId })}
      >
        <span className="delete-list--icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" width="2" height="10" fill="#A9ACBF" />
            <rect
              y="6"
              width="2"
              height="10"
              transform="rotate(-90 0 6)"
              fill="#A9ACBF"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export const BoardLink = connect(null, { removeBoard })(BoardLinkView);
