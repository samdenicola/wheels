import firebase from 'firebase'
import "firebase/firestore";

let config = {
   apiKey: "AIzaSyA08HxQlmymHTPE48Cl3ZFJekM1_A09fhQ",
   authDomain: "on-wheels-app.firebaseapp.com",
   databaseURL: "https://on-wheels-app.firebaseio.com",
   projectId: "on-wheels-app",
   storageBucket: "on-wheels-app.appspot.com",
   messagingSenderId: "313346626084"
 };
let fire = firebase.initializeApp(config);

firebase.auth().useDeviceLanguage();

export const db = firebase.firestore()

export default fire;