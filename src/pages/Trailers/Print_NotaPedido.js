import { createPDF,htmlNotaPedido} from "@utils/GeneratePDF";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import {Currency} from '@utils/Currency'
const getFechaBoleto = (fecha_boleto) => {
if(fecha_boleto != '') {
  const splitDate = fecha_boleto.split('/');
  console.log(splitDate)
  return dayjs(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`)
}
else {
  return dayjs()
}
}
const Print_NotaPedido = async (content) => {
  dayjs.locale("es");
  dayjs.extend(localeData);
  console.log(dayjs('2024-05-01'))
  
  const hash = window.location.hash;
  const code = hash.slice(hash.indexOf("?") + 1);
  let params = new URLSearchParams(code);
  const data = params.get("data");
  const safeData = data.replace(/%/g, '%25')
  const myData = JSON.parse(decodeURIComponent(safeData));
  const date_boleto = getFechaBoleto(myData.fecha_boleto);
  console.log(date_boleto)
  const meses = dayjs.months();
  const month = meses[date_boleto.month()]//;
  const day = date_boleto.$D
  const year = date_boleto.$y
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

