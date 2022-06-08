import page from "//unpkg.com/page/page.mjs";
import { render } from '../../node_modules/lit-html/lit-html.js';
import {auth, db, serverTimestamp, mazeRef} from "./firebase.js";
import mazes, { renderCardLink } from "../templates/mazes.js";
import renderMaze from "../maze/render.js"

export const load = () => {
    let data = [];

    auth.onAuthStateChanged(user => {
        if (user) {
            mazeRef
                .where('uid', '==', user.uid)
                .orderBy('createdOn', 'desc')
                .get()
                .then(snapshot => {
                    snapshot.forEach(entry => {
                        let mazeInfo = {...entry.data()};
                        mazeInfo.id = entry.id
                        data.push(mazeInfo);
                    });
                    render(mazes(data), document.getElementById('root'));
                })
        }
    });
}

export const loadMazeToRender = (ctx) => {
    let id = ctx.params.id;

    auth.onAuthStateChanged(user => {
        if (user) {
            mazeRef.doc(id).onSnapshot(snapshot => {
                let data = snapshot.data();

                if (data) {
                    renderMaze(data.maze, data.height, data.width, data.name, id);
                }
            })
        }
    });
}

export const saveMaze = (id) => {
    return function() {
        auth.onAuthStateChanged(user => {
            if (user) {
                let maze = JSON.parse(sessionStorage.getItem('maze'));
                mazeRef.doc(id).update({
                    maze: maze.flat()
                }).then(() => {
                    alert('Maze was successfully saved!');
                })
            }
        });
    }
}

export const createMaze = (name, width, height) => {
    auth.onAuthStateChanged(user => {
        if (user) {
            let dataToBeAdded = {
                name: name,
                width: width,
                height, height,
                maze: new Array(width * height).fill(''),
                createdOn: serverTimestamp(),
                uid: user.uid,
            }

            mazeRef.add(dataToBeAdded)
                .then(docRef => {
                    let id = docRef.id;
                    page.redirect(`/maze/${id}`);
                });
        }
    })
}

export const loadLatestMaze = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            mazeRef
                .where('uid', '==', user.uid)
                .orderBy('createdOn', 'desc')
                .limit(1)
                .get()
                .then(snapshot => {
                    let data = {...snapshot.docs[0].data()};
                    data.id = snapshot.docs[0].id;
                    console.log(data);

                    render(renderCardLink(data), document.getElementById('latest-maze'));
                    document.getElementById('latest-maze').style.display = 'block';
                })
        }
    })
}