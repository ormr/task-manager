import React from 'react'
import { connect } from 'react-redux';
import './BoardsPage.css';

import { AddList } from '../components/List/AddList'
import { List } from '../components/List/List';
import { ErrorPage } from './ErrorPage';
import { Link } from 'react-router-dom';

interface Props {
  id: number,
  reducer: any
}

const BoardPageView: React.FC<Props> = ({ id, reducer }: Props): JSX.Element => {

  if (!reducer[id]) {
    return (
      <ErrorPage />
    );
  }

  const boardId = +id;

  return (
    <div className="boards">
      <Link to="/">Return</Link>
      {
        reducer[boardId].lists.map(({ id, title }: any, index: number) => (
          <List key={index} listId={index} boardId={boardId} title={ title } />
        ))
      }
      <AddList boardId={boardId}/> 
    </div>
  );
}

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  }
}

export const BoardPage = connect(mapStateToProps)(BoardPageView)

// export const BoardsPage = connect(mapStateToProps)(BoardPageView);