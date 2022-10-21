import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { UserModel } from '../JS/Models/UserModel.js';



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

const userModel = new UserModel(null);
var reader = new FileReader();

var imgPFP = document.getElementById("img_lOSU_pfp");
var inputAddPFP = document.getElementById("input_lOSU_addPFP");
var bResetPFP = document.getElementById("b_lOSU_resetPFP");

var inputUsername = document.getElementById("input_lOSU_username");
var inputIdentifier = document.getElementById("input_lOSU_identifier");
var inputPassword = document.getElementById("input_lOSU_password");


inputAddPFP.onchange = () => {
    const selectedFile = inputAddPFP.files[0];
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
}

reader.onload = (e) => {
    imgPFP.src = reader.result;
    loadXHR(reader.result).then(function(blob) {
        userModel.pfpURL = blob;
    })
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

    userModel.username = username;

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
        Promise.resolve().then(signUpUser()).then(insertPFP()).then(insertUser());
        return true;
    }
});



function signUpUser() {
    return new Promise(function(resolve, reject) {
        createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user;
                if (user != null) {
                    userModel.userID = user.uid;
                    resolve();
                } else {
                    alert("Sorry, an error ocurred.")
                    reject();
                }
            }
        ).catch((error) => {
            alert("Error while signing up.");
            reject();
            //TODO send error to server
        });
    })
}



function insertPFP() {
    return new Promise(function(resolve, reject) {
        if (userModel.pfpURL != userModel.getDefaultPFP()) {
            const metaData = {
                contentType: 'image/jpeg',
            };
            const storageRef = ref(storage, 'ProfilePictures/' + userModel.userID + ".jpg");
            uploadBytes(storageRef, userModel.pfpURL, metaData).then((snapshot) => {
                const imgRef = snapshot.ref;
                if (imgRef == null) {
                    alert("Error while uploadiing profile picture.");
                    reject();
                } else {
                    userModel.pfpURL = String(imgRef);
                    insertUser();
                    resolve();
                }
            });
        } else {
            userModel.pfpURL = "";
            resolve();
        }
    });
}



function insertUser() {
    return new Promise(function(resolve, reject) {
        setDoc(doc(firestore, "Users", userModel.userID), {
            userID: userModel.userID,
            pfpURL: userModel.pfpURL,
            username: userModel.username,
        }).then(() => {
            resolve();
        }).catch((error) => {
            alert("Error ocurred while creating profile.");
            //TODO send error to server
            reject();
        });
    })
}



const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



function loadXHR(url) {

    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() { reject("Network error.") };
            xhr.onload = function() {
                if (xhr.status === 200) { resolve(xhr.response) } else { reject("Loading error:" + xhr.statusText) }
            };
            xhr.send();
        } catch (err) {
            alert(err.message);
        }
    });
}