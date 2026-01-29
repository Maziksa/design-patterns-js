import { ITaskComponent } from '../../composite/TaskComponent'
import { DEFAULT_ESTIMATES } from '../../domain/config'
import { AbstractHandler } from '../Handler'

export class EstimationHandler extends AbstractHandler {
  handle(task: ITaskComponent): void {
    if (task.estimate != null) {
      this.next(task)
      return
    }
		
    task.estimate = DEFAULT_ESTIMATES[task.type]

    console.log(
      `[Estimate] Set ${task.type}#${task.id} estimate to ${task.estimate ?? '-'}`,
    )
    this.next(task)
  }
}
