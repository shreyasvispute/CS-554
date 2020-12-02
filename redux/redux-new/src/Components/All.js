import { useSelector } from 'react-redux';

const All = () => {
  const allState = useSelector((state) => state);

  return (
    <div className="todos-wrapper">
      <h2>All State</h2>
      <h3>Todos</h3>
      <ul>
        {allState.todos.map((todo) => {
          console.log(todo);
          return <li key={todo.id}>{todo.task}</li>;
        })}
      </ul>
      <h3>Users</h3>
      <ul>
        {allState.users.map((user) => {
          console.log(user);
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default All;
