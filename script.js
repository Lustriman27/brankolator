<<<<<<< Updated upstream
console.log("Welcome to Brancolator");

=======
/** @format */

let currentInput = '';
let firstNumber = null;
let selectedOperator = null;
let decimalEntered = false;
let equalButtonPressed = false;

const display = document.getElementById('display-input');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
  currentInput = '';
  firstNumber = null;
  selectedOperator = null;
  decimalEntered = false;
  updateDisplay('0');
}

let playButtonSound = function () {
  document.getElementById('buttonPress').play();
};

let playEqualSound = function () {
  document.getElementById('equal').play();
};

let playErrorSound = function () {
  document.getElementById('error').play();
};

const numberButtons = document.querySelectorAll('.number-button');

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleNumberButton(button.value);
  });
});

const handleNumberButton = (value) => {
  playButtonSound();

  if (equalButtonPressed) {
    clearDisplay();
    equalButtonPressed = false;
  }

  if (currentInput.length < 8) {
    if (currentInput === '0') {
      currentInput = value;
    } else {
      currentInput += value;
    }
>>>>>>> Stashed changes
  }
  updateDisplay();
}

<<<<<<< Updated upstream
// Function to set the operator
function setOperator(op) {
  if (operator !== null) {
    calculate();
=======
  updateDisplay(currentInput);
};

const operatorButtons = document.querySelectorAll('.operator-button');

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleOperatorButton(button.value);
    changeOperatorColor(button);
  });
});

const handleOperatorButton = (value) => {
  playButtonSound();

  if (firstNumber === null) {
    firstNumber = parseFloat(currentInput);
    selectedOperator = value;
    currentInput = '';
    decimalEntered = false;
  } else {
    firstNumber = operate(
      selectedOperator,
      firstNumber,
      parseFloat(currentInput)
    );

    selectedOperator = value;
    currentInput = '';
    decimalEntered = false;

    updateDisplay(firstNumber);
>>>>>>> Stashed changes
  }
  firstOperand = parseFloat(displayValue);
  operator = op;
  shouldClearDisplay = true;
}

<<<<<<< Updated upstream
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
=======
const decimalButton = document.querySelector('.decimal-button');

decimalButton.addEventListener('click', () => {
  handleDecimalButton();
});

const handleDecimalButton = () => {
  playButtonSound();

  if (equalButtonPressed) {
    clearDisplay();
    equalButtonPressed = false;
  }

  if (!decimalEntered) {
    currentInput += '.';
    decimalEntered = true;

    updateDisplay(currentInput);
  }
};

const equalButton = document.querySelector('.equal-button');

equalButton.addEventListener('click', () => {
  handleEqualButton();
});

const handleEqualButton = () => {
  playEqualSound();

  if (firstNumber !== null && selectedOperator !== null) {
    firstNumber = operate(
      selectedOperator,
      firstNumber,
      parseFloat(currentInput)
    );

    updateDisplay(firstNumber);
    currentInput = firstNumber.toString();

    firstNumber = null;
    selectedOperator = null;
    decimalEntered = false;
    equalButtonPressed = true;
  }
};

const clearButton = document.querySelector(".func-button[value='ac']");

clearButton.addEventListener('click', () => {
  handleClearButton();
});

const handleClearButton = () => {
  playButtonSound();

  clearDisplay();
};

const backspaceButton = document.querySelector(".func-button[value='c']");

backspaceButton.addEventListener('click', () => {
  handleBackspaceButton();
});

const handleBackspaceButton = () => {
  playButtonSound();

  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else {
    clearDisplay();
  }
};

document.addEventListener('keydown', (event) => {
  if (/[0-9]/.test(event.key)) {
    handleNumberButton(event.key);
  } else if (
    event.key === '+' ||
    event.key === '-' ||
    event.key === '*' ||
    event.key === '/'
  ) {
    handleOperatorButton(event.key);
    changeOperatorColor(
      document.querySelector(`.operator-button[value='${event.key}']`)
    );
  } else if (event.key === '.') {
    handleDecimalButton();
  } else if (event.key === 'Enter') {
    handleEqualButton();
  } else if (event.key === 'Backspace') {
    handleBackspaceButton();
  }
});

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        playErrorSound();
        return 'Infinity';
      }
>>>>>>> Stashed changes
      return a / b;
    default:
      return b;
  }
}

<<<<<<< Updated upstream
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
=======
function changeOperatorColor(button) {
  operatorButtons.forEach(function (btn) {
    btn.classList.remove('clicked-operator-color');
    btn.classList.add('initial-color');
  });

  button.classList.remove('initial-color');
  button.classList.add('clicked-operator-color');
}

updateDisplay('0');
>>>>>>> Stashed changes
