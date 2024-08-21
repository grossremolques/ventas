import { MainTitle } from "@components/Titles";
import FormTrailer from "@templates/Trailer";
import { getDataFormValid, isEmptyObjet, getDataForm } from "@utils/Tools";
import { DataUsedTrailers } from "@backend/UsedTrailers";
import DataEmployees from "@backend/Employees";
import { DataTrailers } from "@backend/Trailers";
import DataGestoria from "@backend/Gestoria";
import {buttonComponent} from "@components/Form";
const template = new FormTrailer();
let ID;
let IDString;
let isPresupuesto;
//Abrir formulario (inicial)
const AddTrailer = async (content) => {
  const view = `
    ${MainTitle("Agregar Unidad 0 KM")}
    ${await template.formComponent()}
    <hr>
    <div class="row g-1 my-3">
      ${buttonComponent({
        type: "button",
        color: "success",
        id: "saveButton",
        title: "Guardar",
        col: "auto",
        xlCol:'auto',
        mdCol:'auto'
      })}
      <div class="col-auto ms-auto">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="isPresupuesto">
          <label class="form-check-label" for="isPresupuesto">
            Presupuesto
          </label>
        </div>
      </div>
    </div>
    `;
  
  content.innerHTML = view;
  //Agrega evento cuando se selecciona el modelo, y carga lo predifinido
  template.loadDefaultData();
  const saveButton = document.querySelector("#saveButton");
  saveButton.addEventListener("click", handleSave);
  template.formattedPrice();
  template.settings();
};
const handleSave = async (event) => {
  isPresupuesto = document.getElementById('isPresupuesto').checked
  const form = document.querySelector("#formTrailer");
  const data = isPresupuesto ? getDataForm(form, ".form-control") : getDataFormValid(event, form, ".form-control") 
  if (!isEmptyObjet(data) || isPresupuesto ) {
    data['isPresupuesto'] = isPresupuesto ? 'Sí' : 'No'
    await post(data)
  }
};
const post= async (data) => {
  template.modal.saving();
    data["para_stock"] = "No";
    try {
      const user = await DataEmployees.getActiveUser();
      data.registrado_por = user.alias;

      const response = await DataTrailers.postCustomized(data);
      if (response && response.result.status === 200) {
        ID = response.trazabilidad;
        IDString = ID.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3");
        template.modal.create({
          title: "✅ Guardado",
          content: `
          <p>Los datos han sido guardados bajo la trazabilidad N° <strong>${IDString}</strong></p>
          <p>Continúe ingresando los <em class="text-primary">datos de venta</em> en <span class="btn btn-primary btn-sm">Gestoria</span> para generar el boleto o, si lo prefiere, puede hacerlo más tarde. Recuerde la importancia de la trazabilidad para ubicar la unidad posteriormente.</p>`,
        });
        template.modal.addButtonAction({
          title: "Gestoria",
          type: "button",
          color: "primary",
          id: "sellButton",
        });
        const closeButton = document.querySelector(".close-btn");
        closeButton.addEventListener("click", template.goToTrailers);
        document
          .querySelector("#sellButton")
          .addEventListener("click", () => {
            template.openGestoria(saveGestoria)
          });;
      }
    } catch (e) {
      console.log(e);
    }
}
const saveGestoria = async (event) => {
  isPresupuesto = document.getElementById('isPresupuesto').checked
  const form = document.querySelector("#formSell");
  const data = getDataFormValid(event, form, ".form-control");
  if (!isEmptyObjet(data)) {
    template.modal.saving();
    try {
      const user = await DataEmployees.getActiveUser();
      data.vendedor = user.alias;
      data.trazabilidad = ID;

      const response = await DataGestoria.postData(data);
      if (response && response.status === 200) {
        if (data.tomada_en_venta) {
          const response = await DataUsedTrailers.updateData({
            colName: "trazabilidad",
            id: data.tomada_en_venta,
            values: { tomado_en_venta: ID },
          });
        }
      }
      template.modalWithBTNBoleto(IDString, isPresupuesto)
    } catch (e) {
      console.log(e);
    }
  }
};

export default AddTrailer;
