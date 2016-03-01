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
	// store time
	time: 0,

	// store questions into game object
	questions : {
		easyQs : easyQs.slice(), // copy array by value, not reference
		mediumQs : mediumQs.slice(), // copy array by value, not reference
		hardQs : hardQs.slice() // copy array by value, not reference
	},

	// on correct guess, put corrects at plus
	right : function() {
		rights++;
	},


	decreaseTime : function() {
		game.time--;
		if(game.time >= 10){
			$('#timer').html("<p>:" + game.time + "</p>");
		}
		else {
			$('#timer').html("<p>:0" + game.time + "</p>")
		}
	},

	increment : function() {
		game.time = 30;
		$('#timer').html("<p>:" + game.time + "</p>");
			intervalID = setInterval(game.decreaseTime, 1000);
			setTimeout(function() {
				clearInterval(intervalID)
				game.timeNext();
			}, game.time * 1000);
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

	// current music track
	music: Object,

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
		$("#display").html(wholeDiv);
		//play music from current question
		game.music = new Audio(game.current.music);
		game.music.play();

		// set and display timer
		game.increment();
	},

	// check whether a clicked answer (sel) is the correct answer
	checkA : function(sel) {
		var whichA = sel.attr('data-answer');
		// only return a value if question hasn't been answered yet.
		if (whichA != "answered") {
			var correct = game.current[whichA].bool;
			return correct;
		}
	},

	// if you chose the right answer, do this
	rightNext : function() {
		game.right();
		$('#right-wrong').html("<h2>That's Right!</h2>");
		game.music.pause();
		game.choose();
		game.displayQ();
	},

  // if you chose the wrong answer, do this 
	wrongNext : function() {
		$('#right-wrong').html("<h2>Wrong</h2>");
		game.music.pause();
		game.choose();
		game.displayQ();
	},

	timeNext : function() {
		$('#right-wrong').html("<h2>Out of Time!</h2>");
		game.music.pause();
		game.choose();
		game.displayQ();
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
	$(".answer").attr("data-answer", "answered");
});

