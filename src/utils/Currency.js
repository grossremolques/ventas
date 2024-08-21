class Currency {
  formatearMoneda(value) {
    let valorNumerico = parseFloat(value.replace(/[^\d.-]/g, ""));
    if (!isNaN(valorNumerico)) {
      let valorFormateado = valorNumerico.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
      return valorFormateado;
    }
  }
  convertirEnNumero(value) {
    if (value) {
      let formatted = value
        .replace(/\./g, "")
        .replace("$", "")
        .replace(",", ".");
      let valorNumerico = parseFloat(formatted);
      if (!isNaN(valorNumerico)) {
        return valorNumerico;
      }
    } else {
      return 0;
    }
  }
  numInLetters(num, currency) {
    currency = currency || {};
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: Math.round(num * 100) - Math.floor(num) * 100,
      letrasCentavos: "",
      letrasMonedaPlural: currency.plural || "PESOS", //'PESOS', 'Dólares', 'Bolívares', 'etcs'
      letrasMonedaSingular: currency.singular || "PESO", //'PESO', 'Dólar', 'Bolivar', 'etc'
      letrasMonedaCentavoPlural: currency.centPlural || "CENTAVOS",
      letrasMonedaCentavoSingular: currency.centSingular || "CENTAVO",
    };

    if (data.centavos > 0) {
      data.letrasCentavos =
        "CON " +
        (function () {
          if (data.centavos == 1)
            return (
              this.millones(data.centavos) +
              " " +
              data.letrasMonedaCentavoSingular
            );
          else
            return (
              this.millones(data.centavos) +
              " " +
              data.letrasMonedaCentavoPlural
            );
        })();
    }

    if (data.enteros == 0)
      return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
      return (
        this.millones(data.enteros) +
        " " +
        data.letrasMonedaSingular +
        " " +
        data.letrasCentavos
      );
    else
      return (
        this.millones(data.enteros) +
        " " +
        data.letrasMonedaPlural +
        " " +
        data.letrasCentavos
      );
  }
  unidades(num) {
    switch (num) {
      case 1:
        return "UN";
      case 2:
        return "DOS";
      case 3:
        return "TRES";
      case 4:
        return "CUATRO";
      case 5:
        return "CINCO";
      case 6:
        return "SEIS";
      case 7:
        return "SIETE";
      case 8:
        return "OCHO";
      case 9:
        return "NUEVE";
    }
    return "";
  } //Unidades()
  decenas(num) {
    let decena = Math.floor(num / 10);
    let unidad = num - decena * 10;
    switch (decena) {
      case 1:
        switch (unidad) {
          case 0:
            return "DIEZ";
          case 1:
            return "ONCE";
          case 2:
            return "DOCE";
          case 3:
            return "TRECE";
          case 4:
            return "CATORCE";
          case 5:
            return "QUINCE";
          default:
            return "DIECI" + this.unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0:
            return "VEINTE";
          default:
            return "VEINTI" + this.unidades(unidad);
        }
      case 3:
        return this.decenasY("TREINTA", unidad);
      case 4:
        return this.decenasY("CUARENTA", unidad);
      case 5:
        return this.decenasY("CINCUENTA", unidad);
      case 6:
        return this.decenasY("SESENTA", unidad);
      case 7:
        return this.decenasY("SETENTA", unidad);
      case 8:
        return this.decenasY("OCHENTA", unidad);
      case 9:
        return this.decenasY("NOVENTA", unidad);
      case 0:
        return this.unidades(unidad);
    }
  } //Unidades()
  decenasY(strSin, numUnidades) {
    if (numUnidades > 0) return strSin + " Y " + this.unidades(numUnidades);

    return strSin;
  } //DecenasY()
  centenas(num) {
    let cents = Math.floor(num / 100);
    let deces = num - cents * 100;

    switch (cents) {
      case 1:
        if (deces > 0) return "CIENTO " + this.decenas(deces);
        return "CIEN";
      case 2:
        return "DOSCIENTOS " + this.decenas(deces);
      case 3:
        return "TRESCIENTOS " + this.decenas(deces);
      case 4:
        return "CUATROCIENTOS " + this.decenas(deces);
      case 5:
        return "QUINIENTOS " + this.decenas(deces);
      case 6:
        return "SEISCIENTOS " + this.decenas(deces);
      case 7:
        return "SETECIENTOS " + this.decenas(deces);
      case 8:
        return "OCHOCIENTOS " + this.decenas(deces);
      case 9:
        return "NOVECIENTOS " + this.decenas(deces);
    }

    return this.decenas(deces);
  } //Centenas()
  seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;

    let letras = "";

    if (cientos > 0)
      if (cientos > 1) letras = this.centenas(cientos) + " " + strPlural;
      else letras = strSingular;

    if (resto > 0) letras += "";

    return letras;
  } //Seccion()
  miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;

    let strMiles = this.seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = this.centenas(resto);

    if (strMiles == "") return strCentenas;

    return strMiles + " " + strCentenas;
  } //Miles()
  millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor);
    let resto = num - cientos * divisor;

    let strMillones = this.seccion(num, divisor, "UN MILLON", "MILLONES");
    let strMiles = this.miles(resto);

    if (strMillones == "") return strMiles;

    return strMillones + " " + strMiles;
  } //Millones()
}
export { Currency };
