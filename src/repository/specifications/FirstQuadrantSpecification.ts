import { Shape } from '../../entities/Shape';
import { Specification } from './Specification';

export class FirstQuadrantSpecification implements Specification<Shape> {
  isSatisfiedBy(item: Shape): boolean {
    return item.getPoints().every((p) => p.x > 0 && p.y > 0);
  }
}
