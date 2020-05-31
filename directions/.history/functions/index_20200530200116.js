const functions = require('firebase-functions');

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
