import ApiServices from "./ApiServices";
import { today } from "../utils/Tools";
import DataEmployees from "./Employees";
import { DataStatus } from "./Status";
const SheetId = process.env.SHEETID_TRAILERS;
class Trailers extends ApiServices {
  async getModelos() {
    try {
      const data = await this.getDataInJSON();
      let arr = [];
      for (let item of data) {
        let obj = {};
        let isInArr = arr.some((elem) => elem.modelo.value === item.modelo);
        if (!isInArr) {
          obj["modelo"] = { value: item.modelo };
          data.map((item) => {
            if (obj.modelo.value == item.modelo) {
              obj[item.atributo] = {
                value: item.valor,
                tipo_dato: item.tipo_dato,
                adicional: item.texto_adicionales
              };
            }
          });
          arr.push(obj);
        }
      }
      return arr;
    } catch (e) {
      console.log(e);
    }
  }
  async createId(tipo) {
    const Today = new Date();
    let num; //Número inicial de la trazabilidad
    let year = Today.getFullYear().toString().substr(2, 2);
    switch (tipo) {
      case "Acoplado":
        num = "1";
        break;
      case "Carrocería":
        num = "2";
        break;
      case "Semirremolque":
        num = "3";
        break;
    }
    try {
      const response = await this.getDataInJSON();
      let ID;
      let IDs = response.filter(
        (item) =>
          item.trazabilidad &&
          item.trazabilidad.startsWith(num) &&
          item.trazabilidad.endsWith(year)
      );
      IDs = IDs.map((item) => Number(item.trazabilidad.substr(2, 4)));
      if (IDs.length < 1) {
        ID = 1;
      } else {
        ID = Math.max(...IDs) + 1;
      }
      ID = String(ID).padStart(4, "0");
      let trazabilidad = `${num}${ID}${year}`;
      return Number(trazabilidad);
    } catch (e) {
      console.log(e);
    }
  }
  async postCustomized(data) {
    try {
      data.trazabilidad = await this.createId(data.tipo);
      data.fecha = today;
      try {
        const response = {
          result: await this.postData(data),
          trazabilidad: data.trazabilidad,
        };
        const dataStatus = {}
        dataStatus.trazabilidad = data.trazabilidad;
        dataStatus.presupuesto =data.isPresupuesto
        await DataStatus.postData(dataStatus)
        return response
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getTrailer(id) {
    try {
      const response = await this.getDataInJSON();
      return response.find(item => item.trazabilidad === id)
    }
    catch(e) {
      console.log(e)
    }
  }
  async hasPermission() {
    try{
      const response = await this.getDataInJSON()
      const legajo = await DataEmployees.getLegajo();
      return response.some(item => item.legajo === legajo)
    }
    catch(e) {
      console.log(e)
  }
  }
}
const Attributes = new Trailers({
  sheetId: SheetId,
  nameSheet: "Otros Atributos",
  rowHead: 1,
});
const Modelos = new Trailers({
  sheetId: SheetId,
  nameSheet: "Modelos",
  rowHead: 1,
});
const Permissions = new Trailers({
  sheetId: SheetId,
  nameSheet: "Permisos",
  rowHead: 1,
});
const DataTrailers = new Trailers({ sheetId: SheetId, nameSheet: "Unidades", rowHead: 1 });
export { DataTrailers, Attributes, Modelos, Permissions };
