import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import '../JS/Models/UserModel';



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

const userModel = UserModel();

var imgPFP = document.getElementById("img_lOSU_pfp");
var inputAddPFP = document.getElementById("input_lOSU_addPFP");
var bResetPFP = document.getElementById("b_lOSU_resetPFP");

var inputUsername = document.getElementById("input_lOSU_username");
var inputIdentifier = document.getElementById("input_lOSU_identifier");
var inputPassword = document.getElementById("input_lOSU_password");
var inputSubmit = document.getElementById("input_lOSU_submit");


inputAddPFP.onchange = () => {
    const selectedFile = inputAddPFP.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imgPFP.src = reader.result;
            userModel.pfpURL = reader.result;
        }
        reader.readAsDataURL(selectedFile);
    }
}



bResetPFP.onclick = function() {
    userModel.pfpURL = userModel.getDefaultPFP();
    imgPFP.src = userModel.getDefaultPFP();
}



document.getElementById("form_lOSU").addEventListener('submit', function(event) {
    event.preventDefault();

    const username = inputUsername.value.trim();
    const email = inputIdentifier.value.trim();
    const password = inputPassword.value.trim();

    if (username.length == 0 ||
        email.length == 0 ||
        password.length == 0) {
        alert("Please fill out every box");
        return false;

    } else if (!validateEmail(email)) {
        alert("Email invalid");
        return false;

    } else if (username.length < 3 || username.length > 15) {
        alert("Username length must be 3-15");
        return false

    } else if (password.length < 8 || password.length > 25) {
        alert("Password length must be 8-25");
        return false;

    } else {
        createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user;
                if (user != null) {
                    // inserting pfp to cloud
                    if (userModel.pfpURL != userModel.getDefaultPFP()) {
                        const storageRef = ref(getStorage(), 'ProfilePictures/${user.uid}');
                        uploadBytes(storageRef, userModel.pfpURL).then((snapshot) => {
                            const imgRef = snapshot.ref;
                            if (imgRef != null) {
                                userModel.pfpURL = ref;
                                //TODO finish sign up with url
                            } else {
                                //TODO upload reference lost, retry, (possibly change to promise)
                            }
                        });
                    } else {
                        //TODO finish sign up without image upload
                    }
                }
            }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Sorry an error ocurred");
            //TODO send error to server
        });
        return true;
    }
});



const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};