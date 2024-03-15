let currentPage = 0;
let itemsPerPage = 15;
let isFiltered = false;
let dataFilter;
let cantPag;
const FilterValues = {};
const PartesInteresadas = [];
let dataTable;
let prevButton;
let nextButton;
let footPage;
let tableBody;
const titlePage = "Unidades Disponible 0 Km";
const headerNames = ["Nro. Trazabilidad", "Modelo", "Color", "Largo", "Alto", "Status"];
class Table {
  static async load(header, title) {
    let result = await loadPage("./html/unidadesDisponibles.html");
    if (result === 200) {
      prevButton = document.getElementById("prevPage");
      nextButton = document.getElementById("nextPage");
      footPage = document.getElementById("footPage");
      tableBody = document.getElementById("tableBody");

      const titleTable = document.getElementById("titleTable");
      titleTable.innerText = title;
      const rowHeader = document.getElementById("rowHeader");
      header.map((item) => {
        let th = document.createElement("th");
        let textCell = document.createTextNode(item);
        th.appendChild(textCell);
        let parentNode = rowHeader.parentNode;
        parentNode.insertBefore(th, rowHeader);
      });
      await Atributos.getOtrosAtributos();
      await UI_Modelos.loadModelos('modelo_filter');
      UI_Modelos.loadAtributos("largo_filter", "largo");
      UI_Modelos.loadAtributos("color_filter", "color");
      UI_Modelos.loadAtributos("status_filter", "status");
    }
  }
  static async loadBodyTable(page, data) {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    tableBody.innerHTML = "";
    for (let i = start; i < end && i < data.length; i++) {
      
      tableBody.innerHTML += `
            <tr title="${data[i].trazabilidad}">
                <td>${data[i].trazabilidad}</td>
                <td>${data[i].modelo}</td>
                <td>${data[i].color_carrozado}</td>
                <td>${data[i].largo}</td>
                <td>${data[i].alto}</td>
                <td >${data[i].status}</td>
                <td class = "d-none">
                    <button type="button" class="btn btn-outline-success btn-sm" onclick="UI.openVentaUnidadUsada(event)" id="${data[i].trazabilidad}">Tomar</button>
                </td>
            </tr>
            `;
    }
    if (page !== 0) {
      prevButton.removeAttribute("disabled", "");
    } else {
      prevButton.setAttribute("disabled", "");
    }
    cantPag = Math.ceil(data.length / itemsPerPage);
    footPage.innerText = `Pág ${currentPage + 1} de ${cantPag}`;
  }
  static nextPage() {
    let newData = isFiltered ? dataFilter : dataTable;
    if (currentPage < Math.ceil(newData.length / itemsPerPage) - 1) {
      currentPage++;
      this.loadBodyTable(currentPage, newData);
    }
  }
  static prevPage() {
    let newData = isFiltered ? dataFilter : dataTable;
    if (currentPage > 0) {
      currentPage--;
      this.loadBodyTable(currentPage, newData);
    }
  }
  static async filter(event) {
    event.preventDefault();
    const formFilter = document.getElementById("formFilter");
    const inputsFilter = formFilter.querySelectorAll(".filter-value");
    inputsFilter.forEach((item) => {
      FilterValues[item.name] = item.value;
    });
    dataFilter = this.getDataFiltered(dataTable, FilterValues);
    currentPage = 0;
    this.loadBodyTable(currentPage, dataFilter);
    isFiltered = true;
  }
  static getDataFiltered(data, filtro) {
    return data.filter((item) => {
      for (let key in filtro) {
        if (filtro[key] !== "" && String(item[key]) !== filtro[key]) {
          return false;
        }
      }
      return true;
    });
  }
  static async openUnidadesDisponibles() {
    try {
      dataTable = await Unidad.getUnidadesDisponibles();
      await this.load(headerNames, titlePage);
      this.loadBodyTable(currentPage, dataTable);
    } catch (e) {
      console.log(e);
    }
  }
  static
}
