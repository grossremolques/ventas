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
    <table class="table mt-3">
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
        Pág. <span id="activePage">${this.activePage}</span> / <span id="numOfPage">${this.numOfPages}</span>
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
    console.log(this.dataFilter)
    for (let key in valuesFilter) {
      console.log(key)
      this.dataFilter = this.dataFilter.filter((item) => {
        return this.normalizeString(item[key]).includes(
          this.normalizeString(valuesFilter[key])
        );
        /* if (item[key]) {
          
        } */
      });
    }
    this.isFiltered = true;
    this.insertRows();
  }
  normalizeString(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}
export default Table;
