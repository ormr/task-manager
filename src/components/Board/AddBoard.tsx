import React from 'react';
import { IState } from '../../actions/constants';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardActions';

interface Props {
  boards: any,
  createBoard: (props: any) => any
}

const AddBoardView: React.FC<Props> = ({ boards, createBoard }: Props) => {
  const [title, setTitle] = React.useState('');
  const [form, setForm] = React.useState(false);

  const onCreateBoard = (id: number, title: string) => {
    createBoard({id, title});
    setTitle('');
  }

  const showInput = () => {
    if (form) {
      if (title) {
        const id = boards.length;
        onCreateBoard(id, title);
        setTitle('');
      }
    } else {
      setForm(!form);
    }
  }

  return (
    <div className="add-board-item">
    {
     form ?
      <input type="text" value={title} placeholder="Board title" onChange={(e) => setTitle(e.target.value)}/>
     : null
    }
      <button className="add-card-button" onClick={showInput}>
        <span className="add-card--icon">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" width="2" height="10" fill="#A9ACBF"/>
          <rect y="6" width="2" height="10" transform="rotate(-90 0 6)" fill="#A9ACBF"/>
        </svg>
        </span>
        Add another board
      </button>
    </div>
  );
}

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards
  };
}

export const AddBoard = connect(mapStateToProps, { createBoard })(AddBoardView);