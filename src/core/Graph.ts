import { IGraphStorage } from '../bridge/IGraphStorage';
import { GraphComponent } from '../composite/GraphComponent';
import { Subgraph } from '../composite/Subgraph';

export class Graph {
  private root: Subgraph;

  constructor(protected storage: IGraphStorage) {
    this.root = new Subgraph('Root Graph');
  }

  public addNode(component: GraphComponent): void {
    this.root.add(component);
    
    component.applyToStorage(this.storage);
  }

  public connect(id1: string, id2: string, weight: number = 1): void {
    this.storage.addEdge(id1, id2, weight, true);
  }

  public render(): void {
    console.log('='.repeat(40));
    console.log('VISUAL STRUCTURE (Composite Pattern):');
    this.root.display();
    console.log('-'.repeat(40));
    console.log('DATA STORAGE (Bridge Pattern):');
    this.storage.printStorage();
    console.log('='.repeat(40));
  }
}
