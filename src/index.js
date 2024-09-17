import Auth from "auth-google-grossremolques";
import '@styles/main.css'
import router from "./utils/Routes";
import '@styles/main.scss'
import * as bootstrap from 'bootstrap'
const packageJson = require('../package.json');
const API_KEY = process.env.API_KEY
const CLIENT_ID = process.env.CLIENT_ID
const main = async () => {
    const version = document.querySelector('#version');
    version.innerText = packageJson.version
    const auth = await Auth(API_KEY, CLIENT_ID);
    if (auth) {
        router()
    }
  };
  window.addEventListener("load", main);
  window.addEventListener('hashchange', router)