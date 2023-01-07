import { TestTypes } from "/JS/Global/GlobalEnums.js";
import { QuizPostModel } from "/JS/Models/PostModels/QuizPostModel.js";

/* A 'Test' is a series of quizes from the 'QuizPostModel.js' 
*
*       For now they're strictly default but eventually, potentially, they 
*       will be added as a post as well for users to use for their content.
*
*/

export class TestModel {
    constructor(obj) {
        obj = obj != null ? obj : {};
        this.user = obj.user;
        this.testType = obj.testType;
        this.displayImgUrl = obj.displayImgUrl;
        this.title = obj.title;
        this.caption = obj.caption;
        this.arrQuizItems = obj.arrQuizItems == null ? [] : obj.arrQuizItems;
        this.results = obj.results;
    }
    
    initializeModelByType = () => {
        switch (this.testType) {

            case TestTypes.Attachment:
                this.user = null;
                this.title = "Attachment Quiz";
                this.caption = "This is a 40 question test designed to find how your psychological relationship style among other people.";
                const arrPrompts = [
                    "I often worry that my partner will stop loving me.",
                    "I find it easy to be affectionate with my partner.",
                    "I fear that once someone gets to know the real me, they won't like who I am.",
                    "I find that I bounce back quickly after a breakup, It's weird how I can just put someone out of my mind.",
                    "When I'm not involved in a relationship, I fell somewhat anxious and incomplete.",
                    "I find it difficult to emotionally support my partner when they're feeling down.",
                    "When my partner is away, I'm afraid that they might become interested in someone else.",
                    "I feel comfortable depending on romantic partners.",
                    "My independence is more important to me than my relationships.",
                    "I prefer not to share my innermost feelings with my partner.",
                    "When I show my partner how I feel, I'm afraid they will not feel the same about me.",
                    "I am generally satisfied with my romantic relationships.",
                    "I don't feel the need to act out much in my romantic relationships.",
                    "I think about my relationships a lot.",
                    "I find it difficult to depend on my romantic partners.",
                    "I tend to get very quickly attached to a romantic partner.",
                    "I have little difficulty expressing my needs and wants to my partner.",
                    "I sometimes feel angry or annoyed with my partner without knowing why.",
                    "I am very sensitive to my partner's moods.",
                    "I believe most people are essentially honest and dependable.",
                    "I prefer casual sex with uncommited partners to intimate sex with one person.",
                    "I'm comfortable sharing my personal thoughts and feelings with my partner.",
                    "I worry that if my partner leaves me I might never find someone else.",
                    "It makes me nervous when my partner gets too close.",
                    "During a conflict, I tend to impusively do or say things I later regret, rather than be able to reason about things.",
                    "An argument with my partner doesn't usually cause me to question our entire relationship.",
                    "My partners often want me to be more intimate than I feel comfortable being.",
                    "I worry that I'm not attractive enough.",
                    "Sometimes people see me as boring because I create little drama in relationships.",
                    "I miss my partner when we're apart, but then when we're together I feel the need to escape.",
                    "When I disagree with someone, I feel comfortable expressing my opinions.",
                    "I hate feeling that other people depend on me.",
                    "If I notice that someone I'm interested in is checking out other people, I don't let it faze me. I might feel a pang of jealousy, but it's fleeting.",
                    "If I notice I'm interested in is checking out other people, I feel relieved--it means they're not looking to make things exclusive.",
                    "If I notice that someone I'm interested in is checking out other people, it makes me feel depressed.",
                    "If someone I've been dating begins to act cold and distant. I may wonder what's happened, but I'll know it's probably not about me.",
                    "If someone I've been dating begins to act cold and distant, I'll be indifferent; I might even be relieved.",
                    "If someone I've been dating begins to act cold and distant, I'll worry that I've done something wrong.",
                    "If my partner was to break up with me, I'd try my best to show them what they're missing (a little jealousy can't hurt).",
                    "If someone I've been dating for several months tells me they want to stop seeing me, I'd feel hurt as first, but I'd get over it.",
                    "Sometimes when I get what I want in a relationship, I'm not sure what I want anymore.",
                    "I won't have much of a problem staying in touch with my ex (strictly platonic)--after all, we have a lot in common."
                ];
                const arrAnswers = [
                    "A",
                    "B",
                    "A",
                    "C",
                    "A",
                    "C",
                    "A",
                    "B",
                    "C",
                    "C",
                    "A",
                    "B",
                    "B",
                    "A",
                    "C",
                    "A",
                    "B",
                    "C",
                    "A",
                    "B",
                    "C",
                    "B",
                    "A",
                    "C",
                    "A",
                    "B",
                    "C",
                    "A",
                    "B",
                    "C",
                    "B",
                    "C",
                    "B",
                    "C",
                    "A",
                    "B",
                    "C",
                    "A",
                    "A",
                    "B",
                    "C",
                    "B",
                ];

                for (var i = 0; i < arrAnswers.length; i++) {
                    var quizPostModel = new QuizPostModel();
                    quizPostModel.question = arrPrompts[i];
                    quizPostModel.option1 = "True";
                    quizPostModel.option2 = "False";
                    quizPostModel.answer = arrAnswers[i];
                    this.arrQuizItems.push(quizPostModel);
                }
                break;
        }
    }
}