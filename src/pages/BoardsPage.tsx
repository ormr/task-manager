import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css'

import { IState, IBoard } from '../actions/constants'
import { BoardLink } from '../components/Board';
import { AddBoard } from '../components/Board/AddBoard';

interface Props {
  boards: IBoard[]
}

const BoardsPageView: React.FC<Props> = ({ boards }: Props): JSX.Element => {
  return (
    <div className="boards">
      {
        boards.map(({ id, title }: IBoard) => (
          <BoardLink key={id} id={id} title={title} />
        ))
      }
        <AddBoard />
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards
  };
}

export const BoardsPage = connect(mapStateToProps)(BoardsPageView)