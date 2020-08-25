import React from 'react';
import './index.css'

import { connect } from 'react-redux';
import { addCardItem } from '../../actions/card';

interface Props {
  listId: number
  boardId: number
  reducer: any
  addCardItem: (props: any) => any
}


const AddCardView: React.FC<Props> = ({ boardId, listId, reducer, addCardItem }: Props) => {
  const [text, setText] = React.useState('');
  const [form, setForm] = React.useState(false);

  const id = reducer[boardId].lists[listId].cards.length;

  const showInput = () => {
    if (form) {
      if (text) {
        onAddCard(id, boardId, listId, text);
        setText('');
      }
    } else {
      setForm(!form);
    }
  }

  const onAddCard = (id: number, boardId: number, listId: number, text: string) => {
      addCardItem({
        id,
        boardId,
        listId,
        text
      });
  }
  return (
    <div className="add-card-item">
    {
     form ?
      <input type="text" value={text} placeholder="Card text" onChange={(e) => setText(e.target.value)}/>
     : null
    }
      <button className="add-card-button" onClick={showInput}>
        <span className="add-card--icon">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" width="2" height="10" fill="#A9ACBF"/>
          <rect y="6" width="2" height="10" transform="rotate(-90 0 6)" fill="#A9ACBF"/>
        </svg>
        </span>
        Add another card
      </button>
    </div>
  );
}

const mapStateToProps = ({reducer}: any) => {
  return {
    reducer
  };
}

export const AddCard = connect(mapStateToProps, { addCardItem })(AddCardView);