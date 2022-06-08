const auth = firebase.auth();
const db = firebase.firestore();
const mazeRef = db.collection('maze');
const {serverTimestamp} = firebase.firestore.FieldValue;

export {auth, db, mazeRef ,serverTimestamp};