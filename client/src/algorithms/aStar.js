const getAllNodes = (grid) => {
  const nodes = [];
  grid.forEach((row) => {
    row.forEach((node) => {
      nodes.push(node);
    });
  });
  return nodes;
};

const sortNodesByHeuristic = (unsortedNodes) => {
  unsortedNodes.sort(
    (nodeA, nodeB) => nodeA.aStarHeuristic - nodeB.aStarHeuristic
  );
};

const aStarHeuristicCalc = (node, finishNode) => {
  const colDif = Math.abs(finishNode.col - node.col);
  const rowDif = Math.abs(finishNode.row - node.row);
  return colDif + rowDif;
}

const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (node, finishNode, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    neighbor.aStarHeuristic = aStarHeuristicCalc(neighbor, finishNode);
  });
};

const aStar = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.aStarHeuristic = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) {
      continue;
    }

    if (closestNode.aStarHeuristic === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, finishNode, grid);
  }
};

export { aStar, getNodesInShortestPathOrder };
