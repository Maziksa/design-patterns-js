import { Observer } from '../patterns/observer/Observer';
import { Shape } from '../entities/Shape';
import { ShapeMetrics } from '../models/ShapeMetrics';
import { Cone } from '../entities/Cone';
import { Rectangle } from '../entities/Rectangle';
import { ConeService } from '../services/ConeService';
import { RectangleService } from '../services/RectangleService';
import logger from '../utils/logger';

export class Warehouse implements Observer {
  // eslint-disable-next-line no-use-before-define
  private static instance: Warehouse;

  private cache: Map<string, ShapeMetrics>;

  private coneService: ConeService;

  private rectangleService: RectangleService;

  private constructor() {
    this.cache = new Map();
    this.coneService = new ConeService();
    this.rectangleService = new RectangleService();
  }

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public getMetrics(id: string): ShapeMetrics | undefined {
    return this.cache.get(id);
  }

  public update(shape: Shape): void {
    const metrics: ShapeMetrics = {};

    if (shape instanceof Cone) {
      if (this.coneService.isValidCone(shape)) {
        metrics.volume = this.coneService.calculateVolume(shape);
        metrics.surfaceArea = this.coneService.calculateSurfaceArea(shape);
      }
    } else if (shape instanceof Rectangle) {
      if (this.rectangleService.isValidRectangle(shape)) {
        metrics.area = this.rectangleService.calculateArea(shape);
        metrics.perimeter = this.rectangleService.calculatePerimeter(shape);
      }
    }

    this.cache.set(shape.id, metrics);
    logger.info({ shapeId: shape.id, metrics }, 'Warehouse updated metrics for shape');
  }

  public initShape(shape: Shape): void {
    this.update(shape);
  }
}
