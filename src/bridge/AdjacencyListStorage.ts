import { IGraphStorage } from './IGraphStorage';

interface Neighbor {
  id: string;
  weight: number;
}

export class AdjacencyListStorage implements IGraphStorage {
  private list: Map<string, Neighbor[]> = new Map();

  addVertex(id: string): void {
    if (!this.list.has(id)) {
      this.list.set(id, []);
    }
  }

  addEdge(sourceId: string, targetId: string, weight: number = 1, directed: boolean = true): void {
    this.addVertex(sourceId);
    this.addVertex(targetId);

    this.list.get(sourceId)?.push({ id: targetId, weight });

    if (!directed) {
      this.list.get(targetId)?.push({ id: sourceId, weight });
    }
  }

  printStorage(): void {
    console.log('\n[Storage Implementation: Adjacency List]');
    this.list.forEach((neighbors, id) => {
      const connections = neighbors.length
        ? neighbors.map(n => `${n.id}(w:${n.weight})`).join(', ')
        : 'No connections';
      console.log(`${id} -> ${connections}`);
    });
  }
}
