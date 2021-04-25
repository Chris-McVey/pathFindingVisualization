import React, { useState, useEffect } from 'react';

import Node from './Node.jsx';

import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra.js';

const startNodeRow = 10;
const startNodeCol = 15;
const finishNodeRow = 3;
const finishNodeCol = 42;


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
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const grid = createGrid();
    setGrid(grid);
  }, []);


  const visualizeDijkstra = (grid) => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

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
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node nodeVisited';
      }, 10 * i)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node nodeShortestPath';
      }, 50 * i);
    }
  }

  const handleMouseDown = (grid, row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (grid, row, col, mouseIsPressed) => {
    if (!mouseIsPressed) {
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
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
                <Node key={nodeIndex} row={row} col={col} isFinish={isFinish} isStart={isStart} isWall={isWall} mouseIsPressed={mouseIsPressed} grid={grid} onMouseDown={(grid, row, col) => handleMouseDown(grid, row, col)} onMouseEnter={(grid, row, col, mouseIsPressed) => handleMouseEnter(grid, row, col, mouseIsPressed)} onMouseUp={() => handleMouseUp()} />
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