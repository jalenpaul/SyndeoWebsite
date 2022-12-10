import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { AttachmentQuizModel, AttachmentQuizModelConverter } from './Models/AttachmentQuizModel';
import { ProfileModel, getDefaultHeaderImgURL } from './Models/ProfileModel';
import { getDefaultPFP } from './Models/UserModel';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const userID = sessionStorage.getItem("userID");
var attachmentQuizModel = AttachmentQuizModel();
var profileModel = ProfileModel();
var intCurrentSection = 1;
var intCurrentSubSection = 1;

const divCarouselBody = document.getElementById('div_CP_contentsBody');

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


checkSetupType = () => {
    if (profileModel.headerImgURL == getDefaultHeaderImgURL()
        || profileModel.userModel.pfpURL == getDefaultPFP()
    ) {
        setupDisplay();
    }
}

setupDisplay = () => {
    divCarouselBody.load('/HTML/CompleteProfileItems/CPCarouselCover');
    
}