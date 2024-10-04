import { MainTitle } from "@components/Titles";
import IconTitleClients from "@images/directory.png";
import { inputComponent, buttonComponent } from "@components/Form";
import Table from "@components/Table";
import DataClients from "@backend/Clients";

let TableClients;
let previousButton;
let nextButton;
let filterButton;
const formFilter = () => {
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
      })}
      ${inputComponent({
        type: "text",
        className: "filter",
        placeholder: "Nombre o razón social",
        id: "razon_social",
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
  id: "Código",
  razon_social: "Razón social",
  tel: "Telefono",
  provincia: "Provincia",
};
const Clients = async (content) => {
  try {
    const data = await DataClients.sorted();
    TableClients = new Table({ columns: columns, data: data, attrId: "id" });
    const view = `
    ${MainTitle("Listado de Clientes", IconTitleClients)}
    ${formFilter()}
    <div class="mt-3">Filtros aplicados: <span id="info-filtersApply">Ninguno</span></div>
    ${TableClients.createTable()}
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
    addButton.addEventListener("click", () => (location.hash = "/add-client"));
    return true;
  } catch (e) {
    console.error(e);
  }
};
const handlePreviousButton = () => {
  TableClients.previousButton();
  activeListenerRows()
};
const handleNextButton = () => {
  TableClients.nextButton();
  activeListenerRows()
};
const handleFilterButton = () => {
  const valuesFilter = {};
  const itemsFilter = document.querySelectorAll(".filter");
  itemsFilter.forEach((item) => {
    valuesFilter[item.id] = item.value;
  });
  TableClients.filterButton(valuesFilter);
  activeListenerRows()
};
const handleEditData = (event) => {
  const id = event.target.parentNode.id;
  location.hash = `/client=${id}/`
};
const activeListenerRows = () => {
  document.querySelectorAll(".row-table").forEach((row) => row.addEventListener("click", handleEditData));
}
export default Clients;
