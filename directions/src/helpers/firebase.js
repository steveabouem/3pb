let firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

let app = firebase.initializeApp({
    apiKey: "AIzaSyC6lDSvf4qLRsI6v5nnl0A8phsl1jfeoLo",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://mapdraw-6684b.firebaseio.com",
    projectId: "mapdraw-6684b",
    storageBucket: "mapdraw-6684b.appspot.com",
    appId: "1:1059233277995:web:17b1db5c27c516f552a26e",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();