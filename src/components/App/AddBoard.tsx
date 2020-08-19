import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/board';

interface Props {
  createBoard: (props: any) => any
}

const AddBoardView: React.FC<Props> = ({ createBoard }: Props) => {
  const [title, setTitle] = React.useState('');
  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button onClick={() => createBoard(title)}>Add Board</button>
    </div>
  );
}

export const AddBoard = connect(null, {createBoard})(AddBoardView);