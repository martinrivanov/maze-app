import endpoints from "../endpoints.js";
import renderNav from "../renderer.js";
import {auth} from "./firebase.js";
import page from "//unpkg.com/page/page.mjs";

export function passwordAuth(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    sessionStorage.setItem('token', user.uid);
                    page.redirect(endpoints.home);
                    renderNav();
                }
            });
        }).catch(error => {
            alert(error.message);
        });
    
}

export function passwordAuthSignUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    sessionStorage.setItem('token', user.uid);
                    page.redirect(endpoints.home);
                    renderNav();
                }
            });
        }).catch(error => {
            alert(error.message);
        });
}

export function googleAuth() {
    auth.useDeviceLanguage();

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    sessionStorage.setItem('token', user.uid);
                    page.redirect(endpoints.home);
                    renderNav();
                }
            });
        }).catch(error => {
            alert(error.message);
        });
    

}

export const logout = () => {
    auth.signOut().then(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('maze');
        sessionStorage.removeItem('solved-maze');

        page.redirect(endpoints.home);
        renderNav();
    })
}