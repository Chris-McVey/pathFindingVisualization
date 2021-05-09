import React from 'react';
import PropTypes from 'prop-types';

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
  let extraClassName = '';
  if (isFinish) {
    extraClassName = 'nodeFinish';
  } else if (isStart) {
    extraClassName = 'nodeStart';
  } else if (isWall) {
    extraClassName = 'nodeWall';
  }

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
        onDrop={() => {}}
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
        onDrop={() => {}}
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

Node.propTypes = {
  isStart: PropTypes.bool.isRequired,
  isFinish: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isWall: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  grid: PropTypes.arrayOf(PropTypes.any).isRequired,
  mouseIsPressed: PropTypes.bool.isRequired,
  handleStartPickedUp: PropTypes.func.isRequired,
  handleFinishPickedUp: PropTypes.func.isRequired,
  setNewStartOrFinish: PropTypes.func.isRequired,
};

export default Node;
