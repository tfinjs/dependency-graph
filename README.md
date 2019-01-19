Dependency graph
=======================

Find properties of a graph (used specifically for handling dependency graphs);

# Installation
```bash
npm install @tfinjs/dependency-graph
```

# API

```javascript
import {
  getCyclic,
  getDependenciesOfNode,
  getInversedDependenciesOfNode,
  getNonCyclic,
} from '@tfinjs/dependency-graph';
```

#### graph

Each function takes a graph object that looks like this:
```javascript
const graph = {
  1: ['2'],
  2: ['3', '6', '1'],
  3: ['4'],
  4: [],
  5: ['5'],
  6: [],
};
```
`2` is a dependency of `1`, `4` does not have any dependencies and `2` has `3`, `6` and `1` as dependencies

#### Type definitions used in the API documentation
```
type node = string;
type nodes = [node[], node][][];
type stacks = node[][]
```

## getCyclic
`getCyclic(graph) => { nodes, stacks }`

Example:

```javascript
const result = getCyclic({
  a: ['b'],
  b: ['a'],
  c: ['d'],
  d: [],
});

expect(result).toEqual({ nodes: [[['a', 'b'], 'a']], stacks: [['a', 'b']] });
```

`stacks` are the groups of cyclic dependencies.
the first stack `['a', 'b']` is cyclic because a depends on b and b depends on a.
`nodes` contains the stack and an unique entry point to the stack which is `a` in this case.

## getNonCyclic

`getNonCyclic(graph) => node[][]`

Returns the non-cyclic nodes in their dependency-order (d must exist before c can be created)

Example:

```javascript
const result = getNonCyclic({
  a: ['b'],
  b: ['a'],
  c: ['d'],
  d: [],
});
expect(result).toEqual([['d'], ['c']]);
```

## getDependenciesOfNode
`getDependenciesOfNode(graph, node) => node[][]`

Returns the dependency graph of a node, will always include the specific node as the first element

Example:

```javascript
const result = getDependenciesOfNode(
  {
    1: ['2'],
    2: ['3', '6', '1'],
    3: ['4'],
    4: [],
    5: ['1'],
    6: [],
  },
  '2',
);
expect(result).toEqual([['2'], ['3', '6', '1'], ['4']]);

```

## getInversedDependenciesOfNode

`getInversedDependenciesOfNode(graph, node) => node[]`

Returns list of nodes that should be removed if the node is removed from the graph.

Example:

```javascript
const result = getInversedDependenciesOfNode(
  {
    1: ['2'],
    2: ['3'],
    3: ['4'],
    4: [],
    5: ['1'],
  },
  '4',
);
expect(result).toEqual(['3', '2', '1', '5']);

```
if `4` is removed, then `3`, `2`, `1` whould be removed first as they depend on `4` and then 5 would be removed as it depends on `1`
