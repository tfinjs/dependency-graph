import flatten from 'lodash/flatten';

const getDependenciesOfNode = (graph, node) => {
  const dependencyLevels = [[node]];

  const addToLevel = () => {
    const dependencies = dependencyLevels[dependencyLevels.length - 1]
      .reduce(
        (nestedDeps, dependencyNode) => [
          ...nestedDeps,
          ...graph[dependencyNode].filter((a) => !nestedDeps.includes(a)),
        ],
        [],
      )
      .filter(
        (dependencyNode) => !flatten(dependencyLevels).includes(dependencyNode),
      );

    if (dependencies.length) {
      dependencyLevels.push(dependencies);
      addToLevel();
    }
  };
  addToLevel();
  return dependencyLevels;
};

export default getDependenciesOfNode;
