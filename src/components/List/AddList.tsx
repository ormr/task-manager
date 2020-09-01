import React from "react";
import { connect } from "react-redux";
import { IState, IBoard } from '../../actions/constants';
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
        Add another list
      </button>
    </div>
  );
};

const mapStateToProps = ({ boards }: IState) => {
  return {
    boards
  };
}

export const AddList = connect(mapStateToProps, { addList })(AddListView);
