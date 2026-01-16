import { GraphComponent } from './GraphComponent';
import { IGraphStorage } from '../bridge/IGraphStorage';

export class Subgraph implements GraphComponent {
  private components: GraphComponent[] = [];

  constructor(private name: string) {}

  add(component: GraphComponent): void {
    this.components.push(component);
  }

  display(indent: number = 0): void {
    console.log(`${' '.repeat(indent)} Group: ${this.name}`);
    this.components.forEach((c) => c.display(indent + 2));
  }

  applyToStorage(storage: IGraphStorage): void {
    this.components.forEach((c) => c.applyToStorage(storage));
  }
}
