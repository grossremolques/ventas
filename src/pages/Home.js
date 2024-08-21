import { MainTitle } from "@components/Titles";
import IconTitleClients from "@images/directory.png";
import IconTitleTrailers from "@images/trailer.png";
import IconTitleUsedTrailers from "@images/used-trailer.png";
const Home = (content) => {
  const view = `
      <div class="container row g-3 mx-auto" style="max-width: 700px">
        <div class="card">
          <div class="row">
            <div class="col-12 col-md-3">
              <img src="${IconTitleClients}" class="card-img-top" alt="...">
            </div>
            <div class="col">
              <div class="card-body">
                <p class="card-text">
                  Acciones que se pueden realizar:</p>
                  <ul>
                    <li>Ver el listado de clientes</li>
                    <li>Agregar nuevos clientes</li>
                    <li>Editar/Actualizar clientes existentes</li>
                  </ul>
                  <div class="w-100 text-end">
                    <a href="#/clients" class="btn btn-danger" style="width: 150px">Clientes</a>
                  </div>
              </div>            
            </div>
          </div>
        </div>
        <div class="card">
          <div class="row">
            <div class="col-12 col-md-3">
              <img src="${IconTitleTrailers}" class="card-img-top" alt="...">
            </div>
            <div class="col">
              <div class="card-body">
                <p class="card-text">
                  Acciones que se pueden realizar:</p>
                  <ul>
                    <li>Ver el listado de Unidades 0 KM</li>
                    <li>Agregar Unidades 0 KM</li>
                    <li>Editar/Actualizar Unidades 0 KM existentes que se encuentren en estado de <em>Presupuesto</em> o <em>Pendientes</em></li>
                    <li>Generar Notas de Pedido</li>
                  </ul>
                  <div class="w-100 text-end">
                    <a href="#/trailers" class="btn btn-danger" style="width: 150px">Unidades 0 KM</a>
                  </div>
              </div>            
            </div>
          </div>
        </div>
        <div class="card">
          <div class="row">
            <div class="col-12 col-md-3">
              <img src="${IconTitleUsedTrailers}" class="card-img-top" alt="...">
            </div>
            <div class="col">
              <div class="card-body">
                <p class="card-text">
                  Acciones que se pueden realizar:</p>
                  <ul>
                    <li>Ver el listado de Unidades Usadas</li>
                    <li>Agregar Unidades Usada (Toma)</li>
                    <li>Editar/Actualizar Unidades Usada existentes</li>
                    <li>Generar informe de toma de unidad usado (REG-CO-0193 | <strong>NUEVO</strong>)</li>
                    <li>Generar Registro de Control (Ingreso/Entrega | REG-CO-0009)</li>
                  </ul>
                  <div class="w-100 text-end">
                    <a href="#/used-trailers" class="btn btn-danger" style="width: 150px">Unidades Usadas</a>
                  </div>
              </div>            
            </div>
          </div>
        </div>
      </div>
      `;
  content.innerHTML = view;
};
export default Home;
