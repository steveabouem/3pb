const functions = require('firebase-functions');
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

admin.initializeApp();

const db = admin.firestore();
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
    res.end();
    } else {
        res.send("Hello from Firebase!");
    }
});
