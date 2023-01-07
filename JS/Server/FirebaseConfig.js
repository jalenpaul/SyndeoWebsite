import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { getFirestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache, } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyCbSKsEVOi2slMZFDlwlFGMmxIl9W3mw40",
    authDomain: "syndeo-b06fd.firebaseapp.com",
    projectId: "syndeo-b06fd",
    storageBucket: "syndeo-b06fd.appspot.com",
    messagingSenderId: "863731679452",
    appId: "1:863731679452:web:5d913c3630848a8a197419",
    measurementId: "G-C9VZ2K3PNG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

function authenticateAccountStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          sessionStorage.setItem("User", user);
          // ...
        } else {
          // User is signed out
          // ...
        }
    });
}

export { auth, onAuthStateChanged, 
    storage, 
    firestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache,
    authenticateAccountStatus
}