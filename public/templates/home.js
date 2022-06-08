import {html} from '../../node_modules/lit-html/lit-html.js';
import page from "//unpkg.com/page/page.mjs";
import dialogBox from './dialog.js';
import endpoints from '../endpoints.js';
import { loadLatestMaze } from '../backend/load.js';

const home = () => html`
    <div id="home-section">
        <h1 id="home-title">Welcome to MazeApp</h1>
        ${sessionStorage.getItem('token') ? userHome() : guestHome()}
    </div>
`;

const guestHome = () => html`
    <div id="guest-home-page">
        <p>Log in to create unique mazes</p>
        <button @click=${() => page.redirect(endpoints.login)}>Log In</button>
    </div>
`;

const userHome = () => html`
    ${dialogBox()}
    <div id="user-home-page">
        <h3>Here is the latest maze you created.</h3>
        <div>${loadLatestMaze()}</div>
    </div>
`

export default home;