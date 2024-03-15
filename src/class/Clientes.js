const SS_Clientes = "1LHd6mMHsi7edcKQPq1d3I5likZrH5ExDg7hihz9XcXQ";
const SheetClientes = "Registro!A1:ZZZ";
class Cliente {
  constructor({
    id,
    razon_social,
    cuit,
    retencion,
    provincia,
    partido,
    localidad,
    calle,
    num,
    tel,
    email,
  }) {
    this.id = id;
    this.razon_social = razon_social;
    this.cuit = cuit;
    this.retencion = retencion;
    this.provincia = provincia;
    this.partido = partido;
    this.localidad = localidad;
    this.calle = calle;
    this.num = num;
    this.tel = tel;
    this.email = email;
  }
  static async getClientes() {
    try {
      let response = await ApiGoogleSheet.getResponse(
        SheetClientes,
        SS_Clientes
      );
      response = response.result.values;
      let clientes = arrayToObject(response);
      return clientes;
    } catch (e) {
      console.log(e);
    }
  }
  static async getClienteByCodigo(cod) {
    let response = false;
    try {
      let clientes = await this.getClientes();
      if (clientes.some((item) => item.id == cod)) {
        response = clientes.find((item) => item.id == cod);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  static async isCodAvailable(cod) {
    let response = false;
    try {
      let clientes = await this.getClientes();
      response = !clientes.some((item) => item.id == cod);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  static async saveCliente(Data) {
    console.log();
    try {
      let isCodAvailable = await this.isCodAvailable(Data.id);
      if (!isCodAvailable) {
        let clientes = await this.getClientes();
        let row = clientes.findIndex(item => item.id==Data.id) + 2
        let range = `Registro!A${row}:ZZZ`;
        await this.updateCliente(Data, range)
        //Actualizar
      } else {
        await this.createCliente(Data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async createDataCliente(Data) {
    let newCliente = new Cliente(Data);
    try {
      let headers = await ApiGoogleSheet.getHeaders(SheetClientes, SS_Clientes);
      newCliente = objectToArray(newCliente, headers);
      return newCliente
    } catch (e) {
      console.log(e);
    }
  }
  static async createCliente(Data) {
    try {
      let newCliente = await this.createDataCliente(Data)
      await ApiGoogleSheet.postData(SheetClientes, [newCliente], SS_Clientes);
    } catch (e) {
      console.log(e);
    }
  }
  static async updateCliente(Data, range) {
    try {
        let DataCliente = await this.createDataCliente(Data);
        await ApiGoogleSheet.updateRow(SS_Clientes,range,DataCliente)
    } catch (e) {
      console.log(e);
    }
  }
}
