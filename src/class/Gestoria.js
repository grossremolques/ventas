const SS_Gestoria = '1EncYGjCUdv6aGuVNtrMa7bxAqojhdbWz0DenU1ph_nU';
const SheetGestoria = 'Gestoría!A1:ZZZ'
class Gestoria {
  constructor({
    trazabilidad,
    codigo,
    f_disp_estimada,
    monto,
    monto_letras,
    forma_pago,
    vendedor,
    comentarios,
  }) {
    this.trazabilidad = trazabilidad;
    this.codigo = codigo;
    this.f_disp_estimada = FormatsDate.latinFormat(f_disp_estimada)
    this.monto = monto;
    this.monto_letras = monto_letras;
    this.forma_pago = forma_pago;
    this.vendedor = vendedor; 
    this.comentarios = comentarios;
  }
  static createDataToGestoria(Trazabilidad,DataCliente,DataPago) {
    const Data = DataPago;
    Data.codigo = DataCliente.id;
    Data.trazabilidad = Trazabilidad;
    return new Gestoria(Data)
  }
  static async postGestoria(Trazabilidad,DataCliente,DataPago) {
    try {
      let Data = this.createDataToGestoria(Trazabilidad,DataCliente,DataPago);
      let headers = await ApiGoogleSheet.getHeaders(SheetGestoria,SS_Gestoria);
      let newGestoria = objectToArray(Data, headers);
      let response =await ApiGoogleSheet.postData(SheetGestoria,[newGestoria],SS_Gestoria);
      return response.status;
    } catch (e) {
      console.log(e)
    }
  }
  static async getGestoria() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetGestoria,SS_Gestoria);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getGestoriaById(id) {
    let unidad;
    try {
      let unidades = await this.getGestoria();
      if (unidades.some((item) => item.trazabilidad === id)) {
        unidad = unidades.find((item) => item.trazabilidad === id);
      }
      return unidad;
    } catch (e) {
      console.log(e);
    }
  }
  static async update(id, values) {
    let dataToUpdate = [];
    try {
      let unidades = await this.getGestoria();
      let row = unidades.findIndex((item) => item.trazabilidad === id) + 2;
      for (let item in values) {
        dataToUpdate.push({
          row: row,
          column: getColumnByKey(item, unidades),
          value: values[item],
        });
      }
      dataToUpdate = dataToUpdate.filter((item) => item.column != 0);
      let data = ApiGoogleSheet.createdDataToUpdate(dataToUpdate, "Gestoría");
      let response = await ApiGoogleSheet.updateData(data,SS_Gestoria);
      return response.status;
    } catch (e) {
      console.log(e);
    }
  }

}
