import axios from 'axios';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyC6lDSvf4qLRsI6v5nnl0A8phsl1jfeoLo",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://mapdraw-6684b.firebaseio.com",
    projectId: "mapdraw-6684b",
    storageBucket: "mapdraw-6684b.appspot.com",
    appId: "1:1059233277995:web:17b1db5c27c516f552a26e",
});

const baseURL = 'https://us-central1-mapdraw-6684b.cloudfunctions.net';

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUser = (user) => axios.post(baseURL + '/createUser', {"content-type": "application/json" }, {data: user});
export const getUser = (user) => axios.post(baseURL + '/getUser', {"content-type": "application/json" }, {data: {email: user.email}});
export const getMaps = () => axios.get(baseURL + '/getMaps');
export const createMap = (mapData) => axios.post(baseURL + '/createMap', {"content-type": "application/json" }, {data: mapData});
export const deleteMap = (id) => axios.post(baseURL + '/deleteMap', {"content-type": "application/json" }, {data: id});
