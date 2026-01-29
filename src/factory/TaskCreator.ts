import { ITaskComponent } from '../composite/TaskComponent'

export abstract class TaskCreator {
  abstract create(title: string): ITaskComponent
	
  createWithLog(title: string): ITaskComponent {
    const t = this.create(title)
    console.log(`[Factory] Created ${t.type}#${t.id} '${t.title}'`)
    return t
  }
}
