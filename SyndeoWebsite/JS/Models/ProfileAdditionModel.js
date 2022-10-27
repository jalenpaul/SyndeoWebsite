import {ProfileAdditionTypes} from '../Global/GlobalEnums.js';

export class ProfileAdditionModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.ProfileAdditionTypes.Prompt = obj != null ? "" : "";
    }
}