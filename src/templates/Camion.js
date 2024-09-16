import MyCustumeModal from "@components/MyCustumeModal";
import IconTitleTechnical from "@images/producto.png";
import IconTitleCharacteristics from "@images/options.png";
import IconTitleChasis from "@images/chasis.png";
import { SubTitle, MiniSubTitle, MainTitle } from "../components/Titles";
import { Attributes } from "@backend/Camion";
import {
  inputComponent,
  selectComponent,
  selectGroup,
  inputGroup,
  label,
  select,
} from "@components/Form";
import { trimCustumize } from "../utils/Tools";
import { validate } from "schema-utils";
class FormCamion {
  constructor() {
    this.modal = new MyCustumeModal(document.querySelector("#modal"));
  }
  async datosChasis() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <div  class="row g-1">
      ${selectComponent({
        col: "6",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "uso_actual",
        name: "uso_actual",
        required: true,
        nameLabel: "Uso actual",
        data: attributes,
        textNode: "uso_actual",
      })}
      ${selectComponent({
        col: "6",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "frenos",
        name: "frenos",
        required: true,
        nameLabel: "Frenos",
        data: attributes,
        textNode: "frenos",
      })}
      <div class="col-12 col-md col-xl">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Tara",
          })}
          <div class="input-group input-group-sm">
              ${inputGroup({
                nameLabel: "Total",
                type: "number",
                id: "tara_total",
                name: "tara_total",
                required: true,
                placeholder: "(kg)",
              })}
              ${inputGroup({
                nameLabel: "Eje deltr",
                type: "number",
                id: "tara_eje_delantero",
                name: "tara_eje_delantero",
                required: true,
                placeholder: "(kg)",
              })}
          </div>
      </div>
      <div class="col-12 col-md-auto col-xl-auto">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Suspensión",
          })}
          <div class="input-group input-group-sm">
              ${selectGroup({
                nameLabel: "Deltr",
                id: "suspension_delantera",
                name: "suspension_delantera",
                required: true,
                data: attributes,
                textNode: "suspension",
              })}
              ${selectGroup({
                nameLabel: "Tras",
                id: "suspension_trasera",
                name: "suspension_trasera",
                required: true,
                data: attributes,
                textNode: "suspension",
              })}
          </div>
      </div>
    </div>
    <div  class="row g-1">
      <div class="col-12 col-md col-xl">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Trocha",
          })}
          <div class="input-group input-group-sm">
              ${inputGroup({
                nameLabel: "Eje deltr",
                type: "number",
                id: "trocha_eje_delantero",
                name: "trocha_eje_delantero",
                required: true,
                placeholder: "(mm)",
              })}
              ${inputGroup({
                nameLabel: "Eje tras",
                type: "number",
                id: "trocha_eje_trasero",
                name: "trocha_eje_trasero",
                required: true,
                placeholder: "(mm)",
              })}
          </div>
      </div>
      <div class="col-12 col-md-auto col-xl-auto">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Llantas",
          })}
          <div class="input-group input-group-sm">
              ${selectGroup({
                nameLabel: "Tipo",
                id: "tipo_llanta",
                name: "tipo_llanta",
                required: true,
                data: attributes,
                textNode: "tipo_llanta",
              })}
              ${selectGroup({
                nameLabel: "Med.",
                id: "medida_llanta",
                name: "medida_llanta",
                required: true,
                data: attributes,
                textNode: "medida_llanta",
              })}
          </div>
      </div>
      ${selectComponent({
        col: "6",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "puente_cardan",
        name: "puente_cardan",
        required: true,
        nameLabel: "Puente cardan",
        data: attributes,
        textNode: "si_no",
      })}
      ${selectComponent({
        col: "6",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "depresion_chasis",
        name: "depresion_chasis",
        required: true,
        nameLabel: "Depresión en chasis",
        data: attributes,
        textNode: "si_no",
      })}
    </div>
    <div  class="row g-1">
      ${selectComponent({
        col: "6",
        mdCol: "auto",
        xlCol: "auto",
        sizes: "sm",
        id: "carroceria",
        name: "carroceria",
        required: true,
        nameLabel: "Carrocería",
        data: attributes,
        textNode: "si_no",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "3",
        xlCol: "3",
        type: "text",
        sizes: "sm",
        id: "carrozado",
        name: "carrozado",
        required: true,
        nameLabel: "Carrozado",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "",
        xlCol: "",
        type: "text",
        sizes: "sm",
        id: "peso",
        name: "peso",
        required: true,
        nameLabel: "Peso",
        placeholder: "kg",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "",
        xlCol: "",
        type: "text",
        sizes: "sm",
        id: "largo",
        name: "largo",
        required: true,
        nameLabel: "Largo",
        placeholder: "mm",
      })}
      ${inputComponent({
        col: "6",
        mdCol: "",
        xlCol: "",
        type: "number",
        sizes: "sm",
        id: "largo_cuchetin",
        name: "largo_cuchetin",
        required: true,
        nameLabel: "Largo cuchetín",
        placeholder: "mm",
      })}
    </div>
    <div  class="row g-1">
      <div class="col-12 col-md-4 col-xl-4">
          ${label({
            id: "",
            sizes: "sm",
            nameLabel: "Posee grúa u objeto considerable",
          })}
          <div class="input-group input-group-sm">
              ${select({
                id: "objeto_considerable",
                name: "objeto_considerable",
                required: true,
                data: attributes,
                textNode: "si_no",
              })}
              ${inputGroup({
                nameLabel: "Kg",
                type: "number",
                id: "kg_objeto_considerable",
                name: "kg_objeto_considerable",
                required: true,
                placeholder: "(kg)",
              })}
          </div>
      </div>
      ${inputComponent({
        col: "6",
        mdCol: "",
        xlCol: "",
        type: "text",
        sizes: "sm",
        id: "color_chasis",
        name: "color_chasis",
        required: true,
        nameLabel: "Color de Chasis",
      })}
      ${selectComponent({
        col: "6",
        mdCol: "",
        xlCol: "",
        sizes: "sm",
        id: "parametro",
        name: "parametro",
        required: true,
        nameLabel: "Forma de Chasis",
        data: attributes,
        textNode: "parametro",
      })}
    </div>
    `;
    return view;
  }
  async main() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
      <div  class="row g-1">
      ${inputComponent({
        col: "3",
        mdCol: "3",
        xlCol: "3",
        type: "number",
        sizes: "sm",
        id: "id_cliente",
        name: "id_cliente",
        required: true,
        nameLabel: "Cliente",
      })}
      ${inputComponent({
        type: "text",
        sizes: "sm",
        id: "razon_social",
        name: "razon_social",
        required: true,
        nameLabel: "Razón Social",
        readonly: true,
      })}
      </div>
      <div  class="row g-1">
        ${selectComponent({
          col: "auto",
          mdCol: "auto",
          xlCol: "auto",
          sizes: "sm",
          id: "marca",
          name: "marca",
          required: true,
          nameLabel: "Marca",
          data: attributes,
          textNode: "marca",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "text",
          sizes: "sm",
          id: "modelo",
          name: "modelo",
          required: true,
          nameLabel: "Modelo",
        })}
        ${inputComponent({
          col: "3",
          mdCol: "3",
          xlCol: "3",
          type: "text",
          sizes: "sm",
          id: "dominio",
          name: "dominio",
          required: true,
          nameLabel: "Dominio",
          className: "custumeFormatt",
        })}
      </div>
      <div  class="row g-1">
        ${inputComponent({
          col: "6",
          mdCol: "6",
          xlCol: "6",
          type: "text",
          sizes: "sm",
          id: "vin",
          name: "vin",
          required: true,
          nameLabel: "VIN",
          className: "custumeFormatt",
        })}
        ${selectComponent({
          col: "3",
          mdCol: "3",
          xlCol: "3",
          sizes: "sm",
          id: "ejes",
          name: "ejes",
          required: true,
          nameLabel: "Confg. Ejes",
          data: attributes,
          textNode: "ejes",
        })}
        ${inputComponent({
          col: "3",
          mdCol: "3",
          xlCol: "3",
          type: "number",
          sizes: "sm",
          id: "anno",
          name: "anno",
          required: true,
          nameLabel: "Año",
        })}
      </div>
    
    `;
    return view;
  }
  first() {
    const view = `
    <div class="row g-1">
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l016",
          name: "l016",
          required: true,
          nameLabel: "L016",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l012_1",
          name: "l012_1",
          required: true,
          nameLabel: "L012.1",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l012_2",
          name: "l012_2",
          required: true,
          nameLabel: "L012.2",
          className: "S1-D2",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l019",
          name: "l019",
          required: true,
          nameLabel: "L019",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l001",
          name: "l001",
          required: true,
          nameLabel: "L001",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l064",
          name: "l064",
          required: true,
          nameLabel: "L064",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l102",
          name: "l102",
          required: true,
          nameLabel: "L102",
        })}
    </div>
    <div class="row g-1">
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "w002",
          name: "w002",
          required: true,
          nameLabel: "W002",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "w035",
          name: "w035",
          required: true,
          nameLabel: "W035",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "w036",
          name: "w036",
          required: true,
          nameLabel: "W036",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l076",
          name: "l076",
          required: true,
          nameLabel: "L076",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "h076",
          name: "h076",
          required: true,
          nameLabel: "H076",
        })}
        
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "hc",
          name: "hc",
          required: true,
          nameLabel: "HC",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "hc01",
          name: "hc01",
          required: true,
          nameLabel: "HC01",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l042_1",
          name: "l042_1",
          required: true,
          nameLabel: "L042.1",
        })}
    </div>
    <div class="row g-1">
        
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l042_2",
          name: "l042_2",
          required: true,
          nameLabel: "L042.2",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "r079",
          name: "r079",
          required: true,
          nameLabel: "R079",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l043",
          name: "l043",
          required: true,
          nameLabel: "L043",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "l044",
          name: "l044",
          required: true,
          nameLabel: "L044",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "a",
          name: "a",
          required: true,
          nameLabel: "a",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "b",
          name: "b",
          required: true,
          nameLabel: "b",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "c",
          name: "c",
          required: true,
          nameLabel: "c",
        })}
        ${inputComponent({
          col: "",
          mdCol: "",
          xlCol: "",
          type: "number",
          sizes: "sm",
          id: "d",
          name: "d",
          required: true,
          nameLabel: "d",
        })}
    </div>
    `;
    return view;
  }
  dimensiones() {
    const view = `
      <div class="col-md-7 col-12 border-card me-1">
          ${MiniSubTitle({ title: "Según forma de chasis", margin: 2 })}
          ${this.first()}
      </div>
      <div class="col border-card ms-1">
        ${MiniSubTitle({
          title: "Elementos a marcar y acotar en chasis",
          margin: 2,
        })}
        <div class="row g-1">
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_c",
            name: "elm_c",
            required: true,
            nameLabel: "C",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_d",
            name: "elm_d",
            required: true,
            nameLabel: "D",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_e",
            name: "elm_e",
            required: true,
            nameLabel: "E",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_f",
            name: "elm_f",
            required: true,
            nameLabel: "F",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_g",
            name: "elm_g",
            required: true,
            nameLabel: "G",
          })}
        </div>
        <div class="row g-1">
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_h",
            name: "elm_h",
            required: true,
            nameLabel: "H",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_i",
            name: "elm_i",
            required: true,
            nameLabel: "I",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_aa",
            name: "elm_aa",
            required: true,
            nameLabel: "AA",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_ab",
            name: "elm_ab",
            required: true,
            nameLabel: "AB",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_p",
            name: "elm_p",
            required: true,
            nameLabel: "P",
          })}
        </div>
        <div class="row g-1">
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_r",
            name: "elm_r",
            required: true,
            nameLabel: "R",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_s",
            name: "elm_s",
            required: true,
            nameLabel: "S",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_t",
            name: "elm_t",
            required: true,
            nameLabel: "T",
          })}
          ${inputComponent({
            col: "",
            mdCol: "",
            xlCol: "",
            type: "number",
            sizes: "sm",
            id: "elm_j",
            name: "elm_j",
            required: true,
            nameLabel: "J",
          })}
        </div>
      </div>
    `;
    /* 

a
b
c
d
c
d
e
f
g
h
i
aa
ab
p
r
s
t
j
    */
    return view;
  }
  async formComponent() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    <form class="row needs-validation" novalidate id="formDimensiones">
      <div  class="row g-1 mt-4">
      ${SubTitle("Datos Generales", IconTitleTechnical)}
        ${await this.datosChasis()}
      </div>
      <div class="row g-1 mt-3">
        ${SubTitle("Parametros dimensionales (REG-CO-0016)", IconTitleChasis)}
        ${this.dimensiones()}
      </div>
    </form>`;
    return view;
  }
  setting() {
    this.settingParametros()
    this.settingHasCarroceria()
    this.settingObjConsid()
    const parametro = document.querySelector("#parametro");
    parametro.addEventListener("change", () => {
      this.settingParametros();
    });
    const objeto_considerable = document.querySelector("#objeto_considerable");
    objeto_considerable.addEventListener("change", () => {
      this.settingObjConsid()
    });
    const carroceria = document.querySelector("#carroceria");
    carroceria.addEventListener("change", () => {
      this.settingHasCarroceria();
    });
  }
  settingParametros() {
    const value = document.querySelector("#parametro").value;
    this.modify({ idInput: "l012_2", validation: value.startsWith("S1-D1") });
    this.modify({ idInput: "w002", validation: value != "S1-D1 CARROCERÍA" });
    this.modify({ idInput: "hc01", validation: value != "S1-D1 CARROCERÍA" });
    this.modify({ idInput: "l076", validation: !value.includes("SEMI") });
    this.modify({ idInput: "h076", validation: !value.includes("SEMI") });
    this.modify({ idInput: "r079", validation: !value.includes("SEMI") });
    this.modify({ idInput: "hc", validation: value.includes("SEMI") });
    this.modify({
      idInput: "l042_1",
      validation: value === "S1-D1 (CHICO) CARROCERÍA",
    });
    this.modify({
      idInput: "l042_2",
      validation: value === "S1-D1 (CHICO) CARROCERÍA",
    });
    this.modify({
      idInput: "l043",
      validation: value != "S1-D1 (CHICO) CARROCERÍA",
    });
    this.modify({
      idInput: "l044",
      validation: value != "S1-D1 (CHICO) CARROCERÍA",
    });
  }
  settingHasCarroceria() {
    const hasCarroceria = document.querySelector("#carroceria").value === "Sí";
    this.modify({
      valueDafault: "N/A",
      idInput: "carrozado",
      validation: !hasCarroceria,
    });
    this.modify({ idInput: "peso", validation: !hasCarroceria });
    this.modify({ idInput: "largo", validation: !hasCarroceria });
    this.modify({ idInput: "largo_cuchetin", validation: !hasCarroceria });
  }
  settingObjConsid() {
    const value = document.querySelector("#objeto_considerable").value;
    this.modify({ idInput: "kg_objeto_considerable", validation: value === "No" });
  }
  modify(props) {
    const input = document.querySelector(`#${props.idInput}`);
    input.toggleAttribute("disabled", props.validation);
    input.value = props.validation
      ? props.valueDafault
        ? props.valueDafault
        : 0
      : "";
    input.classList.toggle("change-save", props.validation);
  };
}
export default FormCamion;
