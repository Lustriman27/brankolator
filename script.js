/** @format */

let currentInput = '';
let firstNumber = null;
let selectedOperator = null;
let decimalEntered = false;
let equalButtonPressed = false;
let currentOperation = '';

const display = document.getElementById('display-input');

function updateDisplay(content) {
  if (content.length > 10) {
    content = content.substring(0, 10);
  }
  display.textContent = content;
}

function clearDisplay() {
  currentInput = '';
  firstNumber = null;
  selectedOperator = null;
  decimalEntered = false;
  currentOperation = '';
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
  document.getElementById('equal').pause();
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

  if (currentInput.length < 9) {
    if (currentInput === '0') {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }

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
    currentOperation = `${firstNumber} ${selectedOperator}`;
    updateDisplay(currentOperation);
  } else if (currentInput !== '') {
    firstNumber = operate(
      selectedOperator,
      firstNumber,
      parseFloat(currentInput)
    );

    selectedOperator = value;
    currentInput = '';
    decimalEntered = false;

    currentOperation = `${firstNumber} ${selectedOperator}`;
    updateDisplay(currentOperation);
  } else {
    selectedOperator = value;
  }
};

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

  if (
    firstNumber !== null &&
    selectedOperator !== null &&
    currentInput !== ''
  ) {
    firstNumber = operate(
      selectedOperator,
      firstNumber,
      parseFloat(currentInput)
    );

    currentOperation = `${currentOperation} ${parseFloat(
      currentInput
    )} = ${firstNumber}`;
    updateDisplay(currentOperation);
    currentInput = firstNumber.toString();

    firstNumber = null;
    selectedOperator = null;
    decimalEntered = false;
    equalButtonPressed = true;
    currentOperation = '';
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

const negativeButton = document.querySelector(".func-button[value='negative']");

negativeButton.addEventListener('click', () => {
  handleNegativeButton();
});

const handleNegativeButton = () => {
  playButtonSound();

  if (currentInput !== '0') {
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = '-' + currentInput;
    }

    updateDisplay(currentInput);
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
        return 'Error';
      }
      return a / b;
    default:
      return null;
  }
}

function changeOperatorColor(button) {
  operatorButtons.forEach(function (btn) {
    btn.classList.remove('clicked-operator-color');
    btn.classList.add('initial-color');
  });

  button.classList.remove('initial-color');
  button.classList.add('clicked-operator-color');
}

updateDisplay('0');
