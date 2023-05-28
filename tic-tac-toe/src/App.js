import { useState } from 'react';

// use props to pass data
// in this case Square component is getting passed value from Board component
// each Square will receive a value prop that is 'X', 'O', or null
// the Board component will maintain which squares are filled
// we need Square to update Board's state 
// since state is private to a component that defines it, can't update Boards state from Square
// instead, we pass down a function from the Board component to Square, and Square will call that fn when a square is clicked
// this fn will also be added as a prop to Square since it is passed down from Board
function Square({value, onSquareClick}) {

  // this is the button beign returned with an on click handler
  // <button> is JSX (JS and HTML) 
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

// export makes this function accessible outside of this file
// default tells other files that this is a main function 
// this is a Board component for entire tic tac toe board
// Board is the parent and passes down prop to child, Square
// when the Boards state changes, both the Board component and every child Square re-renders automatically 
// Keeping the state of all squares in the Board component will allow it to determine the winner
export default function Board() {
    // className is a prop that tells CSS how to style that div
    // use useState to create 9 null components of type Square
    // use state allows react to remember things
    // this way we can store the current value of each square 
    // so when a cell is clicked it will remember
    const [squares, setSquares] = useState(Array(9).fill(null))
    // this is to alternate between X's and O's
    const [xIsNext, setXIsNext] = useState(true);

    // handleClick creates a copy of squares array (nextSquares) with JS slice() method
    // then handleClick updates nextSquares array to add "X" to the ith idx square
    // calling setSquares lets react know the state of the component has changed 
    // this will trigger a re-render of the components that use the squares state (Board) as well as its child components (Square components that make up board)
    // since JS supports closures, handleClick has access to its outer variables and fns defined in outer function, Board
    // therefore handleClick can read the squares state and call setSquares method because they are both defined inside of the Board fn
    function handleClick(i) {

      // here we create a copy of squares and we do that because of immutability 
      // there are 2 approaches to changing data:
      // 1. mutate data directly by changing the datas values
      // 2. replace data with a new copy which has the deasired changes 
      // benefit of immutability: we store previous states and can go back to a previous move
      // also, by default all chidl components re-render when parent component re-renders, including child components that werent even affected by the change
      // immutability make sit cheap to compare whether data has changed, and this is performant 

      // this makes sure we cant click same square and override value
      if (squares[i] || calculateWinner(squares)) {
        return
      }
      const nextSquares = squares.slice()
      if (xIsNext) {
        nextSquares[i] = "X"
      } else {
        nextSquares[i] = "O"
      }
      
      setSquares(nextSquares)
      setXIsNext(!xIsNext)
    }

    const winner = calculateWinner(squares)
      let status
      if (winner) {
        status = "Winner is " + winner
      } else {
        status = "Next player is " + (xIsNext ? "X" : "O")
      }

    return (
      <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>
      
    );
    
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }

  }
  return null
}