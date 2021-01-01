import React from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/listsActions';
import './index.css';

interface Props {
  boardId: string;
  addList: (props: { boardId: string; name: string }) => void;
}

const AddListView: React.FC<Props> = ({ boardId, addList }) => {
  const [name, setName] = React.useState('');
  const [form, setForm] = React.useState(false);

  const showInput = () => {
    if (form) {
      if (name) {
        addList({ boardId, name });
        setName('');
      }
    } else {
      setForm(!form);
    }
  };

  return (
    <div className="add-list-item">
      {form ? (
        <input
          type="text"
          value={name}
          placeholder="List name"
          onChange={(e) => setName(e.target.value)}
        />
      ) : null}
      <button className="add-list-button" onClick={showInput}>
        Add another list
      </button>
    </div>
  );
};

export const AddList = connect(null, { addList })(AddListView);
