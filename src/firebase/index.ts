import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const database = firebase.database();
export const storage = firebase.storage();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export default firebase;
