/* Global Variables
/* ================ */

// correct answer tracker
var qTotal = easyQs.length + mediumQs.length + hardQs.length; // questions array defined in question.js
var rights = 0;

/* Functions (GAME INTERFACE HERE)
/* ================================ */
function ranger(start, end) {
	var arr = [];
	for (var i = 0; start <= end; i++){
		arr[i] = start;
		start++;
	}
	return arr;
}
console.log(ranger(0, 50));


// Game object
var game = {
	// on correct guess, put corrects at plus
	right : function() {
		rights++;
	},

	// store questions into game object
	questions : {
		easyQs : easyQs.slice(), // copy array by value, not reference
		mediumQs : mediumQs.slice(), // copy array by value, not reference
		hardQs : hardQs.slice() // copy array by value, not reference
	},

	// spot for saving current question
	current : Object,

	// choose a question from available game.questions
	choose : function() {
		// run if easy questions exist
		if (this.questions.easyQs.length != 0) {
			var randomChoice = Math.floor( Math.random() * this.questions.easyQs.length);
			game.current = game.questions.easyQs[randomChoice];
			game.questions.easyQs.splice(randomChoice, 1);
		}
		// if easy questions are done, run if there's medium questions
		else if (this.questions.mediumQs.length != 0) {
			var randomChoice = Math.floor( Math.random() * this.questions.mediumQs.length);
			game.current = game.questions.mediumQs[randomChoice];
			game.questions.mediumQs.splice(randomChoice, 1);
		}
		// if medium questions are done, run if there's hard questions
		else if (this.questions.hardQs.length != 0) {
			var randomChoice = Math.floor( Math.random() * this.questions.hardQs.length);
			game.current = game.questions.hardQs[randomChoice];
			game.questions.hardQs.splice(randomChoice, 1);
		}
		// if no questions left, give us a game over
		else {
			game.over();
		}
	},

	// display the questions on the screen
	displayQ : function() {

		// Set up div with random q assortment
		var wholeDiv = $('<div id="answers">');
		var questionHeader = $("<h2>What game is this song from?</h2>");
		wholeDiv.append(questionHeader);

		// make array of nums one to four, to pick out random answer
		var answerNums = ranger(1, 4);
		for (var i = 0; i < 4; i++) {

			// pick a random num from answerNums array
			var randomChoice = Math.floor( Math.random() * answerNums.length);	

			// make a div and include the name of the game.current.answer[randomChoice] object		
			var answer = $('<div class="answer"></div>');
			answer.attr("data-answer", "answer" + answerNums[randomChoice])

			// populate div with answer text, father original div with that div
			var answerText = $("<p>" + game.current["answer" + answerNums[randomChoice]].text + "</p>");
			answer.append(answerText);
			wholeDiv.append(answer);

			// remove randomChoice num from array
			answerNums.splice(randomChoice, 1);
		}

		// display the div
		$("#display").append(wholeDiv);

		//play music from current question
		var music = new Audio(game.current.music);
		music.play();
	},

	// check whether a clicked answer (sel) is the correct answer
	checkA : function(sel) {
		var whichA = sel.attr('data-answer');
		correct = game.current[whichA].bool;
		return correct;
	},
	// if you chose the right answer, do this
	rightNext : function() {
		game.right();
		$('#right-wrong').append("<h2>That's Right!</h2>");

	},
	wrongNext : function() {
		$('#right-wrong').append("<h2>Wrong</h2>");
	},
	// method for when user answers
	user_answered : function (correct) {
		if (correct) {
			game.rightNext();
		}
		if (!correct) {
			game.wrongNext();
		}
	},
	over: function() {
		console.log("Game Over");
	}
}

/* Calls / Inputs
/* =============== */


game.choose();
game.displayQ();

$(document).on("click", ".answer", function() {
	game.user_answered( game.checkA($(this)) );
});

