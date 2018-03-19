/* Global Variables*/
var correctAnsTime = 0;
var questionTime = 0;
var i = 0;
var timer = 20;
var wins = 0;
var losses = 0;
var unanswered = 0;
var answer = "";
var answeredFlag = false;
var yes = new Audio("assets/images/yes.mp3");
var no = new Audio("assets/images/no.mp3");

/* quizCollection object with all questions and their answer choices to choose from */
var quizCollection = {

	"q1": ["Which instrument did Ted steal for Robin in the first episode and appears in Robin’s apartment for the rest of the series?", ["Trumpet", "Tuba", "French Horn", "Clarinet"]],
	"q2": ["What is tattooed on Ted's lower back?", ["Butterfly", "Rainbow", "Dolphin", "Eagle"]],
	"q3": ["Barney, Ted, and Marshall all worked for GNB at some point. What does GNB stand for?", ["Gigantic National Bank", "Global Nutritional Brands", "Grant National Brands", "Goliath National Bank"]],
	"q4": ["What did Barney have to wear for a year after losing a bet?", ["Kitten Underwear", "Ducky Tie", "Bunny Socks", "Monkey Shoes"]],
	"q5": ["Which of these is NOT one of Barney’s theories?", ["The Daddy Rule", "The Mermaid Theory", "The Platinum Rule", "The Freeway Theory"]],
	"q6": ["Which character was NOT one of Ted’s serious girlfriends?", ["Quinn", "Stella", "Victoria", "Zoey"]],
	"q7": ["Who is Robin’s arch-enemy at work?", ["Clarice", "Nora", "Patrice", "Jess"]],
	"q8": ["What is Marshall and Lily’s theory on how to be a happy couple?", ["Lemon Theory", "Olive Theory", "Pineapple Theory", "Pickle Theory"]],
	"q9": ["What is the name of the character that Ted and Barney hate, but Lily likes?", ["William Zabka", "Gary Blauman", "Scotty Rumsen", "Terry Neuemann"]],
	"q10": ["What is the name of Ted's future daughter?", ["Penny", "Robin", "Lucy", "Leia"]],


	/*Function to display questions and answers with a time interval of 20 seconds*/
	question: function () {
		$("#btnGamestart").prop("disabled", true);

		timer = 20;
		var questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
		$("#timeMsg").html("Time Left  " + timer + " <hr>");

		if (i == questions.length) {
			quizCollection.displayScore();
			clearInterval(questionTime);
		} else {
			$("#question").html(quizCollection[questions[i]][0]);
			$("#answer1").html(quizCollection[questions[i]][1][0]);
			$("#answer2").html(quizCollection[questions[i]][1][1]);
			$("#answer3").html(quizCollection[questions[i]][1][2]);
			$("#answer4").html(quizCollection[questions[i]][1][3]);

			clearInterval(questionTime);
			clearTimeout(correctAnsTime);
			i++;
			quizCollection.start();
		}
	},


	/* function to increment timer by one second */
	start: function () {
		questionTime = setInterval(quizCollection.count, 1000);

	},


	/* function to display timer for each question , when out of time screen with correct answer is displayed*/
	count: function () {
		$("#timeMsg").html("Time Left  " + timer + " <hr>");
		timer--;
		if (timer == 0) {
			$("#timeMsg").html("Time Left  " + timer + " <hr>");
			answeredFlag = false;
			answer = "";
			quizCollection.displayCorrectAnswer(answer);
		}

	},


	/* when answer is selected or when time runs out it displays correct answer for 2 seconds*/
	displayCorrectAnswer: function (answer) {
		var correctAns = ["French Horn", "Butterfly", "Goliath National Bank", "Ducky Tie", "The Daddy Rule", "Quinn", "Patrice", "Olive Theory", "Gary Blauman", "Penny"];
		clearInterval(questionTime);
		$(".answer").children("p").html("");
		$("#answerSet").children("p").html("");

		var j = i - 1;

		if (correctAns.indexOf(answer) > -1 && answeredFlag == true) {
			wins++;
			$("#question").html("Correct !  <br><br>");
			pictures();
			yes.play();
		} else if (answeredFlag == true) {
			losses++;
			$("#question").html("Correct answer:  " + correctAns[j] + "<br><br>");
			picturesWrong();
			no.play();
		} else {
			unanswered++;
			$("#question").html("Time's Up! <br>");
			$("#question").append('<br>Correct answer:  ' + correctAns[j]);
		}

		correctAnsTime = setTimeout(quizCollection.question, 2000);

	},


	/* function to display final score details at the end of the quiz with an option to restart the game  */
	displayScore: function () {
		$("#timeMsg").html("");
		$(".answer").children("p").html("");
		$("#answerSet").children("p").html("");
		$("#question").html("Wins: " + wins + "<br>");
		$("#question").append("Losses: " + losses + "<br>");
		$("#question").append("Unanswered: " + unanswered + "<br><br>");
		picturesFinal();

		i = 0;
		wins = 0;
		losses = 0;
		unanswered = 0;
		$("#btnGamestart").prop("disabled", false);

	}

};

/* pulling images from giphy API through ajax calls*/
function pictures() {

	var str = "how" + "i" + "met" + "your" + "mother";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		$("#question").append("<img class='giphyImg'  src=" + JSON.stringify(response.data[7].images.fixed_width.url) + ">");

	});
}

function picturesWrong() {

	var str = "how" + "i" + "met" + "your" + "mother";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		$("#question").append("<img class='giphyImg' src=" + JSON.stringify(response.data[6].images.fixed_height.url) + "><br>");

	});
}

function picturesFinal() {

	var str = "how" + "i" + "met" + "your" + "mother";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		$("#question").append("<img class='giphyImg' src=" + JSON.stringify(response.data[2].images.fixed_height.url) + "><br>");

	});
}



/* on click of button start function question is called */
$("#btnGamestart").on("click", quizCollection.question);


/* answer select will set answer value and call display correct answer function */
$("#answerSet").children("p").on("click", function () {
	answer = $(this).html();
	answeredFlag = true;
	quizCollection.displayCorrectAnswer(answer);
});