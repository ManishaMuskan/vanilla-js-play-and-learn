/**
 * Constructor pattern using ES6 class and new keyword, in ES5 the same thing can be achieved
 * by function prototypal inheritance
 */
class Todos {
  todos = [];

  addTodo = (todoText) => {
    this.todos.push(todoText);
  };

  getTodos = () => {
    return this.todos;
  };
}

/**
 * ES5 syntax to achieve the same, but this will declare separate methods for each instance in the memory.
 *  To resolve this, attach this methods to the prototype of the created object
 */
// function Todos() {
//   this.todos = [];

//   this.addTodo = (todoText) => {
//     this.todos.push(todoText);
//   };

//   this.getTodos = () => {
//     return this.todos;
//   };
// }

/**
 * ES5 syntax better approach to avoid declaring the methods more than once.
 *  Declare these methods with function keyword, otherwise 'this' will not refer to the correct context
 */
// function Todos() {
//   this.todos = [];
// }

// Todos.prototype.addTodo = function (todoText) {
//   this.todos.push(todoText);
// };

// Todos.prototype.getTodos = function () {
//   return this.todos;
// };

export default Todos;
