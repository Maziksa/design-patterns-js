import { FileReader } from './readers/FileReader';
import { RectangleFactory } from './factories/RectangleFactory';
import { ConeFactory } from './factories/ConeFactory';
import { Rectangle } from './entities/Rectangle';
import { Point } from './entities/Point';
import logger from './utils/logger';
import { Warehouse } from './store/Warehouse';
import { ShapeRepository } from './repository/ShapeRepository';
import { FirstQuadrantSpecification, AreaRangeSpecification } from './repository/specifications';
import { ShapeXCoordinateComparator } from './repository/comparators';

function main() {
  try {
    const rectangleFactory = new RectangleFactory();
    const coneFactory = new ConeFactory();
    const fileReader = new FileReader([rectangleFactory, coneFactory]);

    const warehouse = Warehouse.getInstance();
    const repository = new ShapeRepository();

    const rectangles = fileReader.readShapesFromFile(
      'data/rectangles.txt',
      'Rectangle',
    );
    const cones = fileReader.readShapesFromFile('data/cones.txt', 'Cone');
    const allShapes = [...rectangles, ...cones];

    allShapes.forEach((shape) => {
      shape.attach(warehouse);
      warehouse.initShape(shape);
      repository.add(shape);
    });

    logger.info('--- Query: Shapes in First Quadrant ---');
    const firstQuadrantShapes = repository.query(
      new FirstQuadrantSpecification(),
    );
    console.log(
      'Shapes in 1st Quadrant:',
      firstQuadrantShapes.map((s) => s.id),
    );

    logger.info('--- Query: Rectangles with Area between 10 and 20 ---');
    const mediumAreaShapes = repository.query(
      new AreaRangeSpecification(10, 20),
    );
    console.log(
      'Shapes with area 10-20:',
      mediumAreaShapes.map((s) => s.id),
    );

    logger.info('--- Sort: By X Coordinate ---');
    const sortedShapes = repository.sort(new ShapeXCoordinateComparator());
    console.log(
      'Sorted by X:',
      sortedShapes.map((s) => `${s.id} (x=${s.getPoints()[0].x})`),
    );

    const rect = repository.getById('rect1') as Rectangle;
    if (rect) {
      console.log(
        `\n[Before Change] ID: ${rect.id}, Area in Warehouse: ${
          warehouse.getMetrics(rect.id)?.area
        }`,
      );

      logger.info('Changing rectangle coordinates...');
      rect.setPoints(
        new Point(0, 0),
        new Point(10, 0),
        new Point(10, 5),
        new Point(0, 5),
      );

      console.log(
        `[After Change] ID: ${rect.id}, Area in Warehouse: ${
          warehouse.getMetrics(rect.id)?.area
        }`,
      );
    }
  } catch (error) {
    logger.error({ err: error }, 'Application failed');
    process.exit(1);
  }
}

main();
