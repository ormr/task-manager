import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/board';

interface Props {
  reducer: any,
  createBoard: (props: any) => any
}

const AddBoardView: React.FC<Props> = ({ reducer, createBoard }: Props) => {
  const id = reducer.length;
  const [title, setTitle] = React.useState('');

  const onCreateBoard = (id: any, title: any) => {
    createBoard({id, title});
    setTitle('');
  }
  return (
    <div className="add-board-field">
      <input type="text" value={title} placeholder="Board title" onChange={(e) => setTitle(e.target.value)}/>
      <button onClick={() => onCreateBoard(id, title)}>Add Board</button>
    </div>
  );
}

const mapStateToProps = ({reducer}: any) => {
  return {
    reducer
  };
}

export const AddBoard = connect(mapStateToProps, { createBoard })(AddBoardView);