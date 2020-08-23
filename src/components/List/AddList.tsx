import React from "react";
import { connect } from "react-redux";
import { addList } from '../../actions/list';
import "./index.css";

interface Props {
  boardId: number
  reducer: any
  addList: (props: { boardId: number, id: number, title: string }) => void
}

const AddListView: React.FC<Props> = ({ boardId, reducer, addList }:Props) => {
  const id: number = reducer[boardId].lists.length;
  const [title, setTitle] = React.useState('');
  const onAddList = (boardId: number, id: any, title: any) => {
    addList({ boardId, id, title });
    setTitle('');
  }
  return (
    <div className="add-board-field">
      <input
        type="text"
        value={title}
        placeholder="List title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => title ? onAddList(boardId, id, title) : null}>Add List</button>
    </div>
  );
};

const mapStateToProps = ({ reducer }: any) => {
  return {
    reducer
  };
}

export const AddList = connect(mapStateToProps, { addList })(AddListView);
