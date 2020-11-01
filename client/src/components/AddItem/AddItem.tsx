import React from 'react';
import { IState } from '../../actions/constants';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardActions';
import { addList } from '../../actions/listsActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick';

import './AddItem.css';

interface Props {
  boardId?: number
  item: any,
  boards: any,
  createBoard: (props: any) => any
  addList: (props: any) => any
}

const AddItemView: React.FC<Props> = ({ boardId, item, boards, createBoard, addList }: Props) => {
  const [title, setTitle] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  })

  const onCreateItem = (id: number, title: string) => {
    if (item === 'board') {
      createBoard({id, title});
    }
    if (item === 'list') {
      addList({ boardId, title });
    }
    setTitle('');
  }

  const showInput = async () => {
    await setShow(!show);
  }

  const onSubmitPressed = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (title) {
      const id = boards.length;
      onCreateItem(id, title);
      setShow(!show)
    }
  }

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const id = boards.length;
      onCreateItem(id, title);
    }
  }

  if (!show) {
    return (
      <button className="add-item-hidden" onClick={showInput}>
        Add another {item}
      </button>
    );
  }

  return (
  <div ref={divRef} className="add-item">
    <input
      type="text"
      value={title}
      autoFocus
      placeholder={item.slice(0, 1).toUpperCase() + item.slice(1) + " title"}
      onKeyDown={onKeyPressed}
      onChange={(e) => setTitle(e.target.value)}
    />
    <button className="add-item-button" onClick={onSubmitPressed}>
      Add another {item}
    </button>
  </div>
);
}

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards
  };
}

export const AddItem = connect(mapStateToProps, { createBoard, addList })(AddItemView);