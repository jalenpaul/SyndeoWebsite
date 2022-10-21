export class UserModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.userID = obj.userID != null ? obj.userID : "";
        this.pfpURL = obj.pfpURL != null ? obj.pfpURL : this.getDefaultPFP();
        this.username = obj.username != null ? obj.username : "";
    }

    getDefaultPFP() {
        return "/SyndeoWebsite/Res/PNGs/img_syndeo_pfp.png";
    }
}