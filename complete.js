var Nanogolf = Nanogolf || {};

Nanogolf.Complete = function(){};

Nanogolf.Complete.prototype = {
preload: function() {
    this.eventcounter = 0;
    this.hs = false;
    this.unlocked = false;
    this.unlocktimer = 0;
    this.horizontal = 0;
    this.vertical = [0, 0, 0];
    this.justtwice = 2;
},

create: function(){
  	this.world.setBounds(0, 0, 900, 500);
    
    modeflag = 1;
    this.menu1sound = this.add.audio('menu1');
    this.menu1sound.volume = sfxvol/10;
    this.menu1sound.allowMultiple = true;
    this.menu2sound = this.add.audio('menu2');
    this.menu2sound.volume = sfxvol/10;
    this.menu2sound.allowMultiple = true;
    this.highscoremusic = this.add.audio('highscoremusic');
    this.unlocktune = this.add.audio('celebrate');
    this.unlocktune.volume = sfxvol/10;
    this.unlocktune.onStop.add(this.musicResume, this);
    
     this.ball1 = this.add.sprite(450, 250, 'ballblack');
    this.ball1.tint = 0x111111;
    this.ball1.alpha = .5;
    this.ball1.anchor.setTo(.5);
    this.ball1.scale.setTo(4);
     this.ball2 = this.add.sprite(0, 0, 'ballblack');
    this.ball2.tint = 0x222222;
    this.ball2.alpha = .5;
    this.ball2.anchor.setTo(.5);
    this.ball2.scale.setTo(2);
     this.ball3 = this.add.sprite(900, 0, 'ballblack');
    this.ball3.tint = 0x222222;
    this.ball3.alpha = .5;
    this.ball3.anchor.setTo(.5);
    this.ball3.scale.setTo(2);
     this.ball4 = this.add.sprite(900, 500, 'ballblack');
    this.ball4.tint = 0x222222;
    this.ball4.alpha = .5;
    this.ball4.anchor.setTo(.5);
    this.ball4.scale.setTo(2);
     this.ball5 = this.add.sprite(0, 500, 'ballblack');
    this.ball5.tint = 0x222222;
    this.ball5.alpha = .5;
    this.ball5.anchor.setTo(.5);
    this.ball5.scale.setTo(2);
    
     this.text1 = this.add.text(450, 75, 'CIRCUIT 1', { font: "24px System", fill: "#ffffff", align: "center" });
    this.text1.anchor.setTo(.5);
     this.text2 = this.add.text(450, 105, 'COURSE COMPLETE', { font: "32px System", fill: "#ffffff", align: "center" });
    this.text2.anchor.setTo(.5);
     this.text3 = this.add.text(450, 210, 'FINAL SCORE:', { font: "24px System", fill: "#ffffff", align: "center" });
    this.text3.anchor.setTo(.5);
     this.text4 = this.add.text(450, 250, totalstroke, { font: "44px System", fill: "#ffffff", align: "center" });
    this.text4.anchor.setTo(.5);
     this.text5 = this.add.text(450, 230, "NEW HIGH SCORE", { font: "32px System", fill: "#ffffff", align: "center" });
    this.text5.anchor.setTo(.5);
    this.text5.alpha = 0;
     this.letter1 = this.add.sprite(402, 340, 'scorenametext');
    this.letter1.anchor.setTo(.5);
    this.letter1.scale.setTo(3);
    this.letter1.alpha = 0;
     this.letter2 = this.add.sprite(450, 340, 'scorenametext');
    this.letter2.anchor.setTo(.5);
    this.letter2.scale.setTo(3);
    this.letter2.alpha = 0;
     this.letter3 = this.add.sprite(498, 340, 'scorenametext');
    this.letter3.anchor.setTo(.5);
    this.letter3.scale.setTo(3);
    this.letter3.alpha = 0;
     this.text6 = this.add.text(165, 200, "NEW HIGH SCORE", { font: "24px System", fill: "#ffffff", align: "center" });
    this.text6.anchor.setTo(.5);
    this.text6.angle = -20;
    this.text6.alpha = 0;
    
     this.button1 = this.add.sprite(330, 340, 'button');
    this.button1.anchor.setTo(.5);
    this.button1.scale.setTo(.6);
    this.button1.alpha = 0;
    this.button1.events.onInputDown.add(this.buttonLeft, this);
     this.arrow1 = this.add.sprite(330, 340, 'menuarrow');
    this.arrow1.anchor.setTo(.5);
    this.arrow1.alpha = 0;
     this.button2 = this.add.sprite(570, 340, 'button');
    this.button2.anchor.setTo(.5);
    this.button2.scale.setTo(.6);
    this.button2.alpha = 0;
    this.button2.events.onInputDown.add(this.buttonRight, this);
     this.arrow2 = this.add.sprite(570, 340, 'menuarrow');
    this.arrow2.anchor.setTo(.5);
    this.arrow2.angle = 180;
    this.arrow2.alpha = 0;
     this.button3 = this.add.sprite(402, 278, 'button');
    this.button3.anchor.setTo(.5);
    this.button3.scale.setTo(.6);
    this.button3.alpha = 0;
    this.button3.events.onInputDown.add(this.buttonUp, this);
     this.arrow3 = this.add.sprite(402, 278, 'menuarrow');
    this.arrow3.anchor.setTo(.5);
    this.arrow3.angle = 90;
    this.arrow3.alpha = 0;
     this.button4 = this.add.sprite(402, 402, 'button');
    this.button4.anchor.setTo(.5);
    this.button4.scale.setTo(.6);
    this.button4.alpha = 0;
    this.button4.events.onInputDown.add(this.buttonDown, this);
     this.arrow4 = this.add.sprite(402, 402, 'menuarrow');
    this.arrow4.anchor.setTo(.5);
    this.arrow4.angle = -90;
    this.arrow4.alpha = 0;
    
     this.button5 = this.add.sprite(325, 420, 'button');
    this.button5.anchor.setTo(.5);
    this.button5.alpha = 0;
    this.button5.scale.setTo(-1.3,1.3);
    this.button5.events.onInputDown.add(this.replayCourse, this);
     this.text7 = this.add.text(325, 420, "PLAY\nAGAIN", { font: "24px System", fill: "#ffffff", align: "center" });
    this.text7.anchor.setTo(.5);
    this.text7.alpha = 0;
     this.button6 = this.add.sprite(575, 420, 'button');
    this.button6.anchor.setTo(.5);
    this.button6.scale.setTo(1.3);
    this.button6.alpha = 0;
    this.button6.events.onInputDown.add(this.exitGame, this);
     this.text8 = this.add.text(575, 420, "EXIT", { font: "24px System", fill: "#ffffff", align: "center" });
    this.text8.anchor.setTo(.5);
    this.text8.alpha = 0;
    
    switch(course){
        case 1:{
            this.text1.setText('CIRCUIT 1');
            this.text6.setText('CIRCUIT MUSIC\nUNLOCKED');
            if(totalstroke < highscorea){highscorea = totalstroke; this.hs = true;}
            break;}
        case 2:{
            this.text1.setText('CIRCUIT 2');
            this.text6.setText('BIG CHEAT\nUNLOCKED');
            if(totalstroke < highscoreb){highscoreb = totalstroke; this.hs = true;}
            break;}
        case 3:{
            this.text1.setText('DIGITAL 1');
            this.text6.setText('DIGITAL MUSIC\nUNLOCKED');
            if(totalstroke < highscorec){highscorec = totalstroke; this.hs = true;}
            break;}
        case 4:{
            this.text1.setText('DIGITAL 2');
            this.text6.setText('SLOW CHEAT\nUNLOCKED');
            if(totalstroke < highscored){highscored = totalstroke; this.hs = true;}
            break;}
        case 5:{
            this.text1.setText('NOISE FLOOR 1');
            this.text6.setText('NOISE FLOOR\nMUSIC UNLOCKED');
            if(totalstroke < highscoree){highscoree = totalstroke; this.hs = true;}
            break;}
        case 6:{
            this.text1.setText('NOISE FLOOR 2');
            this.text6.setText('FREE CHEAT\nUNLOCKED');
            if(totalstroke < highscoref){highscoref = totalstroke; this.hs = true;}
            break;}
    }
    
    this.testtext = this.add.text(500, 500, 'test', { font: "30px Fixedsys", fill: "#ffffff", align: "center" });
},

update: function(){
    this.eventcounter += 1;
    if(this.eventcounter == 100){
        this.highScoreCheck();}
    if(this.eventcounter == 200){
        this.unlockCheck();}
    if(this.unlocked){
        this.unlockBlink();}
    
    this.ball1.angle += 1;
    this.ball2.angle += 2;
    this.ball3.angle += 2;
    this.ball4.angle += 2;
    this.ball5.angle += 2;
    
    this.button1.angle -= 1;
    this.button2.angle += 1;
    this.button3.angle += 1;
    this.button4.angle += 1;
    this.button5.angle -= 3;
    this.button6.angle += 3;
},
    
unlockBlink: function(){
    if(this.unlocktimer){
        this.unlocktimer -= 1;
        if(this.unlocktimer == 50){this.text6.alpha = 0;}
        if(this.unlocktimer == 99){this.text6.alpha = 1;}
    }
    else{this.unlocktimer = 100;}
},
    
unlockCheck: function(){
    switch(course){
        case 1: {
            if(!(track1unlocked)){
                if(totalstroke < 1){
                    track1unlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocktimer = 100;
                    this.unlocked = true;}}
            break;
        }
        case 2: {
            if(!(bigcheatunlocked)){
                if(totalstroke < 1){
                    bigcheatunlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocked = true;}}
            break;
        }
        case 3: {
            if(!(track2unlocked)){
                if(totalstroke < 1){
                    track2unlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocked = true;}}
            break;
        }
        case 4: {
            if(!(slowcheatunlocked)){
                if(totalstroke < 1){
                    slowcheatunlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocked = true;}}
            break;
        }
        case 5: {
            if(!(track3unlocked)){
                if(totalstroke < 1){
                    track3unlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocked = true;}}
            break;
        }
        case 6: {
            if(!(freecheatunlocked)){
                if(totalstroke < 1){
                    freecheatunlocked = true;
                    this.highscoremusic.stop();
                    this.unlocktune.play();
                    this.unlocked = true;}}
            break;
        }
    }
    
    if(!(this.unlocked)){this.justtwice -= 1;}
    this.button5.alpha = 1;
    this.button6.alpha = 1;
    this.text7.alpha = 1;
    this.text8.alpha = 1;
    this.button5.inputEnabled = true;
    this.button6.inputEnabled = true;
    if(this.hs){
        this.testtext.setText('success');
        this.button5.x = 150;
        this.text7.x = 150;
        this.button6.x = 750;
        this.text8.x = 750;
    }
},
    
buttonLeft: function(){
    this.menu1sound.play();
    this.horizontal -= 1;
    if(this.horizontal < 0){this.horizontal = 2;}
    this.button3.x = 402 + 48 * this.horizontal;
    this.arrow3.x = this.button3.x;
    this.arrow4.x = this.button3.x;
    this.button4.x = this.button3.x;
},
    
buttonRight: function(){
    this.menu1sound.play();
    this.horizontal += 1;
    if(this.horizontal > 2){this.horizontal = 0;}
    this.button3.x = 402 + 48 * this.horizontal;
    this.arrow3.x = this.button3.x;
    this.arrow4.x = this.button3.x;
    this.button4.x = this.button3.x;
},
    
buttonUp: function(){
    this.menu2sound.play();
    this.vertical[this.horizontal] += 1;
    if(this.vertical[this.horizontal] > 25){this.vertical[this.horizontal] = 0;}
    switch(this.horizontal){
        case 0:{
            this.letter1.frame = this.vertical[this.horizontal];
            break;
        }
        case 1:{
            this.letter2.frame = this.vertical[this.horizontal];
            break;
        }
        case 2:{
            this.letter3.frame = this.vertical[this.horizontal];
            break;
        }
    }
    scorenames[course*3-3+this.horizontal] = this.vertical[this.horizontal];
},
    
buttonDown: function(){
    this.menu2sound.play();
    this.vertical[this.horizontal] -= 1;
    if(this.vertical[this.horizontal] < 0){this.vertical[this.horizontal] = 25;}
    switch(this.horizontal){
        case 0:{
            this.letter1.frame = this.vertical[this.horizontal];
            break;
        }
        case 1:{
            this.letter2.frame = this.vertical[this.horizontal];
            break;
        }
        case 2:{
            this.letter3.frame = this.vertical[this.horizontal];
            break;
        }
    }
    scorenames[course*3-3+this.horizontal] = this.vertical[this.horizontal];
},
    
replayCourse: function(){
    this.menu2sound.play();
    totalstroke = 0;
    switch(course){
        case 0:{break;}
        case 1:{
            if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Circuita', true, false); 
            break;}
        case 2:{
			if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Circuitb', true, false); 
            break;}
        case 3:{
            if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Digitala', true, false); 
            break;}
        case 4:{
			if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Digitalb', true, false); 
            break;}
        case 5:{
            if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Noisea', true, false); 
            break;}
        case 6:{
            if(!(modeflag)){this.game.sound.stopAll();}
            this.state.start('Noiseb', true, false); 
            break;}
    }
},
    
exitGame: function(){
    totalstroke = 0;
    this.game.sound.stopAll();
    this.state.start('Menu', true, false);
},
    
musicResume: function(){
    if(this.justtwice){
        this.highscoremusic.loopFull(Math.pow(.6, 10-musicvol));
        this.justtwice -= 1;
    }
},
    
highScoreCheck: function(){
    if(this.hs){
        modeflag = 0;
        this.game.sound.stopAll();
        this.text1.y -= 50;
        this.text2.y -= 50;
        this.text3.y -= 90;
        this.text4.y -= 90;
        this.text5.alpha = 1;
        this.letter1.alpha = 1;
        this.letter2.alpha = 1;
        this.letter3.alpha = 1;
        this.button1.alpha = 1;
        this.button2.alpha = 1;
        this.button3.alpha = 1;
        this.button4.alpha = 1;
        this.arrow1.alpha = 1;
        this.arrow2.alpha = 1;
        this.arrow3.alpha = 1;
        this.arrow4.alpha = 1;
        this.button1.inputEnabled = true;
        this.button2.inputEnabled = true;
        this.button3.inputEnabled = true;
        this.button4.inputEnabled = true;
        scorenames[course*3-3] = 0;
        scorenames[course*3-2] = 0;
        scorenames[course*3-1] = 0;
    }
    else{
        this.justtwice -= 1;
    }
}
};