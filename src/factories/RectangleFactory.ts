import { Rectangle } from '../entities/Rectangle';
import { Point } from '../entities/Point';
import { ShapeFactory } from './ShapeFactory';
import { RectangleValidator } from '../validators/RectangleValidator';
import logger from '../utils/logger';

export class RectangleFactory extends ShapeFactory {
  private validator: RectangleValidator;

  constructor() {
    super();
    this.validator = new RectangleValidator();
  }

  getShapeType(): string {
    return 'Rectangle';
  }

  create(data: string[]): Rectangle {
    this.validator.validateDataLength(data);

    const id = data[0];
    const coords = this.parseNumbers(data, 1, 8);

    const topLeft = new Point(coords[0], coords[1]);
    const topRight = new Point(coords[2], coords[3]);
    const bottomRight = new Point(coords[4], coords[5]);
    const bottomLeft = new Point(coords[6], coords[7]);

    this.validator.validateRectangle(topLeft, topRight, bottomRight, bottomLeft);

    const rectangle = new Rectangle(id, topLeft, topRight, bottomRight, bottomLeft);

    logger.info({ shapeId: id, shapeType: 'Rectangle' }, `Created Rectangle with id: ${id}`);

    return rectangle;
  }
}
