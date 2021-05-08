import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import { aStar } from '../algorithms/aStar';

const createNode = (
  row,
  col,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => ({
  col,
  row,
  isStart: row === startNodeRow && col === startNodeCol,
  isFinish: row === finishNodeRow && col === finishNodeCol,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  previousNode: null,
  distanceToFinish: Infinity,
  aStarHeuristic: Infinity,
});

const createGrid = (
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  const grid = [];
  for (let row = 0; row < 20; row += 1) {
    const currentRow = [];
    for (let col = 0; col < 50; col += 1) {
      currentRow.push(
        createNode(
          row,
          col,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol
        )
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node nodeShortestPath';
    }, 50 * i);
  }
};

const animateSearch = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i += 1) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node nodeVisited';
    }, 10 * i);
  }
};

const visualizeDijkstra = (
  grid,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  const startNode = grid[startNodeRow][startNodeCol];
  const finishNode = grid[finishNodeRow][finishNodeCol];
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
};

const visualizeAStar = (
  grid,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) => {
  const startNode = grid[startNodeRow][startNodeCol];
  const finishNode = grid[finishNodeRow][finishNodeCol];
  const visitedNodesInOrder = aStar(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export {
  getNewGridWithWallToggled,
  animateShortestPath,
  visualizeDijkstra,
  createGrid,
  createNode,
  visualizeAStar,
};
