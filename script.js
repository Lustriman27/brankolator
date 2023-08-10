let currentInput = "";
let firstNumber = null;
let selectedOperator = null;
let decimalEntered = false;

// display
const display = document.getElementById("display-input");

function updateDisplay(content) {
  display.textContent = content;
}

function clearDisplay() {
  currentInput = "";
  firstNumber = null;
  selectedOperator = null;
  decimalEntered = false;
  updateDisplay("0");
}

// audio
let playButtonSound = function () {
  document.getElementById("buttonPress").play();
};

let playEqualSound = function () {
  document.getElementById("equal").play();
};

let playErrorSound = function () {
  document.getElementById("error").play();
};

// number button
const numberButtons = document.querySelectorAll(".number-button");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberButton(button.value);
  });
});

const handleNumberButton = (value) => {
  playButtonSound();

  if (currentInput === "0") {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay(currentInput);
};

// operator button
const operatorButtons = document.querySelectorAll(".operator-button");

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorButton(button.value);
  });
});

const handleOperatorButton = (value) => {
  playButtonSound();

  if (firstNumber === null) {
    firstNumber = parseFloat(currentInput);
    selectedOperator = value;
    currentInput = "";
    decimalEntered = false;
  } else {
    firstNumber = operate(
      selectedOperator,
      firstNumber,
      parseFloat(currentInput)
    );

    selectedOperator = value;
    currentInput = "";
    decimalEntered = false;

    updateDisplay(firstNumber);
  }
};

// decimal button
const decimalButton = document.querySelector(".decimal-button");

decimalButton.addEventListener("click", () => {
  handleDecimalButton();
});

const handleDecimalButton = () => {
  playButtonSound();

  if (!decimalEntered) {
    currentInput += ".";
    decimalEntered = true;

    updateDisplay(currentInput);
  }
};

// equal button
const equalButton = document.querySelector(".equal-button");

equalButton.addEventListener("click", () => {
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
  }
};

// clear button
const clearButton = document.querySelector(".func-button[value='ac']");

clearButton.addEventListener("click", () => {
  handleClearButton();
});

const handleClearButton = () => {
  playButtonSound();

  clearDisplay();
};

// backspace button
const backspaceButton = document.querySelector(".func-button[value='c']");

backspaceButton.addEventListener("click", () => {
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

// keyboard support
document.addEventListener("keydown", (event) => {
  if (/[0-9]/.test(event.key)) {
    handleNumberButton(event.key);
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    handleOperatorButton(event.key);
  } else if (event.key === ".") {
    handleDecimalButton();
  } else if (event.key === "Enter") {
    handleEqualButton();
  } else if (event.key === "Backspace") {
    handleBackspaceButton();
  }
});

// compute the math expression
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        playErrorSound();
        return "Infinity";
      }
      return a / b;
    default:
      return null;
  }
}

updateDisplay("0");
