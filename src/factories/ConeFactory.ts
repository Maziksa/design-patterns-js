import { Cone } from '../entities/Cone';
import { Point } from '../entities/Point';
import { ShapeFactory } from './ShapeFactory';
import { ConeValidator } from '../validators/ConeValidator';
import logger from '../utils/logger';

export class ConeFactory extends ShapeFactory {
  private validator: ConeValidator;

  constructor() {
    super();
    this.validator = new ConeValidator();
  }

  getShapeType(): string {
    return 'Cone';
  }

  create(data: string[]): Cone {
    this.validator.validateDataLength(data);

    const id = data[0];
    const coords = this.parseNumbers(data, 1, 7);

    const apex = new Point(coords[0], coords[1], coords[2]);
    const baseCenter = new Point(coords[3], coords[4], coords[5]);
    const radius = coords[6];

    this.validator.validateCone(apex, baseCenter, radius);

    const cone = new Cone(id, apex, baseCenter, radius);

    logger.info({ shapeId: id, shapeType: 'Cone' }, `Created Cone with id: ${id}`);

    return cone;
  }
}
