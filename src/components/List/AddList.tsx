import React from "react";
import { connect } from "react-redux";
import { addList } from '../../actions/list';
import "./index.css";

interface Props {
  boardId: number
  reducer: any
  addList: (props: { boardId: number, id: number, title: string }) => void
}

const AddListView: React.FC<Props> = ({ boardId, reducer, addList }: Props) => {
  const id: number = reducer[boardId].lists.length;
  const [title, setTitle] = React.useState('');
  const [form, setForm] = React.useState(false);

  const onAddList = (boardId: number, id: any, title: any) => {
    if (title) {
      addList({ boardId, id, title });
    }
  };

  const showInput = () => {
    if (form) {
      if (title) {
        addList({ boardId, id, title });
        setTitle('');
      }
    } else {
      setForm(!form);
    }
  }

  return (
    <div className="add-list-item">
      {form ? (
        <input
          type="text"
          value={title}
          placeholder="List title"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : null}
      <button className="add-list-button" onClick={showInput}>
        <span className="add-list--icon">
          <svg
            width="10"
            height="10"
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
        Add another list
      </button>
    </div>
  );
};

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  };
}

export const AddList = connect(mapStateToProps, { addList })(AddListView);
