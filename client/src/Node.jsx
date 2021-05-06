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
  handleStartPickedUp,
  handleFinishPickedUp,
  setNewStartOrFinish,
}) => {
  const extraClassName = isFinish
    ? 'nodeFinish'
    : isStart
    ? 'nodeStart'
    : isWall
    ? 'nodeWall'
    : '';
  if (isStart) {
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => handleStartPickedUp()}
        onMouseEnter={() => onMouseEnter(grid, row, col, mouseIsPressed)}
        onMouseUp={() => onMouseUp()}
        draggable
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          console.log(e);
        }}
        role="presentation"
        row={row}
        col={col}
      />
    );
  }
  if (isFinish) {
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => handleFinishPickedUp()}
        onMouseEnter={() => onMouseEnter(grid, row, col, mouseIsPressed)}
        onMouseUp={() => onMouseUp()}
        draggable
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          console.log(e);
        }}
        role="presentation"
        row={row}
        col={col}
      />
    );
  }
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(grid, row, col, isStart, isFinish)}
      onMouseEnter={() => onMouseEnter(grid, row, col, mouseIsPressed)}
      onMouseUp={() => onMouseUp()}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        setNewStartOrFinish(row, col);
      }}
      role="presentation"
      row={row}
      col={col}
    />
  );
};

export default Node;
