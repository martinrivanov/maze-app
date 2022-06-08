import colors from "./colors.js";
import indexOf2dArray from "./findPosition.js";
import renderMaze from "./render.js";

const solve = (name) => {
    return function(){
        if (!isMazeSolved()) {
            let isExitFound = false;
            let maze = JSON.parse(sessionStorage.getItem('maze'));

            if (isStartSet(maze) && isExitSet(maze)) {
                let startPosition = indexOf2dArray(maze, 's');
                let visited = fillVisitedArr(maze);
                let currentPosition = {row: 0, col: 0};
                let previousPosition = fillPositionArr(maze, currentPosition);

                let queue = [startPosition];

                while (queue.length > 0) {
                    var position = queue.shift();

                    if (!(position.row + 1 >= maze.length)) {
                        isExitFound = addNeighbor({row: position.row + 1, col: position.col}, queue, visited, previousPosition, maze, {row: position.row, col: position.col});
                        if (isExitFound) {
                            break;
                        }
                    }

                    if (!(position.col + 1 >= maze[0].length)) {
                        isExitFound = addNeighbor({row: position.row, col: position.col + 1}, queue, visited, previousPosition, maze, {row: position.row, col: position.col});
                        if (isExitFound) {
                            break;
                        }
                    }

                    if (!(position.row - 1 < 0)) {
                        isExitFound = addNeighbor({row: position.row - 1, col: position.col}, queue, visited, previousPosition, maze, {row: position.row, col: position.col});
                        if (isExitFound) {
                            break;
                        }
                    }

                    if (!(position.col - 1 < 0)) {
                        isExitFound = addNeighbor({row: position.row, col: position.col - 1}, queue, visited, previousPosition, maze, {row: position.row, col: position.col})
                        if (isExitFound) {
                            break;
                        }
                    }
                }

                currentPosition = indexOf2dArray(maze, 'e');

                while (!(currentPosition.row == startPosition.row && currentPosition.col == startPosition.col) && isExitFound) {
                    let {row, col} = currentPosition;

                    if (maze[previousPosition[row][col].row][previousPosition[row][col].col] != 's') {
                        maze[previousPosition[row][col].row][previousPosition[row][col].col] = 't';
                    }

                    currentPosition = {row: previousPosition[row][col].row, col: previousPosition[row][col].col};
                }

                sessionStorage.setItem('solved-maze', JSON.stringify(maze));
                renderMaze(maze.flat(), maze.length, maze[0].length, name, document.getElementsByTagName('svg')[0].id, isExitFound);
            }

            else{
                alert('You have to set the position for the start and the exit!');
            }
        }

        else{
            alert('Maze is already solved! Clear the maze!');
        }
    }
}

const addNeighbor = (position, queue, visited, previousPosition, maze, oldPosition) => {
    let {row, col} = position;

    if (visited[row][col] == 0 && maze[row][col] != '*') {
        queue.push({row: row, col: col});
        visited[row][col] = 1;
        previousPosition[row][col] = {row: oldPosition.row, col: oldPosition.col};

        if (maze[row][col] == 'e') {
            return true;
        }

        return false;
    }
}

const fillVisitedArr = (maze) => {
    let visited = [];

    for (let i = 0; i < maze.length; i++) {
        visited.push([]);
        
        for (let j = 0; j < maze[i].length; j++) {
            visited[i][j] = 0
        }
    }

    return visited
}

const fillPositionArr = (maze, currentPosition) => {
    let arr = [];

    for (let i = 0; i < maze.length; i++) {
        arr.push([]);

        for (let j = 0; j < maze[i].length; j++) {
            arr[i][j] = currentPosition;
        }
        
    }

    return arr;
}

const isMazeSolved = () => {
    let blocks = Array.from(document.getElementsByTagName('svg')[0].children);
    let isSolved = false;

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].getAttribute('fill') == colors['t']) {
            isSolved = true;
            break;
        }
    }

    return isSolved;
}

const isStartSet = (maze) => {
    return indexOf2dArray(maze, 's');
}

const isExitSet = (maze) => {
    return indexOf2dArray(maze, 'e');
}

const sleep = (milliseconds) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

export default solve;