import React from "react";
import PropTypes from "prop-types";
import Square from "./square";

export default class Board extends React.Component {
  renderSquare(index) {
    const styled = this.props.styled;
    let style = "Black";
    if (styled.length > 0 && styled[index]) {
      style = "LightGrey";
    }

    return (
      <Square
        index={index}
        value={this.props.squares[index]}
        onClick={this.props.onClick}
        style={style}
      />
    );
  }

  render() {
    return (
      <div>
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

Board.PropTypes = {
  styled: PropTypes.array,
  onClick: PropTypes.func
};
