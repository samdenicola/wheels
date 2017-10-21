import firebase from 'firebase'
var config = {
   apiKey: "AIzaSyA08HxQlmymHTPE48Cl3ZFJekM1_A09fhQ",
   authDomain: "on-wheels-app.firebaseapp.com",
   databaseURL: "https://on-wheels-app.firebaseio.com",
   projectId: "on-wheels-app",
   storageBucket: "on-wheels-app.appspot.com",
   messagingSenderId: "313346626084"
 };
var fire = firebase.initializeApp(config);
export default fire;