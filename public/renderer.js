import { render } from "../node_modules/lit-html/lit-html.js";
import navBar from "./templates/nav.js";

export default function renderNav(){
    render(navBar(), document.getElementById('heading'))
}