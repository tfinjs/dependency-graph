import flatten from 'lodash/flatten';

const getDependsOnNode = (graph, node) => {
  const dependsOnNode = Object.entries(graph)
    .filter(([, dependencies]) => dependencies.includes(node))
    .map(([graphNode]) => graphNode);

  return dependsOnNode;
};

const getInversedDependenciesOfNode = (graph, node) => {
  const dependants = [];
  const toSort = [];
  const addToDependants = (deps) => {
    deps.forEach((dep) => {
      if (!toSort.includes(dep)) {
        toSort.push(dep);
      }
    });
    deps.forEach((dep) => {
      if (!dependants.includes(dep)) {
        dependants.push(dep);
        const u = getDependsOnNode(graph, dep);
        addToDependants(u);
      }
    });
  };
  const u1 = getDependsOnNode(graph, node);
  addToDependants(u1);

  return dependants.sort((a, b) => toSort.indexOf(a) - toSort.indexOf(b));
};

export default getInversedDependenciesOfNode;
