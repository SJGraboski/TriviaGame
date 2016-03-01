// Array to store Question objects
var easyQs = [];
var mediumQs = [];
var hardQs = [];

// Question class for each question
var Question = function (dif, music, 
													answer1Text, answer1Bool,
													answer2Text, answer2Bool,
													answer3Text, answer3Bool,
													answer4Text, answer4Bool,
													arr) {

	// Question difficulty
	this.dif = dif;

	// Music to Play during Question
	this.music = music;

	// First answer, whether it's correct
	this.answer1 = {
		text: answer1Text,
		bool: answer1Bool
	}

	// Second answer, whether it's correct
	this.answer2 = {
		text: answer2Text,
		bool: answer2Bool
	}

	// Third answer, whether it's correct
	this.answer3 = {
		text: answer3Text,
		bool: answer3Bool
	}

	// Fourt answer, whether it's correct
	this.answer4 = {
		text: answer4Text,
		bool: answer4Bool
	}

	// push into question array
	arr.push(this);

}

// Questions
var mario = new Question (
	'easy', 'assets/audio/mario.mp3',
	"Star Fox (SNES, 1993)", false,
	"Super Mario World (SNES, 1991)", true,
	"Super Mario World 2 (SNES, 1995)", false,
	"Super Metroid (SNES, 1993)", false,
	easyQs
);

var sonic = new Question (
	'easy', 'assets/audio/sonic.ogg',
	"Sonic the Hedgehog 2 (Genesis, 1992)", true,
	"Sonic & Knuckles (Genesis, 1994)", false,
	"Vectorman (Genesis, 1995)", false,
	"Wonder Boy in Monster World (Genesis, 1991)", false,
	easyQs
);