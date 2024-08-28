import Clients from "../pages/Clients/Clients";
import Home from "../pages/Home";
import Trailers from "../pages/Trailers/Trailers";
import UsedTrailers from "../pages/UsedTrailers/UsedTrailers";
import Error404 from "../pages/Error404";
import AddClient from "../pages/Clients/AddClients";
import Loader from "../components/Loader";
import Client from "../pages/Clients/Client";
import { getHash } from "./Tools";
import UsedTrailer from "../pages/UsedTrailers/UsedTrailer";
import AddUsedTrailer from "../pages/UsedTrailers/AddUsedTrailer";
import { Print } from "../pages/Print";
import { PrintReg_009 } from "../pages/Print_REG_SE_009";
import Reg_co_0009 from "../pages/REG-CO-0009";
import AddTrailer from "../pages/Trailers/AddTrailer";
import { Print_NotaPedido } from "../pages/Trailers/Print_NotaPedido";
import Trailer from "../pages/Trailers/Trailer";
import { Informe } from "../pages/Informe";
import Camiones from "../pages/Camiones/Camiones";
import AddCamion from "../pages/Camiones/AddCamion";

const routes = {
  "/": Home,
  "/clients": Clients,
  "/trailers": Trailers,
  "/used-trailers": UsedTrailers,
  "/add-client": AddClient,
  "/client=:id" : Client,
  "/used-trailer=:id": UsedTrailer,
  "/add-used-trailer": AddUsedTrailer,
  "/print_:id": Print,
  "/print-reg_9:id" : PrintReg_009,
  "/reg_9=:id": Reg_co_0009,
  "/add-trailer": AddTrailer,
  "/print-nota_pedido:id": Print_NotaPedido,
  "/trailer=:id" : Trailer,
  "/print-informe?data=:id" : Informe,
  "/camiones": Camiones,
  "/add-camion": AddCamion,
};
const resolveRoutes = (route) => {
  if (route === undefined) {
    route = "";
  }
  else if(route.startsWith('client=')) {
    route = "client=:id"
  }
  else if (route.startsWith('used-trailer=')) {
    route = "used-trailer=:id"
  }
  else if (route.startsWith('print_')) {
    route = "print_:id"
  }
  else if (route.startsWith('print-reg_9')) {
    route = "print-reg_9:id"
  }
  else if (route.startsWith('reg_9=')) {
    route = "reg_9=:id"
  }
  else if (route.startsWith('print-nota_pedido')) {
    route = "print-nota_pedido:id"
  }
  else if (route.startsWith('trailer=')) {
    route = "trailer=:id"
  }
  else if (route.startsWith('print-informe')) {
    route = "print-informe?data=:id"
  }
  return `/${route}`;
};

const router = async () => {
  const load = new Loader({ idLoad: "load" });
  load.create();
  const content = document.getElementById("content");
  content.classList.add("d-none");
  let hash = getHash();
  let route = resolveRoutes(hash);
  let render = routes[route] ? routes[route] : Error404;
  try {
    await render(content);
    content.classList.remove("d-none");
    load.delete();
  } catch (e) {
    console.log(e);
  }
};
export default router;
