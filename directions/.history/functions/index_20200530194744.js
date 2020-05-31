const functions = require('firebase-functions');
res.set('Access-Control-Allow-Origin', '*');
res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
res.set('Access-Control-Allow-Headers', '*');

 if (req.method === 'OPTIONS') {
   res.end();
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
