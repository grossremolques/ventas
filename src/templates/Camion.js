import MyCustumeModal from "@components/MyCustumeModal";
import IconTitleTechnical from "@images/producto.png";
import IconTitleCharacteristics from "@images/options.png";
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
class FormCamion {
  constructor() {
    this.modal = new MyCustumeModal(document.querySelector("#modal"));
  }
  async datosGenerales() {
    const attributes = await Attributes.getDataInJSON();
    const view = `
    ${SubTitle("Datos Generales", IconTitleTechnical)}
    <div class="row g-1">
        ${selectComponent({
          col: "6",
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
          col: "6",
          mdCol: "3",
          xlCol: "3",
          type: "text",
          sizes: "sm",
          id: "modelo",
          name: "modelo",
          required: true,
          nameLabel: "Modelo",
        })}
        ${inputComponent({
          col: "5",
          mdCol: "2",
          xlCol: "2",
          type: "number",
          sizes: "sm",
          id: "anno",
          name: "anno",
          required: true,
          nameLabel: "Año",
        })}
        ${inputComponent({
          col: "7",
          mdCol: "2",
          xlCol: "2",
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
          type: "text",
          sizes: "sm",
          id: "vin",
          name: "vin",
          required: true,
          nameLabel: "Chasis",
          className: "custumeFormatt",
        })}
        ${selectComponent({
            col: "4",
            mdCol: "auto",
            xlCol: "auto",
            sizes: "sm",
            id: "ejes",
            name: "ejes",
            required: true,
            nameLabel: "Confg. Ejes",
            data: attributes,
            textNode: "ejes",
          })}
    </div>
    <div class="row g-1">
        ${selectComponent({
          col: "6",
          mdCol: "",
          xlCol: "2",
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
          mdCol: "",
          xlCol: "2",
          sizes: "sm",
          id: "frenos",
          name: "frenos",
          required: true,
          nameLabel: "Frenos",
          data: attributes,
          textNode: "frenos",
        })}
        <div class="col-12 col-md-4 col-xl-4">
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
        <div class="col-12 col-md-5 col-xl-4">
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
    <div class="row g-1">
        <div class="col-12 col-md-4 col-xl-4">
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
        <div class="col-12 col-md-4 col-xl-4">
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
            mdCol: "",
            xlCol: "2",
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
            mdCol: "",
            xlCol: "2",
            sizes: "sm",
            id: "depresion_chasis",
            name: "depresion_chasis",
            required: true,
            nameLabel: "Depresión en chasis",
            data: attributes,
            textNode: "si_no",
            })}
        </div>
        <div class="row g-1">
            ${selectComponent({
            col: "6",
            mdCol: "",
            xlCol: "2",
            sizes: "sm",
            id: "carroceria",
            name: "carroceria",
            required: true,
            nameLabel: "Posee carrocería",
            data: attributes,
            textNode: "si_no",
            })}
            ${selectComponent({
            col: "6",
            mdCol: "",
            xlCol: "2",
            sizes: "sm",
            id: "cuchetin",
            name: "cuchetin",
            required: true,
            nameLabel: "Posee cuchetín",
            data: attributes,
            textNode: "si_no",
            })}
            <div class="col-12 col-md-3 col-xl-4">
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
            mdCol: '',
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
            nameLabel: "Tipo de camión/trabajo",
            data: attributes,
            textNode: "parametro",
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
        className: "S1-D2"
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
    `
    return view
  }
  async parametros() {
    const view = `
    <div class="row g-1 mt-3">
        ${SubTitle("Parametros dimensionales", IconTitleCharacteristics)}
        <div class="col-md-7 col-12 border-card me-1">
            ${MiniSubTitle({title:'Según tipo de camión ó trabajo a realizar',margin: 2})}
            ${this.first()}
        </div>
        <div class="col border-card ms-1">
        ${MiniSubTitle({title:'Elementos a marcar y acotar en chasis',margin: 2})}
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
                namelm_e: "E",
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
        <form class="row needs-validation g-1 mt-3" novalidate id="formCamion">
            ${await this.datosGenerales()}
            ${await this.parametros()}
        </form>`;
    return view;
  }
  setting() {
    const parametro = document.querySelector('#parametro');
    parametro.addEventListener('change', () => {
        const l012_2 = document.querySelector('#l012_2')
        const w002 = document.querySelector('#w002')
        const l076 = document.querySelector('#l076')
        const h076 = document.querySelector('#h076')
        const hc = document.querySelector('#hc')
        const hc01 = document.querySelector('#hc01')
        const l042_1 = document.querySelector('#l042_1')
        const l042_2 = document.querySelector('#l042_2')
        const r079 = document.querySelector('#r079')
        const l043 = document.querySelector('#l043')
        const l044 = document.querySelector('#l044')

        l012_2.toggleAttribute('disabled',parametro.value.startsWith('S1-D1'))
        l012_2.value = parametro.value.startsWith('S1-D1') ? 0: ''
        w002.toggleAttribute('disabled',parametro.value!='S1-D1 CARROCERÍA')
        hc01.toggleAttribute('disabled', parametro.value!='S1-D1 CARROCERÍA')
        w002.value = parametro.value!='S1-D1 CARROCERÍA' ? 0: ''
        hc01.value = parametro.value!='S1-D1 CARROCERÍA' ? 0: ''
        l076.toggleAttribute('disabled', !parametro.value.includes('SEMI'))
        h076.toggleAttribute('disabled', !parametro.value.includes('SEMI'))
        r079.toggleAttribute('disabled', !parametro.value.includes('SEMI'))
        hc.toggleAttribute('disabled', parametro.value.includes('SEMI'))
        l076.value = !parametro.value.includes('SEMI') ? 0: ''
        h076.value = !parametro.value.includes('SEMI') ? 0: ''
        r079.value = !parametro.value.includes('SEMI') ? 0: ''
        hc.value = parametro.value.includes('SEMI') ? 0: ''
        
        
        l042_1.toggleAttribute('disabled', parametro.value==='S1-D1 (CHICO) CARROCERÍA')
        l042_2.toggleAttribute('disabled', parametro.value==='S1-D1 (CHICO) CARROCERÍA')
        l042_1.value = parametro.value==='S1-D1 (CHICO) CARROCERÍA' ? 0: ''
        l042_2.value = parametro.value==='S1-D1 (CHICO) CARROCERÍA' ? 0: ''
        l043.toggleAttribute('disabled',parametro.value!='S1-D1 (CHICO) CARROCERÍA')
        l044.toggleAttribute('disabled',parametro.value!='S1-D1 (CHICO) CARROCERÍA')
        l043.value = parametro.value!='S1-D1 (CHICO) CARROCERÍA' ? 0: ''
        l044.value = parametro.value!='S1-D1 (CHICO) CARROCERÍA' ? 0: ''
    })
    const objeto_considerable = document.querySelector('#objeto_considerable');
    objeto_considerable.addEventListener('click',(event) => {
        const value = event.target.value;
        const input = document.querySelector('#kg_objeto_considerable');
        input.value = value === 'NO' ? 0:''
    })
    trimCustumize()
  }
}
export default FormCamion;
