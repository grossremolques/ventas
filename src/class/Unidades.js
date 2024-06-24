const SheetUnidades = "Unidades!A1:ZZZ";
const SheetModelos = "Modelos!A1:ZZ";
const SheetEjes = "Ejes!A1:ZZ";
const SheetCarrozados = "Carrozados!A1:ZZ";
const SheetOtrosAtributos = "Otros Atributos!A1:ZZ";
const SheetCumbreraLateral = "Cumbrera lateral!A1:ZZ";
const SheetPuertasTraseras = "Puertas traseras!A1:ZZ";
let OtrosAtributos;
const Today = new Date();
let IDs;
let Unidades;
let newUnidad;
class Unidad {
  constructor({
    trazabilidad,
    tipo,
    ejes,
    modelo,
    carrozado,
    largo,
    alto,
    ancho,
    altura_baranda,
    cant_puertas_laterales,
    puerta_trasera,
    piso,
    espesor,
    cumbrera_lateral,
    arcos_extremos,
    arcos_centrales,
    kit_acople,
    kit_acople_adicional_fijo,
    color_lona,
    color_carrozado,
    color_franja,
    cajon,
    cajon_adicional,
    cajon_carroceria_1,
    cajon_carroceria_ubic_1,
    cajon_carroceria_2,
    cajon_carroceria_ubic_2,
    boq_st_delantera,
    boq_st_trasera,
    boq_st,
    boq_oculta,
    cajon_frente,
    centro_eje,
    camion_marca,
    camion_modelo,
    divisor_cono,
    seg_lat,
    seg_tras,
    tanq_agua_1,
    tanq_agua_2,
    porta_auxilio,
    llantas_acero,
    llantas_aluminio,
    medidas,
    bulon_largo,
    suspension,
    levanta_eje,
    traba_puerta,
    rampa,
    ojal_perno_rey,
    registrado_por,
    informacion_adicional,
    material,
    cilindro,
    para_stock,
    estira_lona,
    ventilados_cant,
    ventilados_ubic_alt,
    techo,
    lona_con_logo,
    lona_color_lateral
  }) {
    this.trazabilidad = trazabilidad;
    this.fecha = FormatsDate.latinFormat();
    this.modelo = modelo;
    this.tipo = tipo;
    this.ejes = ejes;
    this.carrozado = carrozado;
    this.material = material;
    this.largo = largo;
    this.alto = alto;
    this.ancho = ancho;
    this.altura_baranda = altura_baranda;
    this.cant_puertas_laterales = cant_puertas_laterales;
    this.puerta_trasera = puerta_trasera;
    this.piso = piso;
    this.espesor = espesor;
    this.cumbrera_lateral = cumbrera_lateral;
    this.arcos_extremos = arcos_extremos;
    this.arcos_centrales = arcos_centrales;
    this.kit_acople = kit_acople;
    this.kit_acople_adicional_fijo = kit_acople_adicional_fijo;
    this.color_lona = color_lona;
    this.color_carrozado = color_carrozado;
    this.color_franja = color_franja;
    this.cajon = cajon;
    this.cajon_adicional = cajon_adicional;
    this.cajon_carroceria_1 = cajon_carroceria_1;
    this.cajon_carroceria_ubic_1 = cajon_carroceria_ubic_1;
    this.cajon_carroceria_2 = cajon_carroceria_2;
    this.cajon_carroceria_ubic_2 = cajon_carroceria_ubic_2;
    this.boq_st_delantera = boq_st_delantera;
    this.boq_st_trasera = boq_st_trasera;
    this.boq_st = boq_st;
    this.boq_oculta = boq_oculta;
    this.cajon_frente = cajon_frente;
    this.centro_eje = centro_eje;
    this.camion_marca = camion_marca;
    this.camion_modelo = camion_modelo;
    this.divisor_cono = divisor_cono;
    this.seg_lat = seg_lat;
    this.seg_tras = seg_tras;
    this.tanq_agua_1 = tanq_agua_1;
    this.tanq_agua_2 = tanq_agua_2;
    this.porta_auxilio = porta_auxilio;
    this.llantas_acero = llantas_acero;
    this.llantas_aluminio = llantas_aluminio;
    this.medidas = medidas;
    this.bulon_largo = bulon_largo;
    this.suspension = suspension;
    this.levanta_eje = levanta_eje;
    this.traba_puerta = traba_puerta;
    this.rampa = rampa;
    this.ojal_perno_rey = ojal_perno_rey;
    this.cilindro = cilindro;
    this.para_stock = para_stock;
    this.registrado_por = registrado_por;
    this.informacion_adicional = informacion_adicional;
    this.estira_lona = estira_lona;
    this.ventilados_cant = ventilados_cant;
    this.ventilados_ubic_alt = ventilados_ubic_alt;
    this.techo = techo;
    this.lona_con_logo = lona_con_logo;
    this.lona_color_lateral = lona_color_lateral
  }
  static async getUnidades() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetUnidades);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getUnidadById(id) {
    let unidad;
    try {
      let unidades = await this.getUnidades();
      if (unidades.some((item) => item.trazabilidad === id)) {
        unidad = unidades.find((item) => item.trazabilidad === id);
      }
      return unidad;
    } catch (e) {
      console.log(e);
    }
  }
  static async createId(tipo) {
    let num; //Número inicial de la trazabilidad
    let year = Today.getFullYear().toString().substr(2, 2);
    switch (tipo) {
      case "Acoplado":
        num = "1";
        break;
      case "Carrocería":
        num = "2";
        break;
      case "Semirremolque":
        num = "3";
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
    Trazabilidad = `${num}.${ID}-${year}`;
    return Trazabilidad;
  }
  static async createUnidad(data) {
    try {
      data.trazabilidad = await this.createId(data.tipo);
      const newUnidad = new Unidad(data);
      return newUnidad;
    } catch (e) {}
  }
  static async postUnidad(DataForm) {
    try {
      let usuario = await Usuarios.getUser();
      let id = await this.createId(DataForm.tipo);
      id = id.replace("-", "").replace(".", "");
      DataForm.trazabilidad = Number(id);
      Trazabilidad = Number(id);
      if (usuario) {
        DataForm.registrado_por = usuario.alias;
      }
      DataForm.para_stock = "No";
      newUnidad = new Unidad(DataForm);
      let headers = await ApiGoogleSheet.getHeaders(SheetUnidades);
      newUnidad = objectToArray(newUnidad, headers);
      let response = await ApiGoogleSheet.postData(SheetUnidades, [newUnidad]);
      return response.status;
    } catch (e) {
      console.log(e);
    }
  }
  static async update(id, values) {
    let dataToUpdate = [];
    try {
      let unidades = await this.getUnidades();
      let row = unidades.findIndex((item) => item.trazabilidad === id) + 2;
      for (let item in values) {
        dataToUpdate.push({
          row: row,
          column: getColumnByKey(item, unidades),
          value: values[item],
        });
      }
      dataToUpdate = dataToUpdate.filter((item) => item.column != 0);
      let data = ApiGoogleSheet.createdDataToUpdate(dataToUpdate, "Unidades");
      let response = await ApiGoogleSheet.updateData(data);
      return response.status;
    } catch (e) {
      console.log(e);
    }
  }
  static async getUnidadesDisponibles() {
    try {
      let unidades = await this.getUnidades();
      let disponibles = unidades.filter(item => item.disponibilidad == 'Disponible');
      return disponibles;
    } catch(e) {
      console.log(e)
    }
  }
}
class Atributos {
  static async getModelos() {
    let data;
    try {
      let response = await ApiGoogleSheet.getResponse(SheetModelos);
      if (response.status === 200) {
        data = arrayToObject(response.result.values);
      }
      let arr = [];
      for (let item of data) {
        let obj = {};
        let isInArr = arr.some((elem) => elem.modelo.value === item.modelo);
        if (!isInArr) {
          obj["modelo"] = { value: item.modelo };
          data.map((item) => {
            if (obj.modelo.value == item.modelo && item.valor != "") {
              obj[item.atributo] = {
                value: item.valor,
                tipo_dato: item.tipo_dato,
              };
            }
          });
          arr.push(obj);
        }
      }
      return arr;
    } catch (e) {
      console.log(e);
    }
  }
  static async getEjes() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetEjes);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getCarrozados() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetCarrozados);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        data = data.filter((item) => item.activo == "Sí");
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getOtrosAtributos() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetOtrosAtributos);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        OtrosAtributos = data;
        return OtrosAtributos;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getCumbreras() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetCumbreraLateral);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  static async getPuertasTraseras() {
    try {
      let response = await ApiGoogleSheet.getResponse(SheetPuertasTraseras);
      if (response.status === 200) {
        let data = arrayToObject(response.result.values);
        data = data.filter((item) => item.activo == "Sí");
        return data;
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  }
}
