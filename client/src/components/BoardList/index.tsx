import React from 'react';
import { connect } from 'react-redux';
import './index.css';

import { getBoards } from '../../actions/boardPreviewActions';
import { IState, IBoardsPreview } from '../../actions/constants';
import { AddItem } from '../AddItem';
import { Spinner } from '../Spinner';
import { BoardListItem } from '../BoardListItem';
import {
  removeBoard,
  removeBoardProps,
} from '../../actions/boardPreviewActions';
import { Error } from '../Error';

interface Props {
  boards: IBoardsPreview;
  getBoards: () => void;
  removeBoard: (props: removeBoardProps) => void;
}

const BoardListView: React.FC<Props> = ({
  boards: { boards, loading, error },
  getBoards,
  removeBoard,
}: Props) => {
  React.useEffect(() => {
    getBoards();
  }, [getBoards]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="boards">
      {boards.map(({ boardId, title }) => (
        <BoardListItem
          key={boardId}
          boardId={boardId}
          title={title}
          onBoardClick={() => removeBoard({ boardId })}
        />
      ))}
      <AddItem item="board" />
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return { boards };
};

export const BoardList = connect(mapStateToProps, { getBoards, removeBoard })(
  BoardListView
);
