import { getColumnByKey, convertGroupDates } from "../utils/Tools";
import dayjs from "dayjs";
class ApiServices {
  constructor(props) {
    this.nameSheet = props.nameSheet;
    this.sheetId = props.sheetId;
    this.range = `${props.nameSheet}!A1:ZZZ`;
    this.rowHead = props.rowHead;
    this.today = dayjs(new Date(), "YYYY-DD-MM").format("YYYY-MM-DD");
  }
  async getResponse() {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: this.range,
      });
      return response;
    } catch (e) {
      console.log(e)
      //401 Request had invalid authentication credentials.
      console.error("Error in getResponse:", `🚫${e.status} ${e.result.error.message}`);
    }
  }
  async getDataInJSON() {
    try {
      const response = await this.getResponse();
      const data = response.result.values;
      const headers = data[0]; // Obtenemos los encabezados del array
      const newData = []; // Creamos un nuevo array para almacenar los objetos transformados
      for (var i = 1; i < data.length; i++) {
        // Iteramos desde 1 para evitar el primer elemento que son los encabezados
        const obj = {};
        // Iteramos a través de cada elemento del array actual
        for (var j = 0; j < headers.length; j++) {
          // Usamos los encabezados como claves y asignamos los valores correspondientes
          obj[headers[j].toLowerCase()] = data[i][j];
        }
        newData.push(obj); // Agregamos el objeto al nuevo array
      }
      return newData; // Devolvemos el nuevo array de objetos
    } catch (e) {
      console.error("getDataInJSON:", `🚫${e}`);
    }
  }
  async postData(data) {
    //const today = dayjs(new Date(), "YYYY-DD-MM").format("DD/MM/YYYY");
    //console.log(today)
    data.fecha = this.today;
    if (data.fecha === "Invalid Date") {
      window.alert(
        "¡Hubo un problema al registrar la fecha! ❌ Error: Invalid Date 🗓️"
      );
    }
    convertGroupDates(data,'en-es')
    const headers = await this.getHeaders();
    const newData = this.convertData(data, headers);
    try {
      let response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: this.sheetId,
        range: this.range,
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [newData],
        },
      });
      return response;
    } catch (e) {
      console.log("Problems with postData", e);
    }
  }
  async getHeaders() {
    try {
      const response = await this.getResponse();
      const data = response.result.values;
      const headers = data[0];
      return headers.map((item) => item.toLocaleLowerCase());
    } catch (e) {
      console.error("Problems with getHeaders", e);
    }
  }
  convertData(data, headers) {
    for (let i = 0; i < headers.length; i++) {
      const item = headers[i];
      if (data.hasOwnProperty(item)) {
        headers[i] = data[item];
      } else {
        headers[i] = ""; // Cambia el contenido del array por un string vacío si el item no está presente
      }
    }
    return headers;
  }
  async updateData(props) {
    convertGroupDates(props.data,'en-es')
    let dataUpdate = [];
    try {
      const data = await this.getDataInJSON();
      const index = data.findIndex((item) => item[props.colName] === props.id);
      if (index >= 0) {
        const row = index + this.rowHead + 1;
        for (let item in props.values) {
          dataUpdate.push({
            row: row,
            column: getColumnByKey(item, data),
            value: props.values[item],
          });
        }
        const dataPost = new Array();
        for (let item of dataUpdate) {
          if(item.column>0){
            dataPost.push({
              majorDimension: "ROWS",
              range: `${this.nameSheet}!R${item.row}C${item.column}`,
              values: [[item.value]],
            });
          }
        }
        try {
          const response =
            await gapi.client.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.sheetId,
              resource: {
                data: dataPost,
                includeValuesInResponse: false,
                responseDateTimeRenderOption: "FORMATTED_STRING",
                responseValueRenderOption: "FORMATTED_VALUE",
                valueInputOption: "USER_ENTERED",
              },
            });
          return response;
        } catch (e) {
          console.log(e);
        }
      } else {
        console.error("No se encontró la fila");
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getEmail() {
    try {
      let response = await gapi.client.gmail.users.getProfile({
        userId: "me",
      });
      return response.result.emailAddress;
    } catch (e) {
      console.log(e);
    }
  }
  static async updateRow(sheetId, myRange, data) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: myRange,
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "RAW",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [data],
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ApiServices;
