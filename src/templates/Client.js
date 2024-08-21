import {
  inputComponent,
  selectComponent,
  dataListComponent,
  buttonComponent,
  options
} from "@components/Form";
import GeoRefAPI from "@backend/GeoRefAPI";
import MyCustumeModal from "@components/MyCustumeModal";
const data = [{ boolean: "Sí" }, { boolean: "No" }, { boolean: "N/A" }];
class FormClient {
  constructor() {
    this.modal = new MyCustumeModal(document.querySelector("#modal"));
  }
  async formComponent(props) {
    const Provincias = await GeoRefAPI.getProvincias();
    const view = `
    <form class="row needs-validation g-1 mt-3" novalidate id="formClient">
        ${inputComponent({
          col: "12",
          mdCol: "2",
          xlCol: "2",
          type: "number",
          sizes: "sm",
          id: "id",
          name: "id",
          required: true,
          nameLabel: "Código",
          readonly: props.readonly

        })}
        ${inputComponent({
          col: "12",
          mdCol: "8",
          xlCol: "8",
          type: "text",
          sizes: "sm",
          id: "razon_social",
          name: "razon_social",
          required: true,
          nameLabel: "Nombre/Razón Social",
        })}
        ${inputComponent({
          col: "12",
          mdCol: "2",
          xlCol: "2",
          type: "text",
          sizes: "sm",
          id: "cuit",
          name: "cuit",
          required: true,
          nameLabel: "CUIT",
          maxlength: 13,
        })}
        ${selectComponent({
          col: "12",
          mdCol: "2",
          xlCol: "2",
          sizes: "sm",
          id: "retencion",
          name: "retencion",
          required: true,
          nameLabel: "Retención",
          data: data,
          textNode: "boolean",
        })}
        ${inputComponent({
          col: "12",
          mdCol: "2",
          xlCol: "2",
          type: "number",
          sizes: "sm",
          id: "cod_postal",
          name: "cod_postal",
          required: true,
          nameLabel: "Cód. postal",
        })}
        ${selectComponent({
          col: "12",
          mdCol: "5",
          xlCol: "5",
          sizes: "sm",
          id: "provincia",
          name: "provincia",
          required: true,
          nameLabel: "Provincia",
          data: Provincias,
          textNode: "nombre",
        })}
        ${dataListComponent({
          col: "12",
          mdCol: "3",
          xlCol: "3",
          sizes: "sm",
          id: "partido",
          name: "partido",
          list: "listPartido",
          required: true,
          nameLabel: "Partido/Departamento",
          autocomplete: true,
        })}
        ${dataListComponent({
          col: "12",
          mdCol: "4",
          xlCol: "4",
          sizes: "sm",
          id: "localidad",
          name: "localidad",
          list: "listLocalidad",
          required: true,
          nameLabel: "Localidad",
          autocomplete: true,
        })}
        ${inputComponent({
          col: "12",
          mdCol: "6",
          xlCol: "6",
          type: "text",
          sizes: "sm",
          id: "calle",
          name: "calle",
          required: true,
          nameLabel: "Calle",
        })}
        ${inputComponent({
          col: "12",
          mdCol: "2",
          xlCol: "2",
          type: "text",
          sizes: "sm",
          id: "num",
          name: "num",
          required: true,
          nameLabel: "Número",
        })}
        ${inputComponent({
          col: "12",
          mdCol: "6",
          xlCol: "6",
          type: "tel",
          sizes: "sm",
          id: "tel",
          name: "tel",
          required: true,
          nameLabel: "Telefono",
          maxlength: 12,
        })}
        ${inputComponent({
          col: "12",
          mdCol: "6",
          xlCol: "6",
          type: "email",
          sizes: "sm",
          id: "email",
          name: "email",
          required: true,
          nameLabel: "Email",
        })}
    </form>
    `;
    return view;
  }
  buttonAction(props) {
    const view = `
    <div class="row g-1 justify-content-end mt-3">
            ${buttonComponent(props)}
        </div>
    `
    return view
  }
  initializer() {
    const inputCuit = document.querySelector("#cuit");
    const inputTel = document.querySelector("#tel");
    const inputProvincia = document.querySelector("#provincia");
    const inputPartido = document.querySelector("#partido");
    inputCuit.addEventListener("input", this.formattedCuit);
    inputTel.addEventListener("input", this.formattedTel);
    inputProvincia.addEventListener("input", this.getDepartamentos);
    inputPartido.addEventListener("input", this.getLocalidades);
  }
  formattedCuit(event) {
    const input = event.target;
    const cuit = input.value.replace(/-/g, ""); // Elimina guiones existentes
    const format = cuit.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3"); // Formatea el CUIT
    input.value = format;
  }
  formattedTel(event) {
    let format;
    const input = event.target;
    const tel = input.value.replace(/-/g, ""); // Elimina guiones existentes
    if (input.value.startsWith("11")) {
      format = tel.replace(/(\d{2})(\d{4})(\d{3})/, "$1-$2-$3"); // Formatea el TELEFONO
    } else {
      format = tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Formatea el TELEFONO
    }
    input.value = format;
  }
  async getDepartamentos(event) {
    const provincia = event.target.value;
    const Partidos = await GeoRefAPI.getDepartamentoByProvincia(provincia);
    const optionsPartido = options({ data: Partidos, textNode: "nombre" });
    const listPartido = document.querySelector("#listPartido");
    listPartido.innerHTML = optionsPartido;
  }
  async getLocalidades(event) {
    const provincia = document.getElementById("provincia").value;
    const partido = event.target.value;
    const Localidades = await GeoRefAPI.getLocalidadByProvincia(
      provincia,
      partido
    );
    const optionsLocalidades = options({
      data: Localidades,
      textNode: "nombre",
    });
    const listLocalidad = document.querySelector("#listLocalidad");
    listLocalidad.innerHTML = optionsLocalidades;
  }
  goToHome() {
    window.location.hash = '/clients'
  }
}
export default FormClient;
