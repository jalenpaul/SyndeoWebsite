export class MantraModel {
    constructor (obj) {
        obj = obj != null ? obj : {};
        this.ownerUID = obj.ownerUID != null ? obj.ownerUID : "";
        this.strMantra = obj.strMantra == null ? "" : obj.strMantra;
    }
}