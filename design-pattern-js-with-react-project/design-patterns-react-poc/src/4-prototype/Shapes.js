export const ShapeTypes = {
  CIRCLE: "circle",
  SQUARE: "square",
  RECTANGLE: "rectangle",
};

class Shapes {
  constructor(shapeName) {
    this.id = Date.now();
    this.name = shapeName;
    this.spinEnabled = false;
  }
}

export class Circle extends Shapes {
  constructor(radius) {
    super(ShapeTypes.CIRCLE);
    this.radius = radius;
  }
}

export class Rectangle extends Shapes {
  constructor(width, height) {
    super(width === height ? ShapeTypes.SQUARE : ShapeTypes.RECTANGLE);
    this.width = width;
    this.height = height;
    this.spinEnabled = true;
  }
}

export class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}
