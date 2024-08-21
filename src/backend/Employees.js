import ApiServices from "./ApiServices";
const SheetId = process.env.SHEETID_EMPLOYEES;
class Employees extends ApiServices {
  constructor(props) {
    super(props);
  }
  async getEmployees() {
    try {
      const response = await this.getDataInJSON();
      const employees = response.map((item) => {
        item.fullName = `${item.apellido} ${item.nombre}`;
        return item;
      });
      return employees;
    } catch (e) {
      console.log(e);
    }
  }
  async getSellers() {
    try {
      const response = await this.getEmployees();
      const sellers = response.filter(
        (item) => item.puesto === "Asesor Comercial"
      );
      return sellers;
    } catch (e) {
      console.log(e);
    }
  }
  async getActiveUser() {
    try {
      const email = await this.getEmail();
      const response = await this.getEmployees();
      const user = response.find((item) => item.email_empresa === email);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  async getLegajo() {
    try {
      const response = await this.getActiveUser();
      return response.legajo;
    } catch (e) {
      console.log(e);
    }
  }
  async getLegajoByAlias(alias) {
    try {
      const response = await this.getEmployees();
      const employ = response.find(item => item.alias === alias)
      return employ.legajo;
    } catch (e) {
      console.log(e);
    }
  }
}
const DataEmployees = new Employees({
  sheetId: SheetId,
  nameSheet: "Registro",
  rowHead: 1,
});
export default DataEmployees;
