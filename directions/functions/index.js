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
// delete
exports.deleteUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {email} = req.body;
        users.doc(email).get().then(function(doc) {
            if (doc.exists) {
               
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
        //dataUser_id = users.doc(user_ID).get();
        maps.doc(id).set({...req.body, created: moment(), id})
            .then(() => {
                maps.doc(id).get()
                    .then(doc => {
                        if (doc.exists) {
                            //dataUser_id.push();
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

exports.assignMap = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const id = "841561645";
        const dataUser_id = 'duydbzndddvzydu';

        maps.doc(id).set({...req.body, created: moment(), id, user_id: dataUser_id})
            .then(() => {
            maps.doc(id).get()
                .then(doc => {
                    if (doc.exists){
                        res.send({code: 200, data: doc.data()});    
                    }else{
                        res.send({code: 400, data: null});
                    }
                })
            }).catch(e => {
                res.send({code: 500, data: e});
            });   
    
    });
});

exports.getMap = functions.https.onRequest((req,res) => {
    cors(req, res, () => {
        maps.doc(req.body.mapId).get()
            .then(doc => {
                if(doc.exists) {
                    res.send({code: 200, data: doc.data()});
                } else {
                    res.send({code: 500, data: null});
                }
            })
            .catch(e => {
                res.send({code: 500, data: e});
            });
    });
});

exports.deleteMap = functions.https.onRequest((req,res) => {
    cors(req, res, () => {
        maps.doc(req.body.id).delete()
        .then(() =>{
            res.send({code: 200});
        })
        .catch(e => {
            res.send({code: 500});
        });
    });
});

exports.getMaps = functions.https.onRequest((req, res) => {
    console.log('function starts');
    
    cors(req, res, () => {
        maps.get()
            .then(snapshot => {
                let mapList = [];

                snapshot.forEach(map => {
                    mapList.push(map.data());
                });

                res.send({code: 200, data: mapList});
            })
            .catch(e => {
                console.log('getmaps error:', e);
                res.send({code: 500, data: e});
            });
        });
});

// Methode permetttant authentification (temporaire)
//  
//  require users(email, password);
//  check dans la databese les informations
//  
exports.authLogin = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        users.get(email,password)
        .then(doc =>{
            if(doc.exists){
                if(users.doc(email) == loginEmail && users.doc(password) == loginPassword){
                    console.log("valide");
                }else{
                    console.log("le mots de passe ou l'email");
                }
                console.log("users existe pas");
            }
        })

    });
});
// Methode permetttant authentification (temporaire)
//  
//  require users(email, password);
//  check dans la databese les informations
//  
exports.shareImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        //const signIn = firebase.auth().signInWithEmailAndPassword(email,password);

        maps.get();
        users.get(email,password)
            .then(doc =>{
                if(doc.exists){
                    if(users.doc(email) != signEmail && users.doc(password) != signPassword){  // changer quand le systeme de session mis en place
                        console.log("refuser le partage image")
                    }else{
                        console.log("accepté le partage image")
                    }
                    console.log("users existe pas")
                }
            })
    });
});

exports.checkSignIn = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
        // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
    }).catch(function(error) {
        // Handle error.
    });
       
    });
});