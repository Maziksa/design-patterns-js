import { Shape } from '../../entities/Shape';
import { Specification } from './Specification';
import { Warehouse } from '../../store/Warehouse';

export class VolumeRangeSpecification implements Specification<Shape> {
  constructor(private min: number, private max: number) {}

  isSatisfiedBy(item: Shape): boolean {
    const metrics = Warehouse.getInstance().getMetrics(item.id);
    if (!metrics || metrics.volume === undefined) return false;
    return metrics.volume >= this.min && metrics.volume <= this.max;
  }
}
