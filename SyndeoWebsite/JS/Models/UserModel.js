class UserModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.userID = obj.userID != null ? obj.userID : "";
        this.pfpURL = obj.pfpURL != null ? obj.pfpURL : this.useDefaultPFP();
        this.username = obj.username != null ? obj.username : "";
        this.email = obj.email != null ? obj.email : "";
        this.password = obj.password != null ? obj.password : "";
    }

    getDefaultPFP() {
        return "/SyndeoWebsite/Res/PNGs/img_syndeo_pfp.png";
    }
}