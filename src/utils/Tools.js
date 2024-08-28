import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
const loadInputsById = (data, form, disabled) => {
  convertGroupDates(data,'es-en')
  for (let item in data) {
    const input = form.querySelector(`[name='${item}']`);
    if (input) {
      if (data[item]) {
        input.value = data[item];
      }
      if (disabled) {
        input.setAttribute("disabled", "");
      }
    }
  }
};
const isValidForm = (event, form) => {
  if (form.checkValidity()) {
    event.preventDefault();
  }
  form.classList.add("was-validated");
  return form.checkValidity();
};
const getDataFormValid = (event, form, searchItem) => {
  let data = {};
  if (isValidForm(event, form)) {
     data = getDataForm(form, searchItem)
  }
  return data
};
const getDataForm = (form, searchItem) => {
  const data = {};
  const values = form.querySelectorAll(searchItem);
  values.forEach((item) => {
    const key = item.id;
    const value = item.value;
    data[key] = value;
  });
  return data;
};

const getHash = () => {
  return location.hash.slice(1).toLocaleLowerCase().split("/")[1];
};
const listenerChangeEvent = (body) => {
  let list = body.querySelectorAll(".form-select, .form-control");
  list.forEach((item) => {
    item.addEventListener("input", (event) => {
      event.target.classList.add("change-save");
    });
  });
};
const listenerChangeEventCheck = (body) => {
  let list = body.querySelectorAll(".form-check-input");
  list.forEach((item) => {
    item.addEventListener("input", (event) => {
      event.target.classList.add("change-save-check");
    });
  });
};
const isEmptyObjet = (data) => Object.keys(data).length === 0;
const getColumnByKey = (key, array) => {
  let newArray = array[0];
  newArray = Object.keys(newArray)
  return newArray.indexOf(key) + 1
}
const loadCheckedInputs =(data) => {
  data = data.split(', ')
  let inputs = document.querySelectorAll('.form-check-input');
  inputs.forEach(input => {
    data.map(item => {
      if(input.value=== item) {
        input.checked = true
      }
    })
  })
}
const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase(); 
}
const listUpdate = (data) => {
  const items = Object.keys(data);
  const view = `
    ${items
      .map(
        (item) => `
        <li><em>${
          item[0].toUpperCase() + item.slice(1).replace("_", " ")
        }</em>: ${data[item]}</li>
        `
      )
      .join("")}
    `;

  return view;
};
const isDateEN = (date) => {
  const regExp = new RegExp("^(\\d{2,4})-(\\d{1,2})-(\\d{1,2})$");
  return regExp.test(date)
}
const isDateES = (date) => {
  const regExp = new RegExp("^(\\d{1,2})/(\\d{1,2})/(\\d{2,4})$");
  return regExp.test(date)
}
const convertDate = (type, value) => {
  let newDate
  if(type=='es-en') {
    dayjs.extend(customParseFormat);
    const date = dayjs(value,'D/M/YYYY');
    newDate = dayjs(date).format("YYYY-MM-DD");
  }
  else if(type=='en-es') {
    const date = dayjs(value).format("YYYY-MM-DD");
    newDate = dayjs(date).format("DD/MM/YYYY");
  }
  return newDate
}
const convertGroupDates = (obj,type) => {
  for(let item in obj){
    const value = obj[item];
    if(type=='es-en') {
      if(isDateES(value)) {
        obj[item] = convertDate(type,value)
      }
    }
    else if(type=='en-es') {
      if(isDateEN(value)) {
        obj[item] = convertDate(type,value)
      }
    }
  }
  return obj
}
const trimCustumize = () => {
  const inputs = document.querySelectorAll(".custumeFormatt");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        event.preventDefault();
      }
    });
    input.addEventListener("input", (event) => {
      event.target.value = event.target.value.toUpperCase();
    });
  });
}
const sortByTraz = (a, b) => {
  // Obtener los dos últimos dígitos
  const lastTwoA = a.trazabilidad.slice(-2);
  const lastTwoB = b.trazabilidad.slice(-2);
  // Comparar por los dos últimos dígitos
  if (lastTwoA !== lastTwoB) {
    return lastTwoA - lastTwoB;
  }
  // Obtener el primer dígito después del "."
  const firstDigitA = parseInt(
    a.trazabilidad.substring(
      a.trazabilidad.indexOf(".") + 1,
      a.trazabilidad.indexOf("-")
    )
  );
  const firstDigitB = parseInt(
    b.trazabilidad.substring(
      b.trazabilidad.indexOf(".") + 1,
      b.trazabilidad.indexOf("-")
    )
  );
  // Comparar por el primer dígito
  if (firstDigitA !== firstDigitB) {
    return firstDigitA - firstDigitB;
  }
  // Comparar por los 4 dígitos después del "."
  const digitsA = parseInt(
    a.trazabilidad.substring(a.trazabilidad.indexOf("-") + 1)
  );
  const digitsB = parseInt(
    b.trazabilidad.substring(b.trazabilidad.indexOf("-") + 1)
  );

  return digitsA - digitsB;
};
const today = dayjs(new Date(),'YYYY-DD-MM').format('YYYY-MM-DD')

export {
  loadInputsById,
  isValidForm,
  getDataFormValid,
  getHash,
  listenerChangeEvent,
  isEmptyObjet,
  getColumnByKey,
  loadCheckedInputs,
  listenerChangeEventCheck,
  normalizeString,
  listUpdate,
  isDateEN,
  isDateES,
  convertDate,
  convertGroupDates,
  today,
  getDataForm,
  trimCustumize,
  sortByTraz
};
