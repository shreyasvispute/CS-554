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
      <table>
        <tbody>
          <tr>
            <td>Task:</td>
            <td>{props.todo.task}</td>
          </tr>
          <tr>
            <td>Task Description:</td>
            <td>{props.todo.taskDesc}</td>
          </tr>
          <tr>
            <td>Completed:</td>
            <td>{`${props.todo.completed}`}</td>
          </tr>
          <tr>
            <td>
              <button onClick={deleteTodo}>Delete</button>
            </td>
            <td>
              {!props.todo.completed && (
                <button onClick={() => completeTodoToggle('comp')}>
                  Complete
                </button>
              )}
              {props.todo.completed && (
                <button onClick={() => completeTodoToggle('uncomp')}>
                  UnComplete
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
