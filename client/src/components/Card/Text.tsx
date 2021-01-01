import React from 'react';
import { connect } from 'react-redux';
import {
  editCardItem,
  editCardItemProps,
  removeCardItem,
  removeCardItemProps,
} from '../../actions/cardsActions';
import './index.css';

interface Props {
  boardId: string;
  listId: string;
  cardId: string;
  children: React.ReactNode;
  editCardItem: (props: editCardItemProps) => void;
  removeCardItem: (props: removeCardItemProps) => void;
}

export const TextView: React.FC<Props> = ({
  boardId,
  listId,
  cardId,
  children,
  editCardItem,
  removeCardItem,
}: Props) => {
  const [text, setText] = React.useState<string>(String(children));
  const [subValue, setSubValue] = React.useState(text);
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const editText = () => {
    setEditing(!isEditing);
  };

  const setNewText = () => {
    if (text && subValue !== text) {
      editCardItem({
        boardId,
        listId,
        cardId,
        text,
      });
    }
    setSubValue(text);
    editText();
  };

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewText();
    }
  };

  const removeCard = () => {
    removeCardItem({ boardId, listId, cardId });
  };

  return (
    <div className="text">
      {isEditing ? (
        <input
          maxLength={24}
          value={text as string}
          onKeyDown={onKeyPressed}
          onBlur={setNewText}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          onFocus={(e) => e.target.select()}
          type="text"
        />
      ) : (
        <div className="text-body">
          <div
            className={isEditing ? 'text-inner active' : 'text-inner'}
            onClick={() => (!isEditing ? editText() : null)}
          >
            {children}
          </div>
          <button onClick={removeCard} className="delete-list--button">
            <span className="delete-list--icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" width="2" height="10" fill="#A9ACBF" />
                <rect
                  y="6"
                  width="2"
                  height="10"
                  transform="rotate(-90 0 6)"
                  fill="#A9ACBF"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export const Text = connect(null, { editCardItem, removeCardItem })(TextView);
