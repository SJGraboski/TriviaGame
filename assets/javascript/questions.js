// Array to store Question objects
var easyQs = [];
var mediumQs = [];
var hardQs = [];

// Question class for each question
var Question = function (dif, music, 
													answer1Text, answer1Gif, answer1Bool,
													answer2Text, answer2Gif, answer2Bool,
													answer3Text, answer3Gif, answer3Bool,
													answer4Text, answer4Gif, answer4Bool,
													arr) {

	// Question difficulty
	this.dif = dif;

	// Music to Play during Question
	this.music = music;

	// First answer, whether it's correct
	this.answer1 = {
		text: answer1Text,
		gif: answer1Gif,
		bool: answer1Bool
	}

	// Second answer, whether it's correct
	this.answer2 = {
		text: answer2Text,
		gif: answer2Gif,
		bool: answer2Bool
	}

	// Third answer, whether it's correct
	this.answer3 = {
		text: answer3Text,
		gif: answer3Gif,
		bool: answer3Bool
	}

	// Fourt answer, whether it's correct
	this.answer4 = {
		text: answer4Text,
		gif: answer4Gif,
		bool: answer4Bool
	}

	// push into question array
	arr.push(this);

}

// Questions
var mario = new Question (
	'easy', 'assets/audio/mario.mp3',
	"Star Fox (SNES, 1993)", 'starfox.gif', false,
	"Super Mario World (SNES, 1991)", 'smw.gif', true,
	"Super Mario World 2 (SNES, 1995)", 'smw2.gif', false,
	"Super Metroid (SNES, 1993)",'smetroid.gif', false,
	easyQs
);

var sonic = new Question (
	'easy', 'assets/audio/sonic.ogg',
	"Sonic the Hedgehog 2 (Genesis, 1992)", 'sonic2.gif', true,
	"Sonic the Hedgehog 3 (Genesis, 1994)", 'sonic3.gif', false,
	"Vectorman (Genesis, 1995)", 'vectorman.gif', false,
	"Wonder Boy in Monster World (Genesis, 1991)", 'wonderboy.gif', false,
	easyQs
);