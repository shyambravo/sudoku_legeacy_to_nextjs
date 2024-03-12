"use client";

import React, { useEffect, useRef, useState } from "react";
import "./sudoku.css";
import { generateRandoms, insertEmpty, isValidSudoku } from "./solver-utility";
import { cloneDeep } from "lodash";

const NumberInput = (props) => {
  const { row, col, onHandleChange, val, originalBoard } = props;

  let isDisabled = false;

  if (Boolean(val !== 0)) {
    isDisabled = true;
  }

  if (originalBoard.current && originalBoard.current[row][col] === 0) {
    isDisabled = false;
  }

  return (
    <>
      {
        <input
          style={{
            borderLeft:
              col === 0 ? "" : col % 3 === 0 ? "2px solid black" : "none",
            borderTop:
              row === 0 ? "" : row % 3 === 0 ? "2px solid black" : "none",
          }}
          type="number"
          disabled={isDisabled}
          min={1}
          max={9}
          value={val === 0 ? "" : val}
          onChange={(event) => onHandleChange(row, col, event.target.value)}
        />
      }
    </>
  );
};

const Box = (props) => {
  const { board, onHandleChange, originalBoard } = props;

  let inputArr = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      inputArr.push(
        <NumberInput
          row={row}
          col={col}
          onHandleChange={onHandleChange}
          val={board[row][col]}
          key={`${row}_${col}`}
          originalBoard={originalBoard}
        />
      );
    }
  }

  return inputArr;
};

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [difficulty, setDifficulty] = useState("1");
  const fullBoard = useRef();
  const originalBoard = useRef();

  const onHandleChange = (row, col, val) => {
    let boardCopy = cloneDeep(board);
    boardCopy[row][col] = val;
    setBoard(boardCopy);
  };

  const checkConfig = () => {
    if (isValidSudoku(board)) {
      alert("You win");
    } else {
      alert("You lose");
    }
  };

  const showAnswer = () => {
    setBoard(fullBoard.current);
  };

  useEffect(() => {
    const val = generateRandoms();
    fullBoard.current = cloneDeep(val);
    insertEmpty(val, difficulty);
    originalBoard.current = cloneDeep(val);
    setBoard(val);
  }, [difficulty]);

  return (
    <div className="page">
      <div className="container">
        <div className="board">
          <Box
            board={board}
            originalBoard={originalBoard}
            onHandleChange={onHandleChange}
          />
        </div>
        <div className="menu">
          <button onClick={showAnswer}>Show Answer</button>
          <button
            onClick={() => {
              location.reload();
            }}
          >
            Reset
          </button>
          <button onClick={checkConfig}>Check configuration</button>
          <select
            onChange={(event) => {
              setDifficulty(event.target.value);
            }}
            value={difficulty}
          >
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
