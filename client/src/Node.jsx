import React, { useState, useEffect } from 'react';

const Node = ({ row, col, isFinish, isStart, isWall }) => {
  const extraClassName = isFinish ? 'nodeFinish' : isStart ? 'nodeStart' :isWall ? 'nodeWall' : '';
  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  );
};

export default Node;