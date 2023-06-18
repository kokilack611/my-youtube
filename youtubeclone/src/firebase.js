import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDEI1GQF5ylNpFl0w_3FUzrlutyWTMx5WQ",
    authDomain: "clone-83f1c.firebaseapp.com",
    projectId: "clone-83f1c",
    storageBucket: "clone-83f1c.appspot.com",
    messagingSenderId: "1057037285954",
    appId: "1:1057037285954:web:b8220a998d8432ef92cbdb",
    measurementId: "G-R66BEEXQBX"
};
firebase.initializeApp(firebaseConfig);
export default firebase.auth();