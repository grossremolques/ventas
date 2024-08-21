import jsPDF from "jspdf";
import logoGross from "@images/logo_gross.png";
import logoISO from "@images/logo_iso9001.png";
import { Modelos } from "../backend/Trailers";
const createPDF = (html) => {
  const frame = document.querySelector("#frame");
  const doc = new jsPDF("p", "pt", "legal");
  const margin = 30;
  doc.html(html, {
    x: margin,
    y: margin - 10,
    callback: function (doc) {
      frame.src = doc.output("bloburl");
    },
  });
};
const htmlBoleto = (data) => {
  console.log(data)
  const template = `
    <div class="contentPDF">
    ${header()}
      <main>
        <p class="title">BOLETO COMPRA Y VENTA</p>
        <p class="paragraph regular-font">
          Conste por la presente que entre el Señor Sucesores de Emilio Gross S.R.L</strong> como
          <em>vendedor</em>, y el Señor/a <strong>${
            data.razon_social
          }</strong> como <em>comprador</em>, se conviene lo
          siguiente: El Señor Sucesores de Emilio Gross S.R.L vende un
          vehículo marca <strong>${data.marca}</strong>, modelo <strong>${
    data.modelo
  }</strong>, chasis
          Nº <strong>${data.vin}</strong> dominio <strong>${
    data.dominio
  }</strong> año <strong>${data.anno}</strong>, en la localidad de
          General Ramírez en la suma total de <strong>${
            data.valor_venta_efectiva
          }</strong> <strong>(${data.priceLetter})</strong>.
        </p>
        <p class="paragraph regular-font">
          <em>Forma de pago</em>: <strong>${
            data.forma_pago_1
          }</strong>. <em>por medio de</em>: <strong>${data.medio_pago}</strong>
          ${
            data.forma_pago_add != 'N/A'
              ? `<br><em>Forma de pago</em>: <strong>${data.forma_pago_add}</strong>. <em>por medio de</em>: <strong>${data.medio_pago_add}</strong>`
              : ""
          }
        </p>
        <p class="paragraph regular-font"><em>(Lista vigente N°${
          data.num_lista
        }).</em></p>
        <p class="paragraph small">
          El vendedor se responsabiliza ampliamente por lo vendido, declarando bajo su responsabilidad civil y penal y
          los daños y perjuicios consiguientes, que lo vendido no está gravado con embargo alguno, ni prenda agraria
          (Ley 12.962), ni pesa sobre el mismo ningún impedimento que afecte mi derecho de disponer su venta, como
          también lo que pudiera adeudar en concepto de patente municipal o multas hasta el día de ser transferido el
          mismo.
        </p>
        <p class="paragraph small">Esta unidad se entrega en el estado de uso en que se encuentra y que el comprador declara
          conocer, al igual que todo lo concerniente a la marca, modelo, números de motor y/o chasis del referido
          vehículo, que ha sido revisado y constatado y acepta de plena conformidad haciéndose responsable civil y
          criminalmente, a partir de la fecha y hora de efectuada esta venta por cualquier accidente, daño y/o
          perjuicio
          que pudiera ocasionar el vehículo que es recibido en este acto con su documentación completa al día. El
          comprador se compromete a efectuar la correspondiente transferencia de dominio del vehículo dentro de los 10
          días de la fecha, de acuerdo a lo establecido al respecto por la Ley 22.977 y sus normas reglamentarias,
          interpretativas y/o complementarias, estando a su exclusivo cargo la totalidad de los gastos que demande la
          misma y los trámites y gestiones pertinentes, incluyendo la firma del formulario 08 o el que a tales fines
          los
          subsista o reemplace y/o el otorgamiento de poderes, todo ello en forma directa con el titular dominial.
          Transcurrido dicho plazo sin que se realizara la transferencia el vendedor no se responsabiliza por los
          inconvenientes de cualquier índole que pudieran existir, anteriores o posteriores a la fecha, que
          imposibilitaran la efectivización de dicho trámite, incluyendo embargos y/o prendas o medidas judiciales de
          cualquier tipo sobre el vehículo, al igual que deudas emergentes de patentes municipales y/o multas. Con
          absoluta conformidad del Comprador.-
        </p>
  
        <p class="paragraph small">En General Ramírez, a los <strong>${
          data.fechaLarga
        }</strong>, se firman dos ejemplares de
          un mismo tenor y a un solo efecto.- </p>
        <p class="paragraph small"><strong>OBSERVACIONES: </strong> <em>${
          data.obs_boleto
        }. <br>Con todos sus accesorios que se encuentran a la vista (visto por el cliente).</em> 
        </p>
        <p class="paragraph small">La unidad se entrega con trámite de transferencia presentada por la Empresa y se retira con seguro “realizado por el comprador”.
          <strong>El cliente retira la unidad de la fábrica de conformidad y sin derecho a reclamo alguno de la unidad recibida, habiendo sido revisada por el titular adquirente la mencionada unidad antes de firmar este ejemplar.-</strong>
        </p>
        <p class="paragraph small">(Los firmantes constituyen domicilio legal en los lugares denunciados del presente, a
          continuación de esta leyenda, donde tendrán validez todas las notificaciones que se practiquen y se someten
          en caso de diferendo a la jurisdicción y competencia de los Tribunales Ordinarios de la ciudad de Paraná,
          Provincia de Entre Ríos, con expresa renuncia a todo otro fuero o Jurisdicción que pueda corresponderles).-
        </p>
        <div class="signature">
          <div class="buyer">
            <ul>
              <li>COMPRADOR</li>
              <li>Señor: <strong>${data.razon_social}</strong></li>
              <li>Dni./Cuit.: <strong>${data.cuit}</strong></li>
              <li>Domicilio: <strong>${data.calle} ${data.num}</strong></li>
              <li>Localidad: <strong>${data.localidad}</strong></li>
              <li>Provincia: <strong>${data.provincia}</strong></li>
              <li>Cod. Postal: <strong>${data.cod_postal}</strong></li>
              <li>Teléfonos: <strong>${data.tel}</strong></li>
              <li>Correo electrónico: <strong>${data.email}</strong></li>
            </ul>
          </div>
          <div class="seller">
            <ul>
              <li>VENDEDOR</li>
              <li>Señor: <strong>Sucesores de Emilio Gross S.RL</strong></li>
              <li>Dni./Cuit.: <strong>33-71037240-9</strong></li>
              <li>Domicilios: <strong>Rca. Entre Ríos 1880</strong></li>
              <li>Localidad: <strong>General Ramírez</strong></li>
              <li>Provincia: <strong>Entre Ríos</strong></li>
              <li>Cód. Postal: <strong>3164</strong></li>
              <li>Teléfonos: <strong>0343-490-2101 / 1238</strong></li>
              <li>Correo electrónico: <strong>info@grossremolques.com</strong></li>
            </ul>
          </div>
        </div>
      </main>
      <footer>
        <div class="contenedor">
          <div class="box size_1">Firma</div>
          <div class="box size_2"></div>
          <div class="box size_1">Firma</div>
          <div class="box size_2"></div>
        </div>
        <div class="contenedor">
          <div class="box size_1">Aclaración</div>
          <div class="box size_2"></div>
          <div class="box size_1">Aclaración</div>
          <div class="box size_2"></div>
        </div>
        <div class="contenedor">
          <div class="box size_1">DNI N°:</div>
          <div class="box size_2"></div>
          <div class="box size_1">DNI N°:</div>
          <div class="box size_2"></div>
        </div>
      </footer>
  
    </div>
    `;
  return template;
};
const htmlREG_009 = (data) => {
  const template = `
      <div class="contentPDF">
        <header>
          <table class="reg_009">
            <tbody>
              <tr>
                <td rowspan="2" colspan="2" class="text-center p-1">
                  <img src="https://raw.githubusercontent.com/grossremolques/images/main/logos/GROSS%20logo%20NEGRO.png" alt="" height="45px">
                </td>
                <td colspan="4" class="text-center titulo" style="width: 100%"><strong>INGRESO DE UNIDAD USADA: CONTROL</strong></td>
              </tr>
              <tr>
                <td colspan="4">RESPONSABLE: ASESOR COMERCIAL</td>
              </tr>
              <tr>
                <td style="width: 105px">REVISIÓN</td>
                <td>07</td>
                <td>CÓDIGO:</td>
                <td>REG-CO-0009</td>
                <td>SECTOR:</td>
                <td>SERVICIOS</td>
              </tr>
              <tr class="brd-b">
                <td scope="row">FECHA DE EMISIÓN</td>
                <td> 25/01/2024</td>
                <td>SUBSECTOR:</td>
                <td>GENERAL</td>
                <td>PAGINAS:</td>
                <td>1/1</td>
              </tr>
            </tbody>
          </table>
        </header>
        <main class="mt-3" id="content-register">
          <table class="reg_009">
            <thead>
              <tr>
                <th colspan="2" class="title-table">Datos del cliente</th>
              </tr>
            </thead>
            <tbody>
              <tr class="brd-b">
                <td class="cell-title brd-b" style="width: 170px">Razón Social / Nombre Completo</td>
                <td>${data.razon_social}</td>
              </tr>
              </tbody>
              </table>
          <table class="mt-2 reg_009">
            <thead>
              <tr>
                <th colspan="6" class="title-table">Datos dela unidad</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td class="cell-title">Marca</td>
                <td>${data.marca}</td>
                <td class="cell-title">Dominio</td>
                <td>${data.dominio}</td>
                <td class="cell-title">VIN</td>
                <td>${data.vin}</td>
              </tr>
              <tr>
                <td class="cell-title">Carrozado</td>
                <td>${data.carrozado}</td>
                <td class="cell-title">Largo</td>
                <td>${data.largo}</td>
                <td class="cell-title">Color</td>
                <td>${data.color_carrozado}${
    data.color_franja != "N/A" ? ` / ${data.color_franja}` : ""
  }</td>
              </tr>
              <tr class="brd-b">
                <td class="cell-title brd-b">Tipo</td>
                <td>${data.tipo}</td>
                <td class="cell-title brd-b">Vendedor</td>
                <td>${data.registrado_por}</td>
                <td class="cell-title brd-b">Fecha de registro</td>
                <td>${data.fecha}</td>
              </tr>
            </tbody>
          </table>
          <h6 class="mt-3">Características y Detalles en la unidad</h6>
          <table class="table-description reg-009">
            <thead class="thead-description">
              <tr class="brd-t brd-l">
                <th>Descripción</th>
                <th style="width: 75px">Cant./Medida<br>(Declarada)</th>
                <th style="width: 75px">Cant./Medida<br>(Real)</th>
                <th style="width: 60px">Faltante</th>
                <th style="width: 60px">Control</th>
              </tr>
            </thead>
            <tbody class="tbody-description">
              <tr class="brd-t">
                <td>Patentes</td>
                <td>${data.patentes}</td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              </tr>
              <tr class="brd-t">
                <td>Chapa identificatoria</td>
                <td>${data.chapa_ident}</td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              </tr>
              <tr>
                <td>¿Coincide grabado en chasis con VIN?</td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              </tr>
              <tr>
                <td>Llantas de Chapa (9.00 x 22.5)</td>
                <td>${data.llanta_med_9}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Llantas de Chapa (8.50 x 22.5)</td>
                <td>${data.llanta_med_8}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Arcos loneros</td>
                <td>${data.arcos}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Acoples</td>
                <td>${
                  data.acoples_cant != 0
                    ? `${data.acoples_cant} de ${data.acoples_med} mm`
                    : "No"
                }</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Separadores <span class="table-span">CAÑO | CADENA | FAJA</span></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tensores Puertas lat. <span class="table-span">CAÑO | CADENA | FAJA</span></td>
                <td class="cell-disabled"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tensores Parantes lat. <span class="table-span">CAÑO | CADENA | FAJA</span></td>
                <td class="cell-disabled"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tensor Puerta tras. <span class="table-span">CAÑO | CADENA | FAJA</span></td>
                <td class="cell-disabled"></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Cajón de herramientas<span class="table-span">Tipo: ${
                  data.cajon_mat
                }</span></td>
                <td>${data.cajon_med} mm</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Tanque de agua</td>
                <td>${data.tanque_agua} mm</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Boquillas</td>
                <td>${data.boquillas}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Guardabarros<span class="table-span">Tipo: ${
                  data.guardabarros_mat
                }</span></td>
                <td>${data.guardabarros_med}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Guardafangos</td>
                <td>${data.guardafangos}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Faldón de para golpes: <span class="table-span">${
                  data.faldon_paragolpes
                }</span></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td></td>
              </tr>
              <tr>
                <td>Cintas reflectivas</td>
                <td class="cell-disabled"></td>
                <td></td>
                <td></td>
                <td class="cell-disabled cell-disabled--top"></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Luces laterales<span class="table-span">Tipo: ${
                  data.luces_lat_tipo
                }</span></td>
                <td>${data.luces_lat_cant}</td>
                <td></td>
                <td></td>
                <td class="cell-disabled"></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Luces trasera<span class="table-span">Tipo: ${
                  data.luces_trs_tipo
                }</span></td>
                <td>${data.luces_trs_cant}</td>
                <td></td>
                <td></td>
                <td class="cell-disabled"></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tensión  <span class="table-span">Tipo: ${
                  data.tension
                }V</span></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td class="cell-disabled cell-disabled--top"></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tapa facil/Destape<span class="table-span">${
                  data.destape
                }</span></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              <tr>
                <td class="cell-content-flex">Levanta eje<span class="table-span">${
                  data.levanta_eje
                }</span></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Vigía<span class="table-span">${
                  data.vigia
                }</span></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td class="cell-disabled"></td>
                <td></td>
              </tr>
              <tr>
                <td class="cell-content-flex">Detalles en Chapa<span class="table-span">${
                  data.defectos_superficie
                }</span></td>
                <td colspan="4"><small><em>Marque las que apliquen:</em></small><br>Abollones | Golpes | Rallones | Corrosión | Oxidación severa</td>
              </tr>
              <tr class="">
                <td class="cell-content-flex">Control limpieza<span class="table-span">Lavado general, interior y boquillas</span></td>
                <td class="cell-disabled "></td>
                <td class="cell-disabled "></td>
                <td class="cell-disabled "></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"><strong>Observaciones</strong></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"><strong>Nota</strong></td>
              </tr>
              <tr class="brd-b">
                <td colspan="6">
                  <small>Los datos aquí relevados deben ser actualizados en el registro digital correspondiente por el <strong>Asesor Comercial</strong> responsable de la toma de la unidad usada</small>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer>
          <div class="d-flex">
            <div class="col">
              <h6>Controlo</h6>
            </div>
            <div class="col">
              <h6>Propietario/Chofer</h6>
            </div>
          </div>
          <div class="contenedor">
            <div class="box size_1">Firma</div>
            <div class="box size_2"></div>
            <div class="box size_1">Firma</div>
            <div class="box size_2"></div>
          </div>
          <div class="contenedor">
            <div class="box size_1">Aclaración</div>
            <div class="box size_2"></div>
            <div class="box size_1">Aclaración</div>
            <div class="box size_2"></div>
          </div>
          <div class="contenedor">
            <div class="">Fecha de Control</div>
            <div class=""> /_____/_____/_____</div>
          </div>
        </footer>
      </div>
      `;
  return template;
};
const html_informe = (data) => {
  const template = `
      <div class="contentPDF">
        <header>
          <table class="reg_009">
            <tbody>
              <tr>
                <td rowspan="2" colspan="2" class="text-center p-1">
                  <img src="https://raw.githubusercontent.com/grossremolques/images/main/logos/GROSS%20logo%20NEGRO.png" alt="" height="45px">
                </td>
                <td colspan="4" class="text-center titulo" style="width: 100%"><strong>TOMA DE UNIDAD USADA: CONTROL</strong></td>
              </tr>
              <tr>
                <td colspan="4">RESPONSABLE: ASESOR COMERCIAL</td>
              </tr>
              <tr>
                <td style="width: 105px">REVISIÓN</td>
                <td>00</td>
                <td>CÓDIGO:</td>
                <td>REG-CO-0193</td>
                <td>SECTOR:</td>
                <td>COMERCIAL</td>
              </tr>
              <tr class="brd-b">
                <td scope="row">FECHA DE EMISIÓN</td>
                <td> 16/08/2024</td>
                <td>SUBSECTOR:</td>
                <td>GENERAL</td>
                <td>PAGINAS:</td>
                <td>1/1</td>
              </tr>
            </tbody>
          </table>
        </header>
        <main class="mt-3" id="content-register">
          <table class="reg_009">
            <thead>
              <tr>
                <th colspan="2" class="title-table">Datos del cliente</th>
              </tr>
            </thead>
            <tbody>
              <tr class="brd-b">
                <td class="cell-title brd-b" style="width: 170px">Razón Social / Nombre Completo</td>
                <td>${data.razon_social}</td>
              </tr>
              </tbody>
              </table>
          <table class="mt-2 reg_009">
            <thead>
              <tr>
                <th colspan="6" class="title-table">Datos dela unidad</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td class="cell-title">Marca</td>
                <td>${data.marca}</td>
                <td class="cell-title">Dominio</td>
                <td>${data.dominio}</td>
                <td class="cell-title">VIN</td>
                <td>${data.vin}</td>
              </tr>
              <tr>
                <td class="cell-title">Carrozado</td>
                <td>${data.carrozado}</td>
                <td class="cell-title">Largo</td>
                <td>${data.largo}</td>
                <td class="cell-title">Color</td>
                <td>${data.color_carrozado}${data.color_franja != "N/A" ? ` / ${data.color_franja}` : ""}</td>
              </tr>
              <tr class="brd-b">
                <td class="cell-title brd-b">Tipo</td>
                <td>${data.tipo}</td>
                <td class="cell-title brd-b">Vendedor</td>
                <td>${data.registrado_por}</td>
                <td class="cell-title brd-b">Fecha de registro</td>
                <td>${data.fecha}</td>
              </tr>
            </tbody>
          </table>
          <h6 class="mt-3">Características y Detalles en la unidad</h6>
          <table class="table-description reg-009">
            <thead class="thead-description">
              <tr class="brd-t brd-l">
                <th style="height: 25px; background: #ddd">Descripción</th>
                <th style="width: 175px; height: 25px; background: #ddd">Detalles</th>
              </tr>
            </thead>
            <tbody class="tbody-description">
              <tr class="brd-t">
                <td>Patentes</td>
                <td>${data.patentes}</td>
              </tr>
              <tr class="brd-t">
                <td>Chapa identificatoria</td>
                <td>${data.chapa_ident}</td>
              </tr>
              <tr>
                <td>Llantas de Chapa (9.00 x 22.5)</td>
                <td>${data.llanta_med_9}</td>
              </tr>
              <tr>
                <td>Llantas de Chapa (8.50 x 22.5)</td>
                <td>${data.llanta_med_8}</td>
              </tr>
              <tr>
                <td>Arcos loneros</td>
                <td>${data.arcos}</td>
              </tr>
              <tr>
                <td>Acoples</td>
                <td>${
                  data.acoples_cant != 0
                    ? `${data.acoples_cant} de ${data.acoples_med} mm`
                    : "No"
                }</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Cajón de herramientas</td>
                <td>Tipo: ${data.cajon_mat} de ${data.cajon_med} mm</td>
              </tr>
              <tr>
                <td>Tanque de agua</td>
                <td>${data.tanque_agua} mm</td>
              </tr>
              <tr>
                <td>Boquillas</td>
                <td>${data.boquillas}</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Guardabarros</td>
                <td>Tipo: ${data.guardabarros_mat} | Cant.: ${data.guardabarros_med}</td>
              </tr>
              <tr>
                <td>Guardafangos</td>
                <td>${data.guardafangos}</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Faldón de para golpes</td>
                <td>${data.faldon_paragolpes}</td>
              </tr>
              
              <tr>
                <td class="cell-content-flex">Luces laterales<span class="table-span"></span></td>
                <td>Tipo: ${data.luces_lat_tipo} | Cant.: ${data.luces_lat_cant}</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Luces trasera</td>
                <td>Tipo: ${data.luces_trs_tipo} | Cant.: ${data.luces_trs_cant}</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tensión</td>
                <td>Tipo: ${data.tension}V</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Tapa facil/Destape</td>
                <td>${data.destape}</td>
              <tr>
                <td class="cell-content-flex">Levanta eje</td>
                <td>${data.levanta_eje}</td>
              </tr>
              <tr>
                <td class="cell-content-flex">Vigía</td>
                <td>${data.vigia}</td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"><strong>Observaciones</strong></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"></td>
              </tr>
              <tr>
                <td colspan="6"><strong>Nota</strong></td>
              </tr>
              <tr class="brd-b">
                <td colspan="6">
                  <small>Se advierte que de presentar roturas o no contar con todos los componentes descritos en la presente planilla (incluyendo la limpieza de la unidad), los mismos serán abonados al momento de entregar la unidad</small>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer>
          <div class="d-flex">
            <div class="col">
              <h6>Vendedor</h6>
            </div>
            <div class="col">
              <h6>Propietario</h6>
            </div>
          </div>
          <div class="contenedor">
            <div class="box size_1">Firma</div>
            <div class="box size_2"></div>
            <div class="box size_1">Firma</div>
            <div class="box size_2"></div>
          </div>
          <div class="contenedor">
            <div class="box size_1">Aclaración</div>
            <div class="box size_2"></div>
            <div class="box size_1">Aclaración</div>
            <div class="box size_2"></div>
          </div>
          <div class="contenedor">
            <div class="">Fecha de Control</div>
            <div class=""> /_____/_____/_____</div>
          </div>
        </footer>
      </div>
      `;
  return template;
};
const footerNotaPedido = () => {
  const template = `
    <div class="contenedor">
      <div class="box size_1">Firma</div>
      <div class="box size_2"></div>
      <div class="box size_1">Firma</div>
      <div class="box size_2"></div>
    </div>
    <div class="contenedor">
      <div class="box size_1">Aclaración</div>
      <div class="box size_2"></div>
      <div class="box size_1">Aclaración</div>
      <div class="box size_2"></div>
    </div>
    <div class="contenedor">
      <div class="box size_1">DNI N°:</div>
      <div class="box size_2"></div>
      <div class="box size_1">DNI N°:</div>
      <div class="box size_2"></div>
    </div>
    <p class="paragraph x-small text-center border-top mt-3 pt-3">
    Sucesores de Emilio Gross S.R.L.
    <br>
    República de Entre Ríos 1880.  –  General Ramírez. (3164)  –  Entre Ríos. – Argentina.
    <br>
    Tel./Fax: +54 (0343) 4902101/4901238 – E-mail: info@grossremolques.com – Web: www.grossremolques.com
    </p>
    `;
  return template;
};
const header = () => {
  const template = `
    <header class="header">
      <div>
        <img src='${logoGross}' alt="logo" width="210px">
      </div>
      <div>
        <img src='${logoISO}' alt="" width="65px">
      </div>
    </header>
    `;
  return template;
};
const htmlNotaPedido = async (data) => {
  const template = `
    <div class="contentPDF">
      ${header()}
      <main class="nota-pedido">
        <p class="title">NOTA DE PEDIDO</p>
        <p class="id_vendedor">${data.legajo}</p>
        <p class="paragraph small text-end">General Ramírez, ${data.today}</p>
        <p class="paragraph small text-end"><strong>${
          data.trazabilidad
        }</strong></p>
        <p class="paragraph small">Fecha de disponibilidad estimada: ${
          data.f_disp_estimada
        }</p>
        <h6 class="mt-3">Datos del solicitante</h6>
          ${datosCliente(data)}
        <p class="paragraph regular-font mt-4">
          Señor Gerente y/o Representante legal de <strong>SUCESORES DE EMILIO GROSS S.R.L., C.U.I.T. N° 33-71037240-9</strong>, solicito a usted se sirva considerar mi propuesta de compra por la unidad citada a continuación, de fabricación nacional, tomando como base las condiciones de venta insertadas en la presente nota de pedido: 
        </p>
        <p class="paragraph regular-font">
          ${initial(data)}${dimensions(data)}${doors(data)}${data.puerta_trasera != "N/A" ? backDoor(data) : ""}${batea(data)}${getTipoDestape(data)}${seguros(data)}${boquillas(data)}${floor(data)}${kitAcople(data)}${centroEje(data)}${cajonHerramientas(data)}${typeSider(data)}; chasis color AZUL GROSS, carrozado color <strong>${data.color_carrozado.toLocaleUpperCase()}</strong>${franja(data)}
        </p>
        ${await adicionales(data)}
        ${comments(data)}
      </main>
      <footer>
        ${footerNotaPedido()}
      </footer>
    </div>
    <div class="contentPDF segunda-pag">
      ${header()}
      <main class="nota-pedido">
        <p class="title">CONDICIÓN DE PAGO</p>        
        <p class="paragraph regular-font mt-4">
          Acepto el precio, fijado por Uds. para dicha unidad y sus accesorios que asciende a la suma de: <strong>${
            data.valor_venta_efectiva
          } (${
    data.priceLetter
  })</strong> I.V.A. incluido, y cuyo pago propongo, realizar de acuerdo al siguiente detalle:
        </p>
        <p class="paragraph regular-font">
          <em>Forma de pago</em>: <strong>${
            data.forma_pago_1
          }</strong>. <em>por medio de</em>: <strong>${data.medio_pago}</strong>
          ${
            data.forma_pago_add != 'N/A'
              ? `<br><em>Forma de pago</em>: <strong>${data.forma_pago_add}</strong>. <em>por medio de</em>: <strong>${data.medio_pago_add}</strong>`
              : ""
          }
          ${data.unidad_usada ? datosUnidadUsada(data) : ""}
        </p>
        <p class="paragraph regular-font"><em>(Lista vigente N°${
          data.num_lista
        }).</em></p>
        <p class="paragraph regular-font">
          Todos los pagos que deba efectuar el comprador (ya sea devengados por anticipos, cuotas mensuales o trimestrales, gastos de gestoría, sellados, etc.) deberán ser cancelados en efectivo, o en cheques.
        </p>
        ${condiciones()}
      </main>
      <footer>
        ${footerNotaPedido()}
      </footer>
  
    </div>
    `;
  return template;
};
const adicionales = async (data) => {
  const modelos = await Modelos.getModelos();
  const modelo = modelos.find((item) => item.modelo.value === data.modelo);
  const lista_adicionales = [];
  for (let item in modelo) {
    if (modelo[item].tipo_dato === "Adicional") {
      lista_adicionales.push(item);
    }
  }
  const addData = [];
  lista_adicionales.map((item) => {
    const add = adicionalesDefault(data)[item];
    if (add[1]) {
      addData.push(add[0]);
    }
  });
  const template = `
  <h6 class="mt-3">Adicionales</h6>
  ${
    addData.length > 0
      ? `
    <ul>
      ${addData
        .map(
          (item) => `
          <li>${item}</li>`
        )
        .join("")}
    </ul>
    `
      : '<p class="paragraph regular-font">Sin adicionales registrados<p>'
  }`;
  return template;
};
const adicionalesDefault = (data) => {
  return {
    boq_oculta: [`${data.boq_oculta} boquillas oculas`, data.boq_oculta != '0' ? true: false],
    boq_st: [`${data.boq_st} boquillas estándar`, data.boq_st != '0' ? true: false],
    cajon: [
      `1 Cajón de herramientas de ${data.cajon} mm`,
      data.cajon > 0 ? true : false,
    ],
    kit_acople_adicional_fijo: [
      `Acoples para arcos adicionales de ${data.kit_acople_adicional_fijo} mm`,
      data.kit_acople_adicional_fijo > 0 ? true : false,
    ],
    seg_lat: [
      "Seguros en laterales",
      data.seg_lat == "Sí" && data.tipo == "Carrocería" ? true : false,
    ],
    seg_tras: [
      "Seguros en puerta trasera",
      data.seg_tras == "Sí" && data.tipo == "Carrocería" ? true : false,
    ],
    levanta_eje: ["Levanta eje", data.levanta_eje == "Sí" ? true : false],
    bulon_largo: [
      "Bulones largos para llantas de aluminio",
      data.bulon_largo == "Sí" ? true : false,
    ],
    cajon_adicional: [
      `1 Cajón de herramientas adicional de ${data.cajon_adicional} mm`,
      data.cajon_adicional > 0 ? true : false,
    ],
    cajon_carroceria_1: [
      `1 Cajón de herramientas de ${
        data.cajon_carroceria_1
      } mm - Ubic. ${translateUbicCajon(data.cajon_carroceria_ubic_1)}`,
      data.cajon_carroceria_1 > 0 ? true : false,
    ],
    cajon_carroceria_2: [
      `1 Cajón de herramientas de ${
        data.cajon_carroceria_2
      } mm - Ubic. ${translateUbicCajon(data.cajon_carroceria_ubic_2)}`,
      data.cajon_carroceria_2 > 0 ? true : false,
    ],
    porta_auxilio: [
      "Porta auxilio simple adicional",
      data.porta_auxilio == "Doble" ? true : false,
    ],
    cajon_frente: [
      `1 Cajón en frente de ${data.cajon_frente}`,
      data.cajon_frente > 0 ? true : false,
    ],
    tanq_agua_1: [
      `1 Tanque de agua - Ubic. ${translateUbicCajon(data.tanq_agua_1)}`,
      data.tanq_agua_1 != "N/A" ? true : false,
    ],
    tanq_agua_2: [
      `1 Tanque de agua - Ubic. ${translateUbicCajon(data.tanq_agua_2)}`,
      data.tanq_agua_2 != "N/A" ? true : false,
    ],
    boq_st_trasera: [
      `${data.boq_st_trasera} Boquillas atrás`,
      data.boq_st_trasera > 0 ? true : false,
    ],
    boq_st_delantera: [
      `${data.boq_st_delantera} Boquillas adelante`,
      data.boq_st_delantera > 0 ? true : false,
    ],
    divisor_cono: [
      "Con divisor de cono",
      data.divisor_cono == "Sí" ? true : false,
    ],
    rampa: ["Rampa de descarga", data.rampa == "Sí" ? true : false],
    ojal_perno_rey: [
      `Con ojal ${data.ojal_perno_rey}`,
      data.tipo == "Acoplado" && data.ojal_perno_rey != "Nro 3" ? true : false,
    ],
    cajon_carroceria_ubic_1: ["", false],
    cajon_carroceria_ubic_2: ["", false],
    rampa: ['Con rampa',data.rampa=== 'Sí' ? true: false]
};}
const condiciones = () => {
  const template = `
      <p class="title mt-3 mb-2">CONDICIONES GENERALES DE LA PRESENTE NOTA DE PEDIDO:</p>
        <p class="paragraph x-small">
          <em>PRIMERA</em>: La presente nota de pedido carecerá de eficacia si no es aceptada en el término de treinta (30) días por los representantes de la sociedad denominada “SUCESORES DE EMILIO GROSS S.R.L.”. A  todo efecto se considerarán representantes únicamente los socios de ésta firma social, los Sres. ANGELICA MULLER DE GROSS, GROSS DIEGO MARTIN, GROSS JULIETA ANABEL
        </p>
        <p class="paragraph x-small">
          <em>SEGUNDA</em>: Se deja constancia que la sociedad denominada “SUCESORES DE EMILIO GROSS S.R.L.” no poseen agencias, distribuciones, representantes y/o mandatarios. Por tal motivo las únicas autorizadas a dar la conformidad al presente son las personas indicadas en la cláusula anterior
        </p>
        <p class="paragraph x-small">
          <em>TERCERA</em>: Una vez suscripta la presente por parte de cualquiera de los representantes de la sociedad denominada “SUCESORES DE EMILIO GROSS S.R.L.” designados, la presente surtirá todos los efectos como Nota de Solicitud con las obligaciones y derechos expresamente determinados en la presente.
        </p> 
        <p class="paragraph x-small">
          <em>CUARTA</em>: Se suscriben conjuntamente con las presentes los siguientes anexos:
          <br>ANEXO A-1: Conexiones eléctricas de luces.
          <br>ANEXO A-2: Conexiones neumática de frenos y acoplamientos mecánicos.
          <br>GARANTÍA
          <br>Los anexos precitados se considerarán parte integral del presente.
        </p>
        <p class="paragraph x-small">
          <em>QUINTA</em>: Para el caso de que la operación se efectúe bajo una  modalidad que no sea expresamente contado, a los fines de garantizar el pago del saldo de precio convenido, el solicitante se obliga a constituir un contrato de prenda  sobre la unidad requerida, a favor de “SUCESORES DE EMILIO GROSS S.R.L.”.
        </p>
        <p class="paragraph x-small">
          <em>SEXTA</em>: El Solicitante deberá proceder al retiro de la unidad adquirida cuando se le notifique al efecto. Transcurridos cinco (5) días de la fecha asignada para la entrega, sin que el comprador retire la misma, “SUCESORES DE EMILIO GROSS S.R.L.”, no se hará responsable por los daños y perjuicios que pudiera sufrir la unidad, quedando habilitado éste último para  contratar un seguro por cuenta y orden del Solicitante, debiendo éste último abonar su costo como condición para retirar la unidad. La unidad solo podrá retirarse una vez culminada la transferencia dominial correspondiente y con la presentación del seguro de responsabilidad civil adecuada.
        </p>
        <p class="paragraph x-small">
          <em>SÉPTIMA</em>: El Solicitante declara conocer fehacientemente los términos y condiciones en que se presta la garantía de fábrica para las unidades cero km., conexiones eléctricas y acople neumático y mecánico al momento de proceder al retiro de la unidad de fábrica, según lo expresado en los anexos que se adjuntan al presente contrato, formando parte integrante del mismo. En todo caso las únicas garantías que prestará la sociedad denominada “SUCESORES DE EMILIO GROSS S.R.L.” serán las indicadas en los respectivos Anexos y dentro de los límites legales vigentes correspondientes a las normas del Derecho de Defensa del Consumidor
        </p>
        <p class="paragraph x-small">
          <em>OCTAVA</em>: El Solicitante que proceda a entregar una unidad usada como parte de pago,  deberá proporcionar simultáneamente la documentación pertinente para realizar la transferencia de dominio, la misma deberá ser entregada con VTV vigente y lavada completamente. El valor de la unidad usada será acreditado como parte de pago sólo cuando se haya registrado la transferencia dominial. La misma deberá encontrarse libre de embargos, gravámenes y deudas.  Si la transferencia no pudiese concretarse, por cualquier impedimento ajeno a “SUCESORES DE EMILIO GROSS S.R.L.” o la misma tuviera gravámenes o deudas,  el solicitante deberá   sustituir el valor de dicho bien por el importe correspondiente en un plazo de cinco (5) días, contados a partir de la notificación fehaciente efectuada por  “SUCESORES DE EMILIO GROSS S.R.L.”, en caso contrario ésta sociedad podrá efectuar el reclamo por las vías legales correspondientes.
        </p>
        <p class="paragraph x-small">
          <em>NOVENA</em>: Si el solicitante es RESPONSABLE INSCRIPTO en IVA entregará fotocopia de la constancia de inscripción. Si es CONSUMIDOR FINAL, EXENTO o NO INSCRIPTO presentará Declaración Jurada. Todo RESPONSABLE INSCRIPTO que entregue una unidad usada como parte de pago deberá facturar a “SUCESORES DE EMILIO GROSS S.R.L.” la unidad entregada efectuando el desglose del IVA correspondiente. De ser CONSUMIDOR FINAL, EXENTO, o NO INSCRIPTO, deberá proporcionar factura de compra o boleto de compraventa a su nombre, de la unidad que entrega como parte de pago.
        </p>
        <p class="paragraph x-small">
          <em>DECIMA</em>: El precio de la unidad nueva con sus correspondientes accesorios serán los que se encuentren vigentes en la lista de precios de “SUCESORES DE EMILIO GROSS S.R.L.” al momento de la entrega de la unidad, la cual será debidamente facturada a nombre del solicitante. Dicha entrega se efectuará en el domicilio de la vendedora, sito en República de Entre Ríos 1880, General Ramírez, provincia de Entre Ríos.
        </p>
        <p class="paragraph x-small">
          <em>DECIMA PRIMERA</em>: El trámite de inscripción o transferencia de la unidad se efectuará  por medio del gestor  administrativo que designe “SUCESORES DE EMILIO GROSS S.R.L.”, siendo los gastos y honorarios que ello  devengue  soportados exclusivamente por el solicitante.
        </p>
        <p class="paragraph x-small">
          <em>DECIMA SEGUNDA</em>: La falta de pago de una cuota pactada o de cumplimiento de cualquiera de las obligaciones asumidas por el solicitante,  en la forma y plazo expresados, lo hará incurrir en mora  automática, sin  necesidad   de interpelación  judicial  ni  extrajudicial  de   ninguna especie, provocará la caducidad de los plazos restantes y dará  derecho  a “SUCESORES DE EMILIO GROSS S.R.L.” a reclamar el total adeudado como si fuere de plazo vencido, con más sus intereses moratorios y punitorios conforme a la tasa mensual variable que aplique el Banco de la Nación Argentina en sus operaciones de descuentos de documentos comerciales a treinta días de plazo.
        </p>
        <p class="paragraph x-small">
          <em>DÉCIMA TERCERA</em>: Ningún recibo de pago será considerado válido si no está debidamente suscripto por cualquiera de los representantes de “SUCESORES DE EMILIO GROSS S.R.L.” indicados supra.
        </p>
        <p class="paragraph x-small">
          <em>DÉCIMA CUARTA</em>: Si el solicitante procediera a rescindir unilateralmente la presente Nota de Pedido, “SUCESORES DE EMILIO GROSS S.R.L.” tendrá derecho a retener para sí, en concepto de indemnización por el mero incumplimiento y los daños y perjuicios, el cincuenta por ciento (50%) del importe recibido a cuenta del precio. El remanente será devuelto al comprador una vez llegada la fecha pactada para la entrega de la unidad, sin intereses ni recargos de ninguna índole.
        </p>
        <p class="paragraph x-small">
          <em>DECIMA QUINTA</em>: Para todos los efectos derivados  del  presente las  partes  se  someten  a  la  jurisdicción  de   los Tribunales Ordinarios  de  la  ciudad  de  Paraná, provincia de Entre Ríos,  renunciado   expresamente  a  cualquier  otro  fuero  o jurisdicción    que   por   cualquier   causa    pudiere corresponderles  inclusive  el Federal.
        </p>
        <p class="paragraph x-small">
          En  prueba  de conformidad, previa lectura y ratificación se firman dos ejemplares de ley, de un mismo tenor y a un solo efecto,  recibiendo cada parte el suyo en éste acto.
        </p>
    `;
  return template;
};
const datosCliente = (data) => {
  const paragraph = `
  <div class="datos-clientes me-1">
    <div class="row">
      <div class="col-auto ps-0">Nombre/Razón Social:</div>
      <div class="col border-bottom resaltar">${data.razon_social}</div>
    </div>
    <div class="row">
      <div class="col-auto ps-0">CUIT:</div>
      <div class="col border-bottom resaltar">${data.cuit}</div>
      <div class="col-auto">¿Es agente de retención?:</div>
      <div class="col border-bottom resaltar">${data.retencion}</div>
      <div class="col-auto">Cod. Postal:</div>
      <div class="col border-bottom resaltar">${data.cod_postal}</div>
    </div>
    <div class="row">
      <div class="col-auto ps-0">Domicilio:</div>
      <div class="col border-bottom resaltar">${data.calle} ${data.num}</div>
      <div class="col-auto">Localidad:</div>
      <div class="col border-bottom resaltar">${data.localidad}</div>
    </div>
    <div class="row">
      <div class="col-auto ps-0">Departamento/Partido:</div>
      <div class="col border-bottom resaltar">${data.partido}</div>
      <div class="col-auto">Provincia:</div>
      <div class="col border-bottom resaltar">${data.provincia}</div>
    </div>
    <div class="row">
      <div class="col-auto ps-0">TEL:</div>
      <div class="col border-bottom resaltar">${data.tel}</div>
      <div class="col-auto">Email:</div>
      <div class="col border-bottom resaltar">${data.email}</div>
    </div>
  </div>
  `;
  return paragraph;
};
const initial = (data) => {
  const paragraph = `Un${data.tipo === "Carrocería" ? "a" : ""} <strong>${
    data.tipo
  } ${data.carrozado}</strong>, nuev${
    data.tipo === "Carrocería" ? "a" : "o"
  }, marca GROSS, material COMÚN; ${
    data.tipo != "Carrocería"
      ? `con chasis de <strong>${data.ejes
          .replace(/D/g, "")
          .replace(
            "-",
            " + "
          )}</strong> ejes tubulares, mazas tipo disco, y campanas de freno de 8 pulgadas${data.pbt_trabajo!='N/A'? `; peso bruto total de trabajo de <strong>${data.pbt_trabajo}</strong>`:''}${getTipoLlanta(data)} de ${data.medidas} pulgadas</strong>; suspensión <strong>${data.suspension.toLocaleLowerCase()}</strong>; sistema de frenos neumático ABS;`
      : ""
  } luces reglamentarias LED de 24 [V]${data.porta_auxilio!='N/A'? `; con porta auxilio <strong>${data.porta_auxilio}</strong>`:''}`;
  return paragraph;
};
const dimensions = (data) => {
  const paragraph = `${
    data.carrozado.includes("Batea")
      ? ""
      : `; de <strong>${data.largo}</strong> mm de largo interior, por <strong>${data.ancho}</strong> mm de ancho interior y <strong>${data.alto}</strong> mm de alto`
  }
  `;
  return paragraph;
};
const doors = (data) => {
  let paragraph = "";
  if (data.carrozado === "Todo puertas") {
    paragraph = `con <strong>${
      data.cant_puertas_laterales / 2
    } PUERTAS</strong> por lado`;
  } else if (
    data.carrozado === "Baranda rebatible" ||
    data.carrozado.includes("Volcador")
  ) {
    paragraph = `, con <strong>${
      data.cant_puertas_laterales / 2
    } BARANDAS</strong> por lado de <strong>${
      data.altura_baranda
    }</strong> mm de alto`;
  }
  return paragraph;
};
const backDoor = (data) => {
  const paragraph = `; puerta trasera tipo <strong>${data.puerta_trasera.toLocaleUpperCase()}</strong>`;
  return paragraph;
};
const floor = (data) => {
  const paragraph = `${
    data.piso != "N/A"
      ? `; piso <strong>${data.piso.toLocaleLowerCase()}</strong> de <strong>${
          data.espesor
        }</strong> mm de espesor`
      : ""
  }`;
  return paragraph;
};
const kitAcople = (data) => {
  const paragraph = `${
    data.kit_acople != "N/A"
      ? `; con kit de acople <strong>${data.kit_acople.toLocaleLowerCase()}</strong>`
      : ""
  }`;
  return paragraph;
};
const franja = (data) => {
  const paragraph = `${
    data.color_franja != "N/A"
      ? `, con franja en zócalo lateral color <strong>${data.color_franja}</strong>`
      : ""
  }`;
  return paragraph;
};
const datosUnidadUsada = (data) => {
  const paragraph = `<br><em>Forma de pago</em>: <strong>Unidad usada, de mi exclusiva propiedad, libre de todo gravamen</strong>.<br>Tipo: <strong>${
    data.usada.tipo
  }</strong>, Marca: <strong>${data.usada.marca}</strong>, Modelo: <strong>${
    data.usada.modelo
  }</strong>, Año: <strong>${data.usada.anno}</strong>, Chasis Nº: <strong>${
    data.usada.vin
  }</strong>, Color: <strong>${data.usada.color_carrozado}${
    data.usada.color_franja ? ` y ${data.usada.color_frnaja}` : ""
  }</strong>, Dominio: <strong>${
    data.usada.dominio
  }</strong>, tasado en <strong>${data.usada.tasacion}</strong> IVA incluido.`;
  return paragraph;
};
const getTipoLlanta = (data) => {
  let tipo_llanta;
  if (data.llantas_acero > 0 && data.llantas_aluminio > 0) {
    tipo_llanta = `; ${data.llantas_acero} llantas de ACERO y ${data.llantas_aluminio} llantas de ALUMINIO`;
  } else if (data.llantas_acero > 0) {
    tipo_llanta = `; ${data.llantas_acero} llantas de ACERO`;
  } else {
    tipo_llanta = `; ${data.llantas_aluminio} llantas de ALUMINIO`;
  }
  return tipo_llanta;
};
const getTipoDestape = (data) => {
  const arcos = (tipo) => {
    return tipo === "Estándar" ? "27.9 mm" : "42.5 mm";
  };
  const cant_arcos = (cant) => {
    return cant / 2 + (cant / 2 - 1);
  };
  let tipo_destape = '';
  if(!data.carrozado.includes('Batea')){
  if (data.cumbrera_lateral == "Cumbrera p/destape") {
    tipo_destape = `; con destape, lona color <strong>${data.color_lona}</strong>`;
  } 
  
  else if (data.cumbrera_lateral == "Cumbrera estándar" || data.cumbrera_lateral =='Sin cumbrera'){
    tipo_destape = `; ${data.cumbrera_lateral.toLocaleLowerCase()}, <em>con acoples y ${cant_arcos(
      data.cant_puertas_laterales
    )} arcos de ${arcos(data.arcos_centrales)} y 2 arcos de ${arcos(
      data.arcos_extremos
    )}, en el frente y contrafrente</em>`;
  }}
  return tipo_destape;
};
const seguros = (data) => {
  let seguros = "";
  if (data.tipo != "Carrocería") {
    if (data.seg_lat === "Sí" && data.seg_tras === "Sí") {
      seguros = ", con seguros en laterales y puerta trasera";
    } else if (data.seg_lat === "Sí" && data.seg_tras != "Sí") {
      seguros = "con seguros en laterales";
    } else if (data.seg_lat != "Sí" && data.seg_tras === "Sí") {
      seguros = ", con seguros en puerta trasera";
    }
  }
  return seguros;
};
const boquillas = (data) => {
  let boquillas = '';
  if (data.tipo != "Carrocería") {
  if (data.boq_st != "0" && data.boq_oculta != "0") {
    boquillas = `; con <strong>${data.boq_st} boquillas estándar y ${data.boq_oculta} ocultas</strong>`;
  } else if (data.boq_st != "0" && data.boq_oculta === "0") {
    boquillas = `; con <strong>${data.boq_st} boquillas estándar</strong>`;
  }}
  return boquillas;
};
const centroEje = (data) => {
  const paragraph = `${data.tipo === "Carrocería"? `, centro de eje <strong>${data.centro_eje} mm</strong>`
      : ""
  }`;
  return paragraph;
}
const translateUbicCajon = (ubic) => {
  let newUbic;
  switch (ubic) {
    case "ADE, ldo. condtr":
      newUbic = "Adelante lado conductor";
      break;
    case "ADE, ldo. banqn":
      newUbic = "Adelante lado banquina";
      break;
    case "ATR, lado condtr":
      newUbic = "Atrás lado conductor";
      break;
    case "ATR, lado banqn":
      newUbic = "Atrás lado banquina";
      break;
    default:
      newUbic = "N/A";
  }
  return newUbic;
};
const cajonHerramientas = (data) => {
  const paragraph = `${
    data.cajon != "0" ? `, y cajón de herramientas de ${data.cajon} mm` : ""
  }`;
  return paragraph;
};
const typeSider = (data) => {
  const paragraph = `${
    data.carrozado.includes('Sider') ? `; ${data.estira_lona!='N/A'?`con estira lona <strong>${data.estira_lona.toLocaleLowerCase()}</strong>`:''}, con <strong>${data.ventilados_cant} ventilados</strong> , luz entre ventilados de <strong>${data.ventilados_ubic_alt} mm</strong>; con techo de <strong>${data.techo.toLocaleLowerCase()}</strong>, lona lateral ${data.lona_con_logo === 'No' ? `color <strong>${data.lona_color_lateral}</strong>` : 'con logo'}` : ""
  }`;
  return paragraph;
};
const batea = (data) => {
  const paragraph = `
  ${data.carrozado.includes('Batea') ? `; con traba de puerta <strong>${data.traba_puerta.toLocaleLowerCase()}</strong>, y cilindro de <strong>${data.cilindro}</strong>, con tanque de agua`: ''}`;
  return paragraph
}
const comments = (data) => {
 const paragraph = `
 <h6 class="mt-3">Información adicional:</h6>
 ${data.informacion_adicional!='' ? `
  
 <p class="paragraph regular-font">
 ${data.informacion_adicional.replace(/\n/g,'<br>')}
 </p>
  `: '<p class="paragraph regular-font">No se registran información adicional</p>'} `
 return paragraph
}

export { createPDF, htmlBoleto, htmlREG_009, htmlNotaPedido, html_informe };
