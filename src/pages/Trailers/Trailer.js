import FormTrailer from "@templates/Trailer";
import { DataTrailers, Permissions } from "@backend/Trailers";
import {
  getHash,
  loadInputsById,
  listenerChangeEvent,
  getDataFormValid,
  isEmptyObjet,
  listUpdate,
  isValidForm,
} from "@utils/Tools";
import { buttonComponent } from "@components/Form";
import DataGestoria from "@backend/Gestoria";
import { DataStatus } from "@backend/Status";
import { DataUsedTrailers } from "@backend/UsedTrailers";
import DataEmployees from "@backend/Employees" 

let trailer;
const template = new FormTrailer();
let ID;
let form;
let formSell;
let formStatus;

const Trailer = async (content) => {
  ID = getHash().replace("trailer=", "");
  const permisos = await Permissions.hasPermission()
  const status = await DataStatus.getStatusById(ID)
  try {
    trailer = await DataTrailers.getTrailer(ID);
    const hasPermission = permisos  || trailer.status === 'Pendiente' || trailer.status === 'Presupuesto'
    const view = `
    ${await template.header()}
    ${await template.formComponent()}
    <hr>
    <div class="row g-1 my-3">
      ${buttonComponent({
        type: "button",
        color: "success",
        id: "updateButton",
        title: "Actualizar",
        col: "auto",
        xlCol: "auto",
        mdCol: "auto",
      })}
      ${buttonComponent({
        type: "button",
        color: "primary",
        id: "gestoriaButton",
        title: "Gestoria",
        col: "auto",
        xlCol: "auto",
        mdCol: "auto",
      })}
    </div>
    `;
    content.innerHTML = view;
    form = document.querySelector("#formTrailer");
    formStatus = document.querySelector("#formStatus");
    loadInputsById(status, formStatus, !hasPermission);
    
    setTitleStatus(trailer.status)
    await template.defaultUI({ value: trailer.modelo });
    listenerChangeEvent(form);
    loadInputsById(trailer, form, !hasPermission);
    const updateButton = document.querySelector("#updateButton");
    updateButton.addEventListener("click", handleUpdate);
    document.querySelector("#gestoriaButton").addEventListener("click", (event) => {
      if(isValidForm(event, form)) {
        const data = document.querySelectorAll(".change-save");
        if(data.length > 0) {
          template.modal.create({
            title: "⚠️ Advertencia",
            content:
              "<p>Ha realizado unos cambios que no ha guardado. Guarde los cambios primero, antes de proceder.</p>",
          });
        }
        else {
          template.openGestoria(updateGestoria, true, ID);
        }
      }
    });
    const buttondefinir = document.querySelector('#definirPresupuesto')
      buttondefinir.addEventListener('click',() => {
        const input = document.querySelector('#status')
        input.value = 'Pendiente';
        input.setAttribute('title','Pendiente')
        input.classList.add('change')
        buttondefinir.classList.add('disabled')
      })
  } catch (e) {
    console.log(e);
  }
};
const setTitleStatus = (value) => {
  const input = document.querySelector('#status')
  input.setAttribute('title',value);
  input.addEventListener('change',(event) => {
    input.setAttribute('title',event.target.value);
  })
  document.getElementById('definirPresupuesto').toggleAttribute('disabled',input.value !='Presupuesto')
}
//Actualizar
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
      handleSaveUpdate(data, event);
    });
  } else {
    window.alert("Nada para actualizar");
  }
};
const handleSaveUpdate = async (data) => {
  template.modal.create({
    title: "🔄 Actualizar datos",
    content: `
          <p class="text-center">Actualizando los datos, por favor espere ⌛</p>
          `,
  });
  template.modal.disableCloseButtons();
  try {
    const response = await DataTrailers.updateData({
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
//Gestoría
const updateGestoria = async (event) => {
  formSell = document.querySelector("#formSell");
  if (isValidForm(event, formSell)) {
    const dataUpdate = document.querySelectorAll(".change-save");
    const status =document.querySelector('#status');
    const isPresupuesto =  status.value==='Presupuesto'
    const changeStatus = status.className.includes('change')
    if (dataUpdate.length <= 0 && !changeStatus) {
      template.modal.create({
        title: '🗣️ Nada para actualizar',
        content: '<p class="text-center">No hay nada para actualizar</p>'
      })
      if (!isPresupuesto) {
        template.modal.addButtonAction({
          title: "Boleto",
          type: "button",
          color: "danger",
          id: "boletoButton",
        });
        document
      .querySelector("#boletoButton")
      .addEventListener("click", async () => {
        await template.openBoleto(ID);
      });
      }
      
    } 
    else {
      template.modal.saving();
      if(changeStatus) {
        await DataStatus.updateData({
          colName: "trazabilidad",
          id: ID,
          values: { presupuesto: 'No' },
        })
      }
      const data = getDataFormValid(event, formSell, ".change-save");
      try {
        let response
        const hasRegister = await DataGestoria.hasRegister(ID);
        if(hasRegister) {
          response = await DataGestoria.updateData({
            colName: "trazabilidad",
            id: ID,
            values: data,
          });
        }
        else {
          const user = await DataEmployees.getActiveUser();
          data.vendedor = user.alias;
          data.trazabilidad = ID;
          response = await DataGestoria.postData(data);
        }
        if (data.tomada_en_venta) {
          await DataUsedTrailers.updateData({
            colName: "trazabilidad",
            id: data.tomada_en_venta,
            values: { tomado_en_venta: ID },///en numero
          });
        }
        
        if (response && response.status === 200) {
          template.modalWithBTNBoleto(ID,isPresupuesto)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
export default Trailer;
