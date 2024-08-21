import ApiServices from "./ApiServices";
const SheetId = process.env.SHEETID_STATUS;
class Status extends ApiServices {
  async getStatus() {
    try {
      const response = await this.getDataInJSON();
      const data = response.map(item => {
        let rsp;
        if(item.anulado === 'Sí') {
          rsp = 'Anulada'
        }
        else if (item.presupuesto === 'Sí') {
          rsp = 'Presupuesto'
        }
        else if (item.montaje != '') {
          rsp = 'Finalizado'
        }
        else if (item.pintura != '') {
          rsp = 'Montaje'
        }
        else if (item.ctrl_carrozado != '') {
          rsp = 'Pintura'
        }
        else if (item.carrozado != '') {
          rsp = 'Carrozado-controlado'
        }
        else if (item.pisos != '') {
          rsp = 'Carrozado'
        }
        else if (item.ordenes_fabricacion != '') {
          rsp = 'Preparación de partes'
        }
        else if (item.corte_y_plegado != '') {
          rsp = 'Corte y pegado'
        }
        else if (item.pedido_produccion != '') {
          rsp = 'Controlado'
        }
        else {
          rsp = 'Pendiente'
        }
        item['status'] = rsp
        return item
      })
      return data
    }
    catch(e) {
      console.log(e)
    }
  }
  async getStatusById(id) {
    try {
      const response = await this.getStatus();
      return response.find(item => item.trazabilidad === id)
    }
    catch(e) {
      console.log(e)
    }
  }
}
const DataStatus = new Status({ sheetId: SheetId, nameSheet: "Registro", rowHead: 1 });
export { DataStatus};