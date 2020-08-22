import React from 'react';
import { connect } from 'react-redux';
import './index.css';

import { Card } from '../Card';

interface Props {
  id: number
  title: string
}

export const List: React.FC<Props> = ({ id, title }: Props): JSX.Element => {
  return (
    <div className="board">
      <h3>{ title }</h3>
      <Card />
    </div>
  );
}

// const mapStateToProps = (state: any) => {
//   return state;
// }

// export const List = connect(mapStateToProps)(ListView);