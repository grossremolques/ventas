import { MainTitle } from "@components/Titles";
import IconTitleClients from "@images/directory.png";
import { inputComponent, buttonComponent, selectComponent } from "@components/Form";
import Table from "@components/Table";
import DataClients from "@backend/Clients";
import {DataOT, Attributes} from "@backend/OT";

let TableOT;
let previousButton;
let nextButton;
let filterButton;
const Data = async () => {
    const dataOT = await DataOT.getDataInJSON();
    const dataCliente = await DataClients.getDataInJSON();
    let data = dataJoin(dataOT, dataCliente, 'id_cliente', 'id');
    return data.reverse()
  }
  const dataJoin = (data1, data2, att1, att2) => {
    data1.map((item) => {
      data2.map(elem => {
        if(item[att1] === elem[att2]) {
          Object.assign(item, elem)
        }
      })
    })
    return data1
  }
const formFilter = async () => {
    const attributes = await Attributes.getDataInJSON()
  const view = `
    <form class="row g-2 mt-3">
      ${inputComponent({
        col: "2",
        mdCol: "2",
        xlCol: "2",
        type: "number",
        className: "filter",
        placeholder: "Código",
        id: "id",
        sizes: 'sm'
      })}
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Nombre o razón social",
        id: "razon_social",
        sizes: 'sm'
      })}
      ${selectComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        id: "tipo_unidad",
        name: "tipo_unidad",
        placeholder: "Trabajo en",
        data: attributes,
        textNode: "tipo_unidad",
        className: "filter",
        sizes: 'sm'
      })}
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "primary",
        title: "Filtrar",
        id: "filter",
        sizes: 'sm'
      })}
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "success",
        title: "Agregar",
        id: "add",
        sizes: 'sm'
      })}
    </form>`;
  return view;
};
const columns = {
  id_ot: "Id",
  tipo_orden: 'Tipo de orden',
  garantia: 'Garantía',
  id_nc: 'NC',
  tipo_unidad: 'Trabajo en',
  razon_social: 'Cliente'
};
const OT = async (content) => {
  try {
    const data = await Data();
    TableOT = new Table({ columns: columns, data: data, attrId: "id_ot" });
    const view = `
    ${MainTitle("Ordenes de repuestos y reparaciones", IconTitleClients)}
    ${await formFilter()}
    <div class="mt-3">Filtros aplicados: <span id="info-filtersApply">Ninguno</span></div>
    ${TableOT.createTable()}
    `;
    content.innerHTML = view;
    previousButton = document.querySelector("#previous");
    nextButton = document.querySelector("#next");
    filterButton = document.querySelector("#filter");
    const addButton = document.querySelector("#add");
    activeListenerRows()

    previousButton.addEventListener("click", handlePreviousButton);
    nextButton.addEventListener("click", handleNextButton);
    filterButton.addEventListener("click", handleFilterButton);
    addButton.addEventListener("click", () => (location.hash = "/add-ot"));
    return true;
  } catch (e) {
    console.error(e);
  }
};
const handlePreviousButton = () => {
  TableOT.previousButton();
  activeListenerRows()
};
const handleNextButton = () => {
  TableOT.nextButton();
  activeListenerRows()
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableOT.filterButton(valuesFilter);
  activeListenerRows()
};
const handleEditData = (event) => {
  const id = event.target.parentNode.id;
  location.hash = `/client=${id}/`
};
const activeListenerRows = () => {
  document.querySelectorAll(".row-table").forEach((row) => row.addEventListener("click", handleEditData));
}
export default OT;
