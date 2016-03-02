/* A: Functions
/* ================================ */

// creates an array of incrementing numbers from 'start' to 'end'
function ranger(start, end) {
	var arr = [];
	for (var i = 0; start <= end; i++){
		arr[i] = start;
		start++;
	}
	return arr;
}

/* B: Game Object
/* ============ */
var game = {

	/* 1: Essential Game Properties
	/* ============================ */

	// timer counter
	time : 0,

	// correct answer counter
	rights : 0,

	// total number of questions
	qTotal : easyQs.length + mediumQs.length + hardQs.length,

	// store questions into game object
	questions : {
		easyQs : easyQs.slice(), // copy array by value, not reference
		mediumQs : mediumQs.slice(), // copy array by value, not reference
		hardQs : hardQs.slice() // copy array by value, not reference
	},

	// property for saving current question
	current : Object,

	// property current music track
	music: Object,

	// win sound
	win: new Audio("assets/audio/win.mp3"),

	// lose sound
	lose: new Audio("assets/audio/lose.mp3"),

	/* 2: Game Methods
	/* ================ */

	// choose a question from available game.questions
	choose : function() {
		// run if easy questions exist
		if (this.questions.easyQs.length != 0) {
			var randomChoice = Math.floor( 
				Math.random() * this.questions.easyQs.length
			);
			game.current = game.questions.easyQs[randomChoice];
			game.questions.easyQs.splice(randomChoice, 1);
			return true;
		}
		// if easy questions are done, run if there's medium questions
		else if (this.questions.mediumQs.length != 0) {
			var randomChoice = Math.floor( 
				Math.random() * this.questions.mediumQs.length
			);
			game.current = game.questions.mediumQs[randomChoice];
			game.questions.mediumQs.splice(randomChoice, 1);
			return true;
		}
		// if medium questions are done, run if there's hard questions
		else if (this.questions.hardQs.length != 0) {
			var randomChoice = Math.floor( 
				Math.random() * this.questions.hardQs.length
			);
			game.current = game.questions.hardQs[randomChoice];
			game.questions.hardQs.splice(randomChoice, 1);
			return true;
		}
		// if no questions left, give us a game over
		else {
			return false;
		}
	},

	// test if we still have questions left based on return value of game.choose()
	areWeOn : function() {
		if(game.choose()){
			$('#right-wrong').empty();
			game.displayQ();
		}
		else {
			$('#right-wrong').empty();
			$('#timer').empty();
			game.over();
		}
	},

	// on correct guess, add a point to player score
	thatsRight : function() {
		game.rights++;
	},

	// decrease the game.time one int
	decreaseTime : function() {
		game.time--;
		if(game.time >= 10){
			$('#timer').html("<p>:" + game.time + "</p>");
		}
		else {
			$('#timer').html("<p>:0" + game.time + "</p>")
		}
	},

	// decrease the time on interval
	increment : function() {
		$('#timer').html("<p>:" + game.time + "</p>");
			intervalID = setInterval(game.decreaseTime, 1000);
			timeoutID = setTimeout(function() {
				game.timeNext();
			}, game.time * 1000);
	},

	// play win sound
	rightSound : function () {
		game.win.play();
	},

	// play lose sound
	wrongSound : function () {
		game.lose.play();
	},

	// display the questions on the screen, start the timer
	displayQ : function() {

		// set timer to 30
		game.time = 30;

		// Set up div with random q assortment
		var wholeDiv = $('<div id="answers">');
		var questionHeader = $("<h2>What game is this song from?</h2>");
		wholeDiv.append(questionHeader);

		// make array of nums one to four, to pick out random answer
		var answerNums = ranger(1, 4);
		for (var i = 0; i < 4; i++) {

			// pick a random num from answerNums array
			var randomChoice = Math.floor( Math.random() * answerNums.length);	

			/* make a div and include the name  
			 * of the game.current.answer[randomChoice] object*/
			var answer = $('<div class="answer"></div>');
			answer.attr("data-answer", "answer" + answerNums[randomChoice])

			// populate div with answer text, father original div with that div
			var answerText = $("<p>" + game.current["answer" + 
												answerNums[randomChoice]].text +
												 "</p>");
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

		// display timer
		game.increment();
	},

	// check whether a clicked answer (sel) is the correct answer
	checkA : function(sel) {
		var whichA = sel.attr('data-answer');

		/* if the user already answered the question, 
		 * don't return a value on a new click */
		if (whichA != "answered") {
			var correct = game.current[whichA].bool;
			return correct;
		}
	},

	// if you chose the right answer, do this
	rightNext : function() {
		game.thatsRight();
		clearInterval(intervalID);
		clearTimeout(timeoutID);
		$('#right-wrong').html("<h2>That's Right!</h2>");
		$(".answer").attr("data-answer", "answered");
		game.music.pause();
		game.rightSound();
		setTimeout(game.areWeOn, 3000);
	},

  // if you chose the wrong answer, do this 
	wrongNext : function() {
		clearInterval(intervalID);
		clearTimeout(timeoutID);
		$('#right-wrong').html("<h2>Wrong</h2>");
		$(".answer").attr("data-answer", "answered");
		game.music.pause();
		game.wrongSound();
		setTimeout(game.areWeOn, 3000);
	},

	timeNext : function() {
		clearInterval(intervalID);
		clearTimeout(timeoutID);
		$('#right-wrong').html("<h2>Out of Time!</h2>");
		$(".answer").attr("data-answer", "answered");
		game.music.pause();
		game.wrongSound();
		setTimeout(game.areWeOn, 3000);
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

	// what to do on game over
	over: function() {

		// make a div for the results display
		console.log("game over");
		var resultsDiv = $("<div id='results'></div>");
		var resultsHead = $("<h3>The Results Are In!</h3>");
		var resultsText = $("<p id='score'>" + game.rights + "/" +
												 game.qTotal + "</p>");

		// display a message based on number of correct choices compared to total q's
		if (game.rights/game.qTotal < 1/3) {
			var resultsMessage = $("<p id='message'>Eeesh...</p>");
		}
		else if (game.rights/game.qTotal < 2/3) {
			var resultsMessage = $("<p id='message'>Could be better...</p>");
		}
		else if (game.rights/game.qTotal < 1) {
			var resultsMessage = $("<p id='message'>Not too shabby!</p>");
		}
		else {
			var resultsMessage = $("<p id='message'>Perfect!</p>");
		}

		// replay button
		var replayButton = $('<button id="start-game">Start</button>');

		// father the div, display it
		resultsDiv.append(resultsHead, resultsText, resultsMessage, replayButton);
		console.log(resultsDiv);
		$('#display').html(resultsDiv);
	},

	// reset all game properties to defaults
	reset: function() {
		this.questions.easyQs = easyQs.slice(); 
		this.questions.mediumQs = mediumQs.slice(); 
		this.questions.hardQs = hardQs.slice();
		this.rights = 0;
	}
}

/* C: Calls / Inputs
/* =============== */

// click start button
$(document).on('click', '#start-game', function(){
	game.choose();
	game.displayQ();
	$(this).remove();
})

// click answers
$(document).on("click", ".answer", function() {
	game.user_answered( game.checkA($(this)) );
});

// test of changing background image
$(document).on("click", "h1", function() {
	$('#background-layer')
	.css('background',
			 'url(assets/images/psiv.gif) no-repeat center fixed')
	.css('background-size', 'cover')
})

