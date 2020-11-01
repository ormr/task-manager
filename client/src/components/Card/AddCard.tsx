import React from 'react';
import './index.css'

import { ICard } from '../../actions/constants';
import { connect } from 'react-redux';
import { addCardItem } from '../../actions/cardsActions';
import { useOutsideClick } from '../../assets/custom-hooks/useOutsideClick'

interface Props {
  listId: string
  cards: ICard[]
  addCardItem: (props: any) => any
}


const AddCardView: React.FC<Props> = ({ listId, cards, addCardItem }: Props) => {
  const [text, setText] = React.useState('');
  const [show, setShow] = React.useState(false);

  const divRef: any = React.useRef();

  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  })

  const showInput = () => {
    if (show) {
      if (text) {
        onAddCard(listId, text);
        setText('');
      }
    } else {
      setShow(!show);
    }
  }

  const onAddCard = (listId: string, text: string) => {
      addCardItem({
        listId,
        text
      });
  }

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddCard(listId, text);
      setText('');
    }
  }

  return (
    <div className="add-card-item" ref={divRef}>
    {
     show ?
      <input type="text" onKeyDown={onKeyPressed} value={text} placeholder="Card text" onChange={(e) => setText(e.target.value)}/>
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

const mapStateToProps = ({cards}: any) => {
  return {
    cards
  };
}

export const AddCard = connect(mapStateToProps, { addCardItem })(AddCardView);