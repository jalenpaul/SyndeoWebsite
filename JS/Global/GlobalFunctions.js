import { PromptModel } from '../Models/ProfileOtherSection/PromptModel.js';
import { doc, getDoc } from '../Server/FirebaseConfig.js';
import { firestore, collection, query, where, getDocs } from '/JS/Server/FirebaseConfig.js';

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



const blobToImage = (blob) => {
    return new Promise(resolve => {
      const url = URL.createObjectURL(blob)
      let img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }
      img.src = url
    });
}



const decimalToPrecent = (decimal) => {
    return (decimal * 100).toFixed(2) + "%";
}



const usernameCheck = (username) => {
    if (!username.match("[a-zA-Z0-9_\.]{4,15}")) {
        return false;
    } else {
        const docRef = collection(firestore, "Users").select("username").where("username", "==", username);
        return new Promise((resolve, reject) => {
            docRef.get().then((doc) => {
                if (doc.empty) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((error) => {
                alert("Sorry an error occurred, please try again.");
                resolve(false);
            });
        });
    }
}



function arrRemoveItem(arr, item){
    return arr.filter(f => f !== item);
}



async function getProfileOtherSectionData(userID, strOtherSectionType) {
    switch (strOtherSectionType) {

        case 'Prompt':
            const promptDocRef = doc(firestore, "Prompts", userID);
            return await getDoc(promptDocRef);

        case 'Mantra':
            const mantraDocRef = doc(firestore, 'Mantras', userID);
            return await getDoc(mantraDocRef);

        case 'Pinned Post':
            const pinnedPostDocRef = doc(firestore, 'Pinned Posts', userID);
            return await getDoc(pinnedPostDocRef);

        default:
            return 'Sorry an error ocurred.';
    }
}



function addOptionsListToSelect(selectElement, arrStrItems) {
    arrStrItems.forEach(i => {
        var item = document.createElement('option');
        item.text = i;
        selectElement.options.add(item);
    });
}



export { validateEmail, loadXHR, blobToImage, decimalToPrecent, arrRemoveItem, getProfileOtherSectionData, addOptionsListToSelect }