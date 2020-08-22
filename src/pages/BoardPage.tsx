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

  console.log(reducer[id]);
  return (
    <div className="boards">
      <Link to="/">Return</Link>
      {
        reducer[id].lists.map(({ id, title }: any, index: number) => (
          <List key={index} id={id} title={ title } />
        ))
      }
      <AddList boardId={id}/> 
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