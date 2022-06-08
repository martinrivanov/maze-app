import renderMaze from "./render.js";

const cleanMaze = (name) => {
    return function() {
        let solvedMaze = sessionStorage.getItem('solved-maze') ? JSON.parse(sessionStorage.getItem('solved-maze')) : null;

        if (solvedMaze) {
            for (let i = 0; i < solvedMaze.length; i++) {
                while (~solvedMaze[i].indexOf('t')) {
                    solvedMaze[i][solvedMaze[i].indexOf('t')] = '';
                }
            }

            sessionStorage.removeItem('solved-maze');
            renderMaze(solvedMaze.flat(), solvedMaze.length, solvedMaze[0].length, name, document.getElementsByTagName('svg')[0].id, false);
        }
    }
}

export default cleanMaze;