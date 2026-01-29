import { ITaskComponent } from '../../composite/TaskComponent'
import { EpicTask, StoryTask } from '../../composite/composites/CompositeTasks'
import {
  BugTask,
  ChoreTask,
  FeatureTask,
  ResearchTask,
} from '../../composite/leaves/LeafTasks'
import { TaskCreator } from '../TaskCreator'

export class BugTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new BugTask(title)
  }
}

export class FeatureTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new FeatureTask(title)
  }
}

export class ResearchTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new ResearchTask(title)
  }
}

export class ChoreTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new ChoreTask(title)
  }
}

export class EpicTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new EpicTask(title)
  }
}

export class StoryTaskCreator extends TaskCreator {
  create(title: string): ITaskComponent {
    return new StoryTask(title)
  }
}
