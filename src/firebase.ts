import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuDyAdvugoktRPm1pc5oNq34ZY5DAi690",
  authDomain: "pow-dev-2082b.firebaseapp.com",
  projectId: "pow-dev-2082b",
  storageBucket: "pow-dev-2082b.appspot.com",
  messagingSenderId: "265939265545",
  appId: "1:265939265545:web:b9fea14fc1c13fabce70d8",
  measurementId: "G-DXH229S51P",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV !== "production") {
  firebase.firestore().useEmulator("localhost", 8081);
  firebase.storage().useEmulator("localhost", 9199);
  firebase.auth().useEmulator("http://localhost:9099");
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

firestore.enablePersistence();
