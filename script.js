console.log("Welcome to Brancolator");


// Get the display element
const display = document.querySelector(".calculatorDisplay");

let displayValue = "0"; 
let firstOperand = null;
let operator = null;
let shouldClearDisplay = false;

// Function to update the display
function updateDisplay() {
  display.innerText = displayValue;
}

// Function to append a number to the display
function appendNumber(number) {
  if (shouldClearDisplay) {
    displayValue = number.toString();
    shouldClearDisplay = false;
  } else {
    displayValue =
      displayValue === "0" ? number.toString() : displayValue + number;
  }
  updateDisplay();
}

// Function to append a decimal point
function appendDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    updateDisplay();
  }
}

// Function to clear the display
function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  shouldClearDisplay = false;
  updateDisplay();
}

// Function to handle backspace
function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateDisplay();
}

// Function to set the operator
function setOperator(op) {
  if (operator !== null) {
    calculate();
  }
  firstOperand = parseFloat(displayValue);
  operator = op;
  shouldClearDisplay = true;
}

// Function to perform arithmetic operations
function operate(a, b, op) {
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      return b;
  }
}

// Function to calculate the result
function calculate() {
  if (operator === "divide" && parseFloat(displayValue) === 0) {
    displayValue = "Error: Division by zero";
  } else {
    const secondOperand = parseFloat(displayValue);
    displayValue = operate(firstOperand, secondOperand, operator).toString();
  }
  firstOperand = null;
  operator = null;
  shouldClearDisplay = true;
  updateDisplay();
}

// Event listener for button clicks
document.querySelector(".calculatorKeys").addEventListener("click", (event) => {
  const target = event.target;
  const action = target.dataset.action;

  if (target.matches("button")) {
    if (!isNaN(target.textContent) || target.textContent === ".") {
      appendNumber(target.textContent);
    } else if (action === "decimal") {
      appendDecimal();
    } else if (action === "clear") {
      clearDisplay();
    } else if (action === "calculate") {
      calculate();
    } else {
      setOperator(action);
    }
  }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const button = document.querySelector(`button[data-action='${key}']`);
  if (button) button.click();
});