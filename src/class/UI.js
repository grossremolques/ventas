let containerModelo;
let containerCliente;
let containerPago;
let formTech;
let formPago;
let DataFormJSON;
let DataModeloUpdate;
let DataPagoUpdate;
const DataModelo = {};
const DataCliente = {};
const DataPago = {};
const DataUsada = {};
let TypeEdit;
let Trazabilidad;
let isPresupuesto = false;
let hasUnidadUsada = false;
let Status;
let UnidadesUsadas;
let successMessage = `
<div class="alert alert-success fs-5 text-center" style="max-width: 500px; margin: auto;" role="alert">
  <i class="bi bi-database-check"></i> Se ha guardo toda la información correctamente
  <a class="btn btn-success mt-3 btn-sm" href="#" onclick="openGAP()" role="button"><i class="bi bi-file-richtext"></i> Crear nota de pedido</a>
</div>
`;
let failedMessage = `
<div class="alert alert-danger fs-5 text-center" style="max-width: 500px; margin: auto;" role="alert">
  <i class="bi bi-database-check"></i> No se ha podido completar la solicutud
</div>
`;
class UI {
  static async openNotaDePedido() {
    this.modalShow(load)
    isPresupuesto = false;
    DataModelo["status"] = "Pendiente";
    try {
      await this.loadLayout();
      let onlyEdit = document.querySelectorAll('.onlyNew')
      onlyEdit.forEach(item => item.classList.remove('d-none'))
      this.modalHide()
    } catch (e) {
      console.log(e);
    }
  }
  static async openPresupuesto() {
    this.modalShow(load)
    isPresupuesto = true;
    DataModelo["status"] = "Presupuesto";
    try {
      await this.loadLayout();
      let onlyEdit = document.querySelectorAll('.onlyNew')
      onlyEdit.forEach(item => item.classList.remove('d-none'))
      this.modalHide();
    } catch (e) {
      console.log(e);
    }
  }
  static async openEditDatos(event) {
    TypeEdit = event.target.name;
    let result;
    let title;
    try {
      result = await loadPage("./html/editarDatos.html");
      console
      switch(TypeEdit) {
        case "modelo":
          title = '<img src="./assets/icons/producto.png" alt="" width="40px"> Edición de datos tecnicos';
          break;
        case "pagos":
          title = '<img src="./assets/icons/factura.png" alt="" width="40px"> Edición de datos de facturación';
          break;
        case "clientes":
          title = '<img src="./assets/icons/nicho-de-mercado.png" alt="" width="40px"> Edición de datos de cliente';
          break
      }
      document.getElementById('subtitleEdit').innerHTML = title
      if(TypeEdit == 'modelo') {
        document.getElementById('messageOnlyTecnico').removeAttribute('hidden')
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async openVentaUnidadUsada(event) {
    Trazabilidad = event.target.id
    try {
      let result = await loadPage("./html/unidad-disponible.html");
      if(result=== 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async openClientes() {
    try {
      await UI_Cliente.loadFormCliente();
      let form = document.getElementById('formCliente')
      let title = `<img src="./assets/icons/nicho-de-mercado.png" alt="" width="40px"> Clientes`
      let h2 = document.createElement('h2')
      h2.classList.add('m-4')
      h2.innerHTML = title;
      document.getElementById('interface').insertBefore(h2,form)
    } catch (e) {

    }
  }
  /* Carga los contenidos de Datos técnicos, Cliente, y Gestoría */
  static async loadLayout() {
    let result;
    let title = isPresupuesto ? "Presupuesto" : "Nota de Pedido";
    //Inicializa la pantalla para crear Notas de pedido
    try {
      result = await loadPage("./html/nota-de-pedido.html");
      if (result === 200) {
        const Title = document.querySelector(".title-nota");
        document.getElementById(
          "subtitle"
        ).innerHTML = `<img src="./assets/icons/producto.png" alt="" width="40px">Datos Técnicos`;
        Title.innerText = title;
        try {
          containerModelo = document.getElementById("tech");
          result = await UI_Modelos.loadFormModelo(containerModelo);
          if (result === 200) {
            containerModelo.removeAttribute("hidden");
            try {
              containerCliente = document.getElementById("cliente");
              result = await UI_Cliente.loadFormCliente(containerCliente);
              if (result === 200) {
                try {
                  containerPago = document.getElementById("pago");
                  result = await UI_Pago.loadFormPago(containerPago);
                } catch (e) {
                  console.log(e);
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  static async openHome() {
    try {
      await loadPage("./html/home.html");
    } catch (e) {
      console.log(e);
    }
  }
  /* Modal */
  static modalShow(data) {
    let modal = document.getElementById("myModalMessage");
    this.modalHide();
    var myModalShow = new bootstrap.Modal(modal);
    var titleModal = document.querySelector(`#myModalMessage .modal-title`);
    titleModal.innerText = data.titulo;
    var bodyModal = document.querySelector(`#myModalMessage .modal-body`);
    bodyModal.innerHTML = data.body;
    let buttons = modal.querySelectorAll(".hide-close");
    if (data.hasBtnClose) {
      buttons.forEach((item) => item.removeAttribute("hidden", ""));
    } else {
      buttons.forEach((item) => item.setAttribute("hidden", ""));
    }
    myModalShow.show();
  }
  static modalHide(input = "myModalMessage") {
    var modalElement = document.getElementById(input);
    var modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
    if (modal) {
      modal.hide(); // Ocultar el modal si existe una instancia
    }
  }
  /* Funcionalidades */

  static loadInputsById(data, disabled) {
    for (let item in data) {
      const input = document.querySelector(`[name='${item}']`);
      if (input) {
        if (data[item]) {
          input.value = data[item];
        }
        if (disabled) {
          input.setAttribute("disabled", "");
        }
      }
    }
  }
  static isValidForm(event, form) {
    if (form.checkValidity()) {
      event.preventDefault();
    }
    form.classList.add("was-validated");
    return form.checkValidity();
  }
  static async saveAllRegistro(event) {
    let isFormPagoValid = UI_Pago.savePago(event);
    if (isFormPagoValid) {
      UI.modalShow(
        {titulo: "Guardando datos",
        body: "<p>Se está guardando la información, por favor espere.<br> Guardando datos técnicos ⌛</p>"}
      );
      /* Guardar información tecnica */
      let status = await Unidad.postUnidad(DataModelo);
      if (status === 200) {
        document.getElementById("modalBody").innerHTML = `
        <p>Se está guardando la información, por favor espere.<br> 
        Datos técnicos guardados ✔️ <br> 
        Guardando datos de Gestoría ⌛
        </p>
        `;
        /* Guardar información de Gestoría */
        let status = await Gestoria.postGestoria(
          Trazabilidad,
          DataCliente,
          DataPago
        );
        if (status === 200) {
          if (hasUnidadUsada) {
            document.getElementById("modalBody").innerHTML = `
              <p>Se está guardando la información, por favor espere.<br> 
              Datos técnicos guardados ✔️ <br> 
              Datos de Gestoría guardados ✔️ <br> 
              Guardando datos de la unidad usada ⌛
              </p>
            `;
            UI_Usados.saveUnidadUsada();
            DataUsada.tomado_en_venta = Trazabilidad;
            let status = await UnidadUsada.postUnidadUsada(DataUsada);
            if (status === 200) {
              UI.modalShow(
                {titulo:"Registro exitoso",
                body:"<p>Se han guardado todos los datos correctamente ✔️</p>"}
              );
              document.getElementById("interface").innerHTML = successMessage;
            } else {
              document.getElementById("interface").innerHTML = failedMessage;
            }
          } else {
            UI.modalShow(
              {titulo:"Registro exitoso",
              body: "<p>Se han guardado todos los datos correctamente ✔️</p>"}
            );
            localStorage.removeItem("DataFormJSON");
            document.getElementById("interface").innerHTML = successMessage;
          }
        } else {
          UI.modalShow(
            {titulo:"Error",
            body: "<p>No se ha podido guardar los datos de gestoría 🚫</p>"}
          );
          document.getElementById("interface").innerHTML = failedMessage;
        }
      } else {
        UI.modalShow(
          {titulo:"Error",
          body: "<p>No se ha podido guardar los datos técnicos 🚫</p>"}
        );
        document.getElementById("interface").innerHTML = failedMessage;
      }
    }
    this.modalHide();
  }
  static initializationToEdit(event) {
    try {
      let isValid = UI_Modelos.validTrazabilidad(event);
      if (isValid) {
        this.modalShow(load);
        Trazabilidad = event.target.value;
        let contenedor = document.getElementById("techEdit");
        return contenedor;
      } else {
        return isValid;
      }
    } catch (e) {
      console.log(e);
    }
  }
  /* Editar */
  static async loadDatosByUnidad(event) {
    Status = document.getElementById("status");
    let contenedor = this.initializationToEdit(event);
    if (contenedor) {
      this.modalShow(load);
      let page ;
      let dataStatus;
      let result = await loadPage(`./html/${TypeEdit}.html`, contenedor)
      if (result === 200) {
        let form = document.querySelector("form");
        this.listenerChangeEvent(form);
        let onlyEdit = document.querySelectorAll(".onlyEdit")
        onlyEdit.forEach(item => item.classList.remove('d-none'))
        switch(TypeEdit) {
          case 'modelo':
            page = "modelo";
            dataStatus = await this.loadDatosTecnico();
            break;
          case "pagos":
            page = "pagos";
            dataStatus = await this.loadDatosGestoria();
            break;
          case "clientes":
            page = "clientes"
            dataStatus = await this.loadDatosCliente();
            break;
        }
        if (dataStatus) {
          Status.setAttribute(
            "class",
            "form-control form-control-sm " + dataStatus
          );
          Status.removeAttribute("disabled");
          this.modalHide();
          contenedor.removeAttribute("hidden", "");
        }
        else {
          this.modalShow({
            titulo: "🚫 Error",
            body: "<p>La trazabilidad no existe</p>",
            hasBtnClose:true
          });
        }
      }
    }
  }
  static async loadDatosTecnico() {
    try {
      let DataUnidad = await Unidad.getUnidadById(Trazabilidad);
      if (DataUnidad) {
        await UI_Modelos.loadAttributeElements();
        await UI_Modelos.settingUIByModelo(DataUnidad.modelo);
        UI_Modelos.toggleUIOptions(DataUnidad.tipo);
        let isDisabled =
          DataUnidad.status != "Pendiente" &&
          DataUnidad.status != "Presupuesto";
        UI.loadInputsById(DataUnidad, isDisabled);
      }
      console.log(DataUnidad)
      return DataUnidad.status;
    } catch (e) {
      console.log(e)
    }
  }
  static async loadDatosGestoria() {
    await UI_Pago.loadVendedores();
    try {
      let DataGestoria = await Gestoria.getGestoriaById(Trazabilidad)
      if (DataGestoria) {
        let DataUnidad = await Unidad.getUnidadById(Trazabilidad);
        DataGestoria.status = DataUnidad.status
        DataGestoria.monto = DataGestoria.monto ? becomeMontoToNumber(DataGestoria.monto) : 0
        UI.loadInputsById(DataGestoria);
      }
      return DataGestoria.status;
    } catch (e) {
      console.log(e)
    }
  }
  static async loadDatosCliente() {
    try {
      let DataGestoria = await Gestoria.getGestoriaById(Trazabilidad)
      if (DataGestoria) {
        let DataUnidad = await Unidad.getUnidadById(Trazabilidad);
        DataGestoria.status = DataUnidad.status
        DataGestoria.monto = becomeMontoToNumber(DataGestoria.monto)
        let cod_cliente = document.getElementById('cod_cliente');
        document.getElementById('status').value = DataGestoria.status
        cod_cliente.value = DataGestoria.codigo
        cod_cliente.setAttribute('onchange','UI_Cliente.loadChangeCliente(event)')
        await UI_Cliente.loadClienteByCod()
      }
      return DataGestoria.status;
    } catch (e) {
      console.log(e)
    }
    
  }
  static listenerChangeEvent(body) {
    let list = body.querySelectorAll(".form-select, .form-control");
    list.forEach((item) => {
      item.addEventListener("change", (event) => {
        event.target.classList.add("change-save");
      });
    });
  }
  static ButtonStep() {}
  static handleButtonSteps(event) {}
}
class UI_Modelos {
  static async loadFormModelo(contenedor) {
    let response = await loadPage("./html/modelo.html", contenedor);
    await this.loadAttributeElements();
    await this.loadLocalStorege();
    return response;
  }
  static async loadAttributeElements() {
    await Atributos.getOtrosAtributos();
    await this.loadModelos();
    await this.loadEjes();
    await this.loadCarrozados();
    this.loadAtributos("listLargo", "largo");
    this.loadAtributos("alto", "alto");
    this.loadAtributos("ancho", "ancho");
    this.loadAtributos("altura_baranda", "altura_baranda");
    this.loadAtributos("altura_baranda", "altura_baranda");
    await this.loadCumbreras();
    await this.loadPuertasTraseras();
    this.loadAtributos("piso", "piso");
    this.loadAtributos("porta_auxilio", "porta_auxilio");
    this.loadAtributos("porta_auxilio", "porta_auxilio");
    this.loadAtributos("suspension", "suspension");
    this.loadAtributos("levanta_eje", "atrib_si_no");
    this.loadAtributos("seg_lat", "atrib_si_no");
    this.loadAtributos("seg_tras", "atrib_si_no");
    this.loadAtributos("bulon_largo", "atrib_si_no");
    this.loadAtributos("cajon", "cajon");
    this.loadAtributos("cajon_adicional", "cajon");
    this.loadAtributos("cajon_carroceria_1", "cajon");
    this.loadAtributos("cajon_carroceria_2", "cajon");
    this.loadAtributos("medidas", "medidas_llantas");
    this.loadAtributos("ojal_perno_rey", "ojal_perno_rey");
    this.loadAtributos("color_carrozado", "color");
    this.loadAtributos("color_franja", "color");
    this.loadAtributos("color_lona", "lona");
    this.loadAtributos("arcos_extremos", "arcos");
    this.loadAtributos("arcos_centrales", "arcos");
    this.loadAtributos("kit_acople", "kit_acople");
    this.loadAtributos("material", "material");
    this.loadAtributos("cajon_carroceria_ubic_1", "ubicacion");
    this.loadAtributos("cajon_carroceria_ubic_2", "ubicacion");
    this.loadAtributos("tanq_agua_1", "ubicacion");
    this.loadAtributos("tanq_agua_2", "ubicacion");
    this.loadAtributos("divisor_cono", "atrib_si_no");
    this.loadAtributos("rampa", "atrib_si_no");
    this.loadAtributos("cilindro", "cilindro");
    this.loadAtributos("cajon_frente", "cajon");
    this.loadAtributos("camion_marca", "marca");
    this.loadAtributos("traba_puerta", "suspension");
  }
  static async loadLocalStorege() {
    if (localStorage.hasOwnProperty("DataFormJSON")) {
      DataFormParse = localStorage.getItem("DataFormJSON");
      DataFormParse = JSON.parse(DataFormParse);
      UI.loadInputsById(DataFormParse);
      await this.settingUIByModelo(DataFormParse.modelo);
      this.toggleUIOptions(DataFormParse.tipo);
    }
  }
  static async loadModelos(inputId = "modelo") {
    try {
      let modelos = await Atributos.getModelos();
      modelos = modelos.filter((item) => item.activo.value == "Sí");
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      modelos.map((item) => {
        let option = document.createElement("option");
        let textNode = document.createTextNode(item.modelo.value);
        option.appendChild(textNode);
        option.value = item.modelo.value;
        input.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadEjes(inputId = "ejes") {
    try {
      let ejes = await Atributos.getEjes();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      ejes.map((item) => {
        let option = document.createElement("option");
        let textNode = document.createTextNode(item.nombre);
        option.appendChild(textNode);
        option.value = item.nombre;
        input.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadCarrozados(inputId = "carrozado") {
    try {
      let carrozado = await Atributos.getCarrozados();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      carrozado.map((item) => {
        let option = document.createElement("option");
        let textNode = document.createTextNode(item.nombre);
        option.appendChild(textNode);
        option.value = item.nombre;
        input.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static loadAtributos(inputId, atributo) {
    try {
      let data = OtrosAtributos.map((item) => item[atributo]);
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
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
  static async loadCumbreras(inputId = "cumbrera_lateral") {
    try {
      let cumbrera_lateral = await Atributos.getCumbreras();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      cumbrera_lateral.map((item) => {
        if (item) {
          let option = document.createElement("option");
          let textNode = document.createTextNode(item.nombre);
          option.appendChild(textNode);
          option.value = item.nombre;
          input.appendChild(option);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadPuertasTraseras(inputId = "puerta_trasera") {
    try {
      let puerta_trasera = await Atributos.getPuertasTraseras();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      puerta_trasera.map((item) => {
        if (item) {
          let option = document.createElement("option");
          let textNode = document.createTextNode(item.nombre);
          option.appendChild(textNode);
          option.value = item.nombre;
          input.appendChild(option);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async settingUIByModelo(modelo) {
    let modelos = await Atributos.getModelos();
    let data = modelos.find((item) => item.modelo.value == modelo);
    for (let item in data) {
      let input = document.querySelector(`[name='${item}']`);
      if (input) {
        if (data[item].tipo_dato == "Fijo") {
          input.setAttribute("disabled", "");
        }
      }
    }
  }
  static async hadleLoadModelo(event) {
    const Modelo = event.target.value;
    /* reset form */
    formTech = document.getElementById("formTech");
    formTech.reset();
    let disabled = document.querySelectorAll("[disabled]");
    disabled.forEach((input) => {
      input.removeAttribute("disabled");
    });
    try {
      let modelos = await Atributos.getModelos();
      let DataModelo = modelos.find((item) => item.modelo.value === Modelo);
      for (let item in DataModelo) {
        let input = document.querySelector(`[name='${item}']`);
        if (input) {
          input.value = DataModelo[item].value;
          if (DataModelo[item].tipo_dato === "Fijo") {
            input.setAttribute("disabled", "");
          }
        }
      }
      let tipo = DataModelo.tipo.value;
      this.toggleUIOptions(tipo);
    } catch (e) {
      console.log(e);
    }
  }
  static toggleUIOptions(tipo) {
    let divShows;
    let divHidden;
    switch (tipo) {
      case "Acoplado":
      case "Semirremolque":
        divShows = document.querySelectorAll(".show--acoplado");
        divShows.forEach((item) => {
          item.classList.remove("hidden");
        });
        divHidden = document.querySelectorAll(".show--carroceria");
        divHidden.forEach((item) => {
          item.classList.add("hidden");
        });
        break;
      case "Carrocería":
        divShows = document.querySelectorAll(".show--carroceria");
        divShows.forEach((item) => {
          item.classList.remove("hidden");
        });
        divHidden = document.querySelectorAll(".show--acoplado");
        divHidden.forEach((item) => {
          item.classList.add("hidden");
        });
        break;
    }
  }
  static settingCumbrera(event) {
    const typeOfCumbrera = event.target.value;
    let arcos_centrales = document.getElementById("arcos_centrales");
    let arcos_extremos = document.getElementById("arcos_extremos");
    let color_lona = document.getElementById("color_lona");
    let kit_acople = document.getElementById("kit_acople");
    switch (typeOfCumbrera) {
      case "Cumbrera estándar":
      case "Sin cumbrera":
        arcos_extremos.value = "Gruesos";
        arcos_centrales.value = "Estándar";
        color_lona.value = "N/A";
        kit_acople.value = "Fijo";
        color_lona.setAttribute("disabled", "");
        kit_acople.removeAttribute("disabled", "");
        break;
      case "Cumbrera p/destape":
        arcos_extremos.value = "Para destape";
        arcos_centrales.value = "Para destape";
        color_lona.value = "";
        kit_acople.value = "N/A";
        color_lona.removeAttribute("disabled", "");
        kit_acople.setAttribute("disabled", "");
        break;
    }
    arcos_extremos.classList.add("change-save");
    arcos_centrales.classList.add("change-save");
    color_lona.classList.add("change-save");
    kit_acople.classList.add("change-save");
  }
  static settingAcople(event) {
    let kit_acople = event.target.value;
    console.log(kit_acople);
    let kit_acople_adicional_fijo = document.getElementById(
      "kit_acople_adicional_fijo"
    );
    if (kit_acople == "Móvil") {
      kit_acople_adicional_fijo.value = 0;
      kit_acople_adicional_fijo.setAttribute("disabled", "");
    } else {
      kit_acople_adicional_fijo.value = 0;
      kit_acople_adicional_fijo.removeAttribute("disabled", "");
    }
  }
  static async handleValidDatosTecncios(event) {
    event.preventDefault();
    let form = document.querySelector('form')
    if (UI.isValidForm(event, form)) {
      DataModeloUpdate = {};
      const inputsChanges = document.querySelectorAll(".change-save");
      inputsChanges.forEach((item) => {
        DataModeloUpdate[item.name] = item.value;
      });

      let body = `
        <h5>Datos para actualizar</h5>
        <ul id="listModal">
        </ul>`;

      UI.modalShow({ titulo: "Verificación", body: body, hasBtnClose: true });
      document.querySelector(".modal-footer").innerHTML = `
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal"onclick="UI_Modelos.updateDatos()">Guardar</button>
      `;
      let listModal = document.getElementById("listModal");
      for (let item in DataModeloUpdate) {
        let li = document.createElement("li");
        let nodeContent = `<strong>${item}</strong>: ${DataModeloUpdate[item]}`;
        li.innerHTML = nodeContent;
        listModal.appendChild(li);
      }
    }
  }
  static async updateDatos() {
    UI.modalShow(load);
    let result = await Unidad.update(Trazabilidad, DataModeloUpdate);
    if (result === 200) {
      UI.modalShow({
        titulo: "✔️ Requerimiento completado",
        body: `<p>
        Los datos han sido actualizados</p>
        <a class="btn btn-success mt-3 btn-sm" href="#" onclick="openGAP()" role="button"><i class="bi bi-file-richtext"></i> Crear nota de pedido</a>`,
        hasBtnClose: true
      });
      UI.openHome();
    } else {
      UI.modalShow({
        titulo: "🚫 Error",
        body: "<p>No se actualizado la información</p>",
        hasBtnClose: true
      });
    }
  }
  //Guarda la Información en el localStorage (LS)
  static async saveInLSModelo(event) {
    event.preventDefault();
    formTech = document.getElementById("formTech");
    if (!isPresupuesto) {
      if (UI.isValidForm(event, formTech)) {
        this.pushInMemory(DataModelo);
        document.getElementById(
          "subtitle"
        ).innerHTML = `<img src="./assets/icons/nicho-de-mercado.png" alt="" width="40px">Selección de Cliente`;
      }
    } else {
      this.pushInMemory(DataModelo);
      document.getElementById("subtitle").innerText = "Selección de Cliente";
    }
  }
  static pushInMemory(Data) {
    let inputs = formTech.querySelectorAll(".save");
    inputs.forEach((item) => {
      Data[item.name] = item.value;
    });
    DataFormJSON = JSON.stringify(Data);
    localStorage.setItem("DataFormJSON", DataFormJSON);
    containerModelo.setAttribute("hidden", "");
    containerCliente.removeAttribute("hidden", "");
  }
  static validTrazabilidad(event) {
    let input = event.target;
    let textElement = document.getElementById("messageInvalid");
    let expRegular = /^[1-7]([\.])[0-9]{4}([\-])[0-9]{2}/;
    if (expRegular.test(input.value) != true) {
      input.setAttribute("style", "border-color:var(--bs-danger)");
      textElement.removeAttribute("hidden", "");
    } else {
      input.removeAttribute("style");
      textElement.setAttribute("hidden", "");
    }
    return expRegular.test(input.value);
  }
}
class UI_Cliente {
  static async loadFormCliente(contenedor) {
    let response = await loadPage("./html/clientes.html", contenedor);
    if (response === 200) {
      await this.loadProvincias();
    }
    return response;
  }
  static async loadProvincias(inputId = "listProvincia") {
    try {
      let provincias = await Geo.getProvincias();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      provincias.map((item) => {
        if (item) {
          let option = document.createElement("option");
          let textNode = document.createTextNode(item.nombre);
          option.appendChild(textNode);
          option.value = item.nombre;
          option.id = item.id;
          input.appendChild(option);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadDepartamento(event, inputId = "listPartido") {
    let provincia = event.target.value;
    try {
      let departamentos = await Geo.getDepartamentoByProvincia(provincia);
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      departamentos.map((item) => {
        if (item) {
          let option = document.createElement("option");
          let textNode = document.createTextNode(item.nombre);
          option.appendChild(textNode);
          option.value = item.nombre;
          input.appendChild(option);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadLocalidad(event, inputId = "listLocalidad") {
    let provincia = document.getElementById("provincia").value;
    let departamento = event.target.value;
    try {
      let localidades = await Geo.getLocalidadByProvincia(
        provincia,
        departamento
      );
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      localidades.map((item) => {
        if (item) {
          let option = document.createElement("option");
          let textNode = document.createTextNode(item.nombre);
          option.appendChild(textNode);
          option.value = item.nombre;
          input.appendChild(option);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async loadClienteByCod(event) {
    UI.modalShow(load);
    let cod;
    if(event) {
      cod = event.target.value;
      this.resetForm();
    }
    else {
      cod = document.getElementById('cod_cliente').value;
    }
    try {
      let cliente = await Cliente.getClienteByCodigo(cod);
      if (cliente) {
        UI.loadInputsById(cliente);
        this.abledBtn("btnEditCustumer");
        this.abledBtn("btnSelectCustumer");
      }
      UI.modalHide();
    } catch (e) {
      console.log(e);
    }
  }
  /* Handle Buttons and featcture */
  static async handleBtnAddCliente() {
    let messageErrorCod = document.getElementById("messageErrorCod");
    let id = document.getElementById("id_cod").value;
    let isCodAvailable = await Cliente.isCodAvailable(id);
    if (isCodAvailable) {
      this.resetForm();
      messageErrorCod.classList.add("hidden");
      this.abilityForm();
      document.getElementById("id").value = id;
      this.abledBtn("btnhandleBtnSaveCliente()");
      UI.modalHide("modalAddClient");
    } else {
      messageErrorCod.classList.remove("hidden");
    }
  }
  static async handleBtnSaveCliente(event) {
    //Guardar Cliente
    UI.modalShow(load);
    try {
      event.preventDefault();
      let form = document.getElementById("formCliente");
      if (UI.isValidForm(event, form)) {
        let inputs = form.querySelectorAll(".save");
        inputs.forEach((item) => {
          DataCliente[item.id] = item.value;
        });
        await Cliente.saveCliente(DataCliente);
        inputs.forEach((item) => item.setAttribute("disabled", ""));
        this.abledBtn("btnEditCustumer");
        this.abledBtn("btnAddCustumer");
        this.disabledBtn("btnhandleBtnSaveCliente()");
        this.abledBtn("btnSelectCustumer");
        UI.modalHide();
      }
    } catch (e) {
      console.log(e);
    }
  }
  static handleBtnEditCliente() {
    this.abilityForm();
    this.disabledBtn("btnSelectCustumer");
    this.abledBtn("btnhandleBtnSaveCliente()");
  }
  static async handleBtnSelectCliente(event) {
    event.preventDefault();
    let form = document.getElementById("formCliente");
    let inputs = form.querySelectorAll(".save");
    inputs.forEach((item) => {
      DataCliente[item.name] = item.value;
    });
    containerCliente.setAttribute("hidden", "");
    containerPago.removeAttribute("hidden");
    document.getElementById(
      "subtitle"
    ).innerHTML = `<img src="./assets/icons/factura.png" alt="" width="40px">Tasación y Formas de pago`;
  }
  static resetForm() {
    let form = document.getElementById("formCliente");
    form.reset();
    let inputs = form.querySelectorAll(".save");
    inputs.forEach((item) => item.setAttribute("disabled", ""));
    this.disabledBtn("btnEditCustumer");
    this.abledBtn("btnAddCustumer");
    this.disabledBtn("btnhandleBtnSaveCliente()");
    this.disabledBtn("btnSelectCustumer");
  }
  static abilityForm() {
    let form = document.getElementById("formCliente");
    let inputs = form.querySelectorAll(".save");
    inputs.forEach((item) => item.removeAttribute("disabled"));
  }
  static disabledBtn(idBtn) {
    document.getElementById(idBtn).setAttribute("disabled", "");
  }
  static abledBtn(idBtn) {
    document.getElementById(idBtn).removeAttribute("disabled");
  }
  static async loadChangeCliente(event){
    await this.loadClienteByCod(event);
    let btnChangetCustumer = document.getElementById('btnChangetCustumer');
    btnChangetCustumer.removeAttribute('disabled','')
  }
  static async handleBtnChangeCliente(event) {
    event.preventDefault()
    UI.modalShow(load);
    let data = {}
    data.codigo = document.getElementById('id').value;
    await Gestoria.update(Trazabilidad,data);
    UI.openHome();
    UI.modalShow({
      titulo: "✔️ Requerimiento completado",
      body: `<p>
      Los datos han sido actualizados</p>
      <a class="btn btn-success mt-3 btn-sm" href="#" onclick="openGAP()" role="button"><i class="bi bi-file-richtext"></i> Crear nota de pedido</a>`,
      hasBtnClose: true
    });

    
  }
}
class UI_Pago {
  static async loadFormPago(contenedor) {
    await loadPage("./html/pagos.html", contenedor);
    await this.loadVendedores();
    await AtributoUsado.getAtributos();
    UI_Usados.loadAtributos("marca", "marca");
    UI_Usados.loadAtributos("modelo_carrozado", "modelo_carrozado");
    UI_Usados.loadAtributos("color_carrozado_usado", "color");
    UI_Usados.loadAtributos("color_franja_usaso", "color");
  }
  static savePago(event) {
    let isValid = false;
    event.preventDefault();
    formPago = document.getElementById("formPago");
    if (UI.isValidForm(event, formPago)) {
      isValid = true;
      let inputs = formPago.querySelectorAll(".save");
      inputs.forEach((item) => {
        DataPago[item.name] = item.value;
      });
    }
    return isValid;
  }
  static async loadVendedores(inputId = "vendedor") {
    try {
      let vendedores = await Usuarios.getVendedores();
      let input = document.getElementById(inputId);
      input.innerHTML = '<option selected value="">Ninguno</option>';
      vendedores.map((item) => {
        let option = document.createElement("option");
        let textNode = document.createTextNode(item.nombreCompleto);
        option.appendChild(textNode);
        option.value = item.alias;
        input.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }
  static handleValidDatosPago(event) {
    event.preventDefault();
    let form = document.querySelector('form')
    if (UI.isValidForm(event, form)) {
      DataPagoUpdate = {};
      const inputsChanges = document.querySelectorAll(".change-save");
      inputsChanges.forEach((item) => {
        DataPagoUpdate[item.name] = item.value;
      });

      let body = `
        <h5>Datos para actualizar</h5>
        <ul id="listModal">
        </ul>`;

      UI.modalShow({ titulo: "Verificación", body: body, hasBtnClose: true });
      document.querySelector(".modal-footer").innerHTML = `
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal"onclick="UI_Pago.updateDatos()">Guardar</button>
      `;
      let listModal = document.getElementById("listModal");
      for (let item in DataPagoUpdate) {
        let li = document.createElement("li");
        let nodeContent = `<strong>${item}</strong>: ${DataPagoUpdate[item]}`;
        li.innerHTML = nodeContent;
        listModal.appendChild(li);
      }
    }
  }
  static async updateDatos() {
    UI.modalShow(load);
    let result = await Gestoria.update(Trazabilidad, DataPagoUpdate);
    if (result === 200) {
      UI.modalShow({
        titulo: "✔️ Requerimiento completado",
        body: `<p>
        Los datos han sido actualizados</p>
        <a class="btn btn-success mt-3 btn-sm" href="#" onclick="openGAP()" role="button"><i class="bi bi-file-richtext"></i> Crear nota de pedido</a>`,
        hasBtnClose: true
      });
      UI.openHome();
    } else {
      UI.modalShow({
        titulo: "🚫 Error",
        body: "<p>No se actualizado la información</p>",
        hasBtnClose: true
      });
    }
  }
}
const load = {
  titulo: "Procesando requerimiento",
  body: `
      <div class="loader loader--style4" title="3">
        <p class="lead"> Cargando</p>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 50 50;"
          xml:space="preserve">
          <rect x="0" y="0" width="4" height="7" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1"
              begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
  
          <rect x="10" y="0" width="4" height="7" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1"
              begin="0.2s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="0" width="4" height="7" fill="#333">
            <animateTransform attributeType="xml" attributeName="transform" type="scale" values="1,1; 1,3; 1,1"
              begin="0.4s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
  `,
};