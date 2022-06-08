import { db } from "./firebase.js";

const deleteMaze = () => {
    return function(e) {
        let id = e.target.parentElement.children[0].id;

        db.collection('maze').doc(id).delete().then(() => {
            let card = e.target.parentElement;
            card.parentElement.removeChild(card);

            console.log('Successfully deleted!');
        });
    }
}

export default deleteMaze;