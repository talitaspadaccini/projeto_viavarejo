// Global Vars
let countError = 0; // Variable countError will be incremented, if a field's value is invalid
let elementType = document.getElementById("transactiontype");
let elementValue = document.getElementById("value-input");
let elementCommodity = document.getElementById("commodity-name");
let arrayFormData = new Array();
let key;
let total;
let student = "7890";

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
  if (
    frm.nameCommodity.value === "" ||
    frm.nameCommodity.value === null ||
    frm.nameCommodity.value.length < 3
  ) {
    commodityErrorMsgBox.innerHTML =
      "Por favor, preencha o campo corretamente.";
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
    valueErrorMsgBox.innerHTML =
      "Por favor, preencha o campo com o valor correto.";
    frm.valueInput.focus();
    valueErrorMsgBox.style.display = "block";

    countError += 1;
    return false;
  } else {
    valueErrorMsgBox.style.display = "none";
  }
  // If countError> 0, do not submit the page for recording, using the evt.preventDefault() method
  evtPrevent();
  registerProduct();

  return false;
}

function evtPrevent(evt) {
  if (countError > 0) {
    evt.preventDefault();
  }
}
/*
function clearErrors() {
  [...document.querySelectorAll(".form-transaction span")].forEach((message) => {
    message.classList.add(".msg-error");
  })
}*/

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
  if (valueOption === "NaN") {
    elementValue.value = "";
  }

  // Function that will store the data entry in the local storage
  function registerProduct() {
    let data = {
      elementType: elementType.value,
      elementCommodity: elementCommodity.value,
      elementValue: elementValue.value
    };

    // Add values to the created array
    arrayFormData.push(data);

    // Save the changed list
    localStorage.setItem("arrayFormData", JSON.stringify(arrayFormData));

    addTable();
  }

  //Function that adds the data captured in the local storage to the table
  function addTable() {
    // Checks whether the property exists. If it exists, convert from String to Object
    if (localStorage.hasOwnProperty("arrayFormData")) {
      arrayFormData = JSON.parse(localStorage.getItem("arrayFormData"));
    }
    // Save the changed list
    localStorage.setItem("arrayFormData", JSON.stringify(arrayFormData));

    document.querySelector(".table-container tbody").innerHTML = "";

    if (arrayFormData.length == 0) {
      document.querySelector(".table-container tbody").innerHTML += `<tr>
        <td colspan = "3" style="text-align: center">Nenhuma transação cadastrada.</td>`;
    } else {
      for (key in arrayFormData) {
        let typeTransaction = "+";

        if (arrayFormData[key].elementType == "sale") {
          typeTransaction = "-";
        }
        document.querySelector(".table-container tbody").innerHTML += `<tr>
        <td class="tdTypeTransaction">${typeTransaction}</td>
        <td class="tdCommodity">${arrayFormData[key].elementCommodity}</td>
        <td class="tdValue">R$ ${arrayFormData[key].elementValue}</td>
      </tr>`;
      }
    }
    calcTotal();
  }

  // Function that calculates total sum of table values
  function calcTotal() {
    total = 0.0;
    total = parseFloat(total);
    for (key in arrayFormData) {
      floatValue = arrayFormData[key].elementValue.replace(",", ".");
      if (arrayFormData[key].elementType == "sale") {
        total -= parseFloat(floatValue);
      } else {
        total += parseFloat(floatValue);
      }
    }

    profitOrLoss();

    total = total.toFixed(2);
    totalFix = total.toString().replace(".", ",");
    document.getElementById("value-total").innerHTML = "R$ " + totalFix;
  }

  // When reloading the page, the table appears
  window.addEventListener("load", function () {
    addTable();
  });

  // Function that clears data from the table
  function clearData() {
    let clearTable = confirm("Deseja apagar os dados da tabela?");
    if (clearTable == true) {
      localStorage.clear();
    }
  }

  //Function that defines profit, loss or breakeven point (there is neither profit nor loss)
  function profitOrLoss() {
    trLucro = document.getElementById("state");
    if (total > 0) {
      trLucro.innerHTML = `<td colspan="3">[LUCRO]</td>`;
    } else if (total < 0) {
      trLucro.innerHTML = `<td colspan="3">[PREJUÍZO]</td>`;
    } else {
      trLucro.innerHTML = `<td colspan="3">[PONTO DE EQUILÍBRIO]</td>`;
    }
  }

  //Salvar dados no servidor com chamada para API Airtable
  function saveData() {
    let json = JSON.stringify(arrayFormData);
    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
      headers: {
        Authorization: "Bearer key2CwkHb0CKumjuM"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let exist = responseJson.records.filter((record) => {
          if (student == record.fields.Aluno) {
            return true;
          }
          return false;
        });

        if (exist.length == 0) {
          insertData();
        } else {
          changeData(exist[0].id);
        }
      });
  }

  function insertData() {
    let json = JSON.stringify(arrayFormData);
    let body = JSON.stringify({
      records: [
        {
          fields: {
            Aluno: student,
            Json: json
          }
        }
      ]
    });

    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
      method: "POST",
      headers: {
        Authorization: "Bearer key2CwkHb0CKumjuM",
        "Content-Type": "application/json"
      },
      body: body
    });
  }

  function changeData(id) {
    let json = JSON.stringify(arrayFormData);
    let body = JSON.stringify({
      records: [
        {
          id: id,
          fields: {
            Aluno: student,
            Json: json
          }
        }
      ]
    });

    fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer key2CwkHb0CKumjuM",
        "Content-Type": "application/json"
      },
      body: body
    });
  }
}