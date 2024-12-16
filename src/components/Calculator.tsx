import React, { Component, useEffect, useState } from "react";

import "./styles/Calculator.style.css";
import Screen from "./Screen";
import Button from "./Button";
import { Navigate } from "react-router-dom";

const Calculator = () => {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [navigateToSupport, setNavigateToSupport] = useState<boolean>(false);

  const evaluateExpression = (expression: string): string => {
    const nums: number[] = [];
    const ops: string[] = [];
    let num = "";

    const applyOperation = (operator: string) => {
      const b = nums.pop()!;
      const a = nums.pop()!;
      switch (operator) {
        case "+":
          nums.push(a + b);
          break;
        case "-":
          nums.push(a - b);
          break;
        case "*":
          nums.push(a * b);
          break;
        case "/":
          if (b === 0) {
            return "Err";
          }
          nums.push(a / b);
          break;
      }
    };

    const hasPrecedence = (op1: string, op2: string): boolean => {
      if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-"))
        return false;
      return true;
    };

    for (let i = 0; i < expression.length; i++) {
      const c = expression[i];
      if (/\d/.test(c)) {
        num += c;
      } else if (c === "+" || c === "-" || c === "*" || c === "/") {
        if (num !== "") {
          nums.push(parseFloat(num));
          num = "";
        }

        while (ops.length > 0 && hasPrecedence(c, ops[ops.length - 1])) {
          applyOperation(ops.pop()!);
        }
        ops.push(c);
      }
    }

    if (num !== "") {
      nums.push(parseFloat(num));
    }

    while (ops.length > 0) {
      applyOperation(ops.pop()!);
    }

    const result = nums.length === 1 ? nums[0] : "Err";

    if (isNaN(Number(result))) {
      return "Err";
    }

    return result.toString();
  };

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        if (input.trim() === "") return;

        const sequences = input
          .split(/[\+\-\*\/]/)
          .map((item) => item.trim())
          .filter(Boolean);
        if (sequences.length < 2) {
          setInput("Err");
          return;
        }

        const result = evaluateExpression(input.replace("x", "*"));
        if (result !== "Err") {
          setHistory((prevHistory) => [...prevHistory, `${result}`]);
          setInput(result);
        } else {
          setInput("Err");
        }
        setInput(result);
      } catch {
        setInput("Err");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "DEL") {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === "?") {
      setNavigateToSupport(true);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleHistoryClick = (operation: string) => {
    setInput(operation);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Enter") {
      handleClick("=");
    } else if (key === "Backspace") {
      handleClick("DEL");
    } else if (key === "Escape") {
      handleClick("C");
    } else if (
      /\d/.test(key) ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {
      handleClick(key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (navigateToSupport) {
    return <Navigate to="/support" />;
  }
  return (
    <div className="calculator-wrapper">
      <Screen
        input={input}
        history={history}
        onHistoryClick={handleHistoryClick}
      />

      <div className="button-grid">
        {["C", "DEL", "?", "/"].map((value) => (
          <Button
            key={value}
            value={value}
            onClick={handleClick}
            className={`button ${
              value === "?"
                ? "button-help"
                : value === "/"
                ? "button-operator"
                : "button-clear"
            }`}
          />
        ))}
        {[
          "1",
          "2",
          "3",
          "x",
          "4",
          "5",
          "6",
          "-",
          "7",
          "8",
          "9",
          "+",
          "0",
          "=",
        ].map((value) => (
          <Button
            key={value}
            value={value}
            onClick={() => handleClick(value === "x" ? "*" : value)}
            className={`button ${
              value === "0"
                ? "button-long button-clear"
                : value === "="
                ? "button-long button-operator"
                : ["+", "-", "x"].includes(value)
                ? "button-operator"
                : "button-clear"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
