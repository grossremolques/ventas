import IconTitleTechnical from "@images/producto.png";
import IconTitleSider from "@images/camion-de-reparto.png";
import IconTitleRemolque from "@images/remolque.png";
import IconTitleGuias from "@images/guias.png";
import IconTitleLona from "@images/patron-de-tela.png";
import IconTitleExtras from "@images/extra.png";
import IconTitleColors from "@images/paleta-de-color.png";
import IconTitleCarroceria from "@images/furgoneta-de-reparto.png";
import IconTitleCamion from "@images/semi-camion.png";
import IconTitleTiel from "@images/rueda.png";
import IconTitleCharacteristics from "@images/options.png";
import { Currency } from "@utils/Currency";
import DataClients from "../backend/Clients";
import MyCustumeModal from "@components/MyCustumeModal";
import DataGestoria from "../backend/Gestoria";

import {
  inputComponent,
  selectComponent,
  selectGroup,
  buttonComponent,
  inputGroup,
  label,
  textarea,
  dataListComponent,
} from "@components/Form";
import { Attributes, DataTrailers, Modelos } from "../backend/Trailers";
import { DataUsedTrailers, UsedAttributes } from "../backend/UsedTrailers";
import { SubTitle, MiniSubTitle, MainTitle } from "../components/Titles";
import {
  normalizeString,
  loadInputsById,
  listenerChangeEvent,
} from "@utils/Tools";
import DataEmployees from "../backend/Employees";
class FormTrailer {
  constructor() {
    this.modal = new MyCustumeModal(document.querySelector("#modal"));
  }
  async header() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <form class="row needs-validation g-1 mt-3" novalidate id="formStatus">
      <div class="col-auto">
        ${MainTitle("Editar Unidad 0 KM.")}
      </div>
      ${selectComponent({
        col: "auto",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "status",
        name: "status",
        required: true,
        nameLabel: "Status",
        data: attributes,
        textNode: "status",
        classNameSelect: "ms-auto type-status",
        disabled: true,
      })}
      ${buttonComponent({
        type: "button",
        color: "primary",
        id: "definirPresupuesto",
        title: "Definir presupuesto",
        col: "auto",
        xlCol: "auto",
        mdCol: "auto",
        sizes: "sm",
        className: "mt-auto",
      })}
    </form>
    `;
    return view;
  }
  async characteristics() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div>
      <div class="row g-1 mt-3">
        <div class="col">
          <div class="row" hidden>
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "tipo",
              name: "tipo",
              required: true,
              nameLabel: "Tipo",
              data: attributes,
              textNode: "tipo",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "ejes",
              name: "ejes",
              required: true,
              nameLabel: "Ejes",
              data: attributes,
              textNode: "ejes",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "carrozado",
              name: "carrozado",
              required: true,
              nameLabel: "Carrozado",
              data: attributes,
              textNode: "carrozado",
            })}
          </div>
        </div>
        ${SubTitle("Datos técnicos", IconTitleTechnical)}
        <div class="col-md me-1 col-12 border-card">
          <div class="row g-1 mt-1">
          ${MiniSubTitle({title:"Características", urlIcon:IconTitleCharacteristics})}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "modelo",
              name: "modelo",
              required: true,
              nameLabel: "Modelo",
              data: attributes,
              textNode: "modelos",
            })}
            ${dataListComponent({
              col: "12",
              sizes: "sm",
              id: "largo",
              name: "largo",
              list: "list_largo",
              required: true,
              nameLabel: "Largo",
              data: attributes,
              textNode: "largo",
            })}
            ${dataListComponent({
              col: "12",
              sizes: "sm",
              id: "alto",
              name: "alto",
              list: "list_alto",
              required: true,
              nameLabel: "Alto",
              data: attributes,
              textNode: "alto",
            })}
            ${dataListComponent({
              col: "12",
              sizes: "sm",
              id: "ancho",
              name: "ancho",
              list: "list_ancho",
              required: true,
              nameLabel: "Ancho",
              data: attributes,
              textNode: "ancho",
            })}
            ${dataListComponent({
              col: "12",
              sizes: "sm",
              id: "altura_baranda",
              list: "list_altura_baranda",
              name: "altura_baranda",
              required: true,
              nameLabel: "Alt. baranda",
              data: attributes,
              textNode: "altura_baranda",
            })}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "cumbrera_lateral",
              name: "cumbrera_lateral",
              required: true,
              nameLabel: "Cumbrera lateral",
              data: attributes,
              textNode: "cumbrera_lateral",
            })}
          </div>
          <div class="row g-1 mt-1">
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "piso",
              name: "piso",
              required: true,
              nameLabel: "Piso",
              data: attributes,
              textNode: "piso",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              xlCol: "auto",
              id: "espesor",
              name: "espesor",
              required: true,
              nameLabel: "Espesor",
              data: attributes,
              textNode: "espesor",
            })}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "material",
              name: "material",
              required: true,
              nameLabel: "Material",
              data: attributes,
              textNode: "material",
            })}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "puerta_trasera",
              name: "puerta_trasera",
              required: true,
              nameLabel: "Puerta trasera",
              data: attributes,
              textNode: "puerta_trasera",
            })}
            ${inputComponent({
              col: "12",
              type: "number",
              sizes: "sm",
              id: "cant_puertas_laterales",
              name: "cant_puertas_laterales",
              required: true,
              nameLabel: "Cant. Puertas lat",
            })}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "arcos_centrales",
              name: "arcos_centrales",
              required: true,
              nameLabel: "Arcos centrales",
              data: attributes,
              textNode: "arcos",
            })}
            ${selectComponent({
              col: "12",
              xlCol: "auto",
              sizes: "sm",
              id: "arcos_extremos",
              name: "arcos_extremos",
              required: true,
              nameLabel: "Arcos extremos",
              data: attributes,
              textNode: "arcos",
            })}
          </div>
          <div class="row g-1 mt-1">
            <div class="col-md col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Seguros en puertas/barandas",
              })}
              <div class="input-group input-group-sm">
                ${selectGroup({
                  nameLabel: "Lateral",
                  id: "seg_lat",
                  name: "seg_lat",
                  required: true,
                  data: attributes,
                  textNode: "si_no",
                })}
                ${selectGroup({
                  nameLabel: "Trasero",
                  id: "seg_tras",
                  name: "seg_tras",
                  required: true,
                  data: attributes,
                  textNode: "si_no",
                })}
              </div>
            </div>
            <div class="col-md col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Kit de acoples",
              })}
              <div class="input-group input-group-sm">
                ${selectGroup({
                  nameLabel: "Tipo",
                  id: "kit_acople",
                  name: "kit_acople",
                  required: true,
                  data: attributes,
                  textNode: "kit_acople",
                })}
                ${inputGroup({
                  nameLabel: "Adicional",
                  type: "number",
                  id: "kit_acople_adicional_fijo",
                  name: "kit_acople_adicional_fijo",
                  required: true,
                  placeholder: "(mm)",
                })}
              </div>
            </div>
            ${selectComponent({
              col: "12",
              mdCol:'auto',
              xlCol: "auto",
              sizes: "sm",
              id: "tipo_cabezal",
              name: "tipo_cabezal",
              required: true,
              nameLabel: "Tipo cabezal",
              data: attributes,
              textNode: "tipo_cabezal",
            })}
            ${selectComponent({
              col: "12",
              mdCol:'auto',
              xlCol: "auto",
              sizes: "sm",
              id: "color_chasis",
              name: "color_chasis",
              required: true,
              nameLabel: "Color Chasis",
              data: attributes,
              textNode: "color_chasis",
            })}
          </div>
        </div>
        ${await this.colors()}
      </div>
    </div>
    `;
    return view;
  }
  async characteristicsAcop() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div class="d-none" id="OnlyAcopladoSemi">
      <div class="row g-1 mt-3">
        ${SubTitle(
          "Características Acoplados y Semiremolques",
          IconTitleRemolque
        )}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "cajon",
          name: "cajon",
          required: true,
          nameLabel: "Cajón herr",
          data: attributes,
          textNode: "cajon",
        })}
        <div class="col-md col-12 col-xl">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Boquillas",
          })}
          <div class="input-group input-group-sm">
            ${inputGroup({
              nameLabel: "Estándar",
              type: "number",
              id: "boq_st",
              name: "boq_st",
              required: true,
              placeholder: "",
            })}
            ${inputGroup({
              nameLabel: "Oculta",
              type: "number",
              id: "boq_oculta",
              name: "boq_oculta",
              required: true,
              placeholder: "",
            })}
          </div>
        </div>
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "porta_auxilio",
          name: "porta_auxilio",
          required: true,
          nameLabel: "Porta auxilio",
          data: attributes,
          textNode: "porta_auxilio",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "suspension",
          name: "suspension",
          required: true,
          nameLabel: "Suspensión",
          data: attributes,
          textNode: "suspension",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "ojal_perno_rey",
          name: "ojal_perno_rey",
          required: true,
          nameLabel: "Ojal o Perno rey",
          data: attributes,
          textNode: "ojal_perno_rey",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "cilindro",
          name: "cilindro",
          required: true,
          nameLabel: "Cilindro",
          data: attributes,
          textNode: "cilindro",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "divisor_cono",
          name: "divisor_cono",
          required: true,
          nameLabel: "Divisor de cono",
          data: attributes,
          textNode: "si_no",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "pbt_trabajo",
          name: "pbt_trabajo",
          required: true,
          nameLabel: "Peso bruto total",
          data: attributes,
          textNode: "pbt_trabajo",
        })}
        ${selectComponent({
          col: "12",
          xlCol: "auto",
          mdCol: "auto",
          sizes: "sm",
          id: "alt_trbj_plato_tractor_cargado",
          name: "alt_trbj_plato_tractor_cargado",
          required: true,
          nameLabel: "Alt. trabajo plato tractor",
          data: attributes,
          textNode: "alt_trbj_plato_tractor_cargado",
        })}
      </div>
      <div class="row g-2 mt-2">
        <div class="col-md me-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Llantas",urlIcon: IconTitleTiel})}
            <div class="col-md-9 col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Llantas",
              })}
              <div class="input-group input-group-sm">
                ${inputGroup({
                  nameLabel: "Acero",
                  type: "number",
                  id: "llantas_acero",
                  name: "llantas_acero",
                  required: true,
                  placeholder: "Cant.",
                })}
                ${inputGroup({
                  nameLabel: "Aluminio",
                  type: "number",
                  id: "llantas_aluminio",
                  name: "llantas_aluminio",
                  required: true,
                  placeholder: "Cant.",
                })}
              </div>
            </div>
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "medidas",
              name: "medidas",
              required: true,
              nameLabel: "Medidas",
              data: attributes,
              textNode: "medidas",
            })}
          </div>
        </div>
        <div class="col-md-8 ms-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Accesorios",urlIcon: IconTitleExtras})}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "levanta_eje",
              name: "levanta_eje",
              required: true,
              nameLabel: "Levanta eje",
              data: attributes,
              textNode: "si_no",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "cajon_adicional",
              name: "cajon_adicional",
              required: true,
              nameLabel: "Cajón adicional",
              data: attributes,
              textNode: "cajon",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "bulon_largo",
              name: "bulon_largo",
              required: true,
              nameLabel: "Bulón largo",
              data: attributes,
              textNode: "si_no",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "rampa",
              name: "rampa",
              required: true,
              nameLabel: "Rampa",
              data: attributes,
              textNode: "si_no",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "traba_puerta",
              name: "traba_puerta",
              required: true,
              nameLabel: "Traba de puerta",
              data: attributes,
              textNode: "suspension",
            })}
          </div>
        </div>
      </div>
    </div>`;
    return view;
  }
  async characteristicsSider() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div class="d-none" id="OnlySider">
      <div class="row g-1 mt-3">
        ${SubTitle("Características para Siders", IconTitleSider)}
        <div class="col-md me-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Lona",urlIcon: IconTitleLona})}
            ${selectComponent({
              col: "12",
              xlCol: 2,
              sizes: "sm",
              id: "lona_con_logo",
              name: "lona_con_logo",
              required: true,
              nameLabel: "Logo",
              data: attributes,
              textNode: "si_no",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "lona_color_lateral",
              name: "lona_color_lateral",
              required: true,
              nameLabel: "Color",
              data: attributes,
              textNode: "lona_color_lateral",
            })}
            ${selectComponent({
              col: "12",
              sizes: "sm",
              id: "estira_lona",
              name: "estira_lona",
              required: true,
              nameLabel: "Estira lona",
              data: attributes,
              textNode: "estira_lona",
            })}
          </div>
        </div>
        <div class="col-md ms-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Ventilados y tipo de techo",urlIcon: IconTitleGuias})}
            <div class="col-md-9 col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Ventilados",
              })}
              <div class="input-group input-group-sm">
                ${inputGroup({
                  nameLabel: "Cantidad",
                  type: "number",
                  id: "ventilados_cant",
                  name: "ventilados_cant",
                  required: true,
                })}
                ${inputGroup({
                  nameLabel: "Luz entre ventilados",
                  type: "number",
                  id: "ventilados_ubic_alt",
                  name: "ventilados_ubic_alt",
                  required: true,
                  placeholder: "mm.",
                })}
              </div>
            </div>
            ${selectComponent({
              col: "12",
              xlCol: 3,
              sizes: "sm",
              id: "techo",
              name: "techo",
              required: true,
              nameLabel: "Techo",
              data: attributes,
              textNode: "techo",
            })}
          </div>
        </div>
      </div>
    </div>`;
    return view;
  }
  async characteristicsCarroceria() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div class="d-none" id="OnlyCarroceria">
      <div class="row g-1 mt-3">
        ${SubTitle("Características para Carrocerías", IconTitleCarroceria)}
        <div class="col-md-3 me-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Datos de camión", urlIcon: IconTitleCamion})}
            ${selectComponent({
              col: "12",
              xlCol: 12,
              sizes: "sm",
              id: "camion_marca",
              name: "camion_marca",
              required: true,
              nameLabel: "Marca",
              data: attributes,
              textNode: "camion_marca",
            })}
            ${inputComponent({
              col: "12",
              xlCol: 6,
              type: "text",
              sizes: "sm",
              id: "camion_modelo",
              name: "camion_modelo",
              required: true,
              nameLabel: "Modelo",
            })}
            ${inputComponent({
              col: "12",
              xlCol: 6,
              type: "number",
              sizes: "sm",
              id: "centro_eje",
              name: "centro_eje",
              required: true,
              nameLabel: "Centro de eje",
            })}
          </div>
        </div>
        <div class="col-md ms-1 col-12 border-card">
          <div class="row g-1 mt-2">
            ${MiniSubTitle({title:"Adicionales",urlIcon: IconTitleExtras})}
            <div class="col-md-12 col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Cajones de Herramienta para Carrocerías",
              })}
              <div class="input-group input-group-sm">
                ${selectGroup({
                  nameLabel: "Cajón 1",
                  id: "cajon_carroceria_1",
                  name: "cajon_carroceria_1",
                  required: true,
                  data: attributes,
                  textNode: "cajon",
                })}
                ${selectGroup({
                  nameLabel: "Ubicación",
                  id: "cajon_carroceria_ubic_1",
                  name: "cajon_carroceria_ubic_1",
                  required: true,
                  data: attributes,
                  textNode: "ubicacion",
                })}
                ${selectGroup({
                  nameLabel: "Cajón 2",
                  id: "cajon_carroceria_2",
                  name: "cajon_carroceria_2",
                  required: true,
                  data: attributes,
                  textNode: "cajon",
                })}
                ${selectGroup({
                  nameLabel: "Ubicación",
                  id: "cajon_carroceria_ubic_2",
                  name: "cajon_carroceria_ubic_2",
                  required: true,
                  data: attributes,
                  textNode: "ubicacion",
                })}
              </div>
            </div>
            <div class="col-md-6 col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Tanques de agua",
              })}
              <div class="input-group input-group-sm">
                ${selectGroup({
                  nameLabel: "tanque 1",
                  id: "tanq_agua_1",
                  name: "tanq_agua_1",
                  required: true,
                  data: attributes,
                  textNode: "ubicacion",
                })}
                ${selectGroup({
                  nameLabel: "tanque 2",
                  id: "tanq_agua_2",
                  name: "tanq_agua_2",
                  required: true,
                  data: attributes,
                  textNode: "ubicacion",
                })}
              </div>
            </div>
            <div class="col-md-4 col-12">
              ${label({
                id: "",
                sizes: "sm",
                nameLabel: "Boquillas",
              })}
              <div class="input-group input-group-sm">
                ${inputGroup({
                  nameLabel: "Delatera",
                  type: "number",
                  id: "boq_st_delantera",
                  name: "boq_st_delantera",
                  required: true,
                })}
                ${inputGroup({
                  nameLabel: "Trasera",
                  type: "number",
                  id: "boq_st_trasera",
                  name: "boq_st_trasera",
                  required: true,
                })}
              </div>
            </div>
            ${inputComponent({
              col: "12",
              xlCol: 2,
              type: "number",
              sizes: "sm",
              id: "cajon_frente",
              name: "cajon_frente",
              required: true,
              nameLabel: "Cajón en frente",
              step: 600
            })}
          </div>
        </div>
      </div>
    </div>`;
    return view;
  }
  async loadDefaultData() {
    const input = document.getElementById("modelo");
    input.addEventListener("change", async (event) => {
      const value = event.target.value;
      this.defaultUI({ value: value, new: true });
    });

  }
  async defaultUI(props) {
    try {
      const modelos = await Modelos.getModelos();
      const modelo = modelos.find((item) => item.modelo.value === props.value);
      for (let item in modelo) {
        let input = document.querySelector(`[name='${item}']`);
        if (input) {
          if (props.new) {
            input.value = modelo[item].value;
          }
          input.toggleAttribute("disabled", modelo[item].tipo_dato === "Fijo");
        }
      }
      const sectionsAcopSemi = document.querySelector("#OnlyAcopladoSemi");
      sectionsAcopSemi.classList.toggle(
        "d-none",
        props.value.startsWith("Carrocería")
      );
      const sectionsCarroceria = document.querySelector("#OnlyCarroceria");
      sectionsCarroceria.classList.toggle(
        "d-none",
        !props.value.startsWith("Carrocería")
      );
      const sectionsSider = document.querySelector("#OnlySider");
      sectionsSider.classList.toggle(
        "d-none",
        !normalizeString(props.value).includes("sider")
      );
    } catch (e) {
      console.log(e);
    }
  }
  async colors() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div class="col-xl-2 ms-1 col-12 border-card">
      <div class="row g-1 mt-2">
        ${MiniSubTitle({title:"Opciones de colores", urlIcon:IconTitleColors})}
        ${selectComponent({
          col: "12",
          xlCol: 12,
          sizes: "sm",
          id: "color_carrozado",
          name: "color_carrozado",
          required: true,
          nameLabel: "Carrozado",
          data: attributes,
          textNode: "color",
        })}
        ${selectComponent({
          col: "12",
          xlCol: 12,
          sizes: "sm",
          id: "color_franja",
          name: "color_franja",
          required: true,
          nameLabel: "Franja",
          data: attributes,
          textNode: "color",
        })}
        ${selectComponent({
          col: "12",
          xlCol: 12,
          sizes: "sm",
          id: "color_lona",
          name: "color_lona",
          required: true,
          nameLabel: "Lona",
          data: attributes,
          textNode: "lona",
        })}
      </div>
    </div>
    `;
    return view;
  }
  async formComponent() {
    const isNew = window.location.hash.includes("add-trailer");
    const view = `
      <form class="row needs-validation g-1 mt-3" novalidate id="formTrailer">
        <div class="row g-1">
        ${await this.characteristics()}
        ${await this.characteristicsAcop()}
        ${await this.characteristicsSider()}
        ${await this.characteristicsCarroceria()}
        ${textarea({
          col: "12",
          xlCol: "12",
          nameLabel: "Información adicional",
          id: "informacion_adicional",
          name: "informacion_adicional",
          sizes: "sm",
          row: 3,
        })}
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
    const Sellers = await DataEmployees.getSellers()
    const usedAttributes = await UsedAttributes.getDataInJSON();
    const usedTrailers = await DataUsedTrailers.getAllTrailers();
    const view = `
    <form class="row needs-validation g-1 mt-3" novalidate id="formSell">
      ${inputComponent({
        col: "12",
        xlCol: "6",
        type: "number",
        sizes: "sm",
        id: "id_cliente",
        name: "id_cliente",
        required: true,
        nameLabel: "Cliente",
      })}
      ${inputComponent({
        col: "12",
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
        xlCol: "6",
        sizes: "sm",
        id: "alternativa_venta",
        name: "alternativa_venta",
        required: true,
        nameLabel: "Alternativa de venta",
        data: usedAttributes,
        textNode: "alternativa_venta",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "6",
        sizes: "sm",
        id: "forma_pago_1",
        name: "forma_pago_1",
        required: true,
        nameLabel: "Forma de pago",
        data: usedAttributes,
        textNode: "forma_pago_1",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "6",
        sizes: "sm",
        id: "medio_pago",
        name: "medio_pago",
        required: true,
        nameLabel: "Medio de pago",
        data: usedAttributes,
        textNode: "medio_pago",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "6",
        sizes: "sm",
        id: "forma_pago_add",
        name: "forma_pago_add",
        nameLabel: "Forma de pago (2)",
        data: usedAttributes,
        textNode: "forma_pago_1",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "6",
        sizes: "sm",
        id: "medio_pago_add",
        name: "medio_pago_add",
        nameLabel: "Medio de pago (2)",
        data: usedAttributes,
        textNode: "medio_pago",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "12",
        sizes: "sm",
        id: "tomada_en_venta",
        name: "tomada_en_venta",
        nameLabel: "Toma unidad usada",
        data: usedTrailers,
        textNode: "nombre",
        value: "trazabilidad",
        disabled: ['tomado_en_venta', '']
      })}
      ${inputComponent({
        col: "12",
        xlCol: "6",
        type: "text",
        sizes: "sm",
        id: "num_lista",
        name: "num_lista",
        required: true,
        nameLabel: "Número de lista",
      })}
      ${inputComponent({
        col: "12",
        xlCol: "6",
        type: "date",
        sizes: "sm",
        id: "f_disp_estimada",
        name: "f_disp_estimada",
        required: true,
        nameLabel: "Fecha de entrega (estimada)",
      })}
      ${selectComponent({
        col: "12",
        xlCol: "12",
        sizes: "sm",
        id: "vendedor",
        name: "vendedor",
        required: true,
        nameLabel: "Vendedor",
        data: Sellers,
        textNode: "fullName",
        value: 'alias'
      })}
      ${textarea({
        col: "12",
        xlCol: "12",
        nameLabel: "Comentarios",
        id: "comentarios",
        name: "comentarios",
        sizes: "sm",
        row: 5,
      })}
    </form>
    `;
    return view;
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
    const cumbrera = document.querySelector("#cumbrera_lateral");
    cumbrera.addEventListener("change", this.cumbreras);
    const acople = document.querySelector("#kit_acople");
    acople.addEventListener("change", this.acoples);
    const lona = document.querySelector("#lona_con_logo");
    lona.addEventListener("change", this.lonaSider);
  }
  acoples() {
    const kit_acople = document.querySelector("#kit_acople");
    const kitAdicional = document.querySelector("#kit_acople_adicional_fijo");
  }
  cumbreras() {
    const input = document.querySelector("#cumbrera_lateral");
    const arcos_centrales = document.querySelector("#arcos_centrales");
    const arcos_extremos = document.querySelector("#arcos_extremos");
    const color_lona = document.querySelector("#color_lona");
    const kit_acople = document.querySelector("#kit_acople");
    const kitAdicional = document.querySelector("#kit_acople_adicional_fijo");
    if (input.value === "Cumbrera p/destape") {
      arcos_centrales.value = "Para destape";
      arcos_extremos.value = "Para destape";
      color_lona.value = "";
      kit_acople.value = "N/A";
    } else {
      arcos_centrales.value = "Estándar";
      arcos_extremos.value = "Gruesos";
      color_lona.value = "N/A";
      kit_acople.value = "Fijo";
    }
    color_lona.toggleAttribute("disabled", input.value != "Cumbrera p/destape");
    kit_acople.toggleAttribute("disabled", kit_acople.value === "N/A");
    kitAdicional.toggleAttribute("disabled", kit_acople.value != "Fijo");
  }
  lonaSider() {
    const hasLogo = document.querySelector("#lona_con_logo").value;
    const colorLona = document.getElementById("lona_color_lateral");
    colorLona.value = hasLogo != "No" ? "N/A" : "";
    colorLona.toggleAttribute("disabled", hasLogo != "No");
  }
  async openGestoria(callback, isEdit, id) {
    const closeButton = document.querySelector(".close-btn");
    closeButton.removeEventListener("click", this.goToTrailers);
    this.modal.create({
      title: "💲 Datos de venta",
      content: await this.formSell(),
    });
    this.modal.addButtonAction({
      title: "Guardar",
      type: "button",
      color: "primary",
      id: "saveGestoriaButton",
    });
    const formSell = document.querySelector("#formSell");
    listenerChangeEvent(formSell);
    this.formattedPrice();
    await DataClients.handleFindClient();
    document
      .querySelector("#saveGestoriaButton")
      .addEventListener("click", callback);
    if (isEdit) {
      const data = await DataGestoria.getTrailer(id);
      const unidadUsada = await DataUsedTrailers.getUsedTrailerBySell(id);
      if (unidadUsada) {
        data["tomada_en_venta"] = unidadUsada.trazabilidad;
      }
      const form = document.querySelector("#formSell");
      loadInputsById(data, form);
    }
  }
  modalWithBTNBoleto(id, isPresupuesto) {
    this.modal.create({
      title: "✅ 💲 Guardado datos de venta",
      content: `
      <p>Los datos han sido guardados bajo la trazabilidad N° <strong>${id}</strong></p>
      ${!isPresupuesto ? "<p>El Boleto está listo para su impresión</p>" : ""}
      `,
    });
    if (!isPresupuesto) {
      this.modal.addButtonAction({
        title: "Boleto",
        type: "button",
        color: "danger",
        id: "boletoButton",
      });
    }
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", this.goToTrailers);
    document
      .querySelector("#boletoButton")
      .addEventListener("click", async () => {
        await this.openBoleto(id);
      });
  }
  goToTrailers() {
    window.location.hash = "/trailers";
  }
  async openBoleto(id) {
    
    this.modal.holdingRequest();
    try {
      const data = await DataTrailers.getTrailer(id);
      const dataGestoria = await DataGestoria.getTrailer(id);
      const dataUsedTrailer = await DataUsedTrailers.getUsedTrailerBySell(id);
      Object.assign(data, dataGestoria);
      if (dataUsedTrailer) {
        data["unidad_usada"] = true;
        data["usada"] = dataUsedTrailer;
      }
      data.legajo = await DataEmployees.getLegajoByAlias(data.vendedor)
      const dataCod = encodeURIComponent(JSON.stringify(data));
      window.location.hash = `/print-nota_pedido?data=${dataCod}`;
      this.modal.hide();
    } catch (e) {
      console.log(e);
    }
  }
}
export default FormTrailer;
