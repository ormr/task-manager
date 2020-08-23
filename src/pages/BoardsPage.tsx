import React from 'react';
import { connect } from 'react-redux';
import './BoardsPage.css'

import { BoardLink } from '../components/Board';
import { AddBoard } from '../components/App/AddBoard';

const BoardsPageView: React.FC = ({reducer}: any): JSX.Element => {
  return (
    <div className="boards">
      {
        reducer.map(({ title }: any, index: number) => (
          <BoardLink key={index} id={index} title={title} />
        ))
      }
        <AddBoard />
    </div>
  );
};

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  };
}

export const BoardsPage = connect(mapStateToProps)(BoardsPageView)