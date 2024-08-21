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
  listUpdate,
  isValidForms
} from "@utils/Tools";
import MyCustumeModal from "@components/MyCustumeModal";
import { buttonComponent } from "@components/Form";
import DataClients from "@backend/Clients";
import dayjs from "dayjs"
import DataGestoria from "@backend/Gestoria";

let trailer;
let template = new FormUsedTrailer();
let modal;
let ID;
let form;
let client;
let formSell;

const Reg_co_0009 = async (content) => {
  ID = getHash().replace("reg_9=", "");
  try {
    trailer = await DataUsedTrailers.getUsedTrailer(ID);
    const view = `
      ${MainTitle("Ingreso de Unidades Usadas")}
      ${await template.formREG_CO_0009()}
      <hr>
      <div class="row g-1 my-3">
        ${buttonComponent({
          type: "button",
          color: "outline-success",
          id: "",
          title: 'Imprimir Registro',
          col: "auto",
        })}
        ${buttonComponent({
          type: "button",
          color: "outline-primary",
          id: "sellButton",
          title: "Vender",
          col: "auto",
        })}
        ${buttonComponent({
          type: "button",
          color: "outline-dark",
          id: "entryButton",
          title: "REG-CO-009",
          col: "auto",
          className: 'ms-auto'
        })}
      </div>
      `;
    content.innerHTML = view;
    form = document.querySelector("#formUsedTrailer");

    let details = trailer.defectos_superficie;

    loadCheckedInputs(details)
    loadInputsById(trailer, form);
    listenerChangeEvent(form);
    listenerChangeEventCheck(form)
    const sellButton = document.querySelector("#sellButton");
    const updateButton = document.querySelector("#updateButton");
    updateButton.addEventListener("click", handleUpdate);
    sellButton.addEventListener("click", handleSell);
    const myModal = document.querySelector("#modal");
    const entryButton = document.querySelector('#entryButton');
    entryButton.addEventListener('click', handleREG_09)
    modal = new MyCustumeModal(myModal);
    template.formattedPrice();
  } catch (e) {
    console.log(e);
  }
};
//Actualizar
const handleUpdate = (event) => {
  const data = getDataFormValid(event, form, ".change-save");
  const dataCheck = getDataFormValid(event, form, ".change-save-check");
  const isData = !isEmptyObjet(data);
  const isDataCheck = !isEmptyObjet(dataCheck);
  if (isData || isDataCheck) {
    if(isDataCheck) {
      const allDataCheck = getDataFormValid(event, form, '.form-check-input:checked');
      const newAllDataCheck = Object.values(allDataCheck).join(', ')
      data['defectos_superficie'] = newAllDataCheck
    }
    modal.create({
      title: "🔄 Actualizar datos",
      content: `
        <p>¿Desea actualizar lo/s siguientes datos:?</p>
          ${listUpdate(data)}
        `,
    });
    modal.addButtonAction({
      type: "button",
      color: "primary",
      id: "update",
      title: "Si, actualizar",
    });
    const buttonAction = document.querySelector("#update");
    buttonAction.addEventListener("click", () => {
      handleSaveUpdate(data,event);
    });
  }
};
/* const listUpdate = (data) => {
  const items = Object.keys(data);
  const view = `
    ${items
      .map(
        (item) => `
        <li><em>${
          item[0].toUpperCase() + item.slice(1).replace("_", " ")
        }</em>: ${data[item]}</li>
        `
      )
      .join("")}
    `;

  return view;
}; */
const handleSaveUpdate = async (data,event) => {
  modal.create({
    title: "🔄 Actualizar datos",
    content: `
          <p class="text-center">Actualizando los datos, por favor espere ⌛</p>
          `,
  });
  modal.disableCloseButtons();
  try {
    const response = await DataUsedTrailers.updateData({
      colName: "trazabilidad",
      id: ID,
      values: data,
    });
    if (response && response.status === 200) {
      modal.create({
        title: "✔️ Completado",
        content: '<p class="text-center">Actualizado correctamente</p>',
      });
      const inputsChanges = document.querySelectorAll('.change-save');
      inputsChanges.forEach(input => input.classList.remove('change-save'))
    }
  } catch (e) {
    console.log(e);
  }
};
//Vender
const handleSell = async () => {
  const dataUpdate = document.querySelectorAll(".change-save, .change-save-check");
  if (dataUpdate.length > 0) {
    modal.create({
      title: "⚠️ Advertencia",
      content:
        "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder con la venta.</p>",
    });
  } else {
    trailer = await DataUsedTrailers.getUsedTrailer(ID);
    modal.create({
      title: "💲 Datos de venta",
      content: await template.formSell(trailer),
    });
    document.querySelector("#obs_boleto").value =
      template.observaciones(trailer);
    modal.addButtonAction({
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
    const idClient = document.querySelector("#id_cliente");
    const saveSell = document.querySelector("#saveSell");
    saveSell.addEventListener("click", handleSaveSell);
    idClient.addEventListener("change", getClient);
  }
};
const handleSaveSell = async (event) => {
  const data = getDataFormValid(event, formSell, ".form-control");
  if (!isEmptyObjet(data)) {
    try {
      data.id = data.id_cliente;
      const validateClient = await DataClients.isClientOnRegister(data);
      if (validateClient.id) {
        modal.saving();
        try {
          const today = dayjs(new Date(), "YYYY-DD-MM")
          data.fecha_venta = today.format("DD/MM/YYYY");
          const response = await DataUsedTrailers.updateData({
            colName: "trazabilidad",
            id: ID,
            values: data,
          });
          if (response && response.status === 200) {
            const dataPost = await DataUsedTrailers.getUsedTrailer(ID);
            dataPost['obs_boleto'] = data.obs_boleto
            Object.assign(dataPost, client);
            const dataCod = encodeURIComponent(JSON.stringify(dataPost));
            modal.success(`
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
const getClient = async (event) => {
  const id = event.target.value;
  try {
    client = await DataClients.getClient(id);
    console.log(client);
    if (!client || isEmptyObjet(client)) {
      window.alert("🚨🚨 Cliente no encontrado 😟");
    } else {
      loadInputsById(client, formSell);
    }
  } catch (e) {
    console.log(e);
  }
};
const handleREG_09 = async (event) => {
  const data = await DataUsedTrailers.getUsedTrailer(ID);
  const validForm = isValidForm(event, form);
  if(validForm) {
    const hasAnyChange = document.querySelectorAll('.change-save');
    console.log(hasAnyChange.length<0)
    if(hasAnyChange.length>0) {
      modal.create({
        title: "⚠️ Advertencia",
        content:
          "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder.</p>",
      });
    }
    else {
      modal.create({
        title: ''
      })
      /* modal.holdingRequest()
      const dataGestoria = await DataGestoria.getTrailer(data.tomado_en_venta)
      data['razon_social'] = dataGestoria.nombre
      const dataCod = encodeURIComponent(JSON.stringify(data));
      window.location.hash = `/print-reg_9?data=${dataCod}`
      modal.hide() */
    }
    
  }
  
}

export default Reg_co_0009;
