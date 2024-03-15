let DataFormParse;
async function loadedWindow() {
  await UI.openHome();
}
function nextStep(event) {
  event.preventDefault();
  let formStep = document.querySelector(`.card_${counStep}`);
  UI.isValidForm(event,formStep)
  console.log(formStep)
}
async function loadPage(srcPage, body = interface) {
  let status;
  try {
    let response = await fetch(srcPage);
    status = response.status;
    if(response.status === 200) {
      response = await response.text();
      body.innerHTML = response; 
    }
    return status;
  } catch (e) {
    console.log('error',e);
  }
}
function arrayToObject(arr) {
  // Obtenemos los encabezados del array
  var headers = arr[0];
  // Creamos un nuevo array para almacenar los objetos transformados
  var newData = [];
  // Iteramos desde 1 para evitar el primer elemento que son los encabezados
  for (var i = 1; i < arr.length; i++) {
    var obj = {};
    // Iteramos a través de cada elemento del array actual
    for (var j = 0; j < headers.length; j++) {
      // Usamos los encabezados como claves y asignamos los valores correspondientes
      obj[headers[j].toLowerCase()] = arr[i][j];
    }
    newData.push(obj); // Agregamos el objeto al nuevo array
  }
  return newData; // Devolvemos el nuevo array de objetos
}
function objectToArray(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (obj.hasOwnProperty(item)) {
      arr[i] = obj[item];
    } else {
      arr[i] = ""; // Cambia el contenido del array por un string vacío si el item no está presente
    }
  }
  return arr;
}
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase(); 
}
function openGAP() {
  window.open(
    "https://script.google.com/a/macros/grossremolques.com/s/AKfycbxa_LrDjxZOmRUPzFRCi0h-v8zyfA2lqT4Mpe6jtDk/dev",
    "_blank",
    "width=470,height=400"
  );
}
function getColumnByKey(key, array) {
  let newArray = array[0];
  newArray = Object.keys(newArray)
  return newArray.indexOf(key) + 1
}
function becomeMontoToNumber(monto) {
  let montoWithoutSimb = monto.replace(/\$|\.+/g, '');
  let montoNum = montoWithoutSimb.replace(',', '.');
  let result = parseFloat(montoNum);
  return result;
}