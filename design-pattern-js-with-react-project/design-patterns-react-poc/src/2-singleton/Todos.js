/**
 * Singleton pattern
 */
const todos = [];
let instance = null;

class Todos {
  constructor() {
    if (instance !== null) {
      throw new Error("You can only have one instance of todos!");
    }
    instance = this;
  }

  getInstance = () => {
    return instance;
  };

  addTodo = (todoText) => {
    todos.push(todoText);
  };

  getTodos = () => {
    return todos;
  };
}

const todosInstance = new Todos();
Object.freeze(todosInstance);
export default todosInstance;

/**
 * The same thing can be achieved by this single object also,
 *  because after all the instance of Todo class is creating a object when frozen
 */
// const todosInstance = {
//   addTodo: (todoText) => {
//     todos.push(todoText);
//   },

//   getTodos: () => {
//     return todos;
//   },
// };
// Object.freeze(todosInstance);
// export default todosInstance;
