import getCyclic from './getCyclic';
import getNonCyclic from './getNonCyclic';
import getDependenciesOfNode from './getDependenciesOfNode';
import getInversedDependenciesOfNode from './getInversedDependenciesOfNode';

/* eslint-env jest */

test('getCyclicDependencies', () => {
  const result = getCyclic({
    a: ['b'],
    b: ['a'],
    c: ['b', 'd'],
    d: ['c', 'a'],
  });

  expect(result).toEqual({
    nodes: [[['a', 'b'], 'a'], [['a', 'b', 'c', 'd'], 'c']],
    stacks: [['a', 'b'], ['a', 'b', 'c', 'd']],
  });
});
test('getCyclicDependencies', () => {
  const result = getCyclic({
    a: ['b'],
    b: ['a'],
    c: ['d'],
    d: [],
  });

  expect(result).toEqual({ nodes: [[['a', 'b'], 'a']], stacks: [['a', 'b']] });
});

test('getNonCyclicDependencies', () => {
  const result = getNonCyclic({
    a: ['b'],
    b: ['a'],
    c: ['d'],
    d: [],
  });
  expect(result).toEqual([['d'], ['c']]);
});

test('getNonCyclicDependencies', () => {
  const result = getNonCyclic({
    1: ['2'],
    2: ['3', '6', '1'],
    3: ['4'],
    4: [],
    5: ['5'],
    6: [],
  });
  expect(result).toEqual([['4', '6'], ['3']]);
});

test('getDependenciesOfNode', () => {
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
});
test('getInversedDependenciesOfNode', () => {
  const result = getInversedDependenciesOfNode(
    {
      1: ['2', '3'],
      2: ['3', '6', '1'],
      3: ['4', '1'],
      4: [],
      5: ['1'],
      6: [],
    },
    '1',
  );
  expect(result).toEqual(['2', '3', '5', '1']);
});

test('getInversedDependenciesOfNode cyclic', () => {
  const result = getInversedDependenciesOfNode(
    {
      1: ['2', '3'],
      2: ['3', '6', '1'],
      3: ['4', '1'],
      4: [],
      5: ['1'],
      6: [],
    },
    '1',
  );
  expect(result).toEqual(['2', '3', '5', '1']);
});

test('getInversedDependenciesOfNode linear', () => {
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
});
