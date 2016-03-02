// Array to store Question objects
var easyQs = [];
var mediumQs = [];
var hardQs = [];

// Question class for each question
var Question = function (dif, music, 
													answer1Text, answer1Gif, answer1Source, answer1Bool,
													answer2Text, answer2Gif, answer2Source, answer2Bool,
													answer3Text, answer3Gif, answer3Source, answer3Bool,
													answer4Text, answer4Gif, answer4Source,  answer4Bool,
													arr) {

	// Question difficulty
	this.dif = dif;

	// Music to Play during Question
	this.music = music;

	// First answer, whether it's correct
	this.answer1 = {
		text: answer1Text,
		gif: answer1Gif,
		gifSource: answer1Source,
		bool: answer1Bool
	}

	// Second answer, whether it's correct
	this.answer2 = {
		text: answer2Text,
		gif: answer2Gif,
		gifSource: answer2Source,
		bool: answer2Bool
	}

	// Third answer, whether it's correct
	this.answer3 = {
		text: answer3Text,
		gif: answer3Gif,
		gifSource: answer3Source,
		bool: answer3Bool
	}

	// Fourt answer, whether it's correct
	this.answer4 = {
		text: answer4Text,
		gif: answer4Gif,
		gifSource: answer4Source,
		bool: answer4Bool
	}

	// push into question array
	arr.push(this);

}

// Questions
var mario = new Question (
	'easy', 'assets/audio/mario.mp3',
	"Star Fox (SNES, 1993)", 'starfox.gif', "http://giphy.com/gifs/nintendo-snes-star-fox-QmR1yWXqnJhKg", false,
	"Super Mario World (SNES, 1991)", 'smw.gif', "http://giphy.com/gifs/nintendo-mario-snes-fj2fA2KGmNAm4", true,
	"Super Mario World 2: Yoshi's Island (SNES, 1995)", 'smw2.gif', "http://giphy.com/gifs/video-games-7Idnz5JFFDirS", false,
	"Super Metroid (SNES, 1993)",'smetroid.gif', "http://giphy.com/gifs/nintendo-1990s-super-metroid-10lMjwXA78N0Tm", false,
	easyQs
);

var sonic = new Question (
	'easy', 'assets/audio/sonic.mp3',
	"Sonic the Hedgehog 2 (Genesis, 1992)", 'sonic2.gif', "http://giphy.com/gifs/9kRYK16SPEpXy", true,
	"Sonic the Hedgehog 3 (Genesis, 1994)", 'sonic3.gif', "http://giphy.com/gifs/sega-genesis-sonic-3-the-hedgehog-55r9sLPHFciUo", false,
	"Vectorman (Genesis, 1995)", 'vectorman.gif', "http://giphy.com/gifs/sega-genesis-vectorman-h0AGKlfmj8hu8", false,
	"Wonder Boy in Monster World (Genesis, 1991)", 'wonderboy.gif', "http://obscurevideogames.tumblr.com/post/92052111447/happy-trunk-wonder-boy-in-monster-world", false,
	easyQs
);

var psiv = new Question (
	'medium', 'assets/audio/psiv.mp3',
	"Phantasy Star IV (Genesis, 1993)", 'psiv.gif', "http://giphy.com/gifs/sega-rpgs-phantasy-star-iv-YeAfl0FiNUDW8", true,
	"Steet Fighter II (Genesis, 1993)", 'sfii.gif', "http://giphy.com/gifs/street-fighter-ii-2-rrDnse2rNfmVy", false,
	"Mega Man X (SNES, 1993)", 'mmx.gif', "http://giphy.com/gifs/snes-megaman-x-actual-gameplay-10RRNregziXmw0", false,
	"Vectorman (Genesis, 1995)", 'vectorman.gif', "http://giphy.com/gifs/sega-genesis-vectorman-h0AGKlfmj8hu8", false,
	mediumQs
);

var cviv = new Question (
	'medium', 'assets/audio/cviv.mp3',
	"Super Castlevania IV (SNES, 1991)", 'cviv.gif', "http://giphy.com/gifs/snes-konami-super-castlevania-iv-nlSUZcmBmFwze", true,
	"Final Fantasy IV (SNES, 1991)", 'ffiv.gif', "http://giphy.com/gifs/snes-final-fantasy-iv-Rvc2XOin8B9Zu", false,
	"Wonder Boy in Monster World (Genesis, 1991)", 'wonderboy.gif', "http://obscurevideogames.tumblr.com/post/92052111447/happy-trunk-wonder-boy-in-monster-world", false,
	"Contra III: The Alien Wars (SNES, 1992)", 'contra.gif', "http://giphy.com/gifs/super-nintendo-konami-contra-iii-the-alien-wars-p1DtPuqpBkNBS", false,
	mediumQs
);

var lforce = new Question (
	'hard', 'assets/audio/lightening.mp3',
	"Star Fox (SNES, 1993)", 'starfox.gif', "http://giphy.com/gifs/nintendo-snes-star-fox-QmR1yWXqnJhKg", false,
	"Lightening Force (Genesis, 1992)", 'lightening.gif', "http://vidgam.tumblr.com/post/124517379561/thunder-force-iv-lightening-force-quest-for-the", true,
	"Steet Fighter II (Genesis, 1993)", 'sfii.gif', "http://giphy.com/gifs/street-fighter-ii-2-rrDnse2rNfmVy", false,
	"Mega Man X (SNES, 1993)", 'mmx.gif', "http://giphy.com/gifs/snes-megaman-x-actual-gameplay-10RRNregziXmw0", false,
	hardQs
);