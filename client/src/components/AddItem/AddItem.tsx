import React from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../actions/boardPreviewActions';
import { addList } from '../../actions/boardActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick';

import './AddItem.css';

interface Props {
  boardId?: string;
  item: string;
  createBoard: (props: { title: string }) => void;
  addList: (props: { boardId: string; name: string }) => void;
}

const AddItemView: React.FC<Props> = ({
  boardId,
  item,
  createBoard,
  addList,
}: Props) => {
  const [name, setName] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  });

  const onCreateItem = (name: string) => {
    if (item === 'board') {
      createBoard({ title: name });
    }

    if (item === 'list' && boardId) {
      addList({ boardId, name });
    }
    setName('');
  };

  const showInput = () => {
    setShow(!show);
  };

  const onSubmitPressed = () => {
    if (name) {
      onCreateItem(name);
      setShow(!show);
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onCreateItem(name);
    }
  };

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
        value={name}
        autoFocus
        placeholder={item.slice(0, 1).toUpperCase() + item.slice(1) + ' name'}
        onKeyDown={onKeyPressed}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="add-item-button" onClick={onSubmitPressed}>
        Add another {item}
      </button>
    </div>
  );
};

export const AddItem = connect(null, { createBoard, addList })(AddItemView);
