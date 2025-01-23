import React, { useEffect, useState } from "react";
import { Circle, Rectangle, ShapeTypes, Square } from "./Shapes";

const ShapesApp = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {});

  const generateShape = (shapeName) => {
    switch (shapeName) {
      case ShapeTypes.CIRCLE:
        return new Circle(50);
      case ShapeTypes.RECTANGLE:
        return new Rectangle(80, 60);
      case ShapeTypes.SQUARE:
        return new Square(50);
      default:
        return;
    }
  };

  const addShape = (shapeName) => {
    let shape = generateShape(shapeName);
    setShapes([...shapes, shape]);
  };

  const createShape = (shape) => {
    switch (shape.name) {
      case ShapeTypes.CIRCLE:
        return (
          <div
            className={`shape circle ${shape.spinning ? "spin" : ""}`}
            style={{ width: shape.radius, height: shape.radius }}
          />
        );
      case ShapeTypes.RECTANGLE:
      case ShapeTypes.SQUARE:
        return (
          <div
            className={`shape ${shape.spinning ? "spin" : ""}`}
            style={{ width: shape.width, height: shape.height }}
          />
        );
      default:
        return;
    }
  };

  const toggleSpin = (shape) => {
    if (shape.spinEnabled) {
      shape.spinning = !shape.spinning;
    }
    setShapes([...shapes]);
  };

  return (
    <>
      <h4>
        Prototype Pattern - <small>Click on shape to toggle spinning</small>
      </h4>
      <div className="container flex-col">
        <ul className="shapes-container">
          {shapes.map((shape) => (
            <li key={shape.id} onClick={() => toggleSpin(shape)}>
              {createShape(shape)}
            </li>
          ))}
        </ul>

        <div className="btn-group">
          <button
            type="button"
            className="btn-add-todo"
            onClick={() => addShape(ShapeTypes.CIRCLE)}
          >
            Add Circle
          </button>
          <button
            type="button"
            className="btn-add-todo"
            onClick={() => addShape(ShapeTypes.SQUARE)}
          >
            Add Square
          </button>
          <button
            type="button"
            className="btn-add-todo"
            onClick={() => addShape(ShapeTypes.RECTANGLE)}
          >
            Add Rectangle
          </button>
        </div>
      </div>
    </>
  );
};

export default ShapesApp;
