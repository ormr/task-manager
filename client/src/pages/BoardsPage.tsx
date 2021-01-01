import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css';

import { getBoards } from '../actions/boardActions';
import { IState, IBoard } from '../actions/constants';
import { BoardLink } from '../components/Board';
import { AddItem } from '../components/AddItem';

interface Props {
  boards: IBoard[];
  getBoards: () => any;
}

const BoardsPageView: React.FC<Props> = ({ boards, getBoards }: Props) => {
  React.useEffect(() => {
    getBoards();
  }, [getBoards]);
  return (
    <div className="boards">
      {boards.map(({ boardId, title }: IBoard) => (
        <BoardLink key={boardId} id={boardId} title={title} />
      ))}
      <AddItem item="board" />
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards,
  };
};

export const BoardsPage = connect(mapStateToProps, { getBoards })(
  BoardsPageView
);
