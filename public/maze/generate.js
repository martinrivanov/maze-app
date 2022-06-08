import cleanMaze from "./clean.js"
import renderMaze from "./render.js";

const generateMaze = (name) => {
    return function() {
        cleanMaze(name);
        let newlyGeneratedMaze = [];
        let maze = JSON.parse(sessionStorage.getItem('maze'));
        let height = maze.length;
        let width = maze[0].length;
        let symbols = ['', '*'];

        for (let i = 0; i < height * width; i++) {
            let symbol = Math.random();

            if (symbol <= 0.45) {
                symbol = 1;
            }

            else{
                symbol = 0;
            }

            newlyGeneratedMaze.push(symbols[symbol]);
        }

        renderMaze(newlyGeneratedMaze, height, width, name, document.getElementsByTagName('svg')[0].id, false);
    }
}

export default generateMaze;