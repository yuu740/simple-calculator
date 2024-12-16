import React, { Component } from "react";
import { ButtonProps } from "./Calculator.interfaces";
import "./styles/Calculator.style.css"

class Button extends Component<ButtonProps> {
  render() {
    const { value, onClick, className } = this.props;
    return (
      <button
        className={`${Button} ${className || ""}`}
        onClick={() => onClick(value)}
      >
        {value}
      </button>
    );
  }
}

export default Button;
