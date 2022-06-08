import indexOf2dArray from "./findPosition.js";
import colors from "./colors.js";

const create = (canvas, node, maze, isExitFound) => {
    let blockRef = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    blockRef.setAttribute('height', 50);
    blockRef.setAttribute('width', 50);
    blockRef.setAttribute('x', node.x * 50);
    blockRef.setAttribute('y', node.y * 50);
    blockRef.setAttribute('stroke', 'black');
    blockRef.setAttribute('id', `${node.y} ${node.x}`);

    switch (maze[node.y][node.x]) {
        case '':
            blockRef.setAttribute('fill', colors[' ']);
            blockRef.addEventListener('click', setStartPosition(maze, node, isExitFound));
            blockRef.addEventListener('click', setExitPosition(maze, node, isExitFound));
            blockRef.addEventListener('click', setAsObstacle(maze, node, isExitFound));

            break;

        case '*':
            blockRef.setAttribute('fill', colors['*']);
            blockRef.addEventListener('click', setAsFreeSpace(maze, node, isExitFound));

            break;

        case 's':
            blockRef.setAttribute('fill', colors['s']);
            break;

        case 'e':
            blockRef.setAttribute('fill', colors['e']);
            break;

        case 't':
            blockRef.setAttribute('fill', colors['t']);
            break;
    
        default:
            break;
    }

    canvas.appendChild(blockRef);
}

const show = (canvas, maze, isExitFound) => {
    maze.map((row, y) => {
        row.map((col, x) => {
            create(canvas, {x, y}, maze, isExitFound);
        })
    })
}

const setStartPosition = (maze, node, isExitFound) => {
    return function(e){
        if (!isExitFound) {
            if (document.getElementById('start-pos-btn').checked && maze[node.y][node.x] != '*') {
                e.target.setAttribute('fill', colors['s']);
        
                if (indexOf2dArray(maze, 's')) {
                    let position = indexOf2dArray(maze, 's');
                    maze[position.row][position.col] = '';
                    document.getElementById(`${position.row} ${position.col}`).setAttribute('fill', colors[' ']);
                }
    
                maze[node.y][node.x] = 's';
                sessionStorage.setItem('maze', JSON.stringify(maze));
            }
        }
    }
}

const setExitPosition = (maze, node, isExitFound) => {
    return function(e){
        if (!isExitFound) {
            if (document.getElementById('exit-pos-btn').checked && maze[node.y][node.x] != '*') {
                e.target.setAttribute('fill', colors['e']);
        
                if (indexOf2dArray(maze, 'e')) {
                    let position = indexOf2dArray(maze, 'e');
                    maze[position.row][position.col] = '';
                    document.getElementById(`${position.row} ${position.col}`).setAttribute('fill', colors[' ']);
                }
    
                maze[node.y][node.x] = 'e';
                sessionStorage.setItem('maze', JSON.stringify(maze));
            }
        }
    }
}

const setAsObstacle = (maze, node, isExitFound) => {
    return function(e){
        if (!isExitFound) {
            if (document.getElementById('obstacle-pos-btn').checked && maze[node.y][node.x] != '*') {
                e.target.setAttribute('fill', colors['*']);
                maze[node.y][node.x] = '*';
                sessionStorage.setItem('maze', JSON.stringify(maze));
    
                e.target.addEventListener('click', setAsFreeSpace(maze, node));
            }
        }
    }
}

const setAsFreeSpace = (maze, node, isExitFound) => {
    return function(e){
        if (!isExitFound) {
            if (document.getElementById('space-pos-btn').checked && maze[node.y][node.x] != '') {
                e.target.setAttribute('fill', colors[' ']);
                maze[node.y][node.x] = '';
                sessionStorage.setItem('maze', JSON.stringify(maze));
            }
        }
    }
}

export default show;