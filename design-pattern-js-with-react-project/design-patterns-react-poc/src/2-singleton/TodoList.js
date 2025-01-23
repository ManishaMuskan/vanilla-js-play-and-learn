import React from "react";

const TodoList = ({ store, todos, setTodos }) => {
  const addTodoInList = () => {
    const todoText = `Todo text ${Math.floor(Math.random() * 3000)}`;
    store.addTodo(todoText);
    setTodos([...store.getTodos()]);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>

      <button type="button" className="btn-add-todo" onClick={addTodoInList}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoList;
