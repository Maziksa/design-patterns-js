import { TaskComponent } from '../TaskComponent';
import { TaskType } from '../../domain/enums';

export class BugTask extends TaskComponent {
	constructor(title: string) {
		super(TaskType.Bug, title);
	}
}

export class FeatureTask extends TaskComponent {
	constructor(title: string) {
		super(TaskType.Feature, title);
	}
}

export class ResearchTask extends TaskComponent {
	constructor(title: string) {
		super(TaskType.Research, title);
	}
}

export class ChoreTask extends TaskComponent {
	constructor(title: string) {
		super(TaskType.Chore, title);
	}
}
