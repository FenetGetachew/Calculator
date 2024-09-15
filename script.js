// Select elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');//querySelector is used instead of querySelectorAll because it selects a singgle element insetad of multiple
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Variables to store operands and operator
let currentOperand = '';
let previousOperand = '';
let operation = null;

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperation(button.textContent);
        updateDisplay();
    });
});

// Add event listener to equals button
equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

// Add event listener to delete button
deleteButton.addEventListener('click', () => {
    deleteLast();
    updateDisplay();
});

// Add event listener to all clear button
allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

// Functions
function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand += number;
}

function setOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '÷':
            computation = prev / curr;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
}

function updateDisplay() {
    currentOperandTextElement.textContent = currentOperand;
    previousOperandTextElement.textContent = operation ? `${previousOperand} ${operation}` : '';
}

// Initialize display
updateDisplay();
