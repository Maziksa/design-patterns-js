import { Priority } from './domain/enums';
import { ITaskComponent } from './composite/TaskComponent';
import { BugTaskCreator, FeatureTaskCreator, StoryTaskCreator, EpicTaskCreator } from './factory/creators/ConcreteCreators';
import { CompositeDispatchHandler } from './chain/handlers/CompositeDispatchHandler';
import { ValidationHandler } from './chain/handlers/ValidationHandler';
import { EstimationHandler } from './chain/handlers/EstimationHandler';
import { AssignmentHandler } from './chain/handlers/AssignmentHandler';
import { ExecutionHandler } from './chain/handlers/ExecutionHandler';


function printTree(root: ITaskComponent, depth = 0) {
  const indent = "  ".repeat(depth);
  const info = `[${root.status}] Est:${root.estimate ?? '-'} Assignee:${root.assignee ?? '-'}`;
  console.log(`${indent}► ${root.type} #${root.id} "${root.title}" ${info}`);
  
  for (const child of root.children()) {
    printTree(child, depth + 1);
  }
}

function main() {
  console.log("1. Building Task Hierarchy\n");
  
  const epicFactory = new EpicTaskCreator();
  const storyFactory = new StoryTaskCreator();
  const featureFactory = new FeatureTaskCreator();
  const bugFactory = new BugTaskCreator();

  const epic = epicFactory.createWithLog("Global System Refactoring");
  
  const story1 = storyFactory.createWithLog("Refactor Backend");
  const feature1 = featureFactory.createWithLog("Split into microservices");
  const bug1 = bugFactory.createWithLog("Fix DB connection leak");
  
  const story2 = storyFactory.createWithLog("Refactor Frontend");
  const feature2 = featureFactory.createWithLog("Update React Components");

  story1.add(feature1);
  story1.add(bug1);
  
  story2.add(feature2);
  
  epic.add(story1);
  epic.add(story2);

  bug1.priority = Priority.Critical;

  console.log("\nTree BEFORE Processing");
  printTree(epic);

  console.log("\n2. Configuring Pipeline");
  
  const pipeline = new CompositeDispatchHandler();
  
  pipeline
    .setNext(new ValidationHandler())
    .setNext(new EstimationHandler())
    .setNext(new AssignmentHandler())
    .setNext(new ExecutionHandler());

  console.log("\n3. Running Pipeline");
  pipeline.handle(epic);

  console.log("\nTree AFTER Processing");
  printTree(epic);
}

main();
