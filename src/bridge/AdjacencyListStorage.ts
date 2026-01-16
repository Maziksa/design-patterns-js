import { IGraphStorage } from './IGraphStorage';

export class AdjacencyListStorage implements IGraphStorage {
  private list: Map<string, string[]> = new Map();

  addVertex(id: string): void {
    if (!this.list.has(id)) {
      this.list.set(id, []);
    }
  }

  addEdge(sourceId: string, targetId: string): void {
    this.list.get(sourceId)?.push(targetId);
  }

  printStorage(): void {
    console.log('\n[Storage Implementation: Adjacency List]');
    this.list.forEach((neighbors, id) => {
      const connections = neighbors.length ? neighbors.join(', ') : 'No connections';
      console.log(`${id} -> ${connections}`);
    });
  }
}
