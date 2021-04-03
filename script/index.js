/* validForm() function where all checks will be made, this function is assigned to the form's “submit” event */
function validForm(frm) {
  /* Validating the Transaction Type field - user must choose one of the options */
  if (frm.typeTransaction.value === 'selection') {
    document.querySelector('.msg-option').innerHTML = "Por favor, selecione uma opção.";
    frm.typeTransaction.focus();
    return false;
  }
  /* Validating the Merchandise Name field - user must fill in the field using at least 3 characters */ 
  if (frm.nameCommodity.value === "" || frm.nameCommodity.value === null || frm.nameCommodity.value.length < 3) {
    document.querySelector('.msg-commodity').innerHTML = "Por favor, preencha o campo corretamente.";
    frm.nameCommodity.focus();
    return false;
  } 
  if (frm.valueInput.value === "" || frm.valueInput.value === null) {
    document.querySelector('.msg-value').innerHTML = "Por favor, preencha o campo com o valor correto.";
    frm.valueInput.focus();
    return false;
}
}

/* Function to standardize writing of values as currency. */
function valueFormated(frm) {
  let element = document.getElementById('value-input');
  let valueOption = element.value;
  valueOption = valueOption + '';
  valueOption = parseInt(valueOption.replace(/[\D]+/g, ''));
  valueOption = valueOption + '';
  valueOption = valueOption.replace(/([0-9]{2})$/g, ",$1");

  if (valueOption.length > 6) {
    valueOption = valueOption.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  if (valueOption.length > 9) {
  valueOption = valueOption.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2})$/g, '.$1.$2,$3');
}
  
  element.value = valueOption;
  if(valueOption === 'NaN') element.value = '';

  
}