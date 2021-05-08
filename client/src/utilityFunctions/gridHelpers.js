import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

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
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
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
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
};

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
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

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node nodeShortestPath';
    }, 50 * i);
  }
};

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
  animateDijkstra,
  visualizeDijkstra,
  createGrid,
  createNode,
};
