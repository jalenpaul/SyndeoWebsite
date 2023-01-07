
export class QuizPostModel {
    constructor (obj) {
        obj = obj != null ? obj : {};
        this.id = obj.id;
        this.ownerUID = obj.ownerUID;
        this.question = obj.question;
        this.option1 = obj.option1;
        this.option2 = obj.option2;
        this.option3 = obj.option3;
        this.option4 = obj.option4;
        this.userChoice = obj.userChoice;
        this.answer = obj.answer;
    }
}