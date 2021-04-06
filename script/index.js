/* validForm() function where all checks will be made, this function is assigned to the form's “submit” event */
function validForm(frm) {
  let countError = 0;

  /* Validating the Transaction Type field - user must choose one of the options */
  let caixaMsgOption = document.querySelector(".msg-option");
  if (frm.typeTransaction.value === "selection") {
    caixaMsgOption.innerHTML = "Por favor, selecione uma opção.";
    frm.typeTransaction.focus();
    caixaMsgOption.style.display = "block";
    countError += 1;
    return false;
  } else {
    caixaMsgOption.style.display = "none";
  }

  /* Validating the Commodity Name field - user must fill in the field using at least 3 characters */
  let caixaMsgCommodity = document.querySelector(".msg-commodity");
  if (
    frm.nameCommodity.value === "" ||
    frm.nameCommodity.value === null ||
    frm.nameCommodity.value.length < 3
  ) {
    caixaMsgCommodity.innerHTML = "Por favor, preencha o campo corretamente.";
    frm.nameCommodity.focus();
    caixaMsgCommodity.style.display = "block";
    countError += 1;
    return false;
  } else {
    caixaMsgCommodity.style.display = "none";
  }

  /* Validating the Commodity Value field */
  let caixaMsgValue = document.querySelector(".msg-value");
  if (frm.valueInput.value === "" || frm.valueInput.value === null) {
    caixaMsgValue.innerHTML = "Por favor, preencha o campo com o valor correto.";
    frm.valueInput.focus();
    caixaMsgValue.style.display = "block";
    countError += 1;
    return false;
  } else {
    caixaMsgValue.style.display = "none";
  }

  if(countError > 0){
		evt.preventDefault();
	}

  registerProduct();
}

/* Function to standardize writing of values as currency. */
function valueFormated(frm) {
  let element = document.getElementById("value-input");
  let valueOption = element.value;
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
  element.value = valueOption;
  if (valueOption === "NaN") element.value = "";
}

function registerProduct(frm) {
  let dataForm = [];
  
  let commodityReg = document.getElementById("commodity-name").value;
  let valueReg = document.getElementById("value-input").value;
  
  dataForm.push(commodityReg, valueReg);
  let objCommJSON = JSON.stringify(dataForm);
  localStorage.setItem("formJSON", objCommJSON);
  
  getCommJSON = localStorage.getItem("formJSON");
  parseCommJSON = JSON.parse(getCommJSON);

  addTable();
}

