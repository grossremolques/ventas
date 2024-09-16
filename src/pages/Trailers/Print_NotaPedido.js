import { createPDF,htmlNotaPedido} from "@utils/GeneratePDF";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import {Currency} from '@utils/Currency'
const Print_NotaPedido = async (content) => {
  dayjs.locale("es");
  dayjs.extend(localeData);
  const meses = dayjs.months();
  const month = meses[dayjs().month()]//;
  const day = dayjs().$D
  const year = dayjs().$y
  const hash = window.location.hash;
  const code = hash.slice(hash.indexOf("?") + 1);
  let params = new URLSearchParams(code);
  let data = params.get("data");
  const myData = JSON.parse(decodeURIComponent(data)); 
  
  const currency = new Currency()
  const price = currency.convertirEnNumero( myData.valor_venta_efectiva)
  const priceOnLetter = currency.numInLetters(price)
  myData['today'] = `${day} de ${month} de ${year}`
  myData['priceLetter'] = priceOnLetter
  console.log(myData)
  const html = await htmlNotaPedido(myData)
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
    location.hash = `/trailer=${id}/`;
  });
};
export { Print_NotaPedido };

