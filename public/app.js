import page from "//unpkg.com/page/page.mjs";
import { render } from '../node_modules/lit-html/lit-html.js';
import renderNav from "./renderer.js";
import home from "./templates/home.js"
import logIn from "./templates/login.js";
import register from "./templates/register.js";
import error from "./templates/error.js";
import {load, loadMazeToRender} from "./backend/load.js";
import endpoints from "./endpoints.js";

renderNav();

const renderView = (view) => render(view(), document.getElementById('root'));

page(endpoints.home, () => renderView(home));

page.exit(endpoints.home, (ctx, next) => {
    document.getElementById('latest-maze').style.display = 'none';
    next();
})

page(endpoints.allMazes, () => load());
page(endpoints.maze, (ctx) => loadMazeToRender(ctx));

page.exit(endpoints.maze, (ctx, next) => {
    document.getElementById('maze').style.display = 'none';
    document.getElementById('maze').innerHTML = '';
    sessionStorage.removeItem('maze');
    sessionStorage.removeItem('solved-maze');

    next();
});

page(endpoints.login, () => renderView(logIn));
page(endpoints.register, () => renderView(register));
page(endpoints.liveServerPath, () => page.redirect('/'));
page(endpoints.default, () => renderView(error));

page();