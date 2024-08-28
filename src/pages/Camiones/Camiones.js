import { MainTitle } from "@components/Titles";
import IconTitleCamion from "@images/semi-camion.png";

import { inputComponent, buttonComponent } from "@components/Form";
import Table from "@components/Table";
import {DataCamiones} from "@backend/Camion";
import { sortByTraz } from "../../utils/Tools";

let TableCamion;
let previousButton;
let nextButton;
let filterButton;

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
        placeholder: "Modelo",
        id: "modelo",
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
  console.log(data)
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
  addButton.addEventListener("click", () => (location.hash = "/add-camion"));
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
const handleEditData = (event) => {
  const id = event.target.parentNode.id;
  location.hash = `/trailer=${id}/`;
};

const activeListenerRows = () => {
  document
    .querySelectorAll(".row-table")
    .forEach((row) => row.addEventListener("click", handleEditData));
};
export default Camiones;
