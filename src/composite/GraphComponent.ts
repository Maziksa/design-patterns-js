import { IGraphStorage } from '../bridge/IGraphStorage';

export interface GraphComponent {
  display(indent?: number): void;
  applyToStorage(storage: IGraphStorage): void;
}
