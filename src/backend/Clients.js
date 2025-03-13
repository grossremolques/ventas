import ApiServices from "./ApiServices";
import { loadInputsById, isEmptyObjet } from "../utils/Tools";
const SheetId = process.env.SHEETID_CLIENT;
class Clients extends ApiServices {
  async sorted() {
    try {
      const response = await this.getDataInJSON();
      const data = response.sort((a, b) => Number(a.id) - Number(b.id));
      return data;
    } catch (e) {
      console.error(e);
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
  async getClient(id) {
    try {
      const response = await this.getDataInJSON();
      const client = response.find((item) => item.id === id);
      return client;
    } catch (e) {
      console.error(e);
    }
  }
  async handleFindClient(idForm = 'formSell') {
    const input = document.querySelector("#id_cliente");
    const formSell = document.querySelector(`#${idForm}`);
    input.addEventListener("change", async () => {
      try {
        const client = await this.getClient(input.value);
        if (!client || isEmptyObjet(client)) {
          window.alert("🚨🚨 Cliente no encontrado 😟");
          const arr = [document.querySelector('#cuit'),document.querySelector('#razon_social')];
          arr.map(item => {
            if(item) {
              item.value = ''
            }
          })
        } else {
          loadInputsById(client, formSell);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}
const DataClients = new Clients({
  sheetId: SheetId,
  nameSheet: "Datos Generales",
  rowHead: 1,
});
export default DataClients;
