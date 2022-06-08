import { html } from "../../node_modules/lit-html/lit-html.js";
import deleteMaze from "../backend/delete.js";

import error from "./error.js";
import dialogBox from "./dialog.js";

const mazes = (data) => {
    if (sessionStorage.getItem('token')) {
        return html`
            ${dialogBox()}
            <div class="card-wrapper">
                ${data.length > 0 ? data.map(entry => renderData(entry)) : html`<p>No mases have been created by you. Click 'Create Maze' to create one.</p>`}
            </div>
        `;
    } else {
        return error();
    }
}

const renderData = (data) => html`
    <div class="card">
        ${renderCardLink(data)}
        <button @click=${deleteMaze()}>Delete</button>
    </div>
`;

export const renderCardLink = (data) => html`
    <a class="card-link" href="${data.id}" id="${data.id}">
        <div>
            <h3>${data.name}</h3>
            <p>Created on: ${(new Date(data.createdOn.seconds * 1000)).toDateString()}</p>
        </div>
    </a>
`;

export default mazes;