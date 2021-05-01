import React, { useState, useEffect } from 'react';

import Node from './Node.jsx';

import { getNewGridWithWallToggled, animateShortestPath, animateDijkstra, visualizeDijkstra, createGrid, createNode } from './utilityFunctions/gridHelpers.js';


const MainVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(3);
  const [finishNodeCol, setFinishNodeCol] = useState(42);

  useEffect(() => {
    const grid = createGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(grid);
  }, []);

  const resetBoard = () => {
    const blankGrid = createGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    let nodes = document.getElementsByClassName(`node`)
    for (let node of nodes) {
      if (node.id === `node-${startNodeRow}-${startNodeCol}`) {
        node.className = 'node nodeStart';
      } else if (node.id === `node-${finishNodeRow}-${finishNodeCol}`) {
        node.className = 'node nodeFinish';
      } else {
        node.className = 'node';
      }
    }
    setGrid(blankGrid);
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


  return (
    <>
    <button onClick={() => visualizeDijkstra(grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol)}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => resetBoard()}>
          Reset Board
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