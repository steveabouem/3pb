const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require('cors')({origin: true});
admin.initializeApp();

const db = admin.firestore();
let users = db.collection("users"),
maps = db.collection('maps');

exports.helloWorld = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.send ('Hello Dylan');

    });
});
// TODO: handles password and sessions with custom tokens: https://firebase.google.com/docs/auth/admin/verify-id-tokens
exports.createUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {email, password} = req.body;
        const id = uuidv4();

        users.doc(id).set({email,  created: moment(), maps: null, imageUrl: null, id})
        .then(() => {
            users.doc(id).get().then(function(doc) {
                if (doc.exists) {
                    res.send(doc.data());
                } else {
                    res.send('None found');
                }
            }).catch(function(error) {
                res.send('Error', error);
            });
        })
    });

});

exports.getUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {email} = req.body;
        users.doc(email).get().then(function(doc) {
            if (doc.exists) {
                res.send({code: 200, data: doc.data()});
            } else {
                res.send({code: 200, data: null});
            }
        }).catch(function(error) {
            res.send({code: 500, data: error});
        });
    });

});

// cette fonction attend les arguments suivants: 
// {
//     mapName: string, obligatoire
//     userName: string, (plus précisément un email) aléatoire
    // polyline: Object, aléatoire
    // marker: objet, aléatoire
    // center: objet, obligatoire,
    // darkmode: boolean, aléatoire
// }

// et renvoie le document créé (voir ligne 77)
exports.createMap = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const id = uuidv4();
        
        maps.doc(id).set({...req.body, created: moment(), id})
            .then(() => {
                maps.doc(id).get()
                    .then(doc => {
                        if (doc.exists) {
                            res.send({code: 200, data: doc.data()});
                        } else {
                            res.send({code: 400, data: null});
                        }
                    })
            })
            .catch(e => {
                res.send({code: 500, data: e});
            });
    });
});

// cette fonction attend les arguments suivants: 
// {
//     mapName: string, obligatoire
//     userName: string (plus précisément un email), aléatoire
// }
// et renvoie une ARRAY d'objets map dont chacun a la structure suivante:
// {
//     mapName: string, obligatoire
//     userName: string, (plus précisément un email) aléatoire
//     polyline: Object, aléatoire
//     marker: objet, aléatoire
//     center: objet, obligatoire,
//     darkmode: boolean, aléatoire
// }
exports.getMaps = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        maps.get()
            .then(snapshot => {
                let mapList = snapshot.reduce((acc, map) => {
                    let mapInfo = map.data();
                    return {title: mapInfo.title, data: mapInfo.data, creator: mapInfo.created_by || null}
                }, []);

                res.send({code: 200, data: mapList});
            })
            .catch(e => {
                res.send({code: 500, data: e});
                
            });
        });
});