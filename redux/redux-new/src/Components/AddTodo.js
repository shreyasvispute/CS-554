import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';
const AddTodo = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: '', duration: '' });
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTodo = () => {
    dispatch(actions.addTodo(data.task, data.taskDesc));
  };
  return (
    <div className={'add'}>
      <div className={'input-selection'}>
        <label>
          Todo:
          <input
            onChange={(e) => handleChange(e)}
            name="task"
            placeholder="Todo Name...."
          />
        </label>
      </div>
      <div className={'input-selection'}>
        <label>
          Todo Description:
          <input
            onChange={(e) => handleChange(e)}
            name="taskDesc"
            placeholder="Description...."
          />
        </label>
      </div>
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
