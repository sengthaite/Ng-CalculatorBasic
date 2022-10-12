import { Injectable } from "@angular/core";
import { BigNumber } from "bignumber.js";

/* Calculation Logics
0. If duplication arithmetic sign take the latest one
    e.g.
    10 +- => 10 -
1. Addition / Subtraction Case:
    +10 = 10
    2 + 10 = 12
    -2 + 4 = 2
2. Perform calculation operation after right handside value is passed
    2 + 10 * 8 means (2 + 10) then (12) * 8
3. Zero toggle sign not working
4. Default value of left handside number is 0
5. Prevent multiple decimal point input
*/

/* Test Case 
    1 + 2 = means 3
    1 + 2 + means 3 +
    1 + 2 + 3 means 3 + 3
    1 + 2 * 3 means 3 * 3
    1 + - means 1 -
    1 + - 2 means 1 - 2
    1 + = means 1
    1 0 means 10
    1 0 + 0 . 3 means 10 + 0.3
    1 . . 0 means 1.0
    1 + 2 . 0 = + 3 means 3.0 + 3
    1 + 2 = + 3 + means 6 +
    1 + 2 + . means 3 + 0.
    . 2 + 3 = means 3.2
    1 + 2 = 4 + 1 = means 35
*/

enum KeyType {
    Clear = "AC", // AC means All Clear
    SwitchSign = "+/_",
    Percentage = "%",
    Division = "÷",
    DivisionSlash = "/",
    Multiplication = "×",
    MultiplicationAlterisk = "*",
    Subtraction = "-",
    Addition = "+",
    Equal = "=",
    DecimalPoint = ".",
    Enter = "Enter",
    Backspace = "Backspace"
}

@Injectable({
    providedIn: 'root'
})
export class GlobalUtil {

    static shared = new GlobalUtil();

    resultDisplay: string = "0"

    private _tmpNumber: string = ""

    private get zero(): BigNumber {
        return BigNumber(0)
    }

    keyed(input: string) {
        let modInput = input.trim()

        if (modInput <= "9" && modInput >= "0" && modInput.length == 1) {
            this._tmpNumber += modInput
            this.resultDisplay = this._tmpNumber
            this._isLastInputOperator = false
            return
        }

        if (modInput == KeyType.DecimalPoint) {
            // more than one decimal point was input so return
            if (this._tmpNumber.indexOf(KeyType.DecimalPoint) != -1) {
                return
            }
            if (this._tmpNumber == "") {
                this._tmpNumber = "0"
            }
            this._tmpNumber += KeyType.DecimalPoint
            this.resultDisplay = this._tmpNumber
            this._isLastInputOperator = false
            return
        }
        
        this._operator = input
    }

    private _leftValue: BigNumber = BigNumber(0)
    private _rightValue?: BigNumber
    private _currentOperator?: string
    private _isLastInputOperator: boolean = false

    private set _operator(operator: string) {
        switch (operator) {
            case KeyType.Addition:
            case KeyType.Subtraction:
            case KeyType.Multiplication:
            case KeyType.MultiplicationAlterisk:
            case KeyType.Division:
            case KeyType.DivisionSlash:
                if (this._isLastInputOperator) {
                    this._currentOperator = operator
                    return
                }
                (this._tmpNumber != "" && this._currentOperator !== undefined) ? this._performCalculation() : this._calculate()
                this._currentOperator = operator
                this._tmpNumber = ""
                this._isLastInputOperator = true
                break
            case KeyType.SwitchSign:
                this._switchSign()
                break
            case KeyType.Percentage:
                this._percentage()
                break
            case KeyType.Equal:
            case KeyType.Enter:
                this._performCalculation()
                break
            case KeyType.Clear:
            case KeyType.Backspace:
                this._clear()
                break
            default:
                this._clear()
                console.log(`Invalid operator ${operator}`)
        }
    }

    private _switchSign() {
        if (this._tmpNumber == "") {
            this._tmpNumber = "0"
        }
        this._tmpNumber = this._tmpNumber.includes("-") ? this._tmpNumber.replace(/-/gi, '') : ("-" + this._tmpNumber)
        this.resultDisplay = this._tmpNumber
    }

    private _percentage() {
        if (this._tmpNumber != "") {
            this._leftValue = BigNumber(this._tmpNumber).multipliedBy(0.01)
            this.resultDisplay = this._leftValue.toFixed()
            this._tmpNumber = this._leftValue.isEqualTo(this.zero) ? "" : this.resultDisplay
        }
    }

    private _clear() {
        this._leftValue = this.zero
        this._rightValue = undefined
        this._currentOperator = undefined
        this._tmpNumber = ""
        this.resultDisplay = "0"
    }

    private _calculate(): BigNumber {
        if (this._rightValue == undefined) {
            this._leftValue = BigNumber(this._tmpNumber)
            this.resultDisplay = ""
            return this._leftValue
        }
        let result = this._leftValue
        switch (this._currentOperator) {
            case KeyType.Addition:
                result = this._leftValue.plus(this._rightValue)
                break
            case KeyType.Subtraction:
                result = this._leftValue.minus(this._rightValue)
                break
            case KeyType.Multiplication:
            case KeyType.MultiplicationAlterisk:
                result = this._leftValue.multipliedBy(this._rightValue)
                break
            case KeyType.Division:
            case KeyType.DivisionSlash:
                result = this._leftValue.dividedBy(this._rightValue)
                break
        }
        this._clear()
        return result
    }

    private _performCalculation() {
        let result = this._leftValue
        if (this._tmpNumber != "") {
            if (this._currentOperator !== undefined) {
                this._rightValue = BigNumber(this._tmpNumber)
                result = this._calculate()
            } else {
                result = BigNumber(this._tmpNumber)
            }
        }
        this._clear()
        this._leftValue = result
        this.resultDisplay = this._leftValue.toFixed()
        this._tmpNumber = this._leftValue.isEqualTo(this.zero) ? "" : this.resultDisplay
    }
}