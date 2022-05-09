class Calculator {
    constructor() {
        this.clean();
    }

    clean() {
        this.sidesNumbers = [];

        // The result attribute hold the all operation displayed or the final result.
        this.result = "";
        this.appendNumber = "";
        this.operator = "";
        document.getElementById("display").textContent = "";
    }

    appendToDisplay() {
        document.getElementById("display").textContent = this.result;
    }

    signOfNumber(sign) {
        if (this.result === "" || this.result === "+" || this.result === "-") {
            this.appendNumber = sign;
            this.result = this.appendNumber;
            this.appendToDisplay();
        }
    }

    selectOperator(operator) {
        if (this.result.length >= 1 && (this.result !== "+" && this.result !== "-")) {
            if (this.appendNumber === "") return;

            this.sidesNumbers.push(Number(this.appendNumber));
            console.log(this.sidesNumbers)
            if (this.sidesNumbers.length === 2) {
                this.operation(this.sidesNumbers, this.operator);
            }
            this.operator = operator;
            this.result = this.appendNumber + operator;
            this.appendNumber = "";
            this.appendToDisplay();
        }
    }

    displayOperation(number) {
        if (number === "." && this.appendNumber.includes(".")) return;
        this.appendNumber += number;
        this.result += number;
        this.appendToDisplay();
    }

    operation(numbers, operator) {
        console.log(numbers)
        switch (operator) {
            case "+":
                this.result = numbers[0] + numbers[1];
                break;
            case "-":
                this.result = numbers[0] - numbers[1];

                break;
            case "x":
                this.result = numbers[0] * numbers[1];

                break;
            case "÷":
                this.result = numbers[0] / numbers[1];
                break;

        }

        this.sidesNumbers = [];
        this.sidesNumbers.push(this.result);
        this.result += "";
        this.operator = "";
        this.appendNumber = this.result;
    }

    equalEvent() {
        // stop event until we have both numbers of the operation. 
        if (this.appendNumber === "") return;

        this.sidesNumbers.push(Number(this.appendNumber));
        this.operation(this.sidesNumbers, this.operator);
        this.appendToDisplay();
    }
}

const Calc = new Calculator();

document.querySelector(".operators").onclick = (e) => {
    if (e.target.textContent === "+" || e.target.textContent === "-") {
        Calc.signOfNumber(e.target.textContent);
    }
    Calc.selectOperator(e.target.textContent);
}


document.querySelector(".numbers").onclick = (e) => {
    Calc.displayOperation(e.target.textContent);
    if (e.target.textContent === "C") {
        Calc.clean();
    }
}
document.getElementById("equal").onclick = (e) => {
    Calc.equalEvent();
}


