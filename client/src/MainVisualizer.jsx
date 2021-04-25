import React, { useState, useEffect } from 'react';

import Node from './Node.jsx';

import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra.js';

const startNodeRow = 10;
const startNodeCol = 15;
const finishNodeRow = 10;
const finishNodeCol = 35;


const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col))
    }
    grid.push(currentRow);
  }
  return grid;
}





const MainVisualizer = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const grid = createGrid();
    setGrid(grid);
  }, []);

  // useEffect(() => {
  //   visualizeDijkstra();
  // }, [grid]);

  const visualizeDijkstra = (grid) => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node nodeVisited';
      }, 10 * i)
    }
  }



  return (
    <>
    <button onClick={() => visualizeDijkstra(grid)}>
          Visualize Dijkstra's Algorithm
        </button>
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node key={nodeIndex} row={row} col={col} isFinish={isFinish} isStart={isStart} isWall={isWall} />
              )
            })}
          </div>
        )
      })}
    </div>
    </>
  );
};

export default MainVisualizer;