import { IGraphStorage } from './IGraphStorage';

export class AdjacencyMatrixStorage implements IGraphStorage {
  private matrix: number[][] = [];
  private indexMap: Map<string, number> = new Map();
  private ids: string[] = [];

  addVertex(id: string): void {
    if (this.indexMap.has(id)) return;

    const newIndex = this.ids.length;
    this.indexMap.set(id, newIndex);
    this.ids.push(id);

    this.matrix.forEach((row) => row.push(0));
    
    this.matrix.push(new Array(this.ids.length).fill(0));
  }

  addEdge(sourceId: string, targetId: string): void {
    const srcIdx = this.indexMap.get(sourceId);
    const trgIdx = this.indexMap.get(targetId);

    if (srcIdx !== undefined && trgIdx !== undefined) {
      this.matrix[srcIdx][trgIdx] = 1;
    }
  }

  printStorage(): void {
    console.log('\n[Storage Implementation: Adjacency Matrix]');
    console.log('  ' + this.ids.join(' '));
    
    this.matrix.forEach((row, i) => {
      console.log(`${this.ids[i]} ${row.join(' ')}`);
    });
  }
}
