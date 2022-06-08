import { logout } from "../backend/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js';

const navBar = () => html`
    <nav>
        <a href="/">Home</a>
        ${sessionStorage.getItem('token') ? userNav() : guestNav()}
    </nav>
`

const userNav = () => html`
    <a href="/maze/all">Mazes</a>
    <a @click=${() => logout()}>Logout</a>
    <button id="create-btn" @click=${openDialogBox()}>Create Maze</button>
`

const guestNav = () => html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>
`

const openDialogBox = () => {
    return function() {
        document.querySelector('div.modal').style.display = "block";
    }
}

export default navBar;