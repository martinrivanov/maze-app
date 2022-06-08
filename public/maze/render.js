import { render } from '../../node_modules/lit-html/lit-html.js';
import error from "../templates/error.js";
import maze from "../templates/maze.js"
import show from "./create.js";
import indexOf2dArray from "./findPosition.js";

const renderMaze = (arr, height, width, name, id, isExitFound) => {
    if (arr && height && width) {
        let mazeSpace = document.getElementById('maze');
        mazeSpace.innerHTML = '';
        arr = restoreMaze(arr, height, width);

        if (!indexOf2dArray(arr, 't')) {
            sessionStorage.setItem('maze', JSON.stringify(arr));
        }
        
        let canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.setAttribute('width', width * 50);
        canvas.setAttribute('height', height * 50);
        canvas.setAttribute('id', id);

        show(canvas, arr, isExitFound);
        mazeSpace.appendChild(canvas);

        mazeSpace.style.display = 'block';
        render(maze(name), document.getElementById('root'));

        return arr;
    } else {
        render(error(), document.getElementById('root'));
    }
}

const restoreMaze = (arr, height, width) => {
    let newMaze = [];
    let currentIndex = 0;

    for (let i = 0; i < height; i++) {
        let row = [];
        
        for (let j = 0; j < width; j++) {
            row.push(arr[currentIndex]);
            currentIndex++;
        }

        newMaze.push(row);
    }

    return newMaze;
}

export default renderMaze;