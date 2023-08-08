let input = "";

const display = document.getElementById("display");
const buttons = document.querySelectorAll(
  ".func-button, .operator-button, .number-button, .number-button-0, .dot-button, .operator-button-equal"
);

document.addEventListener("keyup", function (event) {
  debugger;
  handleButtonClick(event.key);
});

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    debugger;
    handleButtonClick(event.target.value);
  });
});

const handleButtonClick = (value) => {
  debugger;
  console.log(value);
  input += value;
};

const clear = () => {
  debugger;
  input = "";
};

const compute = () => {
  debugger;
  const result = eval(input);
  console.log(result);
};
