import { TestTypes } from "./Global/GlobalEnums.js";
//import { firestore, doc, getDoc, authenticateAccountStatus } from "./JS/Server/FirebaseConfig.js";
import { TestModel } from './Models/TestModel.js';
import { decimalToPrecent } from "./Global/GlobalFunctions.js";
import { QuizPostModel } from './Models/PostModels/QuizPostModel.js';



//validate login status
// \/ authenticateAccountStatus();

//class variables
const testModel = new TestModel();
var intCurrentQuestion = 1;

//retrieving items for class variables
// \/ const user = sessionStorage.getItem("User");
testModel.testType = TestTypes.Attachment; // \/ sessionStorage.getItem("TestType");

// \/ getTestModel();
testModel.initializeModelByType();
loadTestCover();
loadTest();

const myCarouselElement = document.querySelector('#carousel_quiz')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  pause: true,
});


/* functions 
function getTestModel() {
    switch (testModel.testType) {

        case TestTypes.Attachment:
            const docRef = doc(firestore, "Profiles", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const profileInfo = docSnap.data();
                if (profileInfo.attachmentStyle == null) {
                    testModel.initializeModelByType();
                    loadTestCover();
                } else {
                    testModel.results = docSnap.data();
                    loadTestResults();
                }
            } else {
                //TODO profile doesnt exists, allow user to test without signing up
            }
            break;

        default: 
            closePage();
            break;
    }
} */



function loadTestCover() {
    $('#img_quiz_cover_display').src = testModel.displayImgUrl;
    $('#h1_quiz_cover_title').text(testModel.title);
    $('#h2_quiz_cover_caption').text(testModel.caption);
}



function loadTest() {
    var currentQuizModel = testModel.arrQuizItems[intCurrentQuestion - 1];
    $('#div_EP_OC_yourMatchProgress').css('width', decimalToPrecent(intCurrentQuestion / testModel.arrQuizItems.length));
    $('#h2_test_question').text(intCurrentQuestion + ") " + currentQuizModel.question);
    
    $('#div_test_option1').css('visibility', currentQuizModel.option1 != null? 'visible' : 'hidden');
    $('#label_test_option1').text(currentQuizModel.option1);

    $('#div_test_option2').css('visibility', currentQuizModel.option2 != null? 'visible' : 'hidden');
    $('#label_test_option2').text(currentQuizModel.option2);

    $('#div_test_option3').css('visibility', currentQuizModel.option3 != null? 'visible' : 'hidden');
    $('#label_test_option3').text(currentQuizModel.option3);

    $('#div_test_option4').css('visibility', currentQuizModel.option4 != null? 'visible' : 'hidden');
    $('#label_test_option4').text(currentQuizModel.option4);

    $('input[type=radio][name=radioGroupTest]').change(function() {
        currentQuizModel.userChoice = this.value;
    });

    $('#b_test_next').click(() => {
        if (currentQuizModel.userChoice != null) {
            intCurrentQuestion = intCurrentQuestion + 1;
            document.querySelector('input[name="radioGroupTest"]:checked').checked = false;
            if (intCurrentQuestion != testModel.arrQuizItems.length) {
                loadTest();
            } else {
                loadTestResults();
            }
        }
    });

    window.onbeforeunload = function() {
        return "";
    }
}



function loadTestResults() {
    
}



function closePage() {
    //TODO load
}