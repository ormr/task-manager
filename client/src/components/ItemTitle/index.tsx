import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/svg/DeleteIcon.svg';
import './index.css';

interface Props {
  type: string;
  children: React.ReactNode;
  onValueChange: (props: { type: string; value: string }) => void;
  onItemDelete: (props: { type: string }) => void;
}

interface IItemText {
  value: string;
  subValue: string;
  isEditing: boolean;
}

export const ItemTitle: React.FC<Props> = ({
  type,
  children,
  onValueChange,
  onItemDelete,
}: Props) => {
  const [state, setState] = React.useState<IItemText>({
    value: String(children),
    subValue: String(children),
    isEditing: false,
  });

  const setNewText = () => {
    const { value, subValue, isEditing } = state;
    if (value && subValue !== value) {
      onValueChange({ type, value });
    }
    setState({ ...state, subValue: value, isEditing: !isEditing });
  };

  const onKeyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      const { subValue, isEditing } = state;
      setState({ ...state, value: subValue, isEditing: !isEditing });
    }
    if (e.key === 'Enter') {
      setNewText();
    }
  };

  const removeItem = () => {
    onItemDelete({ type });
  };

  const { value, isEditing } = state;

  const cardTitleBody = (
    <div className="card-text__body">
      <div
        className={isEditing ? 'card-text__inner active' : 'card-text__inner'}
        onClick={() =>
          !isEditing ? setState({ ...state, isEditing: !isEditing }) : null
        }
      >
        {children}
      </div>
      <button onClick={removeItem} className="delete-item--button">
        <span className="delete-item--icon">
          <DeleteIcon />
        </span>
      </button>
    </div>
  );

  const listTitleBody = (
    <div className="list-title__body">
      <h3
        onClick={() =>
          !isEditing ? setState({ ...state, isEditing: !isEditing }) : null
        }
      >
        {children}
      </h3>
      <button className="delete-item--button" onClick={removeItem}>
        <span className="delete-item--icon">
          <DeleteIcon />
        </span>
      </button>
    </div>
  );

  return (
    <div className={type === 'list' ? 'list-title' : 'card-text'}>
      {isEditing ? (
        <input
          maxLength={24}
          value={value}
          onKeyDown={onKeyPressed}
          onBlur={setNewText}
          onChange={(e) => setState({ ...state, value: e.target.value })}
          autoFocus
          onFocus={(e) => e.target.select()}
          type="text"
        />
      ) : type === 'list' ? (
        listTitleBody
      ) : (
        cardTitleBody
      )}
    </div>
  );
};
