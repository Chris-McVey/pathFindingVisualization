import React from 'react';

const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  grid,
  mouseIsPressed,
}) => {
  const extraClassName = isFinish
    ? 'nodeFinish'
    : isStart
    ? 'nodeStart'
    : isWall
    ? 'nodeWall'
    : '';
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(grid, row, col)}
      onMouseEnter={() => onMouseEnter(grid, row, col, mouseIsPressed)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
