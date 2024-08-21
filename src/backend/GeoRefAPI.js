class GeoRefAPI {
  static async getProvincias() {
    try {
      let response = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      response = await response.json();
      let provincias = response.provincias;
      return provincias;
    } catch (e) {
      console.log(e);
    }
  }
  static async getDepartamentoByProvincia(Provincia) {
    try {
      let response = await fetch(
        `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${Provincia}&max=1000`
      );
      response = await response.json();
      let departamentos = response.departamentos;
      return departamentos;
    } catch (e) {
      console.log(e);
    }
  }
  static async getLocalidadByProvincia(Provincia, Departamento) {
    if (Provincia && Departamento) {
      try {
        let response =
          await fetch(`https://apis.datos.gob.ar/georef/api/localidades-censales?provincia=${Provincia}&departamento=${Departamento}&aplanar=true&campos=estandar&max=100&exacto=true
      `);
        response = await response.json();
        let localidades = response.localidades_censales;
        return localidades;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
export default GeoRefAPI;
