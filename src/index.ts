import { FileReader } from './readers/FileReader';
import { RectangleFactory } from './factories/RectangleFactory';
import { ConeFactory } from './factories/ConeFactory';
import { RectangleService } from './services/RectangleService';
import { ConeService } from './services/ConeService';
import { Rectangle } from './entities/Rectangle';
import { Cone } from './entities/Cone';
import logger from './utils/logger';

function main() {
  try {
    const rectangleFactory = new RectangleFactory();
    const coneFactory = new ConeFactory();

    const fileReader = new FileReader([rectangleFactory, coneFactory]);

    const rectangles = fileReader.readShapesFromFile('data/rectangles.txt', 'Rectangle');
    logger.info(`Loaded ${rectangles.length} rectangles`);

    const rectangleService = new RectangleService();
    rectangles.forEach((shape) => {
      const rectangle = shape as Rectangle;
      const characteristics = rectangleService.getCharacteristics(rectangle);

      logger.info({
        id: rectangle.id,
        ...characteristics,
      }, `Rectangle characteristics: ${rectangle.id}`);

      console.log('\n=== Rectangle ===');
      console.log(`ID: ${rectangle.id}`);
      console.log(`Area: ${characteristics.area.toFixed(2)}`);
      console.log(`Perimeter: ${characteristics.perimeter.toFixed(2)}`);
      console.log(`Is Valid: ${characteristics.isValid}`);
      console.log(`Is Convex: ${characteristics.isConvex}`);
      console.log(`Is Square: ${characteristics.isSquare}`);
      console.log(`Is Rhombus: ${characteristics.isRhombus}`);
      console.log(`Is Trapezoid: ${characteristics.isTrapezoid}`);
    });

    const cones = fileReader.readShapesFromFile('data/cones.txt', 'Cone');
    logger.info(`Loaded ${cones.length} cones`);

    const coneService = new ConeService();
    cones.forEach((shape) => {
      const cone = shape as Cone;
      const characteristics = coneService.getCharacteristics(cone);

      logger.info({
        id: cone.id,
        ...characteristics,
      }, `Cone characteristics: ${cone.id}`);

      console.log('\n=== Cone ===');
      console.log(`ID: ${cone.id}`);
      console.log(`Volume: ${characteristics.volume.toFixed(2)}`);
      console.log(`Surface Area: ${characteristics.surfaceArea.toFixed(2)}`);
      console.log(`Height: ${characteristics.height.toFixed(2)}`);
      console.log(`Radius: ${characteristics.radius.toFixed(2)}`);
      console.log(`Slant Height: ${characteristics.slantHeight.toFixed(2)}`);
      console.log(`Is Valid: ${characteristics.isValid}`);
      console.log(`Base on Plane: ${characteristics.baseOnPlane.isOnPlane}`);
      if (characteristics.baseOnPlane.plane) {
        console.log(`Plane: ${characteristics.baseOnPlane.plane}`);
      }
    });

    logger.info('Application completed successfully');
  } catch (error) {
    logger.error({ err: error }, 'Application failed');
    process.exit(1);
  }
}

main();
