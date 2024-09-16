import { MainTitle } from "@components/Titles";
import IconTitleCamion from "@images/semi-camion.png";
import FormCamion from "@templates/Camion";
import { inputComponent, buttonComponent } from "@components/Form";
import Table from "@components/Table";
import {DataCamiones} from "@backend/Camion";
import DataEmployees from "@backend/Employees";
import { getDataFormValid, isEmptyObjet, sortByTraz, trimCustumize, loadInputsById, listenerChangeEvent,} from "@utils/Tools";
import DataClients from "../../backend/Clients";
const template = new FormCamion()
let TableCamion;
let previousButton;
let nextButton;
let filterButton

const formFilter = () => {
  const view = `
    <form class="row g-2 mt-3">
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Razón social",
        id: "razon_social",
      })}
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "VIN",
        id: "vin",
      })}
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Dominio",
        id: "dominio",
      })}
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Trazabilidad",
        id: "trazabilidad",
      })}
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Status",
        id: "status",
      })}   
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "primary",
        title: "Filtrar",
        id: "filter",
      })}
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "success",
        title: "Agregar",
        id: "add",
      })}
    </form>`;
  return view;
};
const columns = {
  trazabilidad: "Trazabilidad",
  marca: "Marca",
  modelo: "Modelo",
  vin: "VIN",
  dominio: 'Dominio'
};
const Camiones = async (content) => {
  let data = await DataCamiones.getDataInJSON();
    data = data.sort(sortByTraz)
    data = data.reverse()
  TableCamion = new Table({
    columns: columns,
    data: data,
    attrId: "trazabilidad",
  });
  const view = `
    ${MainTitle("Listado de Camiones", IconTitleCamion)}
    ${formFilter()}
    ${TableCamion.createTable()}
    `;
  content.innerHTML = view;
  previousButton = document.querySelector("#previous");
  nextButton = document.querySelector("#next");
  filterButton = document.querySelector("#filter");
  const addButton = document.querySelector("#add");
  activeListenerRows();

  previousButton.addEventListener("click", handlePreviousButton);
  nextButton.addEventListener("click", handleNextButton);
  filterButton.addEventListener("click", handleFilterButton);
  addButton.addEventListener("click", handleAddButton);
};
const handlePreviousButton = () => {
  TableCamion.previousButton();
  activeListenerRows();
};
const handleNextButton = () => {
  TableCamion.nextButton();
  activeListenerRows();
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableCamion.filterButton(valuesFilter);
  activeListenerRows();
};

const handleAddButton = async () => {
  template.modal.create({
    title: '🚚 Nuevo Camión',
    content: `
    <form class="row needs-validation" novalidate id="formCamion">
    ${await template.main()}
    </form>
    `
  })
  template.modal.addButtonAction({
    type: 'button',
    color: 'success',
    id: 'saveCamion',
    title: 'Guardar'
  })
  const form = document.querySelector("#formCamion");
  await DataClients.handleFindClient('formCamion')
  trimCustumize()
  const buttonSave = document.querySelector('#saveCamion')
  buttonSave.addEventListener('click',async (event) => {
    const data = getDataFormValid(event, form, ".form-control");
    if (!isEmptyObjet(data)){
      template.modal.saving()
      try {
          const user = await DataEmployees.getActiveUser();
          data.registrado_por = user.alias
          const response = await DataCamiones.postCustomized(data);
          if(response.result && response.result.status === 200) {
              const id = response.trazabilidad.toString().replace(/(\d{1})(\d{4})(\d{2})/, "$1.$2-$3")
              location.hash = '/camiones'
              template.modal.success(`
                Se ha registrado el camión correctamente. <br>Trazabilidad asignada: <strong>${id}</strong>
                <br><em class="mt-2 text-primary">Si lo requiere, agregue las dimensiones del camión (carrocería/modificaciones en chasis)</em>
                `)
              template.modal.addButtonAction({
                type: 'button',
                color: 'primary',
                id: 'openDimensiones',
                title: 'Agregar Dimensiones'
              })
              handleOpenDimensions(id)
          }
      }
      catch(e) {
          console.log(e)
      }
  }
  })
}
const activeListenerRows = () => {
  document
    .querySelectorAll(".row-table")
    .forEach((row) => row.addEventListener("click", handleEditData));
};
//Editar
const handleEditData = async (event) => {
  const id = event.target.parentNode.id;
  const camion = await DataCamiones.getCamion(id);
  const client = await DataClients.getClient(camion.id_cliente);
  if(client) {camion['razon_social'] = client.razon_social}
  template.modal.create({
    title: `🚚 Editar Camión ${id}`,
    content: `
    <form class="row needs-validation" novalidate id="formCamion">
    ${await template.main()}
    </form>
    `
  })
  template.modal.addButtonAction({
    type: 'button',
    color: 'primary',
    id: 'updateCamion',
    title: 'Actualizar'
  })
  template.modal.addButtonOther({
    type: 'button',
    color: 'outline-danger',
    id: 'openDimensiones',
    title: 'Dimensiones'
  })
  const form = document.querySelector("#formCamion");
  loadInputsById(camion, form, false);
  listenerChangeEvent(form);
  await DataClients.handleFindClient('formCamion')
  trimCustumize()
  
  const buttonUpdate = document.querySelector('#updateCamion')
  buttonUpdate.addEventListener('click',async (event) => {
    const data = getDataFormValid(event, form, ".change-save");
    if (!isEmptyObjet(data)){
      template.modal.saving()
      try {
          const user = await DataEmployees.getActiveUser();
          data.registrado_por = user.alias
          const response = await DataCamiones.updateData({
            colName: 'trazabilidad',
            id: id,
            values: data
          });
          if(response && response.status === 200) {
            location.hash = '/camiones'
              template.modal.success(`
                Se han actualizado los datos del camión <strong>${id}</strong>
                <br><em class="mt-2 text-primary">Si lo requiere, agregue las dimensiones del camión (carrocería/modificaciones en chasis)</em>
                `)
              template.modal.addButtonAction({
                type: 'button',
                color: 'primary',
                id: 'openDimensiones',
                title: 'Agregar Dimensiones'
              })
              handleOpenDimensions(id)
          }
      }
      catch(e) {
          console.log(e)
      }
  }
  })
  handleOpenDimensions(id)
  
};
const handleOpenDimensions = (id) => {
  const openDimensiones = document.querySelector('#openDimensiones');
  openDimensiones.addEventListener('click',() => {
    location.hash = `/camion=${id}/`
  })

}
export default Camiones;
