import {
  getUnvisitedNeighbors,
  getNodesInShortestPathOrder,
  getAllNodes,
} from './algorithmHelpers';

const sortNodesByHeuristic = (unsortedNodes) => {
  unsortedNodes.sort(
    (nodeA, nodeB) => nodeA.aStarHeuristic - nodeB.aStarHeuristic
  );
};

const aStarEstimateToFinish = (node, finishNode) => {
  const colDif = Math.abs(finishNode.col - node.col);
  const rowDif = Math.abs(finishNode.row - node.row);
  return colDif + rowDif;
};

const updateUnvisitedNeighborsAStar = (node, finishNode, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    neighbor.distanceToFinish = aStarEstimateToFinish(neighbor, finishNode);
    neighbor.aStarHeuristic = neighbor.distance + neighbor.distanceToFinish;
  });
};

const aStar = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.aStarHeuristic = 0;
  startNode.distance = 0;
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
    updateUnvisitedNeighborsAStar(closestNode, finishNode, grid);
  }
};

export { aStar, getNodesInShortestPathOrder };
