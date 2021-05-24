import { getUnvisitedNeighbors, getAllNodes } from './algorithmHelpers';

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

const depthFirst = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getUnvisitedNeighbors(startNode, grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.pop();
    if (closestNode.isWall) {
      continue;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    const newNeighbors = getUnvisitedNeighbors(closestNode, grid);
    newNeighbors.forEach((node) => {
      unvisitedNodes.push(node);
    });
    updateUnvisitedNeighborsDijkstra(closestNode, grid);
  }
  return visitedNodesInOrder;
};

export default depthFirst;
