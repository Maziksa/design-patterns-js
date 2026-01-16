import { GraphComponent } from './GraphComponent';
import { IGraphStorage } from '../bridge/IGraphStorage';

export class Vertex implements GraphComponent {
  constructor(private id: string) {}

  display(indent: number = 0): void {
    console.log(`${' '.repeat(indent)}• Vertex: ${this.id}`);
  }

  applyToStorage(storage: IGraphStorage): void {
    storage.addVertex(this.id);
  }
}
