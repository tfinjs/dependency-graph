import flatten from 'lodash/flatten';
import getCyclic from './getCyclic';

const getCyclicNodes = (graph) => {
  const { nodes } = getCyclic(graph);
  return nodes.map(([, node]) => node);
};

const getNonCyclicAdjacencyList = (graph) => {
  const cyclicNodes = getCyclicNodes(graph);
  const nonCyclicAdjacencyList = Object.entries(graph).filter(
    ([node, dependencies]) =>
      !cyclicNodes.includes(node)
      && dependencies.every(
        (dependencyNode) => !cyclicNodes.includes(dependencyNode),
      ),
  );
  return nonCyclicAdjacencyList;
};

const addWhatCanBeAddedToLevels = ({
  nonCyclicAdjacencyList,
  nonCyclicGraph,
}) => {
  const dependencyLevel = nonCyclicAdjacencyList
    .filter(
      ([node, dependencies]) =>
        !flatten(nonCyclicGraph).includes(node)
        && dependencies.every((dependency) =>
          flatten(nonCyclicGraph).includes(dependency)),
    )
    .map(([node]) => node);
  if (dependencyLevel.length > 0) {
    nonCyclicGraph.push(dependencyLevel);
    addWhatCanBeAddedToLevels({
      nonCyclicAdjacencyList,
      nonCyclicGraph,
    });
  }
};

const getNonCyclic = (graph) => {
  const nonCyclicGraph = [];

  const nonCyclicAdjacencyList = getNonCyclicAdjacencyList(graph);

  const withoutDependencies = nonCyclicAdjacencyList
    .filter(([, dependencies]) => dependencies.length === 0)
    .map(([node]) => node);

  if (withoutDependencies.length > 0) {
    nonCyclicGraph.push(withoutDependencies);
  }

  addWhatCanBeAddedToLevels({ nonCyclicAdjacencyList, nonCyclicGraph });

  return nonCyclicGraph;
};

export default getNonCyclic;
