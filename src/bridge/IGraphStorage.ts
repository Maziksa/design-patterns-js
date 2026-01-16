export interface IGraphStorage {
  addVertex(id: string): void;
  addEdge(sourceId: string, targetId: string, weight?: number, directed?: boolean): void;
  printStorage(): void;
}
