import React from 'react';
import { IState } from '../../actions/constants';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick';

interface Props {
  boards: any,
  createBoard: (props: any) => any
}

const AddBoardView: React.FC<Props> = ({ boards, createBoard }: Props) => {
  const [title, setTitle] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  })

  const onCreateBoard = (id: number, title: string) => {
    createBoard({id, title});
    setTitle('');
  }

  const showInput = async () => {
    await setShow(!show);
  }

  const onSubmitPressed = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (title) {
      const id = boards.length;
      onCreateBoard(id, title);
      setShow(!show)
    }
  }

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const id = boards.length;
      onCreateBoard(id, title);
    }
  }

  if (!show) {
    return (
      <button className="add-board-hidden" onClick={showInput}>
        Add another board
      </button>
    );
  }

  return (
  <div ref={divRef} className="add-board-item">
    <input
      type="text"
      value={title}
      autoFocus
      placeholder="Board title"
      onKeyDown={onKeyPressed}
      onChange={(e) => setTitle(e.target.value)}
    />
    <button className="add-card-button" onClick={onSubmitPressed}>
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