import { GraphComponent } from './GraphComponent';
import { IGraphStorage } from '../bridge/IGraphStorage';

export class Edge implements GraphComponent {
  constructor(
    private sourceId: string,
    private targetId: string,
    private weight: number = 1,
    private directed: boolean = true
  ) {}

  display(indent: number = 0): void {
    const arrow = this.directed ? '→' : '↔';
    const weightInfo = ` (weight: ${this.weight})`;
    console.log(
      `${' '.repeat(indent)} Edge: ${this.sourceId} ${arrow} ${
        this.targetId
      }${weightInfo}`
    );
  }

  applyToStorage(storage: IGraphStorage): void {
    storage.addEdge(this.sourceId, this.targetId, this.weight, this.directed);
  }
}
