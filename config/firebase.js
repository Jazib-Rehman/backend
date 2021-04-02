const firebase = require('firebase')
const config = {
    apiKey: "AIzaSyAEkiQAPKMlO5BWP-MxCRzIJkqMNWMODQ8",
    authDomain: "schedule-55df7.firebaseapp.com",
    databaseURL: "https://schedule-55df7-default-rtdb.firebaseio.com",
    projectId: "schedule-55df7",
    storageBucket: "schedule-55df7.appspot.com",
    messagingSenderId: "366685697295",
    appId: "1:366685697295:web:7ba54774c88fa370c03a7a",
    measurementId: "G-NF2LKBJ6M0"
};

firebase.initializeApp(config);
module.exports = firebase;
