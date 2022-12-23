import { firestore, doc, setDoc, getDoc } from './Server/FirebaseConfig.js';
//import { AttachmentQuizModel, AttachmentQuizModelConverter } from './Models/AttachmentQuizModel.js';
import { ProfileModel } from './Models/ProfileModel.js';
import { UserModel } from './Models/UserModel.js';
import { loadXHR, blobToImage, decimalToPrecent, arrRemoveItem } from './Global/GlobalFunctions.js';


//User Info
const userID = sessionStorage.getItem("userID");
//var attachmentQuizModel = AttachmentQuizModel();
var profileModel = new ProfileModel();

//Local items
var reader = new FileReader();
var intImgSelector = 0;

//elements
const imgHeaderImg = document.getElementById('img_EP_display_headerImg');
const inputAddHeaderImg = document.getElementById('input_EP_display_addHeaderImg');
const bResetHeaderImg = document.getElementById('b_EP_display_resetHeaderImg');


/* loading models from firestore 
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
} */


loadInfo();


//loading files (specifically images)
reader.onload = (e) => {
    loadXHR(reader.result).then(function(blob) {
        switch (intImgSelector) {
            
            case 1:
                imgHeaderImg.src = reader.result;
                profileModel.headerImgURL = blob;
            break;

            case 2:
                $('#img_EP_display_PFP').attr('src', reader.result);
                profileModel.userModel.pfpURL = blob;
            break;
        }
        loadProgress();
        intImgSelector = 0;
    });
}



/* DISPLAY 
* handling 'PFP' and 'headerImgUrl' from ProfileModel
*/
inputAddHeaderImg.onchange = () => {
    intImgSelector = 1;
    const selectedFile = inputAddHeaderImg.files[0];
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
}

bResetHeaderImg.onclick = () => {
    imgHeaderImg.src = profileModel.getDefaultHeaderImgURL();
    profileModel.headerImgURL = profileModel.getDefaultHeaderImgURL();
    loadProgress();
}

$('#input_EP_display_addPFP').change(() => {
    intImgSelector = 2;
    const selectedFile = $('#input_EP_display_addPFP').prop('files')[0];
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
})

$('#b_EP_display_resetPFP').click(() => {
    $('#img_EP_display_PFP').attr('src', profileModel.userModel.getDefaultPFP());
    profileModel.userModel.pfpURL = profileModel.userModel.getDefaultPFP();
    loadProgress();
});


/* IDENTITY 
* handling 'username' 'fullName' and 'pronouns' of the ProfileModel
*
*/
$('#input_EP_display_username').change(() => {
    profileModel.userModel.username = $('#input_EP_display_username').val();
    loadProgress();
});

$('#input_EP_display_FullName').change(() => {
    profileModel.fullName = $("#input_EP_display_FullName").val();
    loadProgress();
});

$('#input_EP_display_gender').change(() => {
    profileModel.pronouns = $('#input_EP_display_gender').val();
    loadProgress();
});


/* PERSONALITY
* handling 'bio' and 'traits' of ProfileModel
*/
$('#ta_EP_personality_bio').change(() => {
    profileModel.bio = $('ta_EP_personality_bio').val();
    loadProgress();
});

$('#form_EP_personality_traits').submit((event) => {
    event.preventDefault();
    if ($('#inputText_EP_personality_traits')[0].checkValidity()) {
        const strInputTrait = $("#inputText_EP_personality_traits").val();
        profileModel.arrTraits.push(strInputTrait);
        $('#inputText_EP_personality_traits').val('');
        loadInfo();
    } 
});



//Functions
function loadInfo() {
    //display
    $('#img_EP_display_headerImg').attr('src', profileModel.headerImgURL);
    $('#img_EP_display_PFP').attr('src', profileModel.userModel.pfpURL);

    //identity 
    $('#input_EP_display_username').val(profileModel.userModel.username);
    $('#input_EP_display_FullName').val(profileModel.fullName);
    $('#input_EP_display_gender').val(profileModel.pronouns);

    //personality
    $('#ta_EP_personality_bio').val(profileModel.bio);
    $("#div_EP_personality_traitsMagicGrid").empty();
    var ha = [];
    profileModel.arrTraits.forEach(element => {
        var divContainer = document.createElement('div');
        divContainer.classList.add('DivTraits');

        var h5Trait = document.createElement('h5');
        h5Trait.textContent = element;

        var bTraitRemove = document.createElement('button');
        bTraitRemove.classList.add('btn-close');
        bTraitRemove.click = () => {
            profileModel.arrTraits = arrRemoveItem(profileModel.arrTraits, element);
            loadInfo();
        }
        divContainer.appendChild(h5Trait);
        divContainer.appendChild(bTraitRemove);
        ha.push(divContainer);
        $('#div_EP_personality_traitsMagicGrid').append(divContainer);
        /*
        var magicGrid = new MagicGrid({
            container: "#div_EP_personality_traitsMagicGrid",
            animate: true,
            static: false,
            items: ha.length,
        });
        magicGrid.listen();
        magicGrid.positionItems(); */
    });
    loadProgress();
}



function loadProgress() {
    //display progress
    var intDisplayTasksCompleted = 0;
    if (profileModel.headerImgURL != profileModel.getDefaultHeaderImgURL()) {
        intDisplayTasksCompleted++;
    }
    if (profileModel.userModel.pfpURL != profileModel.userModel.getDefaultPFP()) {
        intDisplayTasksCompleted++;
    }
    $('#div_EP_OC_displayProgress').css('width', decimalToPrecent(intDisplayTasksCompleted / 2));

    //identity progress
    var intIdentityTasksCompleted = 0;
    if ($('#input_EP_display_username')[0].checkValidity()) {
        intIdentityTasksCompleted++;
    } 
    if ($('#input_EP_display_FullName')[0].checkValidity()) {
        intIdentityTasksCompleted++;
    }
    if ($('#input_EP_display_gender')[0].checkValidity()) {
        intIdentityTasksCompleted++;
    }
    $('#div_EP_OC_identityProgress').css('width', decimalToPrecent(intIdentityTasksCompleted / 3));

    //personality progress
    var intPersonalityTasksCompleted = 0
    if ($('#ta_EP_personality_bio')[0].checkValidity()) {
        intPersonalityTasksCompleted++;
    }
    $('#div_EP_OC_personalityProgress').css('width', decimalToPrecent(intPersonalityTasksCompleted / 2));
}