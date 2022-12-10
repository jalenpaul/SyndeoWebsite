import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { UserModel } from '../JS/Models/UserModel.js';
import { validateEmail, loadXHR } from '../JS/Global/GlobalFunctions.js'



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
var intErrorLevel = 0;

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
        switch (intErrorLevel) {

            case 3:
                insertUser();
                break;

            default:
                Promise.resolve().then(signUpUser(email, password)).then(insertUser());

        }
        return true;
    }
});



function signUpUser(email, password) {
    return new Promise(function(resolve, reject) {
        createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const userID = userCredential.user.uid;
                if (userID != null) {
                    userModel.userID = userID;
                    if (userModel.pfpURL != userModel.getDefaultPFP()) {
                        const metaData = {
                            contentType: 'image/jpeg',
                        };
                        const storageRef = ref(storage, 'ProfilePictures/' + userModel.userID + ".jpg");
                        uploadBytes(storageRef, userModel.pfpURL, metaData).then((snapshot) => {
                            const imgRef = snapshot.ref;
                            if (imgRef == null) {
                                alert("Error while uploadiing profile picture.");
                                intErrorLevel = 1;
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
                } else {
                    alert("Sorry, an error ocurred.");
                    intErrorLevel = 0;
                    reject();
                }
            }
        ).catch((error) => {
            alert("Error while signing up.");
            intErrorLevel = 0;
            reject();
            //TODO send error to server
        });
    })
}



function insertUser() {
    return new Promise(function(resolve, reject) {
        setDoc(doc(firestore, "Users", userModel.userID), {
            userID: userModel.userID,
            pfpURL: userModel.pfpURL,
            username: userModel.username,
        }).then(() => {
            sessionStorage.setItem("userID", userModel.userID);
            //TODO send to home page
            resolve();
        }).catch((error) => {
            alert("Error ocurred while creating profile.");
            //TODO send error to server
            intErrorLevel = 3;
            reject();
        });
    })
}