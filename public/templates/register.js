import { googleAuth, passwordAuthSignUp } from "../backend/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js';

const register = () => html`
    <div class="form">
        <form id="register-form" @submit=${submitHandler('password')}>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit">
        </form>
        <hr>
        <button @submit=${submitHandler('google')}> <p>Sign up with Google</p> <img src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png" id="google-logo"></button>
    </div>
`;

const submitHandler = (authType) => {
    return function (e) {
        e.preventDefault();

        switch (authType) {
            case 'password':
                const data = new FormData(document.getElementById('register-form'));
                passwordAuthSignUp(data.get('email'), data.get('password'));
                break;

            case 'google':
                googleAuth();
                break;
        
            default:
                break;
        }
    }
}

export default register;