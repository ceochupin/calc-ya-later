const MAX_DISPLAY_LENGTH = 14;
const ERROR_DIVISION_BY_ZERO = "На 0 не делю";

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".calc__display");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

function updateDisplay() {
    display.textContent = displayValue.length > MAX_DISPLAY_LENGTH 
        ? displayValue.substring(0, MAX_DISPLAY_LENGTH) 
        : displayValue;
}

function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue === "0" ||
            displayValue === firstOperand ||
            displayValue === ERROR_DIVISION_BY_ZERO
            ) {
            displayValue = operand === "00" ? "0" : operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand ||
            displayValue === "0"
            ) {
            displayValue = operand === "00" ? "0" : operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator === null) {
        firstOperator = operator;
        firstOperand = displayValue;
    } else if (secondOperator === null) {
        if (firstOperand === displayValue) {
            firstOperator = operator;
        } else {
            secondOperand = displayValue;
            result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
            displayValue = String(result);
            firstOperand = displayValue;
            firstOperator = operator;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = String(result);
        firstOperand = displayValue;
        firstOperator = operator;
        secondOperator = null;
        result = null;
    }
}

function inputEquals() {
    if (firstOperator === null) {
        return;
    } else if (secondOperator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
    }

    if (result === "error") {
        displayValue = ERROR_DIVISION_BY_ZERO;
        firstOperand = null;
        // secondOperand = null;
        // firstOperator = null;
        // secondOperator = null;
        // result = null;
    } else {
        displayValue = String(result);
        firstOperand = displayValue;
        // secondOperand = null;
        // firstOperator = null;
        // secondOperator = null;
        // result = null;
    }

    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = "0" + dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function inputPercent() {
    displayValue = String(Number(displayValue) / 100);
}

function inputSign() {
    displayValue = String(Number(displayValue) * -1);
}

function inputSquared() {
    displayValue = String(Math.pow(Number(displayValue), 2));
}

function inputSqrt() {
    displayValue = String(Math.sqrt(Number(displayValue)));
}

function operate(a, b, op) {
    let result;
    switch(op) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) return "error";
            result = a / b;
            break;
        default:
            return "error";
    }
    return Number(result.toFixed(MAX_DISPLAY_LENGTH - 1));
}

function inputBackspace() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        const typeButton = button.id;

        switch(typeButton) {
            case "operand":
                inputOperand(value);
                break;
            case "operator":
                inputOperator(value);
                break;
            case "equals":
                inputEquals();
                break;
            case "decimal":
                inputDecimal(value);
                break;
            case "percent":
                inputPercent();
                break;
            case "sign":
                inputSign();
                break;
            case "clear":
                clearDisplay();
                break;
            case "squared":
                inputSquared();
                break;
            case "sqrt":
                inputSqrt();
                break;
            case "backspace":
                inputBackspace();
                break;
        }
        updateDisplay();
    });
});

updateDisplay();