import React from 'react';
import { connect } from 'react-redux';
import './index.css';

import { Card } from '../Card';
import { AddCard } from '../Card/AddCard';

interface Props {
  boardId: number
  listId: number
  title: string
  reducer: any
}

export const ListView: React.FC<Props> = ({ boardId, listId, title, reducer }: Props): JSX.Element => {
  console.log(reducer[boardId].lists[listId].cards)
  return (
    <div className="list-item">
      <h3>{ title }</h3>
      <div className="list-item-inner">
        {
        reducer[boardId].lists[listId].cards.map(({text}: any, index: number) => (
          <Card key={index} boardId={boardId} id={index} text={text} />
        ))
        }
      </div>
      <AddCard listId={listId} boardId={boardId}/>
    </div>
  );
}

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  }
}

export const List = connect(mapStateToProps)(ListView);