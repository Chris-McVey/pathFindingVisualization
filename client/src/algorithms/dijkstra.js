import {
  getUnvisitedNeighbors,
  getAllNodes,
} from './algorithmHelpers';

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighborsDijkstra = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  unvisitedNeighbors.forEach((neighbor) => {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  });
};

const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) {
      continue;
    }

    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighborsDijkstra(closestNode, grid);
  }
  return visitedNodesInOrder;
};

export default dijkstra;
