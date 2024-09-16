import ApiServices from "./ApiServices";
import { loadInputsById, isEmptyObjet } from "../utils/Tools";
import dayjs from "dayjs";
const SheetId = process.env.SHEETID_CAMION;
class Camion extends ApiServices {
  async createId() {
    const Today = new Date();
    let num= '4'
    let year = Today.getFullYear().toString().substr(2, 2);
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
  async createRegularId() {
    try {
      const response = await this.getDataInJSON();
      const IDs = response.map(item => Number(item.id))
      console.log(IDs.filter(item => typeof item == 'string'))
      const lastId = Math.max(...IDs);
      console.log(lastId)
      return lastId + 1
    } catch (e) {
      console.log(e);
    }
  }
  async postCustomized(data) {
    try {
      data.trazabilidad = await this.createId();
      data.id = await this.createRegularId()
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
  async isClientOnRegister(data) {
    try {
      const response = await this.getDataInJSON();
      const isId = response.some((item) => item.id === data.id);
      const isCUIT = response.some((item) => item.cuit === data.cuit);
      return { id: isId, cuit: isCUIT };
    } catch (e) {
      console.error(e);
    }
  }
  async getCamion(id) {
    try {
      const response = await this.getDataInJSON();
      const camion = response.find((item) => item.trazabilidad === id);
      return camion;
    } catch (e) {
      console.error(e);
    }
  }
}
const DataCamiones = new Camion({
  sheetId: SheetId,
  nameSheet: "Registro",
  rowHead: 1,
});
const Attributes = new Camion({
  sheetId: SheetId,
  nameSheet: "Atributos",
  rowHead: 1,
});
const Dimensiones = new Camion({
  sheetId: SheetId,
  nameSheet: "Dimensiones",
  rowHead: 1,
});
export { DataCamiones, Attributes, Dimensiones };
