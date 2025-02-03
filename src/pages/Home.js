import { MainTitle } from "@components/Titles";
import IconTitleClients from "@images/directory.png";
import IconTitleTrailers from "@images/trailer.png";
import IconTitleUsedTrailers from "@images/used-trailer.png";
import IconTitleCamion from "@images/semi-camion.png";
const Home = (content) => {
  const view = `
  ${MainTitle('Menú de Ventas')}
  <div class="contenedor-home mt-3">
    ${card({
      img: IconTitleClients, title: 'Clientes', content:`
      <ul>
        <li>Ver el listado de clientes</li>
        <li>Agregar nuevos clientes</li>
        <li>Editar/Actualizar clientes existentes</li>
      </ul>
      `,link: '#/clients', btnName: 'Ir a Clientes'})}
    ${card({
      img: IconTitleTrailers, title: 'Unidades 0 km', content:`
      <ul>
        <li>Ver el listado de Unidades 0 KM</li>
        <li>Agregar Unidades 0 KM</li>
        <li>Editar/Actualizar Unidades 0 KM existentes que se encuentren en estado de <em>Presupuesto</em> o <em>Pendientes</em></li>
        <li>Generar Notas de Pedido</li>
        <li>Generar Solicitudes de Cambio (NUEVO)</li>
      </ul>
      <a href="https://grossremolques.github.io/comercial-gross/#/solicitudes" target="_blank" class="mb-2 btn btn-success w-100">Solicitud de Cambio</a>
      `,link: '#/trailers', btnName: 'Ir a Unidades0 KM'})}
    ${card({
      img: IconTitleUsedTrailers, title: 'Unidades usadas', content:`
      <ul>
        <li>Ver el listado de Unidades Usadas</li>
        <li>Agregar Unidades Usada (Toma)</li>
        <li>Editar/Actualizar Unidades Usada existentes</li>
        <li>Generar informe de toma de unidad usado (REG-CO-0193 | <strong>NUEVO</strong>)</li>
        <li>Generar Registro de Control (Ingreso/Entrega | REG-CO-0009)</li>
      </ul>
      
      `,link: '#/used-trailers', btnName: 'Ir a Unidades Usadas'})}
    ${card({
      img: IconTitleCamion, title: 'Camiones', content:`
      <ul>
        <li>Ver el listado de Camiones</li>
        <li>Agregar Camiones</li>
        <li>Editar/Actualizar Camiones existentes</li>
        <li>Agregar dimensiones del camión (REG-CO-0016)</li>
      </ul>
      `,link: 'https://grossremolques.github.io/comercial/#/camiones', btnName: 'Ir a Camiones'})}
  </div>
  `
  content.innerHTML = view;
};
const card = (props) => {
  const view = `
    <div class="card" style="max-width: 19rem">
      <div class="w-100""
>
        <img class="w-100 p-5" src="${props.img}" alt="">
      </div>
      <div class="card-body d-flex justify-content-between flex-column">
        <div>
        <h5 class="card-title">${props.title}</h5>
          <p class="card-text">Acciones que se pueden realizar:</p>
          ${props.content}
        </div>
        <a href="${props.link}" ${props.title === 'Camiones' ? 'target="_blank"':''} class="btn btn-danger">${props.btnName}</a>
      </div>
    </div>
  `
  return view
}
export default Home;
