import React from "react";
import Board from "./board";
import "./tic_tak_toe.less";

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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const defaultState = {
  history: [].concat([Array(9).fill(null)]),
  xIsNext: true,
  styled: Array(9).fill(null)
};

class Game extends React.Component {
  constructor() {
    super();
    //  console.log(defaultState);
    this.state = defaultState;

    //   history: [].concat([Array(9).fill(null)]),
    //   xIsNext: true,
    //   styled: Array(9).fill(null)
    // };

    this.handleClick = this.handleClick.bind(this);
    this.handleRestartButton = this.handleRestartButton.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
  }

  // getInitialState() {
  //   this.state =  defaultState;
  // }

  handleClick(i) {
    const history = this.state.history;
    const squares = history[history.length - 1].slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([squares]),
      xIsNext: !this.state.xIsNext,
      styled: []
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: step % 2,
      history: this.state.history.slice(0, step)
    });
  }

  handleRestartButton() {
    this.setState(defaultState);
    //   {
    //   history: [].concat([Array(9).fill(null)]),
    //   xIsNext: true,
    //   styled: []
    // });
  }

  handleOnMouseOver(move) {
    const ind = this.state.styled;
    const history = this.state.history;
    const atPresent = history[history.length - 1];
    const before = history[move - 1];
    for (let i = 0; i < before.length; i++) {
      if (atPresent[i] !== before[i]) {
        ind[i] = 1;
      }
    }
    if (ind.length > 0) {
      this.setState({
        styled: ind
      });
    }
  }

  handleOnMouseOut() {
    this.setState({
      styled: []
    });
  }
  render() {
    const history = this.state.history;
    const round = history.length - 1;
    const current = history[round];

    const winner = calculateWinner(current);
    const styledArray = this.state.styled;
    let index = 0;
    let status;
    if (winner) {
      status = `Победитель:  ${winner}`;
    } else if (round === 9) {
      status = `Ничья`;
    } else {
      status = `Следующий игрок: ${this.state.xIsNext ? "X" : "O"}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ? `Ход # ${move}` : "История игры:";
      let li = null;
      if (desc === "История игры:") {
        li = (
          <li key={index++}>
            {desc}
          </li>
        );
      } else {
        li = (
          <li key={index++}>
            <a
              href="#"
              onClick={() => this.jumpTo(move)}
              onMouseOver={() => this.handleOnMouseOver(move)}
              onMouseOut={this.handleOnMouseOut}
            >
              {desc}
            </a>
          </li>
        );
      }
      return li;
    });
    return (
      <div className="game">
        <div className="row">

          <div className="col-sm-4 col-sm-offset-3 centered-text">
            <p id="statusLine">{status}</p>
          </div>

          <div className="col-sm-2">
            <button onClick={this.handleRestartButton} className="hor-centered">
              Новая игра
            </button>
          </div>

        </div>

        <div className="row">

          <div className="game-board">
            <Board
              squares={current}
              onClick={this.handleClick}
              styled={styledArray}
            />

          </div>
        </div>

        <div className="row">
          <div className="col-sm-10 hor-centered">
            <div className="game-info">
              <ul id="history-list">
                {moves}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Game;
