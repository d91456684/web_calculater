const buttonContainer = document.querySelector("#button-container")
const displayedValue = document.querySelector("#display-container")
let displayValue = ""
let hiddenValue = ""
let operation = ""
const regEx = /\./
let reset = false //// this gets toggled after pressing equals,it allows to auto-clear after invoking operate by pressing any button but delete, also used to implement "equals bug" work-around
buttonContainer.addEventListener("click", event =>{
    let target = event.target
    switch (target.id) {
        case "1-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "1"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "1"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "2-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "2"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "2"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "3-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "3"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "3"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "4-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "4"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "4"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "5-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "5"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "5"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "6-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "6"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "6"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "7-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "7"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "7"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "8-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "8"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "8"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "9-button" :
            if (displayValue.length < 9 && !reset) {
                displayValue += "9"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayValue += "9"
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "zero-button" :
            if (displayValue.length < 9 && displayValue.length > 0 && !reset) {
                displayValue += "0"
                displayedValue.textContent = displayValue    
            }else if(reset) {
                displayValue = ""
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "comma-button" :
            if (displayValue.length < 9 && displayValue.length > 0 && !reset && !(regEx.test(displayValue))) {
                displayValue += "."               
                console.log([displayValue,(regEx.test(displayValue))])
                displayedValue.textContent = displayValue        
            }else if(reset || displayValue.length === 0) {
                displayValue = ""
                console.log()
                displayValue += "0."
                console.log((/./.test(displayValue)))
                displayedValue.textContent = displayValue
                reset = false
            }
            break;
        case "clear-button" :
            displayValue = ""
            displayedValue.textContent = displayValue
            reset = false
            break;
        case "delete-button" :
            displayValue = displayValue.slice(0, displayValue.length -1)
            displayedValue.textContent = displayValue
            reset = false //this allows to continue modifying number after operate() is invoked and delete was pressed
            break;
        case "summarize-button" :
            if (displayValue.length > 0) {
                operation = "summarize"
                hiddenValue = displayValue
                displayValue = "" 
                displayedValue.textContent = displayValue
            }
            break;
        case "subtract-button" :
            if (displayValue.length > 0) {
                operation = "subtract"
                hiddenValue = displayValue
                displayValue = "" 
                displayedValue.textContent = displayValue
            }
            break;
        case "multiply-button" :
            if (displayValue.length > 0) {
                operation = "multiply"
                hiddenValue = displayValue
                displayValue = "" 
                displayedValue.textContent = displayValue
            }
            break;
        case "divide-button" :
            if (displayValue.length > 0) {
                operation = "divide"
                hiddenValue = displayValue
                displayValue = "" 
                displayedValue.textContent = displayValue
            }
            break;
        case "equals-button" :
            if (displayValue.length === 0 || hiddenValue.length === 0 || reset || (operation === "divide" && displayValue == 0)) {
                console.log("hi")
                //// this is just to work around "equals bug" and to prevent division by 0
            }else {
                displayValue = operate(hiddenValue,displayValue)
                displayedValue.textContent = displayValue
                operation = ""
                reset = true
            }
            break;
        
        
        
    }
})

function operate (hidden,displayed) {
    let result
    switch (operation) {
        case "summarize":
            result = roundToThree(parseFloat(hidden) + parseFloat(displayed)).toString()
            hiddenValue = "" ///this is to prevent "equals bug",also other thing probably
            console.log(result)
            return parseFloat(result) > 999999999 ? "999999999" : result ////limiting the result to 999 999 999
        case "subtract":
            result = roundToThree(parseFloat(hidden) - parseFloat(displayed)).toString()
            hiddenValue = "" ///this is to prevent "equals bug",also other thing probably
            console.log(result)
            return parseFloat(result) < -999999999 ? "-999999999" : result ////limiting the result to -999 999 999 
        case "multiply":
            result = roundToThree(parseFloat(hidden) * parseFloat(displayed)).toString()
            hiddenValue = "" ///this is to prevent "equals bug",also other things probably
            console.log(result)
            return parseFloat(result) < -999999999 
                ? "-999999999" 
                : parseFloat(result) > 999999999 
                ? "999999999"
                : result
        case "divide":
            if (displayValue > 0) {
                result = roundToThree(parseFloat(hidden) / parseFloat(displayed)).toString()
                hiddenValue = "" ///this is to prevent "equals bug",also other things probably
                console.log(result)
                return parseFloat(result) < -999999999 
                    ? "-999999999" 
                    : parseFloat(result) > 999999999 
                    ? "999999999"
                    : result 
            }else {
                return "0."
            }
             
        
    }
}
////rounds to 3 decimals:
 function roundToThree(num) { 
    return +(Math.round(num + "e+3")  + "e-3");
}