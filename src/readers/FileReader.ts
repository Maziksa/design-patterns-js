import * as fs from 'fs';
import * as path from 'path';
import { Shape } from '../entities/Shape';
import { ShapeFactory } from '../factories/ShapeFactory';
import logger from '../utils/logger';

export class FileReader {
  private factories: Map<string, ShapeFactory>;

  constructor(factories: ShapeFactory[]) {
    this.factories = new Map();
    factories.forEach((factory) => {
      this.factories.set(factory.getShapeType(), factory);
    });
  }

  private getFactory(shapeType: string): ShapeFactory {
    const factory = this.factories.get(shapeType);
    if (!factory) {
      throw new Error(`No factory found for shape type: ${shapeType}`);
    }
    return factory;
  }

  readShapesFromFile(filePath: string, shapeType: string): Shape[] {
    const factory = this.getFactory(shapeType);

    const absolutePath = path.resolve(filePath);
    logger.info(
      { filePath: absolutePath, shapeType },
      'Reading shapes from file',
    );

    if (!fs.existsSync(absolutePath)) {
      logger.error({ filePath: absolutePath }, 'File not found');
      throw new Error(`File not found: ${absolutePath}`);
    }

    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const lines = fileContent.split('\n');

    const shapes: Shape[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.length === 0 || trimmedLine.startsWith('#')) {
        return;
      }

      try {
        const data = trimmedLine.split(/\s+/);
        const shape = factory.create(data);
        shapes.push(shape);
      } catch (error) {
        logger.error(
          {
            line: index + 1,
            data: trimmedLine,
            shapeType,
            err: error,
          },
          'Failed to create shape',
        );
      }
    });

    logger.info(
      {
        filePath: absolutePath,
        shapeType,
        totalShapes: shapes.length,
      },
      `Successfully loaded ${shapes.length} shapes`,
    );

    return shapes;
  }
}
