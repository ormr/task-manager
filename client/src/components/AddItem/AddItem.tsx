import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardPreviewActions';
import { addList } from '../../actions/boardActions';
import { addCardItem } from '../../actions/cardsActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick';

import { ReactComponent as AddIcon } from '../../assets/svg/AddIcon.svg';

import './index.css';

interface Props {
  item: string;
  boardId?: string;
  listId?: string;
  createBoard: (props: { title: string }) => void;
  addList: (props: { boardId: string; name: string }) => void;
}

const AddItemView: React.FC<Props> = ({
  item,
  boardId,
  listId,
  createBoard,
  addList,
}: Props) => {
  const [name, setName] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  });

  const createItem = (name: string) => {
    if (!name) return;

    if (item === 'board') {
      createBoard({ title: name });
    }
    if (item === 'list' && boardId) {
      addList({ boardId, name });
    }
    if (item === 'card' && boardId && listId) {
      addCardItem({
        boardId,
        listId,
        text: name,
      });
    }

    setName('');
  };

  const showInput = () => {
    setShow(!show);
  };

  const onSubmitPressed = () => {
    createItem(name);
  };

  const onKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createItem(name);
    }
  };

  if (item === 'card') {
    return (
      <div className="add-card-item" ref={divRef}>
        {show ? (
          <input
            type="text"
            value={name}
            placeholder={
              item.slice(0, 1).toUpperCase() + item.slice(1) + ' name'
            }
            onKeyDown={onKeyPressed}
            onChange={(e) => setName(e.target.value)}
          />
        ) : null}
        <button className="add-card-button" onClick={showInput}>
          <span className="add-card--icon">
            <AddIcon />
          </span>
          Add another card
        </button>
      </div>
    );
  }

  return (
    <>
      {show ? (
        <div ref={divRef} className="add-item">
          <input
            type="text"
            value={name}
            autoFocus
            placeholder={
              item.slice(0, 1).toUpperCase() + item.slice(1) + ' name'
            }
            onKeyDown={onKeyPressed}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="add-item" onClick={onSubmitPressed}>
            Add another {item}
          </button>
        </div>
      ) : (
        <button className="add-item-hidden" onClick={showInput}>
          Add another {item}
        </button>
      )}
    </>
  );
};

export const AddItem = connect(null, { createBoard, addList, addCardItem })(
  AddItemView
);
