import React, { useState } from "react";
import TodoList from "./TodoList";
import todosInstance from "./Todos";

const TodoAppWithSingletonPattern = () => {
  // instead of doing it in TodoList component we are setting it up here, because with every addition of
  // todo we want all TodoList components to be rendered
  const [todos, setTodos] = useState(todosInstance.getTodos());

  return (
    <>
      <h4>Singleton Pattern</h4>
      <div className="container">
        <TodoList store={todosInstance} todos={todos} setTodos={setTodos} />
        <TodoList store={todosInstance} todos={todos} setTodos={setTodos} />
        <TodoList store={todosInstance} todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
};

export default TodoAppWithSingletonPattern;
