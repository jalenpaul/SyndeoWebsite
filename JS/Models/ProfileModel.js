import { UserModel } from '../Models/UserModel.js';

export class ProfileModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.userModel = new UserModel(obj.userModel);
        this.headerImgURL = obj.headerImgURL != null ? obj.headerImgURL : this.getDefaultHeaderImgURL();
        this.fullName = obj.fullName != null ? obj.fullName : "";
        this.pronouns = this.#getIdentitySymbol(obj.genderSymbol);
        this.bio = obj.bio != null ? obj.bio : "";
        this.lookingFor = obj.lookingFor != null ? obj.lookingFor : "";
        this.arrTraits = obj.arrTraits != null ? obj.arrTraits : [];
        this.attachmentStyle = obj.attachmentStyle != null ? obj.attachmentStyle : "";
        this.strOtherSectionType = obj.strOtherSectionType != null ? obj.strOtherSectionType : "";
        this.objOtherSectionData = obj.objOtherSectionData;
    }



    getDefaultHeaderImgURL = () => {
        return "/Res/JPGs/waves.jpg";
    }

    #getIdentitySymbol = (pronouns) => {
        var symbol = "";
        switch (pronouns) {

            case 'he/him':
                symbol = '♂ he/him';
                break;

            case 'she/her':
                symbol = '♀ she/her';
                break;

            case 'they/them':
                symbol = '⚩ they/them';
                break;

            default:
                symbol = "";
                break;
        }

        return symbol;
    }
}
