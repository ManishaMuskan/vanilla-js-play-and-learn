# Constructor Pattern

The **Constructor Pattern** is used when we need to create separate instances of a thing, representing the state of similar objects. For example, consider managing the marks of all subjects for different students.

With this pattern, functions/methods are declared on the prototype of the created object, ensuring that they exist only once in memory, even if multiple instances are created.

---

## **ES6 Class Syntax**

Using the ES6 `class` and `new` keyword, we can achieve the constructor pattern easily:

```javascript
class Todos {
  todos = [];

  addTodo = (todoText) => {
    this.todos.push(todoText);
  };

  getTodos = () => {
    return this.todos;
  };
}

// Example Usage:
const myTodos = new Todos();
myTodos.addTodo("Learn JavaScript");
console.log(myTodos.getTodos()); // Output: ["Learn JavaScript"]
```

## **ES5 Syntax**

In ES5, the same functionality can be implemented using function constructors. However, we must ensure that methods are attached to the prototype to avoid multiple declarations in memory.

**Basic Constructor Implementation (Less Efficient)**

In this implementation, methods are declared for each instance, leading to unnecessary memory consumption.

```javascript
function Todos() {
  this.todos = []; // `this` refers to the new instance being created.

  this.addTodo = function (todoText) {
    this.todos.push(todoText);
  };

  this.getTodos = function () {
    return this.todos;
  };
}

// Example Usage:
const myTodos = new Todos();
myTodos.addTodo("Learn React");
console.log(myTodos.getTodos()); // Output: ["Learn React"]
```

## **Optimized Constructor Using Prototypes**

To avoid declaring methods for each instance, attach them to the constructor's prototype. This way, all instances share the same method in memory.

```javascript
function Todos() {
  this.todos = []; // `this` refers to the new instance being created.
}

Todos.prototype.addTodo = function (todoText) {
  this.todos.push(todoText);
};

Todos.prototype.getTodos = function () {
  return this.todos;
};

// Example Usage:
const myTodos = new Todos();
myTodos.addTodo("Learn Node.js");
console.log(myTodos.getTodos()); // Output: ["Learn Node.js"]
```

**_Note_**

When you use the new keyword with a constructor function in ES5, it creates a new object and assigns it as the value of this inside the function. This allows you to initialize instance-specific properties on the newly created object.

Without this, there would be no way to assign properties or methods specifically to the object being created by the constructor.
