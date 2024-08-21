import IconError404 from '../assets/images/error404.png'
const Error404 = (content) => {
    const view = `
      <div class="m-auto" style="max-width:500px; display: grid; place-items: center; height: 500px;">
        <div class="row align-items-center">
          <div class="col-12 col-md">
            <img src="${IconError404}" style="width: 100%" alt="">
          </div>
          <div class="col-12 col-md-auto text-center text-md-end">
            <h1>Oops!</h1>
            <p class="lead">ERROR: la página solicitada no existe</p>
            <a class="btn btn-dark" href="/#">Ir al inicio</a>
          </div>
        </div>
      </div>
      `;
      content.innerHTML = view;
  };
  export default Error404;