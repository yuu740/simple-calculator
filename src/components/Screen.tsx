import React, { Component } from "react";
import { ScreenProps } from "./Calculator.interfaces";
import "./styles/Calculator.style.css";

const Screen: React.FC<ScreenProps>= ({input, history, onHistoryClick}) => {
    return (
        <div className="history-container">
            {history.map((item, index) => (
            <div 
                key={index} 
                onClick={() => onHistoryClick(item)} 
                className="history-item">
                    {item}
            </div>
            ))}
            <div className="input-display">{input || "0"}</div>
        </div>
      
    );
}

export default Screen;
