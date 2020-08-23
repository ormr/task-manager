import React from 'react';

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

  const id = reducer[boardId].lists[listId].cards.length;

  const onAddCard = (id: number, boardId: number, listId: number, text: string) => {
    addCardItem({
        id,
        boardId,
        listId,
        text
      });
    setText('');
  }
  return (
    <div className="add-board-field">
      <input type="text" value={text} placeholder="Card text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={() => onAddCard(id, boardId, listId, text)}>Add Card</button>
    </div>
  );
}

const mapStateToProps = ({reducer}: any) => {
  return {
    reducer
  };
}

export const AddCard = connect(mapStateToProps, { addCardItem })(AddCardView);