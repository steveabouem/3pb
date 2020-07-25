const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const firebase = require('firebase');
// const bodyParser = require("body-parser");
const cors = require('cors')({origin: true});
admin.initializeApp();

const db = admin.firestore();
let users = db.collection("users"),
maps = db.collection('maps');

// HELPERS
exports.retrieveUserByEmail = functions.https.onCall((email) => {
    users.where("email", "==", email).get()
        .then(snapshot =>  {
            let matches = [];
            // look up why you can't just call snapshot[0].data()
            snapshot.forEach(doc => {
                matches.push(doc.data());
            })
            return matches[0];
        })
        .catch(e => {
            console.log({e});
            return;
        });
});



//SECTION USER 

// TODO: handles password and sessions with custom tokens: https://firebase.google.com/docs/auth/admin/verify-id-tokens
exports.createUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {user} = req.body;
        const id = uuidv4();
        const userObject = {email: user.email,  created: moment(), maps: [], imageUrl: null};

        users.doc(id).set({...userObject, id})
        .then(() => {
            users.doc(id).get().then(function(doc) {
                if (doc.exists) {
                    res.send(userObject);
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
        const email = req.body.email;
        users.where("email", "==", email).get()
            .then(snapshot =>  {
                let matches = [];
                // look up why you can't just call snapshot[0].data()
                snapshot.forEach(doc => {
                    matches.push(doc.data());
                })

                let user = matches[0];
                user.id = "***";
                
                res.send({code: 200, data: user});
            }).catch(function(error) {
                console.log({error});
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

// SECTION MAP
exports.createMap = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const id = uuidv4();
        const email = req.body.email;
        
        users.where("email", "==", email).get()
            .then(snapshot => {
                    let matchingUser = [];

                    snapshot.forEach(doc => {
                        matchingUser.push(doc.data());
                    })
                    
                    maps.doc(id).set({...req.body, created: moment(), id, created_by: email})
                        .then(() => {
                            maps.doc(id).get()
                            .then(doc => {
                                const info = doc.data();
                                const creatorId = matchingUser[0].id;
                                const mapArray = [matchingUser[0].maps];

                                mapArray.push(info);
                                users.doc(creatorId).update('maps', mapArray)
                                    .then(() => {
                                        res.send({code : 200, data:info});
                                    })   
                            });
                        })
                })
            .catch(e => {
                console.log('ERROR', e);
                res.send({code: 500, data: e});
            });

        
    });
});

exports.assignMap = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {id, userId} = req.body
        maps.doc(id).set({...req.body, created: moment(), id, userId})
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
exports.shareImage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        //const signIn = firebase.auth().signInWithEmailAndPassword(email,password);
        const {email, password} = req.body;

        maps.get();
        users.get(email,password)
            .then(doc =>{
                if(doc.exists){
                    // if(users.doc(email) != signEmail && users.doc(password) != signPassword){  // changer quand le systeme de session mis en place
                    //     console.log("refuser le partage image")
                    // }else{
                    //     console.log("accepté le partage image")
                    // }
                    // console.log("users existe pas")
                }
            })
    });
});
//SECTION LOGIN (temporaire)

// Methode permetttant authentification (temporaire)
//  
//  require users(email, password);
//  check dans la databese les informations
//  
exports.authLogin = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {email, password} = req.body;

        users.get(email,password)
        .then(doc =>{
            if(doc.exists){
                // if(users.doc(email) == loginEmail && users.doc(password) == loginPassword){
                //     console.log("valide");
                // }else{
                //     console.log("le mots de passe ou l'email");
                // }
                // console.log("users existe pas");
            }
        })

    });
});

// exports.checkSignIn = functions.https.onRequest((req, res) => {
    // cors(req, res, () => {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    // .then(function(result) {
        // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
    // }).catch(function(error) {
        // Handle error.
    // });
       
    // });
// });

// SECTION SESSION

/*function createUserRecordByEmail(){

    const email = users.get(); 

    admin.auth().getUserByEmail(email)
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
       })
        .catch(function(error) {
             console.log('Error fetching user data:', error);
        });
}*/

exports.createSession = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let uid = 'e66aec9d-b6db-4359-97d2-f8563fdac26a';         //userId aléatoire
        admin.auth().createCustomToken(uid)    // creation d'un token liée a un user
        .then(function(customToken) {
            admin.auth().signInWithCustomToken(customToken)     //envoie le token aux client
            .catch(function(error){    
                res.send({code: 500, data: error});
            })
            console.log('envoye du token aux client succesfull')
        })
        .catch(function(error) {
            res.send({code: 500, data: error});
        });
    });
});

function verifToken(){
    admin.auth().currentUser.getIdToken(/* forceRefresh */true).then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
  }).catch(function(error) {
    // Handle error
  });
}