import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css'

import { IState, IBoard } from '../actions/constants'
import { BoardLink } from '../components/Board';
import { AddItem } from '../components/AddItem';

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
        <AddItem item="board" />
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards
  };
}

export const BoardsPage = connect(mapStateToProps)(BoardsPageView)