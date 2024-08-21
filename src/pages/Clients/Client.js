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

let template = new FormClient();
let ID;
let form;
const Client = async (content) => {
  ID = getHash().replace("client=", "");
  const client = await DataClients.getClient(ID);
  try {
    const view = `
      ${MainTitle("Actualizar Cliente", IconTitleAddClient)}
      ${await template.formComponent({ readonly: true })}
      ${template.buttonAction({
        col: "auto",
        type: "button",
        color: "success",
        id: "updateButton",
        title: "Actualizar",
      })}
      `;
    content.innerHTML = view;
    template.initializer();
    form = document.querySelector("#formClient");
    loadInputsById(client, form, false);
    listenerChangeEvent(form);
    const updateButton = document.querySelector("#updateButton");
    updateButton.addEventListener("click", handleUpdate);
    return true;
  } catch (e) {
    console.log(e);
  }
};
const handleUpdate = (event) => {
  const data = getDataFormValid(event, form, ".change-save");
  const isData = !isEmptyObjet(data);
  if (isData) {
    template.modal.create({
      title: "🔄 Actualizar datos",
      content: `
        <p>¿Desea actualizar lo/s siguientes datos:?</p>
        ${listUpdate(data)}
        `,
    });
    template.modal.addButtonAction({
      type: "button",
      color: "primary",
      id: "update",
      title: "Si, actualizar",
    });
    const buttonAction = document.querySelector("#update");
    buttonAction.addEventListener("click", () => {
      handleSave(data);
    });
  }
};
const handleSave = async (data) => {
  template.modal.create({
    title: "🔄 Actualizar datos",
    content: `
      <p class="text-center">Actualizando los datos, por favor espere ⌛</p>
    `,
  });
  template.modal.disableCloseButtons();
  try {
    const response = await DataClients.updateData({
      colName: "id",
      id: ID,
      values: data,
    });
    if (response && response.status === 200) {
      template.modal.create({
        title: "✔️ Completado",
        content: '<p class="text-center">Cliente actualizado correctamente</p>',
      });
      location.hash = `/clients/`;
    }
  } catch (e) {
    console.log(e);
    template.modal.error(e);
  }
};
export default Client;
