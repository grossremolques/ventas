import { MainTitle } from "@components/Titles";
import MyCustumeModal from "@components/MyCustumeModal";
import FormUsedTrailer from "@templates/UsedTrailer";
import { getDataFormValid, isEmptyObjet} from "@utils/Tools";
import { DataUsedTrailers } from "@backend/UsedTrailers";
import DataEmployees from "@backend/Employees";

const template = new FormUsedTrailer();
const AddUsedTrailer = async (content) => {
  const view = `
    ${MainTitle("Agregar Unidad Usada")}
    ${await template.formComponent()}
    <hr>
    ${template.buttonAction({
      type: "button",
      color: "primary",
      id: "saveButton",
      title: "Guardar",
      col: "auto",
    })}
    `;
  content.innerHTML = view;
  template.settings()
  const saveButton = document.querySelector("#saveButton");
  saveButton.addEventListener("click", handleSave);
  template.formattedPrice();
};
const handleSave = async (event) => {
  const form = document.querySelector("#formUsedTrailer");
  const data = getDataFormValid(event, form, ".form-control");
  if (!isEmptyObjet(data)) {
    template.modal.saving()

    const inputs = document.querySelectorAll(".form-check-input");
    const inputsCheck = [];
    inputs.forEach((item) => {
      if (item.checked) {
        inputsCheck.push(item.value);
      }
    });
    data.defectos_superficie = inputsCheck.join(", ");
    try {
        const user = await DataEmployees.getActiveUser();
        data.registrado_por = user.alias
        const response = await DataUsedTrailers.postCustomized(data);
        if(response.result && response.result.status === 200) {
            const id = response.trazabilidad.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")
            template.modal.success(`Se ha registrado la unidad correctamente. <br>Trazabilidad asignada: <strong>${id}</strong>`)
            location.hash = '/used-trailers'
        }
    }
    catch(e) {
        console.log(e)
    }
  }
};
export default AddUsedTrailer;
