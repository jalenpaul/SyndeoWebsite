import { ProfileModel, profileModelConverter } from '../JS/Models/ProfileModel.js';
import { collection, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';


///objects
const firestore = getFirestore(app);
var profileUID = sessionStorage.getItem("profileUID");

//main info
const h1Username = document.getElementById('h1_profile_username');
const imgHeaderDisplay = document.getElementById('img_profile_display');
const imgPFP = document.getElementById('img_profile_pfp');
const h2FullName = document.getElementById('h2_profile_realname');
const bIdentity = document.getElementById('b_profile_identity');
const pBio = document.getElementById('p_profile_bio');
const h3LookingFor = document.getElementById('h3_profile_lookingFor');

//about me
const ulTraits = document.getElementById('ul_profile_traits');
const divAddition = document.getElementById('div_profile_addition');

//interact
const bLike = document.getElementById('b_profile_like');
const bFollow = document.getElementById('b_profile_follow');
const bMessage = document.getElementById('b_profile_message');
const bShare = document.getElementById('b_profile_share');
const bMore = document.getElementById('b_profile_more');

//loading profile model
var profileModel = new ProfileModel(null);
const profileRef = doc(firestore, "Users", profileUID).withConverter(profileModelConverter);
const docSnap = await getDoc(profileRef);
if (docSnap.exists()) {
    profileModel = docSnap.data();
} else {
    //TODO change to no profile layout
}

//main info handling
h1Username.ariaValueText = profileModel.userModel.username;

imgHeaderDisplay.src = profileModel.headerImgURL;

imgPFP.src = profileModel.userModel.pfpURL;

h2FullName.ariaValueText = profileModel.fullName;

bIdentity.ariaValueText = profileModel.pronouns;
bIdentity.style.display = profileModel.pronouns == "" ? 'none' : 'inline';

pBio.ariaValueText = profileModel.bio;

h3LookingFor.ariaValueText = profileModel.arrLookingFor.toString();



//about me handling
for (let i in profileModel.arrTraits) {
    var li = document.createElement('li');
    li.setAttribute('id', 'li_trait_' + i);
    li.setAttribute('class', 'LiProfileTraits');
    ulTraits.appendChild(li);
}
