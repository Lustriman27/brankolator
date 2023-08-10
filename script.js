// initialize input variable for display
let input = "";
const mathFunction = ["+", "-", "*", "/", "=", "C"];

// initialize display and button
const display = document.getElementById("display-input");
const buttons = document.querySelectorAll(
  ".func-button, .operator-button, .number-button, .number-button-0, .dot-button, .operator-button-equal"
);

// function to handle button click
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!mathFunction.includes(button.textContent)) {
      input += button.textContent;
      updateDisplay(input);
    } else if (button.textContent === "C") {
      clearDisplay();
    }
  });
});

// function to update display
const updateDisplay = (content) => {
  display.textContent = content;
};

const clearDisplay = () => {
  input = "";
  display.textContent = 0;
};

// function to compute the math expression
const compute = (operator, firstNum, secondNum) => {
  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return secondNum === 0 ? "Infinity" : firstNum / secondNum;
    default:
      return null;
  }
};
