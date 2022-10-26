import { ProfileModel } from '../JS/Models/ProfileModel';


const h1Username = document.getElementById('h1_profile_username');
const imgHeaderDisplay = document.getElementById('img_profile_display');
const imgPFP = document.getElementById('img_profile_pfp');
const h2FullName = document.getElementById('h2_profile_realname');
const pBio = document.getElementById('p_profile_bio');
const h3LookingFor = document.getElementById('h3_profile_lookingFor');


//TODO load profile model
var profileModel = new ProfileModel(null);


h1Username.ariaValueText = profileModel.userModel.username;

imgHeaderDisplay.src = profileModel.headerImgURL;

imgPFP.src = profileModel.userModel.pfpURL;

h2FullName.ariaValueText = profileModel.fullName;

pBio.ariaValueText = profileModel.bio;

h3LookingFor.ariaValueText = profileModel.arrLookingFor.toString();