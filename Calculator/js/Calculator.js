// Array of symbols to animate
const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', '%', '^', '√'];

function createSymbols() {
  for (let i = 0; i < 15; i++) {
    const symbol = document.createElement('div');
    symbol.classList.add('symbol');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + 'vw';
    symbol.style.fontSize = (Math.random() * 10 + 20) + 'px';  
    symbol.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(symbol);

    symbol.addEventListener('animationend', () => {
      symbol.remove();
    });
  }
}

setInterval(createSymbols, 1000);

let output = '';
let isResultDisplayed = false;

// Update output box
function updateOutput() {
    const outputBox = document.getElementById('output_box');
    outputBox.textContent = output;
}

// Clear output
function clearOutput() {
    output = '';
    updateOutput();
}

// Append number to output
function appendNumber(num) {
    if (isResultDisplayed) {
        output = ''; // Reset output if result is displayed
        isResultDisplayed = false;
    }
    output += num;
    updateOutput();
}

// Append operator to output
function appendOperator(operator) {
    if (isResultDisplayed) {
        isResultDisplayed = false;
    }
    if (output.length > 0 && !isNaN(output[output.length - 1])) {
        output += operator;
        updateOutput();
    }
}

// Append decimal point
function appendDecimal() {
    if (isResultDisplayed) {
        output = ''; // Reset output if result is displayed
        isResultDisplayed = false;
    }
    if (!output.includes('.')) {
        output += '.';
        updateOutput();
    }
}

// Special operations
function calculate(operation) {
    if (operation === 'sqrt') {
        output = Math.sqrt(parseFloat(output)).toString();
    } else if (operation === 'square') {
        output = Math.pow(parseFloat(output), 2).toString();
    }
    isResultDisplayed = true;
    updateOutput();
}

// Calculate final result
function calculateResult() {
    try {
        output = eval(output).toString();
        isResultDisplayed = true;
    } catch (error) {
        output = 'Error';
    }
    updateOutput();
}
