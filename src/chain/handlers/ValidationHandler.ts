import { AbstractHandler } from '../Handler';
import { ITaskComponent } from '../../composite/TaskComponent';
import { TaskStatus } from '../../domain/enums';

export class ValidationHandler extends AbstractHandler {
  handle(task: ITaskComponent): void {
    if (!task.title || task.title.trim().length === 0) {
      task.status = TaskStatus.Blocked;
      console.log(`[Validation] Error: Task ${task.type}#${task.id} has no title -> Blocked`);
      return;
    }
    
    if (task.status === TaskStatus.New) {
      task.status = TaskStatus.Ready;
    }

    this.next(task);
  }
}
