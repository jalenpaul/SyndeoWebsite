import { firestore, doc, setDoc, getDoc } from './Server/FirebaseConfig.js';
import { ProfileModel } from './Models/ProfileModel.js';
import { UserModel } from './Models/UserModel.js';
import { loadXHR, blobToImage, decimalToPrecent, arrRemoveItem, getProfileOtherSectionData, addOptionsListToSelect } from './Global/GlobalFunctions.js';
import { PromptModel } from './Models/ProfileOtherSection/PromptModel.js';
import { MantraModel } from './Models/ProfileOtherSection/MantraModel.js';
import { PinnedPostModel } from './Models/ProfileOtherSection/PinnedPostModel.js';


//User Info
const userID = sessionStorage.getItem("userID");
var profileModel = new ProfileModel();

//Local items
var reader = new FileReader();
var intImgSelector = 0;

//elements
const imgHeaderImg = document.getElementById('img_EP_display_headerImg');
const inputAddHeaderImg = document.getElementById('input_EP_display_addHeaderImg');
const bResetHeaderImg = document.getElementById('b_EP_display_resetHeaderImg');


/* loading models from firestore 
const profileDocRef = doc(firestore, "Profiles", userID);
const profileSnap = await getDoc(profileDocRef);
if (profileSnap.exists()) {
    profileModel = profileSnap.data();
    loadInfo();

    const userDocRef = doc(firestore, "Users", userID);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
        profileModel.userModel = userSnap.data();
        loadInfo();

    } else {
        //TODO no user, display error
    }
    //getting other section info
    if (profileModel.strOtherSectionType != null) {
        getProfileOtherSectionData(profileModel.userModel.userID, profileModel.strOtherSectionType).then(
            (data) => {
                if (data.exists()) {
                    profileModel.objOtherSectionData = data;
                    loadInfo();
                } else {
                    //TODO display error DOM
                }
            }
        );    
    }

} else {
    //TODO load error
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


/* YOUR MATCH 
* handling 'arrTraits' and 'lookingFor'
*/
$('#input_EP_yourMatch_lookingFor').change(() => {
    profileModel.lookingFor = $('#input_EP_yourMatch_lookingFor').val();
    loadProgress();
});

$('#b_EP_yourMatch_attachment').click(() => {
    //TODO send to attachmentQuiz
});


/* Truly Me 
* handling
*/
$('#select_EP_trulyMe_other').on('change', () => {
    profileModel.strOtherSectionType = $('#select_EP_trulyMe_other').val();
})


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
    $("#div_EP_personality_masonryGrid").empty();
    profileModel.arrTraits.forEach(element => {
        var divContainer = document.createElement('div');
        divContainer.classList.add('DivTraits');

        var h5Trait = document.createElement('h5');
        h5Trait.textContent = element;

        var bTraitRemove = document.createElement('button');
        bTraitRemove.classList.add('btn-close');
        bTraitRemove.onclick = () => {
            profileModel.arrTraits = arrRemoveItem(profileModel.arrTraits, element);
            loadInfo();
        }
        divContainer.appendChild(h5Trait);
        divContainer.appendChild(bTraitRemove);
        $('#div_EP_personality_masonryGrid').append(divContainer);
    });

    //Your Match
    $('#input_EP_yourMatch_lookingFor').val(profileModel.lookingFor);
    $('#input_EP_yourMatch_attachment').val(profileModel.attachmentStyle);

    //truly me
    var divContainer = document.createElement('div');
    divContainer.classList.add('DivPrompt');
    switch (profileModel.strOtherSectionType) {

        case 'Prompt':
            var promptModel = new PromptModel(data);
            var selectPrompt = document.createElement('select');
            addOptionsListToSelect(selectPrompt, [
                //TODO add list of prompts
            ]);

            var inputResponse = document.createElement('input');
            inputResponse.setAttribute("type", "text");
            inputResponse.setAttribute('maxLength', 100);
            inputResponse.setAttribute('placeholder', 'your response here...');
            inputResponse.setAttribute('value', promptModel.strInput);
            inputResponse.addEventListener("change", (e) => {
                promptModel.strPrompt = e.target.value;
            });

            divContainer.appendChild(selectPrompt);
            divContainer.appendChild(inputResponse);
        break;

        case 'Mantra':
            var mantraModel = new MantraModel(data);
            var inputResponse = document.createElement('input');
            inputResponse.setAttribute("type", "text");
            inputResponse.setAttribute('maxLength', 100);
            inputResponse.setAttribute('placeholder', 'Your vibe attracts your tribe...');
            inputResponse.setAttribute('value', mantraModel.strMantra);
            inputResponse.addEventListener("change", (e) => {
                mantraModel.strMantra = e.target.value;
            });

            var h4Quotes = document.createElement('h4');
            h4Quotes.textContent = "\"" + inputResponse + "\"";
            
            divContainer.appendChild(h4Quotes);
        break;

        case 'Pinned Post':
            var pinnedPostModel = new PinnedPostModel(data);
            //TODO handle pinned post element
        break;
    }
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
    if ($('#input_EP_display_FullName')[0].checkValidity() && profileModel.fullName.length > 0) {
        intIdentityTasksCompleted++;
    }
    if ($('#input_EP_display_gender')[0].checkValidity() && profileModel.pronouns.length > 0) {
        intIdentityTasksCompleted++;
    }
    $('#div_EP_OC_identityProgress').css('width', decimalToPrecent(intIdentityTasksCompleted / 3));

    //personality progress
    var intPersonalityTasksCompleted = 0
    if ($('#ta_EP_personality_bio')[0].checkValidity() && profileModel.bio.length > 0) {
        intPersonalityTasksCompleted++;
    }
    if (profileModel.arrTraits.length > 0) {
        intPersonalityTasksCompleted++;
    }
    $('#div_EP_OC_personalityProgress').css('width', decimalToPrecent(intPersonalityTasksCompleted / 2));

    //Your Match progress
    var intYourMatchTasksCompleted = 0;
    if ($('#input_EP_yourMatch_lookingFor')[0].checkValidity() && profileModel.lookingFor.length > 0) {
        intYourMatchTasksCompleted++;
    }
    if (profileModel.attachmentStyle.length > 0) {
        intYourMatchTasksCompleted++;
    }
    $('#div_EP_OC_yourMatchProgress').css('width', decimalToPrecent(intYourMatchTasksCompleted / 2));
}