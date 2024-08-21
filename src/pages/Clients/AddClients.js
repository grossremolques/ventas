import { MainTitle } from "@components/Titles";
import IconTitleAddClient from "@images/add-client.png";
import { getDataFormValid } from "@utils/Tools";
import DataClients from "@backend/Clients";
import FormClient from "@templates/Client";

const template = new FormClient()

const AddClient = async (content) => {
  try {
    const view = `
    ${MainTitle("Nuevo cliente", IconTitleAddClient)}
    ${await template.formComponent({readonly: false})}
    ${template.buttonAction({
      col: "auto",
      type: "button",
      color: "primary",
      id: "saveButton",
      title: "Guardar",
    })}
    `;
    content.innerHTML = view;
    template.initializer()
    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click", handleSave);
    return true;
  } catch (e) {
    console.log(e);
  }
};
const handleSave = async (event) => {
  const form = document.querySelector("#formClient");
  const data = getDataFormValid(event, form, ".form-control");
  const isEmpty = Object.keys(data).length === 0;
  if (!isEmpty) {
    const validaded = await DataClients.isClientOnRegister(data);
    if (!validaded.id && !validaded.cuit) {
      template.modal.saving()
      try {
        const response = await DataClients.postData(data);
        if(response && response.status === 200) {
          template.modal.create({
            title: '✔️ Completado',
            content: '<p class="text-center">Se ha creado un nuevo cliente 🤝</p>',
          })
          template.goToHome()
        }
      } catch (e) {
        console.error(e);
        template.modal.error(e)
      }
    } else {
      let message;
      if(validaded.id && validaded.cuit) {
        message = 'ID (Código de cliente) y CUIT'
      }
      else if (validaded.id) {
        message = 'ID (Código de cliente)'
      }
      else if (validaded.cuit) {
        message = 'CUIT'
      }
      console.log(modal)
      template.modal.create({
        title: '🚫 Operación denegada',
        content: `<p class="text-center">El <strong>${message}</strong> ya se encuentra ingresado</p>`
      })
    }
  }
};
export default AddClient;