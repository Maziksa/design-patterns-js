import { GraphComponent } from './GraphComponent';
import { IGraphStorage } from '../bridge/IGraphStorage';

export class Edge implements GraphComponent {
  constructor(
    private sourceId: string,
    private targetId: string,
    private weight?: number,
    private directed: boolean = true
  ) {}

  display(indent: number = 0): void {
    const arrow = this.directed ? '→' : '↔';
    const weightInfo = this.weight !== undefined ? ` (weight: ${this.weight})` : '';
    console.log(`${' '.repeat(indent)}🔗 Edge: ${this.sourceId} ${arrow} ${this.targetId}${weightInfo}`);
  }

  collectVertices(): string[] {
    return [this.sourceId, this.targetId];
  }
  
  applyToStorage(storage: IGraphStorage): void {
    storage.addEdge(this.sourceId, this.targetId);
  }

  getSourceId(): string {
    return this.sourceId;
  }

  getTargetId(): string {
    return this.targetId;
  }

  isDirected(): boolean {
    return this.directed;
  }

  getWeight(): number | undefined {
    return this.weight;
  }
}
