import IconTitleLigths from "@images/car-light.png";
import IconTitleCharacteristics from "@images/options.png";
import IconTitleAccesories from "@images/spare-parts.png";
import IconTitleSurface from "@images/layers.png";
import IconTitlePrice from "@images/best-price.png";
import IconTitleCard from "@images/license-plate.png";
import IconTitleControl from "@images/controlar.png";
import { Currency } from "@utils/Currency";
import {
  inputComponent,
  selectComponent,
  selectGroup,
  buttonComponent,
  inputGroup,
  label,
  textarea,
} from "@components/Form";
import { UsedAttributes } from "@backend/UsedTrailers";
import { SubTitle } from "@components/Titles";
import MyCustumeModal from "@components/MyCustumeModal";
class FormUsedTrailer {
  constructor() {
    this.modal = new MyCustumeModal(document.querySelector("#modal"));
  }
  async cedulaVerde() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <div class="col-md-12 col-xl-12">
      <div class="card border-success bg-success-subtle mb-3 mx-auto" style="max-width: 775px;">
        <div class="card-header">
        ${SubTitle("Datos de la unidad", IconTitleCard)}
        </div>
        <div class="card-body text-success p-2">
          <div class="row g-1">
            ${textarea({
              col: "12",
              mdCol: "12",
              nameLabel: "Modelo",
              id: "modelo",
              name: "modelo",
              sizes: "sm",
              row: 2,
              require: true
            })}
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "marca",
              name: "marca",
              required: true,
              nameLabel: "Marca",
              data: attributes,
              textNode: "marca",
            })}
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "tipo",
              name: "tipo",
              required: true,
              nameLabel: "Tipo",
              data: attributes,
              textNode: "tipo",
            })}
            ${inputComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              type: "text",
              sizes: "sm",
              id: "anno",
              name: "anno",
              required: true,
              nameLabel: "Año",
            })}
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "ejes",
              name: "ejes",
              required: true,
              nameLabel: "Ejes",
              data: attributes,
              textNode: "ejes",
            })}
            ${inputComponent({
              col: "4",
              mdCol: "4",
              xlCol: "4",
              type: "text",
              sizes: "sm",
              id: "dominio",
              name: "dominio",
              required: true,
              nameLabel: "Dominio",
              className: "custumeFormatt",
            })}
            ${inputComponent({
              col: "8",
              mdCol: "8",
              xlCol: "8",
              type: "text",
              sizes: "sm",
              id: "vin",
              name: "vin",
              required: true,
              nameLabel: "Chasis",
              className: "custumeFormatt",
            })}
            
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "carrozado",
              name: "carrozado",
              required: true,
              nameLabel: "Carrozado",
              data: attributes,
              textNode: "modelo_carrozado",
            })}
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "puerta_trasera",
              name: "puerta_trasera",
              required: true,
              nameLabel: "Puerta trasera",
              data: attributes,
              textNode: "puerta_trasera",
            })}
            ${inputComponent({
              col: "4",
              mdCol: "4",
              type: "number",
              sizes: "sm",
              id: "largo",
              name: "largo",
              required: true,
              nameLabel: "Largo",
              placeholder: 'Medida (mm)',
              step: 1
            })}
            ${inputComponent({
              col: "4",
              mdCol: "4",
              type: "number",
              sizes: "sm",
              id: "alto",
              name: "alto",
              required: true,
              nameLabel: "Alto",
              placeholder: 'Medida (mm)',
              step: 1
            })}
            ${selectComponent({
              col: "4",
              mdCol: "4",
              sizes: "sm",
              id: "material",
              name: "material",
              required: true,
              nameLabel: "Material",
              data: attributes,
              textNode: "material_carrozado",
            })}
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "color_carrozado",
              name: "color_carrozado",
              required: true,
              nameLabel: "Color carrozado",
              data: attributes,
              textNode: "color",
            })}    
            ${selectComponent({
              col: "6",
              mdCol: "6",
              xlCol: "6",
              sizes: "sm",
              id: "color_franja",
              name: "color_franja",
              required: true,
              nameLabel: "Color franja",
              data: attributes,
              textNode: "color",
            })}
          </div>
        </div>
      </div>
    </div>
    `;
    return view;
  }
  async characteristics() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <div class="row g-1 mt-2">
    ${SubTitle("Características", IconTitleCharacteristics)}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "text",
        sizes: "sm",
        id: "llanta_med_9",
        name: "llanta_med_9",
        required: true,
        nameLabel: "Llanta (Med. 9)",
        placeholder: "Cant.",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "text",
        sizes: "sm",
        id: "llanta_med_8",
        name: "llanta_med_8",
        required: true,
        nameLabel: "Llanta (Med. 8)",
        placeholder: "Cant.",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "text",
        sizes: "sm",
        id: "arcos",
        name: "arcos",
        required: true,
        nameLabel: "Arcos",
        placeholder: "Cant.",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "number",
        sizes: "sm",
        id: "boquillas",
        name: "boquillas",
        required: true,
        nameLabel: "Boquillas",
        placeholder: "Cant.",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "text",
        sizes: "sm",
        id: "acoples_med",
        name: "acoples_med",
        required: true,
        nameLabel: "Acoples Med.",
        placeholder: "Medida (mm)",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "4",
        xlCol: "3",
        type: "number",
        sizes: "sm",
        id: "acoples_cant",
        name: "acoples_cant",
        required: true,
        nameLabel: "Acoples Cant.",
        placeholder: "Cant.",
      })}
      ${selectComponent({
        col: "3",
        mdCol: "2",
        xlCol: "auto",
        sizes: "sm",
        id: "destape",
        name: "destape",
        required: true,
        nameLabel: "Destape",
        data: attributes,
        textNode: "si_no",
      })}
      <div class="col-md col-9">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Cajón de herramientas",
        })}
        <div class="input-group input-group-sm">
            ${selectGroup({
              nameLabel: "Tipo",
              id: "cajon_mat",
              name: "cajon_mat",
              required: true,
              data: attributes,
              textNode: "material",
            })}
            ${inputGroup({
              nameLabel: "Medida",
              type: "number",
              id: "cajon_med",
              name: "cajon_med",
              required: true,
              placeholder: "(mm)",
            })}
        </div>
      </div>
    </div>
    `;
    return view;
  }
  async accesories() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <div class="row g-1 mt-3">
      ${SubTitle("Accesorios", IconTitleAccesories)}
      <div class="col-md-6 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Cajón adicional",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "cajon_mat_add",
            name: "cajon_mat_add",
            required: true,
            data: attributes,
            textNode: "material",
            className: 'null-value'
          })}
          ${inputGroup({
            nameLabel: "Medida",
            type: "number",
            id: "cajon_med_add",
            name: "cajon_med_add",
            required: true,
            placeholder: "(mm)",
          })}
        </div>
      </div>
      <div class="col-md-6 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Guardabarros",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "guardabarros_mat",
            name: "guardabarros_mat",
            required: true,
            data: attributes,
            textNode: "material",
          })}
          ${inputGroup({
            nameLabel: "Cant.",
            type: "number",
            id: "guardabarros_med",
            name: "guardabarros_med",
            required: true,
            placeholder: "Cant.",
          })}
        </div>
      </div>
      </div>
      <div class="row g-1">
        ${inputComponent({
          col: "6",
          type: "number",
          sizes: "sm",
          id: "guardafangos",
          name: "guardafangos",
          required: true,
          nameLabel: "Guardafangos",
          placeholder: "Cant.",
        })}
        ${selectComponent({
          col: "6",
          sizes: "sm",
          id: "faldon_paragolpes",
          name: "faldon_paragolpes",
          required: true,
          nameLabel: "Faldon",
          data: attributes,
          textNode: "si_no",
        })}
        ${selectComponent({
          col: "6",
          sizes: "sm",
          id: "vigia",
          name: "vigia",
          required: true,
          nameLabel: "Vigia",
          data: attributes,
          textNode: "vigia",
        })}
        ${selectComponent({
          col: "6",
          sizes: "sm",
          id: "levanta_eje",
          name: "levanta_eje",
          required: true,
          nameLabel: "Lev. Eje",
          data: attributes,
          textNode: "si_no",
        })}
      </div>
    `;
    return view;
  }
  async prices() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <div class="col-md-12 col-xl-12">
      <div class="card border-warning bg-warning-subtle mb-3 mx-auto" style="max-width: 775px;">
        <div class="card-header">
          ${SubTitle("Compra-venta", IconTitlePrice)}
        </div>
        <div class="card-body text-warning p-2">
          <div class="row g-1">
            ${inputComponent({
              col: "12",
              mdCol: "6",
              xlCol: "6",
              className: "price",
              type: "text",
              sizes: "sm",
              id: "tasacion",
              name: "tasacion",
              required: true,
              nameLabel: "Tasación",
            })}
            ${inputComponent({
              col: "12",
              mdCol: "6",
              xlCol: "6",
              className: "price",
              type: "text",
              sizes: "sm",
              id: "valor_venta",
              name: "valor_venta",
              required: true,
              nameLabel: "Valor de venta",
            })}
          </div>
        </div>
      </div>
    </div>
    `;
    return view;
  }
  async lights() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
      <div class="row g-1 mt-3"> 
      ${SubTitle("Luces", IconTitleLigths)}
        <div class="col-md-5 col-12">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Luces laterales",
          })}
          <div class="input-group input-group-sm">
            ${selectGroup({
              nameLabel: "Tipo",
              id: "luces_lat_tipo",
              name: "luces_lat_tipo",
              required: true,
              data: attributes,
              textNode: "luces",
            })}
            ${inputGroup({
              nameLabel: "Cantidad",
              type: "number",
              id: "luces_lat_cant",
              name: "luces_lat_cant",
              required: true,
            })}
          </div>
        </div>
        <div class="col-md-5 col-12">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Luces traseras",
          })}
          <div class="input-group input-group-sm">
            ${selectGroup({
              nameLabel: "Tipo",
              id: "luces_trs_tipo",
              name: "luces_trs_tipo",
              required: true,
              data: attributes,
              textNode: "luces",
            })}
            ${inputGroup({
              nameLabel: "Cantidad",
              type: "number",
              id: "luces_trs_cant",
              name: "luces_trs_cant",
              required: true,
            })}
          </div>
        </div>
        ${selectComponent({
          col: "12",
          sizes: "sm",
          id: "tension",
          name: "tension",
          required: true,
          nameLabel: "Tensión",
          data: attributes,
          textNode: "tension",
        })}
      </div>
    `;
    return view;
  }
  defectos() {
    const view = `
    <div class="row g-1 mt-3"> 
        ${SubTitle("Detalles en Pintura y chapa", IconTitleSurface)}
      <div class="col defectos_superficie mt-2">
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="def_superf_abollones" value="Abollones">
            <label class="form-check-label" for="def_superf_abollones"><small style="font-weight: 400;">Abollones</small></label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="def_superf_golpes" value="Golpes">
            <label class="form-check-label" for="def_superf_golpes">
              <small style="font-weight: 400;">Golpes</small>
            </label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="def_superf_rallones" value="Rallones">
            <label class="form-check-label" for="def_superf_rallones">
              <small style="font-weight: 400;">Rallones</small>
            </label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="def_superf_corrosion" value="Corrosión">
            <label class="form-check-label" for="def_superf_corrosion">
              <small style="font-weight: 400;">Corrosión</small>
            </label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="def_superf_oxid_severa" value="Oxidación severa">
            <label class="form-check-label" for="def_superf_oxid_severa">
              <small style="font-weight: 400;">Oxidación severa</small>
            </label>
        </div>
      </div>
    </div>
    `;
    return view;
  }
  async control() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <form class="row needs-validation g-1 mt-3 d-none" novalidate id="formControl">
    <div class="row g-1">
    ${SubTitle(
      "Datos de control, cuando ingresa la unidad a fábrica",
      IconTitleControl
    )}
      ${inputComponent({
        col: "12",
        mdCol: "2",
        xlCol: "2",
        type: "text",
        sizes: "sm",
        id: "patentes",
        name: "patentes",
        required: true,
        nameLabel: "Patentes",
        value: 2
      })}
      ${inputComponent({
        col: "12",
        mdCol: "2",
        xlCol: "2",
        type: "text",
        sizes: "sm",
        id: "chapa_ident",
        name: "chapa_ident",
        required: true,
        nameLabel: "Chapa ident.",
        value: 1
      })}
      ${selectComponent({
        col: "12",
        mdCol: "2",
        xlCol: "2",
        sizes: "sm",
        id: "coincide_grabado",
        name: "coincide_grabado",
        required: false,
        nameLabel: "Coincide grabado",
        data: attributes,
        textNode: "si_no",
      })}
      <div class="col-md-3 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Separadores",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "separadores_mat",
            name: "separadores_mat",
            required: false,
            data: attributes,
            textNode: "separadores_tensores",
          })}
          ${inputGroup({
            nameLabel: "Medida",
            type: "number",
            id: "separadores_med",
            name: "separadores_med",
            required: false,
            placeholder: "(mm)",
          })}
        </div>
      </div>
      <div class="col-md-3 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Tensores Puertas laterales",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "tens_puertas_lat_mat",
            name: "tens_puertas_lat_mat",
            required: false,
            data: attributes,
            textNode: "separadores_tensores",
          })}
          ${inputGroup({
            nameLabel: "Cant.",
            type: "number",
            id: "tens_puertas_lat_cant",
            name: "tens_puertas_lat_cant",
            required: false,
            placeholder: "(mm)",
          })}
        </div>
      </div>
      <div class="col-md-3 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Tensores Parantes laterales",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "tens_parantes_lat_mat",
            name: "tens_parantes_lat_mat",
            required: false,
            data: attributes,
            textNode: "separadores_tensores",
          })}
          ${inputGroup({
            nameLabel: "Cant.",
            type: "number",
            id: "tens_parantes_lat_cant",
            name: "tens_parantes_lat_cant",
            required: false,
            placeholder: "(mm)",
          })}
        </div>
      </div>
      <div class="col-md-3 col-12">
        ${label({
          id: "",
          sizes: "sm",
          nameLabel: "Tensor Puerta trasera",
        })}
        <div class="input-group input-group-sm">
          ${selectGroup({
            nameLabel: "Tipo",
            id: "tens_puerta_trs_mat",
            name: "tens_puerta_trs_mat",
            required: false,
            data: attributes,
            textNode: "separadores_tensores",
          })}
          ${inputGroup({
            nameLabel: "Cant.",
            type: "number",
            id: "tens_puerta_trs_cant",
            name: "tens_puerta_trs_cant",
            required: false,
            placeholder: "(mm)",
          })}
        </div>
      </div>
      ${inputComponent({
        col: "12",
        mdCol: "2",
        type: "number",
        sizes: "sm",
        id: "tanque_agua",
        name: "tanque_agua",
        required: false,
        nameLabel: "Tanque de agua",
      })}
      ${inputComponent({
        col: "12",
        mdCol: "2",
        type: "number",
        sizes: "sm",
        id: "cinta_reflectiva",
        name: "cinta_reflectiva",
        required: false,
        nameLabel: "Cinta reflectiva",
      })}
      ${selectComponent({
        col: "12",
        sizes: "sm",
        mdCol: "2",
        id: "limpieza",
        name: "limpieza",
        required: false,
        nameLabel: "Control de limpieza",
        data: attributes,
        textNode: "si_no",
      })}
    </div>
    ${this.defectos()}
    </form>
    `;
    return view;
  }
  async formComponent() {
    const view = `
      <form class="row needs-validation g-1 mt-3" novalidate id="formUsedTrailer">
        <div class="row g-1">
          <div class="col-12 col-md-4 col-xl-3 me-3">
            <div class="row g-1">
              ${await this.cedulaVerde()}
              ${await this.prices()}
            </div>
          </div>
          <div class="col">
            ${await this.characteristics()}
            ${await this.accesories()}
            ${await this.lights()}
            ${textarea({
              col: "12",
              mdCol: "12",
              nameLabel: "Información adicional",
              id: "comentarios",
              name: "comentarios",
              sizes: "sm",
              row: "5",
            })}
          </div>
        </div>
      </form>
      `;
    return view;
  }
  buttonAction(props) {
    const view = `
      <div class="row g-1 justify-content-end my-3">
        ${buttonComponent(props)}
      </div>`;
    return view;
  }
  async formSell() {
    const attributes = await UsedAttributes.getDataInJSON();
    const view = `
    <form class="row needs-validation g-1 mt-3" novalidate id="formSell">
      <p class="text-danger"><strong>Atención: </strong> El el Boleto de Compra-Venta se generará a partir de estos datos y los datos de la cédula verde ó titulo que se ingresaron previamente.</p>
      ${inputComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        type: "number",
        sizes: "sm",
        id: "id_cliente",
        name: "id_cliente",
        required: true,
        nameLabel: "Cod. Cliente",
      })}
      ${inputComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        type: "text",
        sizes: "sm",
        id: "cuit",
        name: "cuit",
        required: true,
        nameLabel: "CUIT",
        readonly: true,
      })}
      ${inputComponent({
        col: "12",
        mdCol: "12",
        xlCol: "12",
        type: "text",
        sizes: "sm",
        id: "razon_social",
        name: "razon_social",
        required: true,
        nameLabel: "Razón Social",
        readonly: true,
      })}
      ${inputComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        className: "price",
        type: "text",
        sizes: "sm",
        id: "valor_venta_efectiva",
        name: "valor_venta_efectiva",
        required: true,
        nameLabel: "Precio de venta",
      })}
      ${selectComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        sizes: "sm",
        id: "alternativa_venta",
        name: "alternativa_venta",
        required: true,
        nameLabel: "Alternativa de venta",
        data: attributes,
        textNode: "alternativa_venta",
      })}
      ${selectComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        sizes: "sm",
        id: "forma_pago_1",
        name: "forma_pago_1",
        required: true,
        nameLabel: "Forma de pago",
        data: attributes,
        textNode: "forma_pago_1",
      })}
      ${selectComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        sizes: "sm",
        id: "medio_pago",
        name: "medio_pago",
        required: true,
        nameLabel: "Medio de pago",
        data: attributes,
        textNode: "medio_pago",
      })}
      ${selectComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        sizes: "sm",
        id: "forma_pago_add",
        name: "forma_pago_add",
        nameLabel: "Forma de pago (2)",
        data: attributes,
        textNode: "forma_pago_1",
        required: true,
        value: 'N/A'
      })}
      ${selectComponent({
        col: "12",
        mdCol: "6",
        xlCol: "6",
        sizes: "sm",
        id: "medio_pago_add",
        name: "medio_pago_add",
        nameLabel: "Medio de pago (2)",
        data: attributes,
        textNode: "medio_pago",
        required: true,
        value: 'N/A'
      })}
      ${textarea({
        col: "12",
        mdCol: "12",
        xlCol: "12",
        nameLabel: "Observaciones",
        id: "obs_boleto",
        name: "obs_boleto",
        sizes: "sm",
        row: 10,
      })}
      ${inputComponent({
        col: "12",
        mdCol: "12",
        xlCol: "12",
        type: "text",
        sizes: "sm",
        id: "num_lista",
        name: "num_lista",
        required: true,
        nameLabel: "Número de lista",
      })}
    </form>
    `;
    return view;
  }
  observaciones(data) {
    const text = `Se hace entrega de una unidad usada tipo ${
      data.tipo
    }, carrozado ${
      data.carrozado
    } (de chapa y piso de chapa), configuración de chasis ${
      data.ejes
    }. Con ${this.getLlantas(
      data
    )} a disco (p/uso sin cámara), sin cubiertas (como está). Con puerta trasera ${
      data.puerta_trasera
    }. Color ${data.color_carrozado}, 
    ${
      data.color_franja != "N/A" ? `y franja color ${data.color_franja},` : ""
    } largo ${data.largo} mm${
      data.alto != "0" ? `, alto de ${data.alto} mm` : ""
    }.
    Con los siguientes accesorios:
    Vígia: ${data.vigia} | Levanta eje: ${data.levanta_eje} | Destape: ${
      data.destape
    } | Boquillas: ${data.boquillas} | Arcos loneros: ${
      data.arcos
    } | Acoples: ${
      data.acoples_cant != "0"
        ? `${data.acoples_cant} acoples de ${data.acoples_med} mm`
        : "No"
    } | Guardabarros: ${
      data.guardabarros_mat != "N/A"
        ? `cant. ${data.guardabarros_med} - mat. ${data.guardabarros_mat}`
        : "No"
    } | Guardafangos: ${
      data.guardafangos != "0" ? `${data.guardafangos}` : "No"
    } | Faldón de paragolpes: ${
      data.faldon_paragolpes
    } | Cajón de herramientas: ${
      data.cajon_mat != "N/A"
        ? ` mat. ${data.cajon_mat} de ${data.cajon_med} mm`
        : "No"
    } | Cajón adiconal: ${
      data.cajon_mat_add != "N/A"
        ? ` mat. ${data.cajon_mat_add} de ${data.cajon_med_add}`
        : "No"
    }`;
    return text;
  }
  getLlantas(data) {
    let resp;
    if (data.llanta_med_8 != "0" && data.llanta_med_9 === "0") {
      resp = `${data.llanta_med_8} llantas de 8.25 × 22.5`;
    } else if (data.llanta_med_9 != "0" && data.llanta_med_8 === "0") {
      resp = `${data.llanta_med_9} llantas de 9.00 × 22.5`;
    } else if (data.llanta_med_9 != "0" && data.llanta_med_8 != "0") {
      resp = `${data.llanta_med_9} llantas de 9.00 × 22.5 y ${data.llanta_med_8} llantas de 8.25 × 22.5`;
    }
    return resp;
  }
  handleFormatearMoneda(event) {
    const currency = new Currency();
    const input = event.target;
    const value = currency.formatearMoneda(input.value);
    input.value = value;
  }
  handleConvertirEnNumero(event) {
    const currency = new Currency();
    const input = event.target;
    const value = currency.convertirEnNumero(input.value);
    if (value) {
      input.value = value;
    }
  }
  formattedPrice() {
    const currency = new Currency();
    const prices = document.querySelectorAll(".price");
    prices.forEach((input) => {
      const value = input.value;
      input.value = currency.convertirEnNumero(value);
      input.value = currency.formatearMoneda(input.value);
      input.addEventListener("change", this.handleFormatearMoneda);
      input.addEventListener("focus", this.handleConvertirEnNumero);
      input.addEventListener("blur", (event) => {
        this.handleConvertirEnNumero(event);
        this.handleFormatearMoneda(event);
      });
    });
  }
  settings() {
    this.trimCustumize();
    this.nullValue()
  }
  trimCustumize() {
    const inputs = document.querySelectorAll(".custumeFormatt");
    inputs.forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
      });
      input.addEventListener("input", (event) => {
        event.target.value = event.target.value.toUpperCase();
      });
    });
  }
  nullValue() {
    const acople = document.querySelector('#acoples_med');
    acople.addEventListener('change',() => {
      document.querySelector('#acoples_cant').value = acople.value === '0' ? 0 : ''
    })
    const inputs = [
      {id: 'cajon_mat', nextId: 'cajon_med'},
      {id: 'cajon_mat_add', nextId: 'cajon_med_add'},
      {id: 'guardabarros_mat', nextId: 'guardabarros_med'},
      {id: 'luces_lat_tipo', nextId: 'luces_lat_cant'},
      {id: 'luces_trs_tipo', nextId: 'luces_trs_cant'}
    ]
    inputs.map(item => {
      const input = document.getElementById(item.id);
      input.addEventListener('change',() => {
        document.getElementById(item.nextId).value = input.value === 'N/A' ? 0 : ''
      })
    })
  }
  
}
export default FormUsedTrailer;
