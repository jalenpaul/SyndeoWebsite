import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';

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

var form = document.getElementById("form_lOSU");
var inputIdentifier = document.getElementById("input_lOSU_identifier");
var inputPassword = document.getElementById("input_lOSU_password");
var bChangeForm = document.getElementById("b_lOSU_changeForm");



form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = inputIdentifier.value.trim();
    const password = inputPassword.value.trim();

    if (email.legnth == 0 || password.legnth == 0) {
        alert("Please fill out every box.");
        return false;
    } else if (!validateEmail(email)) {
        alert("Email invaliad");
        return false;
    } else {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            sessionStorage.setItem("userID", userModel.userID);
            window.open("https://www.codexworld.com/", "_self");
        }).catch((error) => {
            alert("Sorry, an error ocurred.");
        });
    }
});



bChangeForm.onclick = () => {
    //TODO send to SignUp.html
}
