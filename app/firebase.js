// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDG986veNI1D4G9_GtNk1XWh6SbGERrpa0",
    authDomain: "nuswhere-authentication.firebaseapp.com",
    projectId: "nuswhere-authentication",
    storageBucket: "nuswhere-authentication.appspot.com",
    messagingSenderId: "421786405236",
    appId: "1:421786405236:web:7cfba6a4f87c9e0e524421"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };