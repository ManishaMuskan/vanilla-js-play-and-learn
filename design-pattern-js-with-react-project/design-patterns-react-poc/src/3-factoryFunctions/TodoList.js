import React from "react";

const TodoList = ({ todos, setTodos, store }) => {
  const addTodoInList = () => {
    const todoText = `Todo text ${Math.floor(Math.random() * 3000)}`;
    store.addTodo(todoText);
    setTodos([...store.getTodos()]);
  };

  const deleteTodo = (todo) => {
    todo.deleteSelf();
    setTodos([...store.getTodos()]);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo)}>
            {todo.text}
          </li>
        ))}
      </ul>

      <button type="button" className="btn-add-todo" onClick={addTodoInList}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoList;
