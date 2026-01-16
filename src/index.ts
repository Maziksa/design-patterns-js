import { AdjacencyListStorage } from './bridge/AdjacencyListStorage';
import { AdjacencyMatrixStorage } from './bridge/AdjacencyMatrixStorage';
import { DemoScenarioBuilder } from './DemoScenarioBuilder';

const runDemo = (): void => {
  console.log('\n\n>>> SCENARIO A: Using Matrix Storage with Edge objects');
  const matrixGraph = DemoScenarioBuilder.buildITDepartmentScenario(
    new AdjacencyMatrixStorage()
  );
  matrixGraph.render();

  console.log('\n\n>>> SCENARIO B: Using List Storage with mixed approach');
  const listGraph = DemoScenarioBuilder.buildConsultantScenario(
    new AdjacencyListStorage()
  );
  listGraph.render();

  console.log('\n\n>>> SCENARIO C: Graph with weighted edges only');
  const weightedGraph = DemoScenarioBuilder.buildNetworkTopologyScenario(
    new AdjacencyListStorage()
  );
  weightedGraph.render();
};

runDemo();
