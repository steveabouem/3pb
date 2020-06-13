const functions = require('firebase-functions');
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

admin.initializeApp();
const db = admin.firestore();
const corsSettings = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
};

exports.helloWorld = functions.https.onRequest((req, res) => {
    corsSettings(req, res);
    return ('Hello Dylan');
});
