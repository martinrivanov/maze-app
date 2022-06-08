import { saveMaze } from '../backend/load.js';
import cleanMaze from '../maze/clean.js';
import generateMaze from '../maze/generate.js';
import solve from '../maze/solve.js';
import {html} from '../../node_modules/lit-html/lit-html.js';
import error from './error.js';

const maze = (name) => {
    if (sessionStorage.getItem('token')) {
        return html`
            <div>
                <h3>${name}</h3>
                <div>
                    <div>
                        <label class="form-control">
                            <input id="start-pos-btn" type="radio" name="radio" checked/>
                            Start
                        </label>

                        <label class="form-control">
                            <input id="obstacle-pos-btn" type="radio" name="radio" />
                            Obstacle
                        </label>

                        <label class="form-control">
                            <input id="space-pos-btn" type="radio" name="radio" />
                            Free Space
                        </label>

                        <label class="form-control">
                            <input id="exit-pos-btn" type="radio" name="radio" />
                            Exit
                        </label>
                    </div>
                    <div>
                        <button @click=${solve(name)}>Solve Maze</button>
                        <button @click=${cleanMaze(name)}>Clear Maze</button>
                        <button @click=${generateMaze(name)}>Generate Maze</button>
                        <button @click=${saveMaze(document.getElementsByTagName('svg')[0].id)}>Save Maze</button>
                    </div>
                </div>
            </div>
        `
    } else {
        return error();
    }
}

export default maze;