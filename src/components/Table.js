class Table {
  constructor(props) {
    this.columns = props.columns;
    this.data = props.data;
    this.numItemByPage = 12;
    this.indexStart = 0;
    this.activePage = 1;
    this.indexEnd = this.numItemByPage;
    this.numOfPages = Math.floor(props.data.length / this.numItemByPage);
    this.tbody;
    this.pagination;
    this.nextBtn;
    this.previousBtn;
    this.isFiltered = false;
    this.dataFilter;
    this.attrId = props.attrId;
  }
  createTable() {
    const view = `
    <table class="table mt-3" style="font-size: 15px">
      <thead>
        <tr class="table-dark">
            ${this.createHeader()}
        </tr>
      </thead>
      <tbody>
          ${this.createRows()}
      </tbody>
    </table>
    <div class="row g-1 footer-table">
      <div class="col-auto col-auto">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-dark disabled" id="previous">Anterior</button>
            <button type="button" class="btn btn-outline-dark" id="next">Próxima</button>
        </div>
      </div>
      <div class="col offset text-end">
        Pág. <span id="activePage">${
          this.activePage
        }</span> / <span id="numOfPage">${this.numOfPages}</span>
      </div>
    </div>
    `;
    return view;
  }
  createHeader() {
    const items = Object.keys(this.columns);
    const view = `
        ${items
          .map(
            (item) => `
            <th>${this.columns[item]}</th>
            `
          )
          .join("")}
        `;
    return view;
  }
  createRows() {
    const dataTable = this.isFiltered ? this.dataFilter : this.data;
    this.numOfPages = Math.floor(dataTable.length / this.numItemByPage) + 1;
    const items = Object.keys(this.columns);
    const dataPage = dataTable.slice(this.indexStart, this.indexEnd);
    const view = `
        ${dataPage
          .map(
            (row) => `
            <tr id="${row[this.attrId]}" class = "row-table">
                ${items
                  .map(
                    (cell) => `
                    <td>${row[cell] === undefined ? "" : row[cell]}</td>
                `
                  )
                  .join("")}
            </tr>            
            `
          )
          .join("")}
        `;
    return view;
  }
  insertRows() {
    this.tbody = document.querySelector("tbody");
    this.nextBtn = document.querySelector("#next");
    this.previousBtn = document.querySelector("#previous");
    this.indexEnd = this.indexStart + this.numItemByPage;
    this.tbody.innerHTML = this.createRows();
    document.querySelector("#activePage").innerHTML = this.activePage;
    document.querySelector("#numOfPage").innerHTML = this.numOfPages;
    this.previousBtn.classList.toggle("disabled", this.activePage <= 1);
    this.nextBtn.classList.toggle(
      "disabled",
      this.activePage >= this.numOfPages
    );
  }
  previousButton() {
    this.activePage = this.activePage - 1;
    this.indexStart = this.indexStart - this.numItemByPage;
    this.insertRows();
  }
  nextButton() {
    this.activePage = this.activePage + 1;
    this.indexStart = this.indexEnd;
    this.insertRows();
  }
  filterButton(valuesFilter) {
    this.indexStart = 0;
    this.activePage = 1;
    this.dataFilter = this.data;
    for (let key in valuesFilter) {
      this.dataFilter = this.dataFilter.filter((item) => {
        if (item[key]) {
          return this.normalizeString(item[key]).includes(
            this.normalizeString(valuesFilter[key])
          );
        }
      });
    }
    this.isFiltered = true;
    this.insertRows();
    this.interfaceInfoFilter(valuesFilter);
  }
  normalizeString(str) {
    try {
      const newStr = str === undefined ? '' : str
        return newStr
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    } catch (e) {
      console.log(str, e);
    }
  }
  interfaceInfoFilter(valuesFilter) {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
    ];
    const applyFilters = document.getElementById("info-filtersApply");
    const arrFilter = Object.entries(valuesFilter);
    const viewFilter = arrFilter
      .map((item) => {
        const getRandomColor = (max) => {
          return Math.floor(Math.random() * max);
        };
        if (item[1] != "") {
          return `<small>${
            item[0][0].toLocaleUpperCase() +
            item[0].slice(1).replaceAll("_", " ")
          }: </small><span class="badge text-bg-${
            colors[getRandomColor(colors.length)]
          }">${item[1]}</span> `;
        }
      })
      .join("");
    applyFilters.innerHTML = viewFilter;
    const totalFilter = document.getElementById("totalFilter");
    if (totalFilter) {
      totalFilter.textContent = `Total: ${this.dataFilter.length}`;
    } else {
      applyFilters.parentElement.insertAdjacentHTML(
        "beforeend",
        `<span class="badge text-bg-dark float-end" id="totalFilter">Total: ${this.dataFilter.length}</span>`
      );
    }
  }
}
export default Table;
