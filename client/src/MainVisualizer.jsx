import React, { useState, useEffect } from 'react';

import Node from './Node.jsx';

import {
  getNewGridWithWallToggled,
  visualizeDijkstra,
  createGrid,
} from './utilityFunctions/gridHelpers';

const MainVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [finishNodeRow, setFinishNodeRow] = useState(3);
  const [finishNodeCol, setFinishNodeCol] = useState(42);

  useEffect(() => {
    const startingGrid = createGrid(
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol
    );
    setGrid(startingGrid);
  }, []);

  useEffect(() => {
    const newStartingPointGrid = createGrid(
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol
    );

    setGrid(newStartingPointGrid);
  }, [startNodeCol, finishNodeCol]);

  const resetBoard = () => {
    const blankGrid = createGrid(
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol
    );
    const nodes = document.getElementsByClassName(`node`);
    const nodeArray = Array.prototype.slice.call(nodes);
    nodeArray.forEach((node) => {
      if (node.id === `node-${startNodeRow}-${startNodeCol}`) {
        node.className = 'node nodeStart';
      } else if (node.id === `node-${finishNodeRow}-${finishNodeCol}`) {
        node.className = 'node nodeFinish';
      } else {
        node.className = 'node';
      }
    });
    setGrid(blankGrid);
  };

  const handleMouseDown = (grid, row, col, isStart, isFinish) => {
    if (isStart || isFinish) {
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (grid, row, col, mouseIsPressed) => {
    if (!mouseIsPressed) {
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const setStartNode = () => {
    setStartNodeRow(18);
    setStartNodeCol(18);
  };

  const handleMoveStartOrStop = () => {};

  return (
    <>
      <button
        onClick={() =>
          visualizeDijkstra(
            grid,
            startNodeRow,
            startNodeCol,
            finishNodeRow,
            finishNodeCol
          )
        }
      >
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => resetBoard()}>Reset Board</button>
      <button onClick={() => setStartNode()}>Set Start</button>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIndex}
                  row={row}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  grid={grid}
                  onMouseDown={(grid, row, col, isStart, isFinish) =>
                    handleMouseDown(grid, row, col, isStart, isFinish)
                  }
                  onMouseEnter={(grid, row, col, mouseIsPressed) =>
                    handleMouseEnter(grid, row, col, mouseIsPressed)
                  }
                  onMouseUp={() => handleMouseUp()}
                  onClick={() => handleMoveStartOrStop()}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainVisualizer;
