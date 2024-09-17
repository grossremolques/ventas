const input = (props) => {
  const view = `
    <input 
        type="${props.type ? props.type : ""}" 
        class="form-control ${props.className ? props.className : ""} 
        ${props.sizes ? `form-control-${props.sizes}` : ""}" 
        id="${props.id}" 
        name="${props.name}"
        ${props.list ? `list="${props.list}"` : ""}
        ${props.placeholder ? `placeholder="${props.placeholder}"` : ""}
        ${props.maxlength ? `maxlength="${props.maxlength}"` : ""}
        ${props.autocomplete ? '' : "autocomplete='off'"}
        ${props.required ? "required" : ""}
        ${props.value ? `value="${props.value}"` : ""}
        ${props.step ? `step= ${props.step}` : ""}
        ${props.disabled ? `disabled` : ""}
        ${props.readonly === true ? "readonly" : ""}>
    `;
  return view;
};
const select = (props) => {
  const view = `
    <select id="${props.id}" name="${props.name}" class="form-control ${props.className ? props.className : ""} ${props.sizes ? `form-control-${props.sizes}` : ""}" ${props.required ? "required" : ""} ${props.disabled === true ? "disabled" : ""}> ${options(props)} </select>    `;
  return view;
};
const options = (props) => {
  const view = `
    <option value="" select>${props.placeholder ? props.placeholder : ""} </option>
    ${props.data? `${props.data.map((item) => `
      ${
        item[props.textNode] ? `<option value="${ item[props.value] ? item[props.value] : item[props.textNode]}" ${props.disabled ? item[props.disabled[0]] != props.disabled[1] ? 'disabled':'': ''}>${item[props.textNode]}</option>`: ""}`).join("")}`: ""
    }`;
  return view;
};
const dataList = (props) => {
  const view = `
    ${input(props)}
    <datalist id="${props.list}">
     ${options(props)}
    </datalist>`;
  return view;
};
const label = (props) => {
  const view = `
    <label for="${props.id}"
    ${props.sizes ? `class="form-control-${props.sizes}` : ""}"
    >${props.nameLabel}
    <span class="form-text ${props.color ? `text-${props.color}`:""}">${props.formText ? props.formText : ''}</span>
    </label>
    `;
  return view;
};
const floatingLabel = (props) => {
  const view = `
    <div class="col${props.col ? "-" + props.col : ""}">
        <div class="form-floating">
            ${input(props)}
            ${label(props)}
        </div>
    </div>`;
  return view;
};
const button = (props) => {
  const view = `
    <button type="${props.type}"class="btn btn-${props.color} ${props.sizes ? `btn-${props.sizes}` : ""}"${props.id ? `id="${props.id}"` : ""}>${props.title}</button>
    `;
  return view;
};
const inputComponent = (props) => {
  const view = `
    <div class="col${props.col ? "-" + props.col : ""} col-md${props.mdCol ? "-" + props.mdCol : ""} col-xl${props.xlCol ? "-" + props.xlCol : ""}">
      ${props.nameLabel ? label(props) : ""}
      ${input(props)}
    </div>`;
  return view;
};
const selectComponent = (props) => {
  const view = `
    <div class="col${props.col ? "-" + props.col : ""} col-md${props.mdCol ? "-" + props.mdCol : ""} col-xl${props.xlCol ? "-" + props.xlCol : ""} ${props.classNameSelect ? props.classNameSelect : ""}">
        ${props.nameLabel ? label(props) : ""}
        ${select(props)}
    </div>`;
  return view;
};
const dataListComponent = (props) => {
  const view = `
    <div class="col${props.col ? "-" + props.col : ""} col-md${props.mdCol ? "-" + props.mdCol : ""} col-xl${props.xlCol ? "-" + props.xlCol : ""}">
        ${props.nameLabel ? label(props) : ""}
        ${dataList(props)}
    </div>`;
  return view;
};
const buttonComponent = (props) => {
  const view = `
  <div class="col${props.col ? "-" + props.col : ""} col-md${props.mdCol ? "-" + props.mdCol : ""} col-xl${props.xlCol ? "-" + props.xlCol : ""} ${props.className ? props.className : ""}">
    ${button(props)}
  </div>`;
  return view;
};
const inputGroup = (props) => {
  const view = `
  <span class="input-group-text" id="inputGroup-sizing-sm">${props.nameLabel}</span>
  ${input(props)}
  `;
  return view
}
const selectGroup = (props) => {
  const view = `
  <label class="input-group-text" for="${props.id}">${props.nameLabel}</label>
  <select class="form-control ${props.className ? props.className : ""}" id="${props.id}" name="${props.name}"  ${props.required ? "required" : ""}>
    ${options(props)}
  </select>
  `;
  return view
}
const textarea = (props) => {
  const view = `
    <div class="col${props.col ? "-" + props.col : ""}
    ${props.mdCol ? `col-md-${props.mdCol}` : ""}"
    ${props.xlCol ? `col-md-${props.xlCol}` : "col-md"}">
        ${props.nameLabel ? label(props) : ""}
        <textarea class="form-control form-control-sm" name="${props.name}" id="${props.id}" rows="${props.row}" ${props.required ? "required" : ""}></textarea>
    </div>`;
  return view;
}
export {
  inputComponent,
  buttonComponent,
  selectComponent,
  dataListComponent,
  options,
  button,
  input,
  label,
  inputGroup,
  selectGroup,
  textarea,
  select
};
