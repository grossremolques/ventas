import { createPDF,htmlREG_009} from "../utils/GeneratePDF";
const PrintReg_009 = (content) => {
  const hash = window.location.hash;
  const code = hash.slice(hash.indexOf("?") + 1);
  let params = new URLSearchParams(code);
  const data = params.get("data");
  const safeData = data.replace(/%/g, '%25')
  const myData = JSON.parse(decodeURIComponent(safeData));
  const html = htmlREG_009(myData)
  const view = `
    <div class="text-center mb-3">
        <button type="button" class="btn btn-primary" id="back">Volver</button>
    </div>
    <div class="row">
        <div class="col frame">
            <iframe id="frame" src="" frameborder="0"></iframe>
        </div>
    </div>`;
  content.innerHTML = view;
  createPDF(html);

  const buttonPDF = document.querySelector("#back");
  buttonPDF.addEventListener("click", () => {
    const id = myData.trazabilidad;
    location.hash = `/used-trailer=${id}/`;
  });
};
export { PrintReg_009 };
