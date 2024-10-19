//arithmetic functions
function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b){
    return parseFloat(a) / parseFloat(b);
}



const numbers = document.querySelectorAll('.btn-num');
const operator = document.querySelectorAll('.btn-operator');
const clearButton = document.querySelector('.btn-clear');
const backspaceButton = document.querySelector('.btn-backspace');
const equalButton = document.querySelector('.equal');
const displayValue = document.querySelector('.display');

let firstNumber = "";
let secondNumber = "";
let operatorUsed = "";
let result = "";
let isSecondNumber = false;
const MAX_LENGTH = 10;//maximum digits to display


//display numbers on click
numbers.forEach(button => {
button.addEventListener('click', () => {
    if (isSecondNumber) {
        if(button.value === '.' && secondNumber.includes('.'))
            return;//prevents multiple dots
        secondNumber += button.value;
    }else{
        if(button.value === '.' && firstNumber.includes('.'))
            return;//prevents multiple dots
        firstNumber += button.value;
    }
    updateDisplay();//update display after each input
});
});

//display operators on click
operator.forEach(button => {
button.addEventListener('click', () => {
    if (firstNumber !== ''){
        operatorUsed = button.value;// store the operator
        isSecondNumber = true;//switch to second number
        updateDisplay();
    }
});
});

//clear display on click
clearButton.addEventListener('click', () => {
    displayValue.textContent = "";
    firstNumber = '';
    secondNumber = '';
    operatorUsed = '';
    isSecondNumber = false;//reset back to firstNumber
});

//go backspace on click
backspaceButton.addEventListener('click', () => {
    if (isSecondNumber && secondNumber !== ''){
        secondNumber = secondNumber.slice(0, -1);
    }else if(!isSecondNumber && firstNumber !== ''){
        firstNumber = firstNumber.slice(0, -1);
    }
    updateDisplay();
});

//calculate on equal button click
equalButton.addEventListener('click', () => {
if (firstNumber !== '' && secondNumber !== '' && operatorUsed !== ''){
    //check for division by 0
    if(operatorUsed === '/' && secondNumber === '0'){
        displayValue.textContent = "Why??";
        firstNumber = '';
        secondNumber = '';
        operatorUsed = '';
        isSecondNumber = false;
        return;
    }

    //perform calculation
    if(operatorUsed === '+'){
        result = add(firstNumber, secondNumber);
    }else if (operatorUsed === '-'){
        result = subtract(firstNumber, secondNumber);
    }else if (operatorUsed === '*'){
        result = multiply(firstNumber, secondNumber);
    }else if (operatorUsed === '/'){
        result = divide(firstNumber, secondNumber);
    }else {
        result = "Invalid input";
    }
}
result = formatNumber(result);
displayValue.textContent = result;
firstNumber = result;//set result as the new first number for chaining
secondNumber = '';
operatorUsed = '';
isSecondNumber = false;//reset back to firstNumber
})

//function to update the display with the full equation
function updateDisplay(){
    displayValue.textContent = `${firstNumber} ${operatorUsed} ${secondNumber}`.trim() || '0';
}

//function to format long numbers(approximation)
function formatNumber(num){
    if (Math.abs(num) >= Math.pow(10, MAX_LENGTH) || Math.abs(num) < Math.pow(10, -MAX_LENGTH)){
        return num.toExponential(5);
    }
    return parseFloat(num.toPrecision(MAX_LENGTH));
}
