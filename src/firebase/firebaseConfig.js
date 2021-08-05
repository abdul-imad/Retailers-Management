import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const object = require("../firebaseCredentials");
firebase.initializeApp(object);

let auth = firebase.auth();
export default auth;
export const storage = firebase.storage();
export const db = firebase.firestore();

export const database = {
	getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
