// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/database';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEPcK1YMpgMMFkPMtI_netoT7V-w6o08A",
    authDomain: "gvanim-391b9.firebaseapp.com",
    databaseURL: "https://gvanim-391b9-default-rtdb.firebaseio.com",
    projectId: "gvanim-391b9",
    storageBucket: "gvanim-391b9.appspot.com",
    messagingSenderId: "548216440326",
    appId: "1:548216440326:web:945c0da4f5be515a5ee587",
    measurementId: "G-Y0Z9S38RHJ"
  };
  
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();

export default firebase;


