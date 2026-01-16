export interface IGraphStorage {
  addVertex(id: string): void;
  addEdge(sourceId: string, targetId: string): void;
  printStorage(): void;
}
