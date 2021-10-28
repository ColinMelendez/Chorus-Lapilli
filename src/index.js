import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const adjacencies = [
  [0, 1, 0, 1, 1, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 1, 1, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1, 1, 0, 1, 0],
]

  function isValidMove(from, to) {
    return adjacencies[from][to];
  }

  function Square(props) {
    return (
      <button 
        className="square" 
        onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    /* This component handles the states of the squares and the 
    order of turns. */
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        turns: 0,
        isFirstClick: true,
        firstClick: null,
        secondClick: null,
      };
    }

    handleClick(i) {
      if (calculateWinner(this.state.squares)) {
        return;
      }
      if (this.state.turns < 6) {
        if (this.state.squares[i]) {
          return;
        } else {
          this.updateSquares(i)
        }
      } 
      else if (this.state.isFirstClick) {
        if (
          (this.state.xIsNext && this.state.squares[i] == 'X')
          || (!this.state.xIsNext && this.state.squares[i] == 'O')
          ) {
            this.setState({
              firstClick: i,
              isFirstClick: false,
            })
          }
      } 
      else if (!this.state.isFirstClick) {
        if (
          isValidMove(this.state.firstClick, i) 
          && this.state.squares[i] == null
          ) {
            this.updateSquares(i, this.state.firstClick);
        }
      }
    }

    updateSquares(i, reset) {
      const updatedSquares = this.state.squares.slice();
      updatedSquares[i] = this.state.xIsNext ? 'X' : 'O';
      if (arguments.length === 2) {
        updatedSquares[reset] = null;
      }
      this.setState({
        squares: updatedSquares,
        xIsNext: !this.state.xIsNext,
        turns: this.state.turns + 1,
        isFirstClick: true
      });
    }

    renderSquare(i) {
      return <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)} 
      />;
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  