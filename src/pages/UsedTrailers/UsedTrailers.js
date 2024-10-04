import { MainTitle } from "@components/Titles";
import IconTitleUsedTrailers from "@images/price-tag.png";
import { inputComponent, buttonComponent } from "@components/Form";
import Table from "@components/Table";
import {DataUsedTrailers} from "@backend/UsedTrailers";

let TableUsedTrailers;
let previousButton;
let nextButton;
let filterButton;
const formFilter = () => {
  const view = `
    <form class="row g-2 mt-3">
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Carrozado",
        sizes: 'sm',
        id: "carrozado",
      })}
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Marca",
        sizes: 'sm',
        id: "marca",
      })}
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Trazabilidad",
        sizes: 'sm',
        id: "trazabilidad",
      })}
      ${inputComponent({
        col: "3",
        type: "text",
        className: "filter",
        placeholder: "VIN",
        sizes: 'sm',
        id: "vin",
      })}
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Dominio",
        sizes: 'sm',
        id: "dominio",
      })} 
      ${inputComponent({
        col: "2",
        type: "text",
        className: "filter",
        placeholder: "Status",
        sizes: 'sm',
        id: "status",
      })}      
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "primary",
        title: "Filtrar",
        sizes: 'sm',
        id: "filter",
      })}
      ${buttonComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        type: "button",
        color: "success",
        title: "Agregar",
        sizes: 'sm',
        id: 'add'
      })}
    </form>`;
  return view;
};
const columns = {
  tipo: "Tipo",
  carrozado: "Carrozado",
  marca: "Marca",
  trazabilidad: "Trazabilidad",
  vin: "VIN",
  dominio: 'Dominio',
  status: "Status",
};
const UsedTrailers = async (content) => {
  let data = await DataUsedTrailers.getDataInJSON();
  TableUsedTrailers = new Table({ columns: columns, data: data, attrId: 'trazabilidad' });
  const view = `
    ${MainTitle("Listado de Unidades Usadas", IconTitleUsedTrailers)}
    ${formFilter()}
    <div class="mt-3">Filtros aplicados: <span id="info-filtersApply">Ninguno</span></div>
    ${TableUsedTrailers.createTable()}
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
  addButton.addEventListener("click", () => (location.hash = "/add-used-trailer"));
};
const handlePreviousButton = () => {
  TableUsedTrailers.previousButton();
  activeListenerRows()
};
const handleNextButton = () => {
  TableUsedTrailers.nextButton();
  activeListenerRows()
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableUsedTrailers.filterButton(valuesFilter);
  activeListenerRows()
};
const handleEditData = (event) => {
  const id = event.target.parentNode.id
  location.hash = `/used-trailer=${id}/`
}
const activeListenerRows = () => {
  document.querySelectorAll(".row-table").forEach((row) => row.addEventListener("click", handleEditData));
}
export default UsedTrailers;
