import { UserModel } from '../Models/UserModel';

class ProfileModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.userModel = UserModel(obj.userModel);
        this.headerImgURL = obj.headerImgURL != null ? obj.headerImgURL : this.getDefaultHeaderImgURL();
        this.fullName = obj.fullName != null ? obj.fullName : "";
        this.pronouns = obj.pronouns != null ? obj.pronouns : this.getGenderSymbol();
        this.bio = obj.bio != null ? obj.bio : "";
        this.arrLookingFor = obj.arrLookingFor != null ? obj.arrLookingFor : [];
    }



    getDefaultHeaderImgURL = () => {
        return "/SyndeoWebsite/Res/JPGs/waves.jpg";
    }

    getGenderSymbol = (pronouns) => {
        var genderSymbol = "";
        switch (pronouns) {

            case 'he/him':
                genderSymbol = '♂ he/him';
                break;

            case 'she/her':
                genderSymbol = '♀ she/her';
                break;

            case 'they/them':
                genderSymbol = '⚩ they/them';
                break;
        }

        return genderSymbol;
    }
}