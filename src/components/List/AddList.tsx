import React from "react";
import { connect } from "react-redux";
import { IBoard } from '../../actions/constants';
import { addList } from '../../actions/listsActions';
import "./index.css";

interface Props {
  boardId: number
  boards: IBoard[]
  addList: (props: { boardId: number, title: string }) => void
}

const AddListView: React.FC<Props> = ({ boardId, boards, addList }: Props) => {
  const [title, setTitle] = React.useState('');
  const [form, setForm] = React.useState(false);

  const showInput = () => {
    if (form) {
      if (title) {
        addList({ boardId, title });
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

const mapStateToProps = ({ boards }: any) => {
  return {
    boards
  };
}

export const AddList = connect(mapStateToProps, { addList })(AddListView);
