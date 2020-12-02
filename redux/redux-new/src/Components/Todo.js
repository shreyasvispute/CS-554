import { useDispatch } from 'react-redux';
import actions from '../actions';
const Todo = (props) => {
  const dispatch = useDispatch();
  const deleteTodo = () => {
    dispatch(actions.deleteTodo(props.todo.id));
  };

  const completeTodoToggle = (type) => {
    if (type === 'comp') dispatch(actions.completeTodo(props.todo.id));
    if (type === 'uncomp') dispatch(actions.uncompleteTodo(props.todo.id));
  };
  return (
    <div className={'activity-wrapper'}>
      <p>
        Task: {props.todo.task}, Task Description: {props.todo.taskDesc},
        Completed: {`${props.todo.completed}`}
      </p>
      <button onClick={deleteTodo}>Delete</button>
      {!props.todo.completed && (
        <button onClick={() => completeTodoToggle('comp')}>Complete</button>
      )}
      {props.todo.completed && (
        <button onClick={() => completeTodoToggle('uncomp')}>UnComplete</button>
      )}
    </div>
  );
};

export default Todo;
