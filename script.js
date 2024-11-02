document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".box");

    let displayValue = "";
    let currentOperator = "";
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (!isNaN(value)) {
                // num pressed
                displayValue += value;
                display.textContent = displayValue;
            } else if (value === "clear") {
                // Clear everything
                displayValue = "";
                currentOperator = "";
                firstOperand = null;
                display.textContent = "0";
            } else if (value === "=") {
                // Calculate result
                if (firstOperand !== null && currentOperator) {
                    displayValue = calculate(firstOperand, currentOperator, parseFloat(displayValue));
                    display.textContent = displayValue;
                    firstOperand = null;
                    currentOperator = "";
                }
            } else {
                // Operator pressed
                if (displayValue) {
                    firstOperand = parseFloat(displayValue);
                    currentOperator = value;
                    displayValue = "";
                }
            }
        });
    });

    function calculate(a, operator, b) {
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "x": return a * b;
            case "/": return b !== 0 ? a / b : "Error";
            default: return "Error";
        }
    }
});
