import { html } from '../../node_modules/lit-html/lit-html.js';
import {passwordAuth, googleAuth} from '../backend/auth.js'

const logIn = () => html`
    <div class="form">
        <form id="login-form" @submit=${submitHandler('password')}>
            <input name="email" placeholder="Email" type="email" required>
            <input name="password" placeholder="Password" type="password" required>
            <input type="submit">
        </form>
        <hr>
        <button @click=${submitHandler('google')}> <p>Sign up with Google</p> <img src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png" id="google-logo"></button>
    </div>
`;

const submitHandler = (authType) => {
    return function(e){
        e.preventDefault();

        switch (authType) {
            case "password":
                const data = new FormData(document.getElementById('login-form'));
                passwordAuth(data.get('email'), data.get('password'));
                break;

            case 'google':
                googleAuth();
                break;
        }
    }
}

export default logIn