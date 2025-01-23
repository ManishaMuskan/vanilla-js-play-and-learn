import React from "react";
import TodoList from "./TodoList";

const TodoAppConstructorPattern = () => {
  return (
    <>
      <h4>Constructor Pattern</h4>
      <div className="container">
        <TodoList />
        <TodoList />
      </div>
    </>
  );
};

export default TodoAppConstructorPattern;
