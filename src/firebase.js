import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCqeRHPIxKVyisdFo9Ap1mfvpdiSnu0LUQ",
  authDomain: "movie-app-44184.firebaseapp.com",
  projectId: "movie-app-44184",
  storageBucket: "movie-app-44184.appspot.com",
  messagingSenderId: "243897314102",
  appId: "1:243897314102:web:17224631958baa43e0a197"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {auth,firebaseApp, storage};
export default db;