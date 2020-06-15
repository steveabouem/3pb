import axios from 'axios';
import firebase from 'firebase';
require('firebase/auth');
require('firebase/firestore');

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
export const loadMap = () => axios.get(baseURL + '/hello');
export const signup = ({email, password}) => firebase.auth().createUserWithEmailAndPassword(email, password);
export const createUser = data => axios.post(baseURL + '/createUser', data);
export const getUser = data => axios.post(baseURL + '/createUser', data);