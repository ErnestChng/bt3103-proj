import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyANXlAlkgb3PzJ060pwlszIOdVxEeGskSM",
    authDomain: "bt3103-proj-10cd2.firebaseapp.com",
    databaseURL: "https://bt3103-proj-10cd2.firebaseio.com",
    projectId: "bt3103-proj-10cd2",
    storageBucket: "bt3103-proj-10cd2.appspot.com",
    messagingSenderId: "711158474935",
    appId: "1:711158474935:web:feb046a2d99598735e0532",
    measurementId: "G-SRNTWWLP40"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();

export default database;