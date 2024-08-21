import { MainTitle } from "@components/Titles";
import IconTitleTrailers from "@images/new.png";
import { inputComponent, buttonComponent } from "@components/Form";
import Table from "@components/Table";
import {DataTrailers} from "@backend/Trailers";
import DataGestoria from "@backend/Gestoria";
import {DataUsedTrailers} from "@backend/UsedTrailers";
import { DataStatus } from "../../backend/Status";

let TableTrailers;
let previousButton;
let nextButton;
let filterButton;

const Data = async () => {
  const dataTech = await DataTrailers.getDataInJSON();
  const dataGestoria = await DataGestoria.getCompleteData();
  //const status = await DataStatus.getStatus()
  let data = dataJoin(dataTech, dataGestoria, 'trazabilidad', 'trazabilidad');
  //dataJoin(data, status,'trazabilidad', 'trazabilidad')
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
        id: 'add'
      })}
    </form>`;
  return view;
};
const columns = {
  id_cliente: "Cliente",
  razon_social: "Razón social",
  trazabilidad: "Trazabilidad",
  modelo: 'Modelo',
  status: "Status",
};
const Trailers = async (content) => {
  const data = await Data();
  TableTrailers = new Table({ columns: columns, data: data, attrId: 'trazabilidad'});
  const view = `
    ${MainTitle("Listado de Unidades 0 KM", IconTitleTrailers)}
    ${formFilter()}
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
const sortByTraz = (a,b) => {
  // Obtener los dos últimos dígitos
  const lastTwoA = a.trazabilidad.slice(-2);
  const lastTwoB = b.trazabilidad.slice(-2);
  // Comparar por los dos últimos dígitos
  if (lastTwoA !== lastTwoB) {
      return lastTwoA - lastTwoB;
  }
  // Obtener el primer dígito después del "."
  const firstDigitA = parseInt(a.trazabilidad.substring(a.trazabilidad.indexOf('.') + 1, a.trazabilidad.indexOf('-')));
  const firstDigitB = parseInt(b.trazabilidad.substring(b.trazabilidad.indexOf('.') + 1, b.trazabilidad.indexOf('-')));
  // Comparar por el primer dígito
  if (firstDigitA !== firstDigitB) {
      return firstDigitA - firstDigitB;
  }
   // Comparar por los 4 dígitos después del "."
  const digitsA = parseInt(a.trazabilidad.substring(a.trazabilidad.indexOf('-') + 1));
  const digitsB = parseInt(b.trazabilidad.substring(b.trazabilidad.indexOf('-') + 1));
  
  return digitsA - digitsB;
  
}
const activeListenerRows = () => {
  document.querySelectorAll(".row-table").forEach((row) => row.addEventListener("click", handleEditData));
}
export default Trailers;
