import { ITaskComponent } from '../../composite/TaskComponent'
import { DEFAULT_DEVELOPERS } from '../../domain/config'
import { AbstractHandler } from '../Handler'

export class AssignmentHandler extends AbstractHandler {
  handle(task: ITaskComponent): void {
    if (task.assignee) {
      this.next(task)
      return
    }
		
    const index = task.id % DEFAULT_DEVELOPERS.length

    task.assignee = DEFAULT_DEVELOPERS[index]
    console.log(`[Assign] Assigned ${task.assignee} to ${task.type}#${task.id}`)

    this.next(task)
  }
}
