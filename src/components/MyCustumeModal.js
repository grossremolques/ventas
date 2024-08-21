import { Modal } from "bootstrap";
import { button } from "./Form";
import Loader from "./Loader";
class MyCustumeModal extends Modal {
  constructor(element, options) {
    super(element, options);
  }
  create(props) {
    this.deleteButtonAction();
    const buttons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    buttons.forEach((elem) => elem.removeAttribute("disabled", ""));
    document.querySelector("#modalLabel").innerHTML = props.title;
    document.querySelector(".modal-body").innerHTML = props.content;
    this.actionCloseButton()
    this.show();
  }
  addButtonAction(props) {
    const btnAction = document.querySelector("#btnAction");
    const btn = button(props);
    btnAction.innerHTML = btn;
  }
  deleteButtonAction() {
    const btnAction = document.querySelector("#btnAction");
    const button = btnAction.querySelector("button");
    if (button) {
      btnAction.removeChild(button);
    }
  }
  disableCloseButtons() {
    const buttons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    buttons.forEach((elem) => elem.setAttribute("disabled", ""));
  }
  saving() {
    this.create({
      title: "⌛ Guardando",
      content: Loader.templeteLoader(),
    });
    this.disableCloseButtons();
  }
  success(message) {
    this.create({
      title: "✔️ Completado",
      content: `<p class="text-center">${message}</p>`,
    });
  }
  holdingRequest() {
    this.create({
      title: "⌛ Procesando",
      content: Loader.templeteLoader(),
    });
    this.disableCloseButtons();
  }
  error(e) {
    this.create({
      title: "❌ Error",
      content: `
        <p class="text-center">Hubo un problema, no se pudieron guardar los datos</p>
        <code>${e}</code>
        `,
    });
  }
  actionCloseButton(callback) {
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      this.hide();
    });
  }
}
export default MyCustumeModal;
