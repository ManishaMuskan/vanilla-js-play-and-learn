let todos = [];

/**
 *  This is a factory function to create a todo object
 * @param {string} todoText - a todo text
 * @returns todoObject
 */
function createTodo(todoText) {
  const id = Date.now();

  return {
    id,
    text: todoText,
    deleteSelf: () => {
      todos = todos.filter((todo) => todo.id !== id); // here use 'id' as a CLOSURE

      // or
      // const index = todos.findIndex((todo) => todo.id === id);
      // todos.splice(index, 1);
    },
  };
}

/**
 * this is an alternative and better approach to factory functions if methods are involved,
 *  this does not create separate method in the memory for each todo object.
 * Based on the use case. choose design pattern
 */
// class CreateTodo {
//   constructor(todoText) {
//     this.id = Date.now();
//     this.text = todoText;
//   }
//   deleteSelf = () => {
//     todos = todos.filter((todo) => todo.id !== this.id);
//   };
// }

// singleton pattern using an object instead of class, as class after all returns an object
const Todos = {
  addTodo: (todoText) => {
    // todos.push(new CreateTodo(todoText)); // if constructor pattern is used
    todos.push(createTodo(todoText));
  },

  getTodos: () => {
    return todos;
  },
};

Object.freeze(Todos);
export default Todos; // exporting single instance of it and it can not be extended as the object is freezed
