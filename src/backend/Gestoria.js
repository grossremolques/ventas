import ApiServices from "./ApiServices";
import DataClients from "@backend/Clients"
const SheetId = process.env.SHEETID_GESTORIA;
class Gestoria extends ApiServices {
  async getTrailer(id) {
    try {
      const data = await this.getCompleteData()
      return data.find((item) => item.trazabilidad === id);
    } catch (e) {
      console.log(e);
    }
  }
  async getCompleteData() {
    try {
      const data = await this.getDataInJSON();
      const client = await DataClients.getDataInJSON()
      dataJoin(data,client,'id_cliente','id');
      return data
    }
    catch (e) {
      console.log(e);
    }
  }
  async updateCustomized(data) {
    try {
      const today = dayjs(new Date(), "YYYY-DD-MM");
      data.trazabilidad = await this.createId(data.tipo);
      data.fecha = today.format("DD/MM/YYYY");
      try {
        return {
          result: await this.postData(data),
          trazabilidad: data.trazabilidad,
        };
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async hasRegister(id) {
    try {
      const data = await this.getCompleteData()
      return data.some((item) => item.trazabilidad === id);
    } catch (e) {
      console.log(e);
    }
  }
}
const dataJoin = (data1, data2, att1, att2) => {
  data1.map((item) => {
    data2.map(elem => {
      if(item[att1] === elem[att2]) {
        Object.assign(item, elem)
      }
    })
  })
  return data1
}
const DataGestoria = new Gestoria({ sheetId: SheetId, nameSheet: "Gestoría", rowHead: 1 });
export default DataGestoria;
