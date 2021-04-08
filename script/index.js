// Global Vars
let elementValue = document.getElementById("value-input");
let elementCommodity = document.getElementById("commodity-name");

// Dinamic Menu

function toggleMenu() {
  let menu = document.querySelector(".hamburguer-menu").classList;
  if ([...menu].indexOf("oppened") == -1) {
    menu.add("oppened");
  } else {
    menu.remove("oppened");
  }
}

// validForm() function where all checks will be made, this function is assigned to the form's “submit” event
function validForm(frm) {
  // Variable countError will be incremented, if a field's value is invalid
  let countError = 0;

  // Validating the Transaction Type field - user must choose one of the options */
  let optionErrorMsgBox = document.querySelector(".msg-option");
  if (frm.typeTransaction.value === "selection") {
    optionErrorMsgBox.innerHTML = "Por favor, selecione uma opção.";
    frm.typeTransaction.focus();
    optionErrorMsgBox.style.display = "block";
    
    countError += 1;
    return false;
  } else {
    optionErrorMsgBox.style.display = "none";
  }

  // Validating the Commodity Name field - user must fill in the field using at least 3 characters */
  let commodityErrorMsgBox = document.querySelector(".msg-commodity");
  if (frm.nameCommodity.value === "" || frm.nameCommodity.value === null || frm.nameCommodity.value.length < 3) {
    commodityErrorMsgBox.innerHTML = "Por favor, preencha o campo corretamente.";
    frm.nameCommodity.focus();
    commodityErrorMsgBox.style.display = "block";
    
    countError += 1;
    return false;
  } else {
    commodityErrorMsgBox.style.display = "none";
  }

  // Validating the Commodity Value field */
  let valueErrorMsgBox = document.querySelector(".msg-value");
  if (frm.valueInput.value === "" || frm.valueInput.value === null) {
    valueErrorMsgBox.innerHTML = "Por favor, preencha o campo com o valor correto.";
    frm.valueInput.focus();
    valueErrorMsgBox.style.display = "block";
    
    countError += 1;
    return false;
  } else {
    valueErrorMsgBox.style.display = "none";
  }
  // If countError> 0, do not submit the page for recording, using the evt.preventDefault() method
  if (countError > 0) {
    evt.preventDefault();
  }
  registerProduct();
}

// Function to standardize writing of values as currency. */
function valueFormated(frm) {
  let valueOption = elementValue.value;
  valueOption = valueOption + "";
  valueOption = parseInt(valueOption.replace(/[\D]+/g, ""));
  valueOption = valueOption + "";
  valueOption = valueOption.replace(/([0-9]{2})$/g, ",$1");

  if (valueOption.length > 6) {
    valueOption = valueOption.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  if (valueOption.length > 9) {
    valueOption = valueOption.replace(
      /([0-9]{3}).([0-9]{3}),([0-9]{2})$/g,
      ".$1.$2,$3"
    );
  }
  elementValue.value = valueOption;
  if (valueOption === "NaN") elementValue.value = "";
}

/*
// Function that will store the data entry in the local storage
function registerProduct() {
  let arrayFormData = [];

  for (let i = 0, i < arrayFormData.length, i++ ) {

    elementValue = elementValue.value;
    elementCommodity = elementCommodity.value;
  
    // Add the information to the array
    let pullData = {
      elementCommodity: elementCommodity,
      elementValue: elementValue
    };

    arrayFormData.push(pullData);

    // Save the changed list
    localStorage.setItem("arrayJSON", JSON.stringify(arrayFormData));

    // Get the list already registered, if there is none, it turns into an empty array
    arrayFormData = JSON.parse(localStorage.getItem("arrayJSON"));
  }
}
// Function that adds the data captured in the local storage to the table
function addTable(arrayFormData) {
  let tableRef = document.getElementById("table-container").getElementsByTagName("tbody")[0];

  let tr = document.createElement("tr");
  let tdSinal = document.createElement("td");
  let tdCommodity = document.createElement("td");
  let tdValue = document.createElement("td");

  tdCommodity.textContent = arrayFormData.elementCommodity;
  tdValue.textContent = arrayFormData.valueRecord;

  tr.appendChild(tdCommodity);
  tr.appendChild(tdValue);
}*/