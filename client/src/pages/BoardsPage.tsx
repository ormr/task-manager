import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css';

import { getBoards } from '../actions/boardPreviewActions';
import { IState, IBoardsPreview } from '../actions/constants';
import { BoardLink } from '../components/Board';
import { AddItem } from '../components/AddItem';
import { Spinner } from '../components/Spinner';

interface Props {
  boards: IBoardsPreview;
  getBoards: () => void;
}

const BoardsPageView: React.FC<Props> = ({
  boards: { boards, loading, error },
  getBoards,
}: Props) => {
  React.useEffect(() => {
    getBoards();
  }, [getBoards]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Spinner />;
  }

  return (
    <div className="boards">
      {boards.map(({ boardId, title }) => (
        <BoardLink key={boardId} id={boardId} title={title} />
      ))}
      <AddItem item="board" />
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return { boards };
};

export const BoardsPage = connect(mapStateToProps, { getBoards })(
  BoardsPageView
);
