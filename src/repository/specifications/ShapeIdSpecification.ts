import { Shape } from '../../entities/Shape';
import { Specification } from './Specification';

export class ShapeIdSpecification implements Specification<Shape> {
  constructor(private id: string) {}

  isSatisfiedBy(item: Shape): boolean {
    return item.id === this.id;
  }
}
