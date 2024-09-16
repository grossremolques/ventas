import { MainTitle } from "@components/Titles";
import FormClient from "@templates/Client";
import IconTitleAddClient from "@images/edit-client.png";
import {
  getHash,
  loadInputsById,
  listenerChangeEvent,
  getDataFormValid,
  isEmptyObjet,
  listUpdate,
} from "@utils/Tools";
import DataClients from "@backend/Clients";
import { DataCamiones, Dimensiones } from "@backend/Camion";
import FormCamion from "@templates/Camion";
import { buttonComponent } from "@components/Form";
let isNewRegister;
const template = new FormCamion();
let ID;
let form;
const Camion = async (content) => {
  ID = getHash().replace("camion=", "");
  const camion = await Dimensiones.getCamion(ID);
  const IDs = Dimensiones.createRegularId()
  isNewRegister = !camion ? true : false;
  console.log(isNewRegister);
  try {
    const view = `
      ${MainTitle("Especificaciones de la unidad a carrozar/modificar chasis")}
      ${await template.formComponent()}
      <div class="row g-1 my-3">
        ${buttonComponent({
          type: "button",
          color: "success",
          id: "saveDimensiones",
          title: "Guardar",
          col: "auto",
          xlCol: "auto",
          mdCol: "auto",
        })}
      </div>
      `;
    content.innerHTML = view;
    template.setting();
    form = document.querySelector("#formDimensiones");
    loadInputsById(camion, form, false);
    const saveDimensiones = document.querySelector("#saveDimensiones");
    saveDimensiones.addEventListener("click", handleSave);
    listenerChangeEvent(form);
  } catch (e) {
    console.log(e);
  }
};
const handleSave = async (event) => {
  const data = getDataFormValid(event, form, ".change-save");
  console.log(data);
  if (isNewRegister) {
    if (!isEmptyObjet(data)) {
      template.modal.saving();
      try {
        data['trazabilidad'] = Number(ID.replace(".","").replace('-',""))
        const response = await Dimensiones.postCustomized(data);
        if (response&& response.result.status === 200) {
          location.hash = "/camiones";
          template.modal.success(`
                Se han agregado las dimensiones del camión <strong>${ID}</strong>
                `);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    if (!isEmptyObjet(data)) {
      template.modal.saving();
      try {
        const response = await Dimensiones.updateData({
          colName: "trazabilidad",
          id: ID,
          values: data,
        });
        if (response && response.status === 200) {
          location.hash = "/camiones";
          template.modal.success(`
                Se han agregado las dimensiones del camión <strong>${ID}</strong>
                `);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
export default Camion;
