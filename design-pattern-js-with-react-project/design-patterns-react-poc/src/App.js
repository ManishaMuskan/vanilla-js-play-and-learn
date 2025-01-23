import TodoAppConstructorPattern from "./1-constructor/TodoApp";
import TodoAppWithSingletonPattern from "./2-singleton/TodoApp";
import TodoAppFactoryFunctionPattern from "./3-factoryFunctions/TodoApp";
import ShapesApp from "./4-prototype/ShapesApp";
import ObserverApp from "./5-observer/ObserverApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoAppConstructorPattern />
      <TodoAppWithSingletonPattern />
      <TodoAppFactoryFunctionPattern />
      <ShapesApp />
      <ObserverApp />
    </div>
  );
}

export default App;
