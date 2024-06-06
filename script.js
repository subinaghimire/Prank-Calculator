const allButtonsElm = document.querySelectorAll(".btn");

let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "-", "+"];

let lastOperator = "";

const buttonAction = (value) => {
    console.log(value);

    if (value === "AC"){
        strToDisplay = "";
        return display(strToDisplay);
    }

    if (value === "C"){
        strToDisplay = strToDisplay.slice(0, -1);
        return display(strToDisplay);
    }

    if (value === "=") {
  //get the last char
  const lastChar = strToDisplay[strToDisplay.length - 1];

  //check if it is one of the operators
  if (operators.includes(lastChar)){
    strToDisplay = strToDisplay.slice(0, -1);
  }
        return displayTotal();
    }

    // show only last clicked operator
    if (operators.includes (value)){
        lastOperator = value;
        const lastChar = strToDisplay[strToDisplay.length - 1];

        if (operators.includes(lastChar)){
            strToDisplay = strToDisplay.slice(0, -1);
        }
    }

    //handle the dot clicked

    if (value === "."){
        const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

        const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

        if (lastNumberSet.includes(".")){
            return;
        }

        if (!lastOperator && strToDisplay.includes(".")){
            return;
        }
    }
    strToDisplay += value;

        display(strToDisplay);

}

//attached click event to all the buttons
allButtonsElm.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;
        buttonAction(value);
    });
});

//update clicked button value to display area
const display = (str) => {
    displayElm.innerText = str || "0.0";
};

//calculate total
const displayTotal = () => {

    const extraValue = randomValue();
    const total = eval(strToDisplay) + extraValue;
    strToDisplay = total.toString();
   display(total);
}

// add random value
const randomValue = ()=> {
    const num = Math.round(Math.random() * 10);
    return num < 3 ? num : 0;
}