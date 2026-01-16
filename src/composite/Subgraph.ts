import { GraphComponent } from './GraphComponent';

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

  collectVertices(): string[] {
    return this.components.flatMap((c) => c.collectVertices());
  }
}
