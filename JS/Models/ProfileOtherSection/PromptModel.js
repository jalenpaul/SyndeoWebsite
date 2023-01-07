export class PromptModel {
    constructor (obj) {
        obj = obj != null ? obj : {};
        this.ownerUID = obj.ownerUID == null ? "" : obj.ownerUID;
        this.strPrompt = obj.strPrompt == null ? "" : obj.strPrompt;
        this.strInput = obj.strInput == null ? "" : obj.strInput;
    }
}