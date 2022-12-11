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
    if (
        profileModel.headerImgURL == getDefaultHeaderImgURL() ||
        profileModel.userModel.pfpURL == getDefaultPFP()
    ) {
        setupDisplay();
    } else {
        $("#div_CP_OC_displayProgress")
            .css("width", 100 + "%")
            .attr("aria-valuenow", 100)
            .text(100 + "% Complete");
    }
}



setupDisplay = () => {
    const boolHeaderImgCheck = profileModel.headerImgURL == getDefaultHeaderImgURL();
    const boolPFPCheck = profileModel.userModel.pfpURL == getDefaultPFP();
    var intProgress = 0;

    if (boolHeaderImgCheck && boolPFPCheck) {
        loadCarouselCover("");
    }

    if (boolPFPCheck) {

    } else {
        intProgress += 50;
    }

    if (boolHeaderImgCheck) {

    } else {
        intProgress += 50;
    }

    $("#div_CP_OC_displayProgress")
        .css("width", intProgress + "%")
        .attr("aria-valuenow", intProgress)
        .text(intProgress + "% Complete");
}



loadCarouselCover = (strTitle, strDisplayImg, strDescription, funcClickGetStarted) => {
    divCarouselBody.load('/HTML/CompleteProfileItems/CPCarouselCover');
    $("#h1_CP_CC_coverTitle").text(strTitle);
    $("#img_CP_CC_display").text(strDisplayImg);
    $("#h2_CP_CC_description").text(strDescription);
    $("#btn_CP_CC_getStarted").click(() => {
        funcClickGetStarted();
        checkSetupType();
    });
}



loadCarouselItem = ()