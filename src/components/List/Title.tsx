import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import { editListTitle } from '../../actions/listsActions'

interface Props {
  listId: string
  children: React.ReactNode
  editListTitle: (props: any) => any
}

const TitleView: React.FC<Props> = ({ listId, children, editListTitle }: Props) => {
  const [title, setTitle] = React.useState(children);
  const [isEditing, setEditing] = React.useState(false);
  
  const editTitle = () => {
    setEditing(!isEditing);
  }

  const setNewTitle = () => {
    if (title) {
      editListTitle({ listId, title });
      editTitle();
    }
  }

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewTitle();
    }
  }

  return (
    <div className="title">
      {
      !isEditing ? 
        <div className="title-inner" onClick={editTitle}>
          <h3>{title}</h3>
        </div>
        : 
        <input
          maxLength={24}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          value={title as string}
          onBlur={setNewTitle}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => onKeyPressed(e)}
          type="text"
        />
      }
    </div>
    );
}

export const Title = connect(null, { editListTitle })(TitleView);