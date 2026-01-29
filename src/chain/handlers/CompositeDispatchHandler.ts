import { AbstractHandler } from '../Handler';
import { ITaskComponent } from '../../composite/TaskComponent';
import { TaskStatus, Priority } from '../../domain/enums';

export class CompositeDispatchHandler extends AbstractHandler {
  handle(task: ITaskComponent): void {
    if (task.isComposite()) {
      console.log(`[CompositeDispatch] Processing composite ${task.type}#${task.id}`);
      
      for (const child of task.children()) {
        this.next(child);
      }

      this.aggregateResults(task);
      return; 
    }

    this.next(task);
  }

  private aggregateResults(task: ITaskComponent): void {
    const children = task.children();
    if (children.length === 0) return;

    const sumEstimate = children.reduce((acc, c) => acc + (c.estimate || 0), 0);
    task.estimate = sumEstimate > 0 ? sumEstimate : undefined;

    const priorities = children.map(c => c.priority ?? Priority.Low);
    task.priority = Math.max(...priorities) as Priority;

    if (children.every(c => c.status === TaskStatus.Done)) {
      task.status = TaskStatus.Done;
    } else if (children.some(c => c.status === TaskStatus.InProgress || c.status === TaskStatus.Ready)) {
      task.status = TaskStatus.InProgress;
    }
    
    console.log(`[CompositeDispatch] Aggregated ${task.type}#${task.id}: est=${task.estimate}, status=${task.status}`);
  }
}
