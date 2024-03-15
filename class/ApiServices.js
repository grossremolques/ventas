class ApiGoogleSheet {
    constructor({}) {}
    static async getResponse(range, sheetId = spreadsheetId) {
      let response;
      try {
        response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: sheetId,
          range: range,
        });
        return response;
      } catch (e) {
        if(e.status === 401) {
          window.location.reload()
        }
        else {
            UI.modalHide()
            UI.modalShow(
                "¡🚫 Ha ocurrido un problema!",
                `<p>No se ha obtenido la respuesta esperada<br>
                <code> 
                  Mensaje: ${e.result.error.message}<br>  
                  Status: ${e.result.error.status}<br>
                </code>
                Código de error: <strong>${e.status}</strong></p>`
              );
        }
        console.log(e);
      }
    }
    static async postData(range, data, sheetId = spreadsheetId) {
      try {
        let response = await gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: range,
          includeValuesInResponse: true,
          insertDataOption: "INSERT_ROWS",
          responseDateTimeRenderOption: "FORMATTED_STRING",
          responseValueRenderOption: "FORMATTED_VALUE",
          valueInputOption: "USER_ENTERED",
          resource: {
            majorDimension: "ROWS",
            range: "",
            values: data,
          },
        });
        return response;
      } catch (e) {
        console.log(e)
        UI.modalHide()
        UI.modalShow(
          "¡🚫 Ha ocurrido un problema!",
          `<p>No se ha obtenido la respuesta esperada<br>
          <code> 
            Status: ${e.result.error.status}<br>
          </code>
          Código de error: <strong>${e.status}</strong></p>`
        );
          return false
      }
    }
    static async getHeaders(range, sheetId = spreadsheetId) {
      let response = await this.getResponse(range, sheetId);
      response = response.result.values;
      let headers = response[0];
      headers = headers.map(item => item.toLocaleLowerCase())
      return headers
    }
    static async updateData(data,sheetId = spreadsheetId) {
      try {
        let response = await gapi.client.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: sheetId,
          resource: {
            data: data,
            includeValuesInResponse: false,
            responseDateTimeRenderOption: "FORMATTED_STRING",
            responseValueRenderOption: "FORMATTED_VALUE",
            valueInputOption: "USER_ENTERED"
          }
        })
        return response
      } catch (e) {
        console.log(e)
      }
    }
    static createdDataToUpdate(arr, sheet) {
      /* arr = [{row, colum, value}] */
      let data = new Array()
      for (let item of arr) {
        data.push({
          majorDimension: "ROWS",
          range: `${sheet}!R${item.row}C${item.column}`,
          values: [
            [item.value]
          ]
        })
      }
      return data
    }
    static async getEmail() {
      try {
        let response = await gapi.client.gmail.users.getProfile({
          "userId": "me"
        })
        return response.result.emailAddress
      } catch (e) {
        console.log(e)
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
            values: [data]
          }
        })
        return response
      } catch (e) {
        console.log(e)
      }
    }
    
  }
  