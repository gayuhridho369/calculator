class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    deleteNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand !== '') {
            this.operation = operation;
            return;
        } else if (this.currentOperand === '' && this.previousOperand === '') {
            this.operation = undefined;
            return;
        } else if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getFormatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getFormatNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getFormatNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const allClearButton = document.getElementById('allClear');
const previousOperandText = document.getElementById('previousOperand');
const currentOperandText = document.getElementById('currentOperand');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.value);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
});