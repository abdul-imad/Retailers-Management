import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = require("./firebaseConfig");
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();

export const database = {
	getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
