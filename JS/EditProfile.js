import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { AttachmentQuizModel, AttachmentQuizModelConverter } from './Models/AttachmentQuizModel';
import { ProfileModel, getDefaultHeaderImgURL } from './Models/ProfileModel';
import { getDefaultPFP } from './Models/UserModel';

//firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

//User Info
const userID = sessionStorage.getItem("userID");
var attachmentQuizModel = AttachmentQuizModel();
var profileModel = ProfileModel();

//Local items
var reader = new FileReader();
var intImgSelector = 0;

const profileDocRef = doc(firestore, "Profile", userID);
const profileSnap = await getDoc(profileDocRef);
if (profileSnap.exists()) {
    profileModel = profileSnap.data();

} else {
    //TODO load error
}

const attachmentQuizDocRef = doc(firestore, "Attachment Quiz", userID).withConverter(AttachmentQuizModelConverter);
const attachmentQuizSnap = await getDoc(attachmentQuizDocRef);
if (attachmentQuizSnap.exists()) {
    attachmentQuizModel = attachmentQuizSnap.data();
} else {
    //TODO start attachment quiz
}



//loading images
reader.onload = (e) => {
    loadXHR(reader.result).then(function(blob) {
        switch (intImgSelector) {
            
            case 1:
                $('img_EP_display_headerImg').src = reader.result;
                profileModel.headerImgURL = blob;
            break;

            case 2:
        }
    });
}



/* DISPLAY 
* loading either the 
*/
$('input_EP_display_addHeaderImg').change(() => {
    const selectedFile = $('input_EP_display_addHeaderImg').files[0];
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
});



//Functions
