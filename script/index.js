let formTransaction = document.getElementById('form-transaction');

/* Assigning the function “validForm()” to the form's “submit” event */
if (formTransaction.addEventListener) {                   
  formTransaction.addEventListener("submit", validForm);
/* For I.E. 8 and its predecessors it is necessary to call a proprietary method attachEvent() */
} else if (formTransaction.attachEvent) {                  
  formTransaction.attachEvent("onsubmit", validForm);
}

/* validForm() function where all checks will be made, this function is assigned to the form's “submit” event */
function validForm(event) {
  let nameCommodity = document.getElementById('commodity-name').value;
  
  let countError = 0;

/* Input commodity name validation */
  
  /* Method used to capture the elements where the error messages will be displayed, classes used in the <span> tag below the inputs */
  let inputNameCommodity = document.querySelector('.msg-commodity'); // document.querySelector() method returns the first element found with the same class name
  if (nameCommodity === "" || nameCommodity === null) {
    alert('erro'); // teste para validação
    inputNameCommodity.innerHTML = "Preencher o campo nome";
    inputNameCommodity.style.display = 'block';
    /* If it is detected that the value of a field is invalid then increase the value of the countError variable */
    countError += 1;
  } else {
    inputNameCommodity.style.display = "none";
  }

/* Input commodity value validation */
  // vazio
  
  /* If countError> 0, then an error was found and the default behavior of the form of submitting the page for recording should be canceled, 
  for this we call the event.preventDefault () method. If the value of the function is zero then submission occurs naturally. */
  if (countError > 0) {
    event.preventDefault();
  }
}