const SS_Usadas = "1okJLQwvmrwRDJk4t7J0fhyPvTBolRwBAOcGbgqnRV8k";
const SheetUsadas = "Registro!A1:ZZZ";
const SheetAtributos = "Atributos!A1:ZZZ";
let AtributosUsados;
class UnidadUsada {
  constructor({
    tomado_en_venta,
    trazabilidad,
    vin,
    tipo,
    marca,
    modelo_carrozado,
    anno,
    color_carrozado,
    color_franja,
    dominio,
    tasacion,
  }) {
    this.tomado_en_venta = tomado_en_venta;
    this.trazabilidad = trazabilidad;
    this.vin = vin;
    this.tipo = tipo;
    this.marca = marca;
    this.modelo_carrozado = modelo_carrozado;
    this.anno = anno;
    this.color_carrozado = color_carrozado;
    this.color_franja = color_franja;
    this.dominio = dominio;
    this.tasacion = tasacion;
  }
  static async getUnidades() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetUsadas, SS_Usadas);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async createId(tipo) {
    let num; //Número inicial de la trazabilidad
    let year = Today.getFullYear().toString().substr(2, 2);
    switch (tipo) {
      case "Acoplado":
        num = "5";
        break;
      case "Semirremolque":
        num = "7";
        break;
    }
    Unidades = await this.getUnidades();
    let ID;
    IDs = Unidades.filter(
      (item) =>
        item.trazabilidad.startsWith(num) && item.trazabilidad.endsWith(year)
    );
    IDs = IDs.map((item) => Number(item.trazabilidad.substr(2, 4)));
    if (IDs.length < 1) {
      ID = 1;
    } else {
      ID = Math.max(...IDs) + 1;
    }
    ID = String(ID).padStart(4, "0");
    let trazabilidad = `${num}${ID}${year}`;
    return Number(trazabilidad);
  }
  static async postUnidadUsada(Data) {
    Data.trazabilidad = await this.createId(Data.tipo)
    let newUsada = new UnidadUsada(Data);
    let headers = await ApiGoogleSheet.getHeaders(SheetUsadas, SS_Usadas);
    let newData = objectToArray(newUsada, headers);
    let response = await ApiGoogleSheet.postData(SheetUsadas,[newData], SS_Usadas);
    return response.status
  }
}
class AtributoUsado {
  static async getAtributos() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetAtributos, SS_Usadas);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        AtributosUsados = data;
        return AtributosUsados;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
}
class UI_Usados {
    static loadAtributos(inputId, atributo) {
        try {
          let data = AtributosUsados.map((item) => item[atributo]);
          let input = document.getElementById(inputId);
          input.innerHTML = '<option value="" selected></option>';
          data.map((item) => {
            if (item) {
              let option = document.createElement("option");
              let textNode = document.createTextNode(item);
              option.appendChild(textNode);
              option.value = item;
              input.appendChild(option);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
      static saveUnidadUsada() {
        let form = document.getElementById('tomaUsado');
        let inputs = form.querySelectorAll('.form-control, .form-select');
        inputs.forEach(item => {
          DataUsada[item.name] = item.value;
        });
      }
      static handleTomaUnidadUsada() {
        let form = document.getElementById('tomaUsado');
        let inputs = form.querySelectorAll('.form-control, .form-select');
        inputs.forEach(element => {
          element.toggleAttribute('disabled');
          element.toggleAttribute('required');

        });
        hasUnidadUsada = !hasUnidadUsada;
      }
}
