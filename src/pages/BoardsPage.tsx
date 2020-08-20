import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css'

import { Board } from '../components/Board';
import { AddBoard } from '../components/App/AddBoard';

const BoardsPageView: React.FC = ({ board }: any): JSX.Element => {
  return (
    <div className="boards">
      {
        board.map(({ title }: any, index: number) => (
          <Board key={index} title={title} />
        ))
      }
        <AddBoard />
    </div>
  );
};

const mapStateToProps = ({ board }: any) => {
  return {
    board
  };
}

export const BoardsPage = connect(mapStateToProps)(BoardsPageView)