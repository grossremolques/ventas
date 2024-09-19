import { MainTitle } from "@components/Titles";
import IconTitleTrailers from "@images/new.png";
import { inputComponent, buttonComponent, selectComponent } from "@components/Form";
import Table from "@components/Table";
import {DataTrailers, Attributes} from "@backend/Trailers";
import DataGestoria from "@backend/Gestoria";
import { sortByTraz } from "../../utils/Tools";

let TableTrailers;
let previousButton;
let nextButton;
let filterButton;

const Data = async () => {
  const dataTech = await DataTrailers.getDataInJSON();
  const dataGestoria = await DataGestoria.getCompleteData();
  let data = dataJoin(dataTech, dataGestoria, 'trazabilidad', 'trazabilidad');
  data = data.map((item) => {
    item.modelo = item.tipo + " " + item.carrozado;
    return item
  })
  data = data.sort(sortByTraz);
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
  const attributes = await Attributes.getDataInJSON();
  const view = `
    <form class="row g-1 mt-3">
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Razón social",
        id: "razon_social",
        sizes: 'sm'
      })}
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Modelo",
        id: "modelo",
        sizes: 'sm'
      })}
      ${inputComponent({
        col: "",
        type: "text",
        className: "filter",
        placeholder: "Trazabilidad",
        id: "trazabilidad",
        sizes: 'sm'
      })}
      ${inputComponent({
        col: "1",
        mdCol: "1",
        xlCol: "1",
        type: "number",
        className: "filter",
        placeholder: "Largo",
        id: "largo",
        sizes: 'sm'
      })}
      ${inputComponent({
        col: "1",
        mdCol: "1",
        xlCol: "1",
        type: "number",
        className: "filter",
        placeholder: "Alt. Baranda",
        id: "altura_baranda",
        sizes: 'sm'
      })}
      ${selectComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        id: "color_carrozado",
        name: "color_carrozado",
        placeholder: "Color",
        data: attributes,
        textNode: "color",
        className: "filter",
        sizes: 'sm'
      })}
      ${selectComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        id: "status",
        name: "status",
        placeholder: "Status",
        data: attributes,
        textNode: "status",
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
        id: 'add',
        sizes: 'sm'
      })}
    </form>`;
  return view;
};
const columns = {
  id_cliente: "Cliente",
  razon_social: "Razón social",
  trazabilidad: "Trazabilidad",
  modelo: 'Modelo',
  largo: 'Largo',
  altura_baranda: 'Alt. Baranda',
  color_carrozado: 'Color',
  status: "Status",
};
const Trailers = async (content) => {
  const data = await Data();
  TableTrailers = new Table({ columns: columns, data: data, attrId: 'trazabilidad'});
  const view = `
    ${MainTitle("Listado de Unidades 0 KM", IconTitleTrailers)}
    ${await formFilter()}
    ${TableTrailers.createTable()}
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
  addButton.addEventListener("click", () => (location.hash = "/add-trailer"));
};
const handlePreviousButton = () => {
  TableTrailers.previousButton();
  activeListenerRows()
};
const handleNextButton = () => {
  TableTrailers.nextButton();
  activeListenerRows()
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableTrailers.filterButton(valuesFilter);
  activeListenerRows()
};
const handleEditData = (event) => {
  const id = event.target.parentNode.id
  location.hash = `/trailer=${id}/`
}
const activeListenerRows = () => {
  document.querySelectorAll(".row-table").forEach((row) => row.addEventListener("click", handleEditData));
}
export default Trailers;
