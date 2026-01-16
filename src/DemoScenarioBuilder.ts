import { Graph } from './core/Graph';
import { IGraphStorage } from './bridge/IGraphStorage';
import { Subgraph } from './composite/Subgraph';
import { Vertex } from './composite/Vertex';
import { Edge } from './composite/Edge';

export class DemoScenarioBuilder {
  static buildITDepartmentScenario(storage: IGraphStorage): Graph {
    const graph = new Graph(storage);
    
    const itDepartment = new Subgraph('IT Department');
    const backendTeam = new Subgraph('Backend Team');
    
    backendTeam.add(new Vertex('John (Node.js)'));
    backendTeam.add(new Vertex('Mike (DBA)'));
    
    const frontendTeam = new Subgraph('Frontend Team');
    frontendTeam.add(new Vertex('Anna (React)'));
    frontendTeam.add(new Vertex('Sophie (Design)'));
    
    itDepartment.add(backendTeam);
    itDepartment.add(frontendTeam);
    
    graph.addNode(itDepartment);
    
    
    graph.addNode(new Edge('Anna (React)', 'Sophie (Design)', 5, true));
    graph.addNode(new Edge('John (Node.js)', 'Mike (DBA)', 3, true));
    graph.addNode(new Edge('John (Node.js)', 'Anna (React)', 8, true));
    
    return graph;
  }

  static buildConsultantScenario(storage: IGraphStorage): Graph {
    const graph = new Graph(storage);
    
    const itDepartment = new Subgraph('IT Department');
    const backendTeam = new Subgraph('Backend Team');
    
    backendTeam.add(new Vertex('John (Node.js)'));
    backendTeam.add(new Vertex('Mike (DBA)'));
    
    const frontendTeam = new Subgraph('Frontend Team');
    frontendTeam.add(new Vertex('Anna (React)'));
    frontendTeam.add(new Vertex('Sophie (Design)'));
    
    itDepartment.add(backendTeam);
    itDepartment.add(frontendTeam);
    
    graph.addNode(itDepartment);
    graph.addNode(new Vertex('Consultant (External)'));
    
    graph.addNode(new Edge('Consultant (External)', 'Mike (DBA)', 10, false));
    graph.connect('Sophie (Design)', 'Consultant (External)');
    
    return graph;
  }
  
  static buildNetworkTopologyScenario(storage: IGraphStorage): Graph {
    const graph = new Graph(storage);
    
    const networkSubgraph = new Subgraph('Network Topology');
    networkSubgraph.add(new Vertex('Router-A'));
    networkSubgraph.add(new Vertex('Router-B'));
    networkSubgraph.add(new Vertex('Router-C'));
    networkSubgraph.add(new Edge('Router-A', 'Router-B', 100, false));
    networkSubgraph.add(new Edge('Router-B', 'Router-C', 50, false));
    networkSubgraph.add(new Edge('Router-A', 'Router-C', 200, false));
    
    graph.addNode(networkSubgraph);
    
    return graph;
  }
}
