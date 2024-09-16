import { MainTitle } from "@components/Titles";
import FormCamion from "@templates/Camion";
import {buttonComponent} from "@components/Form";
import { getDataFormValid, isEmptyObjet} from "@utils/Tools";
import DataEmployees from "@backend/Employees";
import { DataCamiones } from "@backend/Camion";
const template = new FormCamion()
const AddCamion = async (content) => {
    const view = `
      ${MainTitle("Agregar Camión")}
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
      </div>
      `;
    content.innerHTML = view;
    template.setting()
    /*
    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click", handleSave); */
  };
  const handleSave = async (event) => {
    const form = document.querySelector("#formCamion");
    const data = getDataFormValid(event, form, ".form-control");
    if (!isEmptyObjet(data)){
        template.modal.saving()
        try {
            const user = await DataEmployees.getActiveUser();
            data.registrado_por = user.alias
            const response = await DataCamiones.postCustomized(data);
            if(response.result && response.result.status === 200) {
                const id = response.trazabilidad.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")
                template.modal.success(`Se ha registrado el camión correctamente. <br>Trazabilidad asignada: <strong>${id}</strong>`)
                location.hash = '/camiones'
            }
        }
        catch(e) {
            console.log(e)
        }
    }
  }
  export default AddCamion