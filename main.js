var Nanogolf = Nanogolf || {};

var gameWidth = 900; var gameHeight = 500; Nanogolf.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');
//7 Perceptron.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

var modeflag = 0;
var course = 0;
var totalstroke = 0;
var highscorea = 25;
var highscoreb = 25;
var highscorec = 25;
var highscored = 25;
var highscoree = 25;
var highscoref = 25;
var scorenames = [8, 13, 19, 4, 17, 13, 4, 19, 8, 18, 24, 14, 20, 17, 3, 14, 14, 12];
var musicvol = 5;
var sfxvol = 5;
var track1unlocked = false;
var track2unlocked = false;
var track3unlocked = false;
var slowcheatunlocked = false;
var bigcheatunlocked = false;
var freecheatunlocked = false;
Nanogolf.game.state.add('Boot', Nanogolf.Boot);
Nanogolf.game.state.add('Preload', Nanogolf.Preload);
Nanogolf.game.state.add('Menu', Nanogolf.Menu);
Nanogolf.game.state.add('Circuita', Nanogolf.Circuita);
Nanogolf.game.state.add('Circuitb', Nanogolf.Circuitb);
Nanogolf.game.state.add('Digitala', Nanogolf.Digitala);
Nanogolf.game.state.add('Digitalb', Nanogolf.Digitalb);
Nanogolf.game.state.add('Noisea', Nanogolf.Noisea);
Nanogolf.game.state.add('Noiseb', Nanogolf.Noiseb);
Nanogolf.game.state.add('Complete', Nanogolf.Complete);
 
Nanogolf.game.state.start('Boot');