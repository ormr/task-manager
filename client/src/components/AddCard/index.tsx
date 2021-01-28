import React from 'react';
import './index.css';

import { connect } from 'react-redux';
import { addCardItem } from '../../actions/cardsActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick';
import { ReactComponent as AddIcon } from '../../assets/svg/AddIcon.svg';

interface Props {
  boardId: string;
  listId: string;
  addCardItem: (props: any) => any;
}

const AddCardView: React.FC<Props> = ({
  boardId,
  listId,
  addCardItem,
}: Props) => {
  const [text, setText] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  });

  const showInput = () => {
    if (show) {
      if (text) {
        onAddCard(listId, text);
        setText('');
      }
    } else {
      setShow(!show);
    }
  };

  const onAddCard = (listId: string, text: string) => {
    addCardItem({
      boardId,
      listId,
      text,
    });
  };

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddCard(listId, text);
      setText('');
    }
  };

  return (
    <div className="add-card-item" ref={divRef}>
      {show ? (
        <input
          type="text"
          onKeyDown={onKeyPressed}
          value={text}
          placeholder="Card text"
          onChange={(e) => setText(e.target.value)}
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
};

export const AddCard = connect(null, { addCardItem })(AddCardView);
