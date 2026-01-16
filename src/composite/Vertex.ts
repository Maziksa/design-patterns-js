import { GraphComponent } from './GraphComponent';

export class Vertex implements GraphComponent {
  constructor(private id: string) {}

  display(indent: number = 0): void {
    console.log(`${' '.repeat(indent)}• Vertex: ${this.id}`);
  }

  collectVertices(): string[] {
    return [this.id];
  }
}
