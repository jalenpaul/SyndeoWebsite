import { initializeApp } from "/firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "/firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxlbYh0_dLHI9GKBZNn5WH1CgxS1Rty_U",
    authDomain: "syndeo-3d845.firebaseapp.com",
    projectId: "syndeo-3d845",
    storageBucket: "syndeo-3d845.appspot.com",
    messagingSenderId: "234917383806",
    appId: "1:234917383806:web:aef8228f84731a1923522f",
    measurementId: "G-JY4ZBZEE1Y"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const auth = getAuth(firebaseConfig);

var imgPFP = document.getElementById("img_lOSU_pfp");
var bAddPFP = document.getElementById("b_lOSU_addPFP");
var bResetPFP = document.getElementById("b_lOSU_resetPFP");

var inputUsername = document.getElementById("input_lOSU_username");
var inputIdentifier = document.getElementById("input_lOSU_identifier");
var inputPassword = document.getElementById("input_lOSU_password");
var inputSubmit = document.getElementById("input_lOSU_submit");



function addPFP(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            imgPFP.src = reader.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}



bResetPFP.onclick = function() {
    imgPFP.src = "/SyndeoWebsite/Res/PNGs/img_syndeo_pfp.png";
    alert("Fail");
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
                alert("finished");
                const user = userCredential.user;
                if (user != null) {}
            }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
            console.log(error);
        });
        return true;
    }
});



function changeFormClick() {

}



const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};