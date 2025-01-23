import React, { useState } from "react";
import TodoList from "./TodoList";
import Todos from "./Todos";

const TodoAppFactoryFunctionPattern = () => {
  const instance = Todos;
  const [todos, setTodos] = useState(instance.getTodos());

  return (
    <>
      <h4>
        Factory Function Pattern -{" "}
        <small>you can click a todo to delete it</small>
      </h4>
      <div className="container">
        <TodoList todos={todos} setTodos={setTodos} store={instance} />
        <TodoList todos={todos} setTodos={setTodos} store={instance} />
        <TodoList todos={todos} setTodos={setTodos} store={instance} />
        <TodoList todos={todos} setTodos={setTodos} store={instance} />
      </div>
    </>
  );
};

export default TodoAppFactoryFunctionPattern;
