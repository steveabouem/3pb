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
// TODO: send status of requests
// TODO: handles password and sessions with custom tokens: https://firebase.google.com/docs/auth/admin/verify-id-tokens
exports.createUser = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {username, email, password} = req.body;
        users.doc(`${email}`).set({
            email, username, created: moment(), maps: null, imageUrl: null
        })
        .then(() => {
            users.doc(email).get().then(function(doc) {
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
// {
//     "user":{
//        "uid":"OBPS2tKziKhXFEp163gONGohoG32",
//        "displayName":null,
//        "photoURL":null,
//        "email":"w@yne.com",
//        "emailVerified":false,
//        "phoneNumber":null,
//        "isAnonymous":false,
//        "tenantId":null,
//        "providerData":[
//           {
//              "uid":"w@yne.com",
//              "displayName":null,
//              "photoURL":null,
//              "email":"w@yne.com",
//              "phoneNumber":null,
//              "providerId":"password"
//           }
//        ],
//        "apiKey":"AIzaSyC6lDSvf4qLRsI6v5nnl0A8phsl1jfeoLo",
//        "appName":"[DEFAULT]",
//        "authDomain":"project-id.firebaseapp.com",
//        "stsTokenManager":{
//           "apiKey":"AIzaSyC6lDSvf4qLRsI6v5nnl0A8phsl1jfeoLo",
//           "refreshToken":"AE0u-NeIXLUTCI8lVi5o7IV_HPOSYVfBLkVzobceKKdSUx8GErK0cLiUduhtwez5tA2G1wp0-Y460kcG4gadvaCJk4mz-zNZHJ5YzxzfzhOUNanlVcb4YaMFm8ZFnIiR7M2mhh3buP5KeYUX7DTE3uWF3ynV56l3lH_53kERdnCcjOubr6vi3yWNjt0cs7hPGCBjFz0OPkbf",
//           "accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFwZHJhdy02Njg0YiIsImF1ZCI6Im1hcGRyYXctNjY4NGIiLCJhdXRoX3RpbWUiOjE1OTIyNDY0MzcsInVzZXJfaWQiOiJPQlBTMnRLemlLaFhGRXAxNjNnT05Hb2hvRzMyIiwic3ViIjoiT0JQUzJ0S3ppS2hYRkVwMTYzZ09OR29ob0czMiIsImlhdCI6MTU5MjI0NjQzNywiZXhwIjoxNTkyMjUwMDM3LCJlbWFpbCI6IndAeW5lLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ3QHluZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kq5-TAvkRdcqdQ_SzlGQZuZJZ2NVwRn7nVxXbrvtAgxfDQoYI6pZMV4khDjkjiHzXL_BTcDI0uwsFtXNZJgU22_lalBFdNDhykGRgY10u0q_-UGod4JdIXBgkpzNYnoLXb23LGbnKJZDW3DLdxUDCTiLicuilFOCAVpmnhCW7hvbhFu5Fl_aAYX3iqqjBALzEH97EaxiaRqB-5cF2tnWpc8rwJLCvX8GkJvhHyY7bLvBwVRe-pL3cUpN4TrNh0bNwMERwPs1fyKEIElKh2lD5_6p83FxQhRo14Ma09AXbKNu_BsKYC9z8K3oIUnFC0OnWcP4C_TNdantIYlRUHiZMw",
//           "expirationTime":1592250037000
//        },
//        "redirectEventId":null,
//        "lastLoginAt":"1592246437540",
//        "createdAt":"1592246437540",
//        "multiFactor":{
//           "enrolledFactors":[
 
//           ]
//        }
//     },
//     "credential":null,
//     "additionalUserInfo":{
//        "providerId":"password",
//        "isNewUser":true
//     },
//     "operationType":"signIn"
//  }