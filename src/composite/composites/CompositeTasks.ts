import { TaskComponent, ITaskComponent } from '../TaskComponent';
import { TaskType } from '../../domain/enums';

abstract class BaseCompositeTask extends TaskComponent {
  override isComposite(): boolean {
    return true;
  }

  override add(component: ITaskComponent): void {
    this._children.push(component);
  }

  override remove(component: ITaskComponent): void {
    this._children = this._children.filter((c) => c !== component);
  }

  override children(): ReadonlyArray<ITaskComponent> {
    return this._children;
  }
}

export class EpicTask extends BaseCompositeTask {
  constructor(title: string) {
    super(TaskType.Epic, title);
  }
}

export class StoryTask extends BaseCompositeTask {
  constructor(title: string) {
    super(TaskType.Story, title);
  }
}
