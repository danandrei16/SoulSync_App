import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8GupXc6ICwhd26Ew6WNefxB1bPggOXjY",
  authDomain: "soulsync-a49b2.firebaseapp.com",
  databaseURL: "https://soulsync-a49b2-default-rtdb.firebaseio.com",
  projectId: "soulsync-a49b2",
  storageBucket: "soulsync-a49b2.appspot.com",
  messagingSenderId: "359210199128",
  appId: "1:359210199128:web:1b9c3a256eee4ef3ae822d",
  measurementId: "G-43JV5WFZRD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;