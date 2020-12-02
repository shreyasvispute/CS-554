const addTodo = (task, taskDesc) => ({
  type: 'CREATE_TODO',
  payload: {
    task: task,
    taskDesc: taskDesc,
    complete: false
  }
});

const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: { id: id }
});

const completeTodo = (id) => ({
  type: 'COMPLETE_TODO',
  payload: { id: id }
});

const uncompleteTodo = (id) => ({
  type: 'UNCOMPLETE_TODO',
  payload: { id: id }
});

module.exports = {
  addTodo,
  deleteTodo,
  completeTodo,
  uncompleteTodo
};
