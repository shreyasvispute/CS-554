import { useState } from 'react';
import Todo from './Todo';
import { useSelector } from 'react-redux';
import AddTodo from './AddTodo';
const Todos = () => {
	const [ add, setAdd ] = useState(false);
	const allTodos = useSelector((state) => state.todos);
	console.log('allTodos:', allTodos);
	return (
		<div className={'workouts-wrapper'}>
			<h2>My Todos</h2>
			<button onClick={() => setAdd(!add)}>Add Todo</button>
			<br />

			<br />
			<br />
			{add && <AddTodo />}
			{allTodos.map((todo) => {
				console.log(todo);
				return <Todo key={todo.id} todo={todo} />;
			})}
		</div>
	);
};

export default Todos;
