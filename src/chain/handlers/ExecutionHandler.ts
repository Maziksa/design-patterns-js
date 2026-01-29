import { ITaskComponent } from '../../composite/TaskComponent'
import { TaskStatus } from '../../domain/enums'
import { AbstractHandler } from '../Handler'

export class ExecutionHandler extends AbstractHandler {
	handle(task: ITaskComponent): void {
		if (task.status === TaskStatus.Blocked) {
			console.log(`[Exec] Skipping blocked task ${task.type}#${task.id}`)
			return
		}
    
		console.log(`[Exec] Executing ${task.type}#${task.id}... DONE`)
		task.status = TaskStatus.Done

		this.next(task)
	}
}
