import { Shape } from '../../entities/Shape';
import { Specification } from './Specification';

export class DistanceFromOriginSpecification implements Specification<Shape> {
  private origin = { x: 0, y: 0, z: 0 };

  constructor(private maxDistance: number) {}

  isSatisfiedBy(item: Shape): boolean {
    return item.getPoints().every((p) => {
      const dist = Math.sqrt(
        (p.x - this.origin.x) ** 2
        + (p.y - this.origin.y) ** 2
        + (p.z - this.origin.z) ** 2,
      );
      return dist <= this.maxDistance;
    });
  }
}
