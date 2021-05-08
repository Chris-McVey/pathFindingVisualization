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

const aStar = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.aStarHeuristic = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();







  }
}

export { aStar, getNodesInShortestPathOrder };
