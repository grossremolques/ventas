import { MainTitle } from "@components/Titles";
import FormUsedTrailer from "@templates/UsedTrailer";
import { DataUsedTrailers } from "@backend/UsedTrailers";
import {
  getHash,
  loadInputsById,
  listenerChangeEvent,
  getDataFormValid,
  isEmptyObjet,
  loadCheckedInputs,
  listenerChangeEventCheck,
  isValidForm,
  listUpdate
} from "@utils/Tools";
import { buttonComponent } from "@components/Form";
import DataClients from "@backend/Clients";
import dayjs from "dayjs";
import DataGestoria from "@backend/Gestoria";

let trailer;
let template = new FormUsedTrailer();
let ID;
let form;
let client;
let formSell;
let formControl;

const UsedTrailer = async (content) => {
  ID = getHash().replace("used-trailer=", "");
  try {
    trailer = await DataUsedTrailers.getUsedTrailer(ID);
    const view = `
      ${MainTitle("Actualizar Unidad Usada")}
      ${await template.formComponent()}
      ${await template.control()}
      <hr>
      <div class="row g-1 my-3">
        ${buttonComponent({
          type: "button",
          color: "outline-success",
          id: "updateButton",
          title: "Actualizar",
          col: "auto",
          xlCol: "auto",
          mdCol: "auto",
        })}
        ${buttonComponent({
          type: "button",
          color: "outline-primary",
          id: "sellButton",
          title: "Vender",
          col: "auto",
          xlCol: "auto",
          mdCol: "auto",
        })}
        ${buttonComponent({
          type: "button",
          color: "outline-danger",
          id: "informeButton",
          title: "Informe de toma",
          col: "auto",
          xlCol: "auto",
          mdCol: "auto",
          className: "",
        })}
        ${buttonComponent({
          type: "button",
          color: "dark",
          id: "controlButton",
          title: "Control",
          col: "auto",
          xlCol: "auto",
          mdCol: "auto",
          className: "ms-auto",
        })}
      </div>`;
    content.innerHTML = view;
    form = document.querySelector("#formUsedTrailer");
    formControl = document.querySelector("#formControl");
    template.settings()
    let details = trailer.defectos_superficie;
    loadCheckedInputs(details);
    
    loadInputsById(trailer, form);
    deletedDefaultFild(form)
    loadInputsById(trailer, formControl);
    listenerChangeEvent(form);
    listenerChangeEventCheck(formControl);
    listenerChangeEvent(formControl);
    const sellButton = document.querySelector("#sellButton");
    const updateButton = document.querySelector("#updateButton");
    const controlButton = document.querySelector("#controlButton");
    const informeButton = document.querySelector("#informeButton");
    updateButton.addEventListener("click", handleUpdate);
    sellButton.addEventListener("click", handleSell);
    controlButton.addEventListener("click", handleControl);
    informeButton.addEventListener('click', handleInforme)
    template.formattedPrice();
  } catch (e) {
    console.log(e);
  }
};
const deletedDefaultFild = (form) => {
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(item => {
    if(item.value=== 'A definir') {
      item.value= ""
    }
    })
}
//Actualizar
const handleUpdate = (event) => {
  const data = getDataFormValid(event, form, ".change-save");
  const dataControl = getDataFormValid(event, formControl, ".change-save");
  const dataCheck = getDataFormValid(event, formControl, ".change-save-check");
  Object.assign(data, dataControl);
  const isData = !isEmptyObjet(data);
  const isDataCheck = !isEmptyObjet(dataCheck);
  if (isData || isDataCheck) {
    if (isDataCheck) {
      const allDataCheck = getDataFormValid(
        event,
        formControl,
        ".form-check-input:checked"
      );
      const newAllDataCheck = Object.values(allDataCheck).join(", ");
      data["defectos_superficie"] = newAllDataCheck;
    }
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
      handleSaveUpdate(data, event);
    });
  }
};
const handleSaveUpdate = async (data, event) => {
  template.modal.create({
    title: "🔄 Actualizar datos",
    content: `
          <p class="text-center">Actualizando los datos, por favor espere ⌛</p>
          `,
  });
  template.modal.disableCloseButtons();
  try {
    const response = await DataUsedTrailers.updateData({
      colName: "trazabilidad",
      id: ID,
      values: data,
    });
    if (response && response.status === 200) {
      template.modal.create({
        title: "✔️ Completado",
        content: '<p class="text-center">Actualizado correctamente</p>',
      });
      const inputsChanges = document.querySelectorAll(".change-save");
      inputsChanges.forEach((input) => input.classList.remove("change-save"));
    }
  } catch (e) {
    console.log(e);
  }
};
//Vender
const handleSell = async () => {
  const dataUpdate = document.querySelectorAll(
    ".change-save, .change-save-check"
  );
  if (dataUpdate.length > 0) {
    template.modal.create({
      title: "⚠️ Advertencia",
      content:
        "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder con la venta.</p>",
    });
  } else {
    trailer = await DataUsedTrailers.getUsedTrailer(ID);
    template.modal.create({
      title: "💲 Datos de venta",
      content: await template.formSell(trailer),
    });
    document.querySelector("#obs_boleto").value =
      template.observaciones(trailer);
    template.modal.addButtonAction({
      type: "button",
      color: "success",
      id: "saveSell",
      title: "Guardar",
    });
    if (trailer.id_cliente != "") {
      try {
        client = await DataClients.getClient(trailer.id_cliente);
        //agregar la información del cliente en trailer
        Object.assign(trailer, client);
      } catch (e) {
        console.log(e);
      }
    }
    formSell = document.querySelector("#formSell");
    loadInputsById(trailer, formSell);
    template.formattedPrice();
    listenerChangeEvent(formSell);
    await DataClients.handleFindClient()
    //const idClient = document.querySelector("#id_cliente");
    const saveSell = document.querySelector("#saveSell");
    saveSell.addEventListener("click", handleSaveSell);
    //idClient.addEventListener("change", getClient);
  }
};
const handleSaveSell = async (event) => {
  const data = getDataFormValid(event, formSell, ".form-control");
  if (!isEmptyObjet(data)) {
    try {
      data.id = data.id_cliente;
      const validateClient = await DataClients.isClientOnRegister(data);
      if (validateClient.id) {
        template.modal.saving();
        try {
          const today = dayjs(new Date(), "YYYY-DD-MM");
          data.fecha_venta = today.format("DD/MM/YYYY");
          const response = await DataUsedTrailers.updateData({
            colName: "trazabilidad",
            id: ID,
            values: data,
          });
          if (response && response.status === 200) {
            const dataPost = await DataUsedTrailers.getUsedTrailer(ID);
            const client = await DataClients.getClient(data.id_cliente);

            dataPost["obs_boleto"] = data.obs_boleto;
            Object.assign(dataPost, client);
            const dataCod = encodeURIComponent(JSON.stringify(dataPost));
            template.modal.success(`
              Se ha completado el registro<br>
              <a class="btn btn-outline-danger" href="#/print_?data=${dataCod}" role="button" target_blank>Boleto Compra-Venta</a>
              `);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};
const handleControl = async (event) => {
  const validForm = isValidForm(event, form);
  if (validForm) {
    const hasAnyChange = document.querySelectorAll(".change-save");
    if (hasAnyChange.length > 0) {
      template.modal.create({
        title: "⚠️ Advertencia",
        content:
          "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder.</p>",
      });
    } else {
      const data = await DataUsedTrailers.getUsedTrailer(ID);
      if (data.tomado_en_venta) {
        const dataGestoria = await DataGestoria.getTrailer(
          data.tomado_en_venta
        );
        const cliente = await DataClients.getClient(dataGestoria.id_cliente);
        /* *************************** */
        data["razon_social"] = cliente.razon_social;
        const dataCod = encodeURIComponent(JSON.stringify(data));
        window.location.hash = `/print-reg_9?data=${dataCod}`;
      } else {
        template.modal.create({
          title: "⛔ Advertencia",
          content: `<p>Esta unidad no está asociada a una venta de unidad 0 km.</p>`,
        });
      }
    }
  }
};
const handleInforme = async (event) => {
  const validForm = isValidForm(event, form);
  if (validForm) {
    const hasAnyChange = document.querySelectorAll(".change-save");
    if (hasAnyChange.length > 0) {
      template.modal.create({
        title: "⚠️ Advertencia",
        content:
          "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder.</p>",
      });
    }
    else {
      const data = await DataUsedTrailers.getUsedTrailer(ID);
      if (data.tomado_en_venta) {
        const dataGestoria = await DataGestoria.getTrailer(
          data.tomado_en_venta
        );
        const cliente = await DataClients.getClient(dataGestoria.id_cliente);
        /* *************************** */
        data["razon_social"] = cliente.razon_social;
        const dataCod = encodeURIComponent(JSON.stringify(data));
        window.location.hash = `/print-informe?data=${dataCod}`;
      } else {
        template.modal.create({
          title: "⛔ Advertencia",
          content: `<p>Esta unidad no está asociada a una venta de unidad 0 km.</p>`,
        });
      }
    }
  }
}

export default UsedTrailer;
