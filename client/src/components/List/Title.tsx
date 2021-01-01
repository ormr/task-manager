import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import {
  editListTitle,
  editTitleProps,
  removeList,
  removeListProps,
} from '../../actions/listsActions';

interface Props {
  boardId: string;
  listId: string;
  children: React.ReactNode;
  editListTitle: (props: editTitleProps) => void;
  removeList: (props: removeListProps) => void;
}

const TitleView: React.FC<Props> = ({
  boardId,
  listId,
  children,
  editListTitle,
  removeList,
}: Props) => {
  const [title, setTitle] = React.useState<string>(String(children));
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const editTitle = () => {
    setEditing(!isEditing);
  };

  const setNewTitle = () => {
    if (title) {
      editListTitle({ boardId, listId, name: title });
      setEditing(!isEditing);
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewTitle();
    }
  };

  const deleteList = () => {
    removeList({ boardId, listId });
  };

  return (
    <div className="title">
      {!isEditing ? (
        <div className="title-inner">
          <h3 onClick={editTitle}>{title}</h3>
          <button className="delete-list--button" onClick={deleteList}>
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
      ) : (
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
      )}
    </div>
  );
};

export const Title = connect(null, { editListTitle, removeList })(TitleView);
