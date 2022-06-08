import { createMaze } from '../backend/load.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

const dialogBox = () => html`
    <div class="modal">
        <div class="modal-content">
            <span class="close-btn" @click=${closeDialogBox()}>&times;</span>
            <form id="modal-form" @submit=${submitHandler()}>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name">
                <div class="metrics">
                    <label for="width">Width:</label>
                    <input type="number" name="width" id="width" min="2" max="20">
                    <label for="height">Height:</label>
                    <input type="number" name="height" id="height" min="2" max="10">
                </div>
                <input type="submit">
            </form>
        </div>
    </div>
`;

const submitHandler = () => {
    return function(e) {
        e.preventDefault();
        const data = new FormData(document.getElementById('modal-form'));

        createMaze(data.get('name'), data.get('width'), data.get('height'));
    }
}

const closeDialogBox = () => {
    return function(){
        document.querySelector('div.modal').style.display = "none";
        let inputs = document.getElementsByTagName('input');
        Array.from(inputs).forEach(input => {
            if (input.type != 'submit') {
                input.value = '';
            }
        });
    }
}

export default dialogBox;