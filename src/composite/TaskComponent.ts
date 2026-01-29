import { TaskType, TaskStatus, Priority } from '../domain/enums';

let idSeq = 1;
export const nextId = () => idSeq++;

export interface ITaskComponent {
  readonly id: number;
  title: string;
  readonly type: TaskType;
  status: TaskStatus;
  estimate?: number;
  assignee?: string;
  priority?: Priority;

  isComposite(): boolean;
  add(component: ITaskComponent): void;
  remove(component: ITaskComponent): void;
  children(): ReadonlyArray<ITaskComponent>;
}

export abstract class TaskComponent implements ITaskComponent {
  public readonly id: number;
  public status: TaskStatus = TaskStatus.New;
  public estimate?: number;
  public assignee?: string;
  public priority?: Priority;
  protected _children: ITaskComponent[] = [];

  constructor(public readonly type: TaskType, public title: string) {
    this.id = nextId();
  }

  isComposite(): boolean {
    return false;
  }

  add(_component: ITaskComponent): void {
    throw new Error(`Cannot add task to leaf type: ${this.type}`);
  }
  
  remove(_component: ITaskComponent): void {
    throw new Error(`Cannot remove task from leaf type: ${this.type}`);
  }

  children(): ReadonlyArray<ITaskComponent> {
    return [];
  }
}
