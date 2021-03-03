import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyB9tIfytEnw3qSNFxGibfr3Efuhv_JzLIc",
    authDomain: "todo-app-dd74e.firebaseapp.com",
    projectId: "todo-app-dd74e",
    storageBucket: "todo-app-dd74e.appspot.com",
    messagingSenderId: "805147569711",
    appId: "1:805147569711:web:13a79e5ac1485010d920da",
    measurementId: "G-S0TKRRBHP2"
  })

  const db=firebaseApp.firestore()
  export {db}