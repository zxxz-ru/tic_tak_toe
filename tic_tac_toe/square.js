import React from "react";
import PropTypes from "prop-types";

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.index);
  }
  render() {
    return (
      <button
        className="square"
        onClick={this.handleClick}
        style={{ color: this.props.style }}
      >
        {this.props.value}
      </button>
    );
  }
}
Square.PropTypes = {
  index: PropTypes.number,
  value: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func
};
