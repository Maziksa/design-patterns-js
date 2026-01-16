export interface GraphComponent {
  display(indent?: number): void;
  collectVertices(): string[];
  
  applyToStorage?(storage: any): void;
}
