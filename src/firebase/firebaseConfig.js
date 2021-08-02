import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = require("./firebaseConfig");
firebase.initializeApp(firebaseConfig);


export const Auth = firebase.auth();