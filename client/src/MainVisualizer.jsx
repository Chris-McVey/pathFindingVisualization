import React, { useState, useEffect } from 'react';

import Node from './Node.jsx';


const createNode = (row, col) => {
  return {
    col,
    row
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

  return (
    <>
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const { row, col } = node;
              return (
                <Node key={nodeIndex} row={row} col={col} />
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