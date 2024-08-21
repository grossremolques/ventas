import { createPDF,htmlBoleto} from "../utils/GeneratePDF";
import {Currency} from '@utils/Currency'
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
const Print = (content) => {
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
  
  myData['priceLetter'] = priceOnLetter
  myData['fechaLarga'] = ` ${day} días del mes de ${month[0].toLocaleUpperCase()+month.slice(1)} del año ${year}`
  const html = htmlBoleto(myData)
  const view = `
    <div class="text-center mb-3">
        <button type="button" class="btn btn-success" id="back">Volver</button>
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
export { Print };
