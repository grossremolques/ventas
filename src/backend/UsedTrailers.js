import ApiServices from "./ApiServices";
import dayjs from "dayjs";
import { normalizeString } from "../utils/Tools";
const SheetId = process.env.SHEETID_USED_TRAILERS;
class UsedTrailers extends ApiServices {
  async createId(tipo) {
    const Today = new Date();
    let num; //Número inicial de la trazabilidad
    let year = Today.getFullYear().toString().substr(2, 2);
    switch (tipo) {
      case "Acoplado":
        num = "5";
        break;
      case "Semirremolque":
        num = "7";
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
      const today = dayjs(new Date(), "YYYY-DD-MM");
      data.trazabilidad = await this.createId(data.tipo);
      data.fecha = today.format("DD/MM/YYYY");
      data.ubicacion = "A ingresar";
      data.patentes = 2;
      data.chapa_ident = 1;
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
  async getUsedTrailer(id) {
    try {
      const response = await this.getDataInJSON();
      return response.find((item) => item.trazabilidad === id);
    } catch (e) {
      console.log(e);
    }
  }
  async getUsedTrailerByDominio(dominio) {
    try {
      const response = await this.getDataInJSON();
      return response.find((item) => normalizeString(item.dominio) === normalizeString(dominio));
    } catch (e) {
      console.log(e);
    }
  }
  async getUsedTrailerBySell(id) {
    try {
      const response = await this.getDataInJSON();
      return response.find((item) => item.tomado_en_venta === id);
    } catch (e) {
      console.log(e);
    }
  }
  async getAvailableTrailers() {
    try {
      let data = await this.getDataInJSON();
      data = data.filter(item => item.trazabilidad!='')
      const available = data.filter(item => item.tomado_en_venta==='');
      return available.map(item => {
        item['nombre'] = `${item.trazabilidad} ${item.modelo}`;
        return item
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  async getAllTrailers() {
    try {
      let data = await this.getDataInJSON();
      data = data.filter(item => item.trazabilidad!='')
      return data.map(item => {
        item['nombre'] = `${item.trazabilidad} ${item.modelo}`;
        return item
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}
const DataUsedTrailers = new UsedTrailers({
  sheetId: SheetId,
  nameSheet: "Registro",
  rowHead: 1,
});
const UsedAttributes = new UsedTrailers({
  sheetId: SheetId,
  nameSheet: "Atributos",
  rowHead: 1,
});
export { DataUsedTrailers, UsedAttributes };
