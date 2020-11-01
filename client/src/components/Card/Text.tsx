import React from 'react';
import { connect } from 'react-redux';
import { editCardItem } from '../../actions/cardsActions';
import './index.css';

interface Props {
  cardId: string
  children: React.ReactNode
  editCardItem: (props: any) => any
}

export const TextView: React.FC<Props> = ({ cardId, children, editCardItem }: Props) => {

  const [text, setText] = React.useState(children);
  const [isEditing, setEditing] = React.useState(false);
  
  const editText = () => {
    setEditing(!isEditing);
  }

  const setNewText = () => {
    if (text) {
      editCardItem({ id: cardId, text });
      editText();
    }
  }

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewText();
    }
  }

  return (
    <div onClick={() => !isEditing ? editText() : null} className={isEditing ? "text active" : "text"}>
      {
        isEditing ?
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
        :
        <div className="text-inner">{children}</div>}
    </div>
  );
}

export const Text = connect(null, { editCardItem })(TextView);