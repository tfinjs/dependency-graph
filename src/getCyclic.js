import flatten from 'lodash/flatten';

class GetCycles {
  constructor(nodeStack = {}) {
    this.nodeStack = nodeStack;
  }

  cycleStacks = [];

  hasTraversed = false;

  cyclicNodes = [];

  getCyclicNodes() {
    return this.cyclicNodes;
  }

  getCycles() {
    if (this.hasTraversed) {
      return;
    }
    Object.keys(this.nodeStack).forEach((node) => {
      this.detectCycle(node);
    });
    this.hasTraversed = true;
  }

  getCycleStacks() {
    return this.cycleStacks.map((cycle) => cycle.sort());
  }

  markCyclicNode = (recursionStack, node) => {
    this.cyclicNodes.push([recursionStack, node]);
  };

  detectCycle(node, recursionStack = []) {
    if (flatten(this.cycleStacks).includes(node)) {
      return this.cycleStacks.find((cycle) => cycle.includes(node));
    }

    const nodes = this.nodeStack[node];
    for (let i = 0; i < nodes.length; i += 1) {
      const childNode = nodes[i];
      this.populateRecursionStack(childNode, recursionStack);
    }

    if (recursionStack.includes(node)) {
      this.markCyclicNode(recursionStack, node);
      this.cycleStacks.push(recursionStack.sort());
      return recursionStack;
    }

    recursionStack.push(node);

    return recursionStack;
  }

  populateRecursionStack(node, recursionStack) {
    if (recursionStack.includes(node)) {
      return;
    }
    recursionStack.push(node);
    const nodes = this.nodeStack[node];
    for (let i = 0; i < nodes.length; i += 1) {
      const childNode = nodes[i];
      this.populateRecursionStack(childNode, recursionStack);
    }
  }
}

const getCyclic = (graph) => {
  const cyclic = new GetCycles(graph);
  cyclic.getCycles();
  return {
    stacks: cyclic.getCycleStacks(),
    nodes: cyclic.getCyclicNodes(),
  };
};

export default getCyclic;
