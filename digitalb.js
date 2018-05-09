var Nanogolf = Nanogolf || {};

Nanogolf.Digitalb = function(){};

Nanogolf.Digitalb.prototype = {
preload: function() {
    this.screen = 0;
    this.goal = 6;
    this.sgoal = 6;
    this.stroke = 0;
    
    this.ballspeed = 0;
	this.aimactive = false;
	this.radians = 0;
	this.angle = 0;
	this.distance = 0;
    this.savespin = 0;
    
    this.bigcheat = false;
    this.slowcheat = false;
    this.slowmode = false;
    this.slowcounter = 0;
    this.freecheat = false;
    
    this.bgcounter = 0;
    this.squareindex = 0;
    this.fullspeedline = 600;
    
    this.spawntimer = 0;
    this.fadein = false;
    
    this.speedvolmod = 0;
    this.soundswitch = true;
    
    this.menulock = false;
    this.menuexpanding = false;
    this.menucontracting = false;
    this.menuflag = false;
    this.navexpanding = false;
    this.navcontracting = false;
    this.navflag = false;
    this.soundexpanding = false;
    this.soundcontracting = false;
    this.soundflag = false;
    this.musictext = ["Loading Screen Loop", "All Her Witches Undressed", "ScannerTek", "Underwater"];
    this.musicindex = 2;
    this.cheatsexpanding = false;
    this.cheatscontracting = false;
    this.cheatsflag = false;
    
    this.camsnapback = false;
    this.rangeflag = false;
	
	this.animationtimer = 0;
    this.collisionindex = 0;
	
	this.boundaryflag = true;
	
	this.holerad = 0;
	this.holeang = 0;
	this.holedis = 0;
    
    this.reboundflag = false;
    this.reboundcounter = 0;
},

    
create: function() {
    this.world.setBounds(0, 0, 1300, 900);
    
    this.screen = 0;
    
    this.track2 = this.add.audio('track2');
    if(!(modeflag)){
        this.track2.loopFull(Math.pow(.6, 10-musicvol));}
    this.track0 = this.add.audio('track0');
    if(track1unlocked){this.track1 = this.add.audio('track1');}
    if(track3unlocked){this.track3 = this.add.audio('track3');}
    
    this.hitwallsound = this.add.audio('hitwall');
    this.hitwallsound.volume = sfxvol/10;
    this.hitwallsound2 = this.add.audio('hitwall');
    this.hitwallsound2.volume = sfxvol/10;
    this.hitballsound = this.add.audio('hitball');
    this.hitballsound.volume = sfxvol/10;
    this.materializesound = this.add.audio('materialize');
    this.materializesound.volume = sfxvol/10;
    this.teleportsound = this.add.audio('teleport');
    this.teleportsound.volume = sfxvol/10;
    this.electronsound = this.add.audio('collect');
    this.electronsound.volume = sfxvol/10;
    this.menu1sound = this.add.audio('menu1');
    this.menu1sound.allowMultiple = true;
    this.menu1sound.volume = sfxvol/10;
    this.menu2sound = this.add.audio('menu2');
    this.menu2sound.allowMultiple = true;
    this.menu2sound.volume = sfxvol/10;
    this.stagechangesound = this.add.audio('stagechange');
    this.stagechangesound.volume = sfxvol/10;
    this.rejectsound = this.add.audio('reject');
    this.rejectsound.volume = sfxvol/10;
    this.portsound = this.add.audio('portsound');
    this.portsound.volume = sfxvol/10;
    
    this.bgbottom = this.add.sprite(650, 450, 'bgbottom');
    this.bgbottom.anchor.setTo(.5);
    
    this.linegroup = this.add.group();
    this.stroketext = this.add.text(325, 605, "STROKE: " + this.stroke, { font: "14px Fixedsys", fill: "#005500", align: "left" });
    this.stroketext.alpha = .6;
    this.scoretext = this.add.text(385, 623, "SCORE: " + totalstroke, { font: "14px Fixedsys", fill: "#005500", align: "left" });
    this.scoretext.alpha = .6;
    
    this.bg1 = this.add.sprite(650, 450, 'bg');
    this.bg1.tint = 0xCCCCCC;
    this.bg1.anchor.setTo(1,.5);
    this.bg2 = this.add.sprite(650, 450, 'bg');
    this.bg2.tint = 0xCCCCCC;
    this.bg2.anchor.setTo(1,.5);
    this.bg2.angle = 180;
    
    line = this.linegroup.create(650, 450, 'line');
    line = this.linegroup.create(650, 317, 'line');
    line = this.linegroup.create(650, 583, 'line');
    line = this.linegroup.create(417, 450, 'line');
    line = this.linegroup.create(533, 450, 'line');
    line = this.linegroup.create(650, 450, 'line');
    line = this.linegroup.create(767, 450, 'line');
    line = this.linegroup.create(883, 450, 'line');
    
    for(var i=0; i < 3; i++){
        line = this.linegroup.children[i];
        line.anchor.setTo(.5);
        line.scale.x = 680;
        line.alpha = .5;
        line.timer = 200;
        line.speed = 0;
    }
    for(i=3; i < 8; i++){
        line = this.linegroup.children[i];
        line.anchor.setTo(.5);
        line.angle = 90;
        line.scale.x = 373;
        line.alpha = .5;
        line.timer = 200;
        line.speed = 0;
    }
    
    this.shadowfilter = this.add.tileSprite(321, 264, 658, 372, 'shadowfilter1');
    this.shadowfilter.alpha = .9;
    
    this.squares = this.add.sprite(205, 205, 'squares');
    this.squares.tint = 0x999999;
    this.squares.alpha = 0
    this.squares2 = this.add.sprite(1095, 695, 'squares');
    this.squares2.tint = 0x999999;
    this.squares2.alpha = 0
    this.squares2.angle = 180;

	 this.boundary3 = this.add.sprite(100, 450, 'digitalboundary3');
    this.game.physics.p2.enable(this.boundary3);
	this.boundary3.body.static = true;
     this.boundary4 = this.add.sprite(1200, 449, 'digitalboundary3');
    this.game.physics.p2.enable(this.boundary4);
	this.boundary4.body.static = true;
	this.boundary4.scale.x = -1;
     this.boundary1 = this.add.sprite(326, 100, 'digitalboundary1');
    this.game.physics.p2.enable(this.boundary1);
	this.boundary1.body.static = true;
     this.boundary12 = this.add.sprite(974, 100, 'digitalboundary2');
    this.game.physics.p2.enable(this.boundary12);
	this.boundary12.body.static = true;
     this.boundary2 = this.add.sprite(974, 800, 'digitalboundary1');
    this.game.physics.p2.enable(this.boundary2);
	this.boundary2.body.static = true;
    this.boundary2.scale.setTo(-1);
     this.boundary22 = this.add.sprite(326, 800, 'digitalboundary2');
    this.game.physics.p2.enable(this.boundary22);
	this.boundary22.body.static = true;
    this.boundary22.scale.setTo(-1);
    
    this.squaresgroup = this.add.group();
    for (var i=0; i < 42; i++){
        square = this.squaresgroup.create(0, 0, 'singlesquare');
        square.anchor.setTo(.5);
        square.tint = 0x555555;
    }
    
     this.pad = this.add.sprite(1000, 630, 'pad');
	this.pad.anchor.setTo(.5);
    this.pad.alpha = 0;
	 this.hole = this.add.sprite(1000, 630, 'hole');
	this.hole.anchor.setTo(.5);
	this.hole.animations.add('spin', [1,2], 2, true);
    this.hole.animations.add('spinslow', [1,2], .5, true);
	this.hole.animations.play('spin');
    this.hole.alpha = 0;
    
    this.objectgroup = this.add.group();
    this.objectSpawn();
    this.specialgroup = this.add.group();
    this.specialSpawn();
    
     this.balleffect1 = this.add.sprite(300, 300, 'balleffect2');
    this.balleffect1.anchor.setTo(1, .5);
    this.balleffect1.scale.setTo(2);
    this.balleffect1.alpha = 0;
	
	 this.ball = this.add.sprite(-200, -200, 'ballmarker');
	this.ball.anchor.setTo(.5);
	this.ball.alpha = 0;
    this.ball.inpit = false;
    this.ball.inactive = true;
    this.ball.respawning = true;
    this.ball.spawnx = 300;
    this.ball.spawny = 450;
    this.ball.snapx = 0;
    this.ball.snapy = 0;
    this.ball.idle = 0;
	this.game.physics.p2.enable(this.ball);
	this.ball.body.setCircle(20, 0, 0, 0);
    if(this.bigcheat){
        this.ball.body.setCircle(30, 0, 0, 0);}
	this.ball.body.damping = .6;
    this.ball.body.onBeginContact.add(this.ballBounce, this);
	
	 this.balloverlay = this.add.sprite(this.ball.x, this.ball.y, 'ball')
	this.balloverlay.scale.setTo(.15);
    if(this.bigcheat){
        this.balloverlay.scale.setTo(.225);}
	this.balloverlay.anchor.setTo(.5);
    
    this.electrongroup = this.add.group();
    this.electronSpawn();
    
    this.collisiongroup = this.add.group();
     collision = this.collisiongroup.create(-400, -400, 'collision');
    collision.tintcolor = 0xFFFF00;
    collision.mode = 0;
    collision.timer = 0;
    collision.anchor.setTo(.5);
     collision = this.collisiongroup.create(-400, -400, 'collision');
    collision.tintcolor = 0xFFFF00;
    collision.mode = 0;
    collision.timer = 0;
    collision.anchor.setTo(.5);
     collision = this.collisiongroup.create(-400, -400, 'collision');
    collision.tintcolor = 0xFFFF00;
    collision.mode = 0;
    collision.timer = 0;
    collision.anchor.setTo(.5);

	 this.shotarrow = this.add.sprite(-300, -300, 'shotarrow');
	this.shotarrow.anchor.setTo(1, .5);

	 this.sabody = this.add.sprite(-300, -300, 'sabody');
	this.sabody.anchor.setTo(1, .5);
    
    this.shottext = this.add.text(-300, -300, this.distance + '\n' + this.distance, { font: "22px Fixedsys", fill: "#880000", fontweight: "bolder", align: "center" });
    this.shottext.anchor.setTo(.5);
    
     this.crossout = this.add.sprite(0, 0, 'crossout');
    this.crossout.alpha = 0;
    this.crossout.anchor.setTo(.5);
    
    this.camfocus = this.add.sprite(650, 450, 'camfocus');
     this.camfocus.alpha = 0;
     this.camera.follow(this.camfocus, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
	this.boundarymode = 0;
    this.boundarygroup = this.add.group();
	 line = this.boundarygroup.create(650, 0, 'digitalbline');
	line.anchor.setTo(.5,1);
	line.scale.setTo(13, 60);
	 line = this.boundarygroup.create(650, 900, 'digitalbline');
	line.anchor.setTo(.5,1);
	line.scale.setTo(13, 60);
	line.angle = 180;
	 line = this.boundarygroup.create(0, 450, 'digitalbline');
	line.anchor.setTo(.5,1);
	line.scale.setTo(9, 60);
	line.angle = -90;
	 line = this.boundarygroup.create(1300, 450, 'digitalbline');
	line.anchor.setTo(.5,1);
	line.scale.setTo(9, 60);
	line.angle = 90;
	 cor = this.boundarygroup.create(0, 0, 'digitalbcorner');
	cor.anchor.setTo(1);
	cor.scale.setTo(60);
	 cor = this.boundarygroup.create(1300, 0, 'digitalbcorner');
	cor.anchor.setTo(1);
	cor.scale.setTo(60);
	cor.angle = 90;
	 cor = this.boundarygroup.create(1300, 900, 'digitalbcorner');
	cor.anchor.setTo(1);
	cor.scale.setTo(60);
	cor.angle = 180;
	 cor = this.boundarygroup.create(0, 900, 'digitalbcorner');
	cor.anchor.setTo(1);
	cor.scale.setTo(60);
	cor.angle = -90;
    
    this.darkoverlay = this.add.sprite(650, 450, 'digitaldarkoverlay');
    this.darkoverlay.anchor.setTo(.5);
    this.darkoverlay.alpha = 0;
    
     this.sign = this.add.sprite(1000, 600, 'sign');
    this.sign.anchor.setTo(.5);
    this.sign.animations.add('play', [0, 1, 2], 3, true);
    this.sign.animations.play('play');
     this.signnumber = this.add.sprite(1000, 612, 'signnumber');
    this.signnumber.anchor.setTo(.5);
    
    this.star = this.add.sprite(650, 450, 'star');
    this.star.anchor.setTo(.49,.5);
    this.star.alpha = 0;
    this.star.counter = 0;
    this.star.scale.setTo(.01);
    this.star.tint = 0x00BB00;
    
    this.menuCreate();
    
        this.ball.inpit = false;
        this.ball.inactive = false;
        this.ball.body.reset(300, 450);
        this.balloverlay.x = this.ball.spawnx; this.balloverlay.y = this.ball.spawny;
        this.balloverlay.scale.setTo(.15);
        if(this.bigcheat){
            this.balloverlay.scale.setTo(.225);}
        this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        this.ball.body.force.x = 2000;
        this.balloverlay.alpha = .1;
        this.balloverlay.tint = 0x000000;
        this.ball.respawning = true;
        this.materializesound.play();
        this.sign.alpha = 0;
        this.signnumber.alpha = 0;
        for(var i=0;i<this.objectgroup.length; i++){
            this.objectgroup.children[i].alpha = 1;}
        for(var i=0;i<this.specialgroup.length; i++){
            this.specialgroup.children[i].alpha = 1;}
        for(var i=0;i<this.electrongroup.length/2; i++){
            this.electrongroup.children[i].alpha = .3;}
        for(i=this.electrongroup.length/2;i<this.electrongroup.length; i++){
            this.electrongroup.children[i].alpha = 1;}

    //this.testtext = this.add.text(500, 600, this.ball.snapx, { font: "30px Fixedsys", fill: "#ffffff", align: "center" });
	//this.testtext.setText(this.input.x + ' ' + this.input.y);
},
    
update: function(){
    if(this.slowmode){
        this.slowcounter += 1;
        if(this.slowcounter % 4){return;}}
    
	if(this.input.activePointer.isDown){
        this.aimShot();}
	else{
		this.fireShot();}

    this.bgUpdate();
	
	this.ballTrail();
	
    if(this.reboundflag){
        this.reboundAnimation();}
    if(this.camsnapback){
        this.cameraReturn();}
    if(this.ball.inpit){
        this.resetBall();}
    else if(this.ball.respawning){
        this.ballSpawn();}
	
	this.ballAnimation();
	
	this.generalAnimation();
    
    this.collisionAnimation();
    
    this.holeCollision();
    this.electronCollision();
	
    this.bumpUpdate();
    this.specialUpdate();
    
    if(this.despawn){this.despawnUpdate();}
    this.spawnUpdate();
    if(this.fadein){this.fadeIn();}
    
    if(this.menulock){
        this.menuUpdate();}
    
    this.squareUpdate();
},
    
goFull: function(){
    if (this.game.scale.isFullScreen){
        this.menu1sound.play();
        this.game.scale.stopFullScreen();}
    else{
        this.menu2sound.play();
        this.game.scale.startFullScreen(false);}
},
    
restartCourse: function(){
    this.stroke = 0;
    totalstroke = 0;
    this.ball.body.reset(-200, -200);
    this.balloverlay.reset(-200,-200);
    this.scoretext.alpha = 0;
    this.stroketext.alpha = 0;
    this.stagechangesound.play();
    this.stroketext.setText("STROKE: " + this.stroke);
    this.scoretext.setText("SCORE: " + totalstroke);
    this.expandMenu();
    this.screen = 0;
    this.signnumber.frame = this.screen;
    this.electrongroup.callAll('kill');
    this.electrongroup.removeAll();
    this.despawn = true;
    
    this.sign.alpha = 1;
    this.signnumber.alpha = 1;
    
    this.ball.inpit = false;
    this.ball.inactive = true;
    this.balloverlay.scale.setTo(.15);
    if(this.bigcheat){
        this.balloverlay.scale.setTo(.225);}
},
    
menuUpdate: function(){
    this.menugroup.children[6].angle += 3;
    this.menugroup.children[4].angle -= 3;
    this.menugroup.children[2].angle += 3;
    this.menugroup.children[0].angle -= 3;
    if(this.navflag){
        this.navgroup.children[0].angle += 2;
        this.navgroup.children[2].angle -= 2;
        this.navgroup.children[4].angle += 2;
        this.navgroup.children[6].angle -= 2;
        this.navgroup.children[8].angle += 2;
        this.navgroup.children[10].angle -= 2;
        this.navgroup.children[12].angle += 2;
        this.navgroup.children[14].angle -= 2;
        this.navgroup.children[16].angle += 2;
        this.navgroup.children[20].angle -= 2;
        this.navgroup.children[22].angle += 2;
        this.navgroup.children[24].angle -= 2;
    }
    if(this.soundflag){
        this.soundgroup.children[1].angle -= 2;
        this.soundgroup.children[3].angle += 2;
        this.soundgroup.children[6].angle -= 2;
        this.soundgroup.children[8].angle += 2;
        this.soundgroup.children[11].angle -= 2;
        this.soundgroup.children[13].angle += 2;
    }
    if(this.cheatsflag){
        if(bigcheatunlocked){
            if(this.bigcheat){this.cheatsgroup.children[2].angle += 2;}
            else{this.cheatsgroup.children[2].angle -= 2;}
        }
        if(slowcheatunlocked){
            if(this.slowcheat){this.cheatsgroup.children[8].angle += 2;}
            else{this.cheatsgroup.children[8].angle -= 2;}
        }
        if(freecheatunlocked){
            if(this.freecheat){this.cheatsgroup.children[14].angle += 2;}
            else{this.cheatsgroup.children[14].angle -= 2;}
        }
    }
    if(this.menuexpanding){
        this.menuExpanding();}
    else if(this.menucontracting){
        this.menuContracting();}
    if(this.navexpanding){
        this.navExpanding();}
    else if(this.navcontracting){
        this.navContracting();}
    if(this.soundexpanding){
        this.soundExpanding();}
    else if(this.soundcontracting){
        this.soundContracting();}
    if(this.cheatsexpanding){
        this.cheatsExpanding();}
    else if(this.cheatscontracting){
        this.cheatsContracting();}
},
    
spawnUpdate: function(){
    if(!(this.spawntimer)){return;}
    this.star.counter += 1;
    if(this.spawntimer > 60){
        if(!(this.star.counter % 6)){
            rnd = Math.floor(Math.random() * 180) - 90;
            this.star.angle += rnd;
        }
    }
    else{
        if(!(this.star.counter % 9)){
            rnd = Math.floor(Math.random() * 180) - 90;
            this.star.angle += rnd;
        }
    }
    
    this.spawntimer -= 1;
    
    if(this.spawntimer < 49){
        this.darkoverlay.alpha -= .02;
        this.bg1.scale.x += .02;
        this.bg1.scale.y += .02;
        this.bg2.scale.x += .02;
        this.bg2.scale.y += .02;
    }
    if(this.spawntimer < 25){
        this.star.alpha -= .039
    }
    
    if(!(this.spawntimer)){
        this.star.counter = 0;
        this.star.scale.setTo(.01);
        this.darkoverlay.alpha = 0;
        this.star.alpha = 0;
        this.bg1.scale.setTo(1);
        this.bg2.scale.setTo(1);
        for(var i=0; i<this.linegroup.length; i++){
            line = this.linegroup.children[i];
            line.scale.y = 1;
            line.alpha = 0;
            switch(i){
                case 0:{line.reset(650, 450); break;}
                case 1:{line.reset(650, 317); break;}
                case 2:{line.reset(650, 583); break;}
                case 3:{line.reset(417, 450); break;}
                case 4:{line.reset(533, 450); break;}
                case 5:{line.reset(650, 450); break;}
                case 6:{line.reset(767, 450); break;}
                case 7:{line.reset(883, 450); break;}
            }
            if(i < 3){line.scale.x = 680;}
            else{line.scale.x = 373;}
        }
        
        this.scoretext.alpha = .6;
        this.stroketext.alpha = .6;
        this.hole.scale.setTo(1);
        this.pad.scale.setTo(1);
        this.ball.inpit = false;
        this.ball.inactive = false;
        this.ball.body.reset(this.ball.spawnx, this.ball.spawny);
        this.balloverlay.x = this.ball.spawnx; this.balloverlay.y = this.ball.spawny;
        this.balloverlay.scale.setTo(.15);
        if(this.bigcheat){
            this.balloverlay.scale.setTo(.225);}
        this.ball.body.velocity.x = 0;
        this.ball.body.velocity.y = 0;
        this.ball.body.force.x = 2000;
        this.balloverlay.alpha = .1;
        this.balloverlay.tint = 0x000000;
        this.ball.respawning = true;
        this.materializesound.play();
        this.sign.alpha = 0;
        this.signnumber.alpha = 0;
        this.fadein = true;
    }
},
    
fadeIn: function(){
    for(var i=0; i<this.objectgroup.length; i++){
        this.objectgroup.children[i].alpha += .02;
    }
    for(i=0; i<this.specialgroup.length; i++){
        this.specialgroup.children[i].alpha += .02;
    }
    for(i=0; i<this.linegroup.length; i++){
        this.linegroup.children[i].alpha += .01;
    }
    for(i=0; i<this.electrongroup.length/2; i++){
        this.electrongroup.children[i].alpha += .006;
    }
    for(i=this.electrongroup.length/2; i<this.electrongroup.length; i++){
        this.electrongroup.children[i].alpha += .02;
    }
    
    this.hole.alpha += .02;
    this.pad.alpha += .02;
    
    if(this.hole.alpha > .98){
        for(i=0; i<this.objectgroup.length; i++){
            this.objectgroup.children[i].alpha = 1;
        }
        for(i=0; i<this.specialgroup.length; i++){
            this.specialgroup.children[i].alpha = 1;
        }
        for(i=0; i<this.linegroup.length; i++){
            this.linegroup.children[i].alpha = .5;
        }
        for(i=0; i<this.electrongroup.length/2; i++){
            this.electrongroup.children[i].alpha = .3;
        }
        for(i=this.electrongroup.length/2; i<this.electrongroup.length; i++){
            this.electrongroup.children[i].alpha = 1;
        }
        this.hole.alpha = 1;
        this.pad.alpha = 1;
        this.fadein = false;
    }
},
    
bumpUpdate: function(){
    if(this.despawn){return;}
    if(this.spawntimer){return;}
    switch(this.screen){
        case 0: {break;}
        case 1: {
            this.coursetimer -= 1;
            if(this.coursetimer > 199){
                this.specialgroup.children[0].y += 2;
                this.specialgroup.children[1].y -= 2;
            }
            else{
                this.specialgroup.children[0].y -= 2;
                this.specialgroup.children[1].y += 2;
            }
            if(!(this.coursetimer)){this.coursetimer = 400;}
            break;}
        case 2: {break;}
        case 3: {
            if(this.specialgroup.children[0].x > this.ball.x + 5){this.specialgroup.children[0].x -= 2;}
            else if(this.specialgroup.children[0].x < this.ball.x - 5){this.specialgroup.children[0].x += 2;}
            else if(this.specialgroup.children[0].y > this.ball.y + 5){this.specialgroup.children[0].y -= 2;}
            else if(this.specialgroup.children[0].y < this.ball.y - 5){this.specialgroup.children[0].y += 2;}
            if(this.balloverlay.alpha < .9){this.specialgroup.children[0].reset(1000, 450);}
            break;}
        case 4: {
            for(var i=0; i<4; i++){
                bump = this.objectgroup.children[i];
				bump.rads += .01;
				bump.body.x = 650 + 100*Math.cos(bump.rads);
				bump.body.y = 450 + 100*Math.sin(bump.rads);
            }
            for(i=4; i<16; i++){
                bump = this.objectgroup.children[i];
				bump.rads += .02;
				bump.body.x = 650 + 300*Math.cos(bump.rads);
				bump.body.y = 450 + 300*Math.sin(bump.rads);
            }
            for(i=0; i<this.specialgroup.length; i++){
                bump = this.specialgroup.children[i];
				bump.rads -= .015;
				bump.x = 650 + 200*Math.cos(bump.rads);
				bump.y = 450 + 200*Math.sin(bump.rads);
            }
            break;}
        case 5: {break;}
        case 6: {break;}
        case 7: {
            this.coursetimer -= 1;
            if(!(this.coursetimer)){
                this.coursetimer = 100;
                this.specialgroup.children[0].mode += 1;
                if(this.specialgroup.children[0].mode == 9){this.specialgroup.children[0].mode = 0;}
                switch(this.specialgroup.children[0].mode){
                    case 0:{
                        this.specialgroup.children[0].reset(630, 430);
                        this.specialgroup.children[1].reset(670, 430);
                        this.specialgroup.children[2].reset(630, 470);
                        this.specialgroup.children[3].reset(670, 470);
                        break;}
                    case 1:{
                        this.specialgroup.children[0].reset(710, 350);
                        this.specialgroup.children[1].reset(750, 350);
                        this.specialgroup.children[2].reset(710, 390);
                        this.specialgroup.children[3].reset(750, 390);
                        break;}
                    case 2:{
                        this.specialgroup.children[0].reset(710, 510);
                        this.specialgroup.children[1].reset(750, 510);
                        this.specialgroup.children[2].reset(710, 550);
                        this.specialgroup.children[3].reset(750, 550);
                        break;}
                    case 3:{
                        this.specialgroup.children[0].reset(550, 430);
                        this.specialgroup.children[1].reset(590, 430);
                        this.specialgroup.children[2].reset(550, 470);
                        this.specialgroup.children[3].reset(590, 470);
                        break;}
                    case 4:{
                        this.specialgroup.children[0].reset(550, 350);
                        this.specialgroup.children[1].reset(590, 350);
                        this.specialgroup.children[2].reset(550, 390);
                        this.specialgroup.children[3].reset(590, 390);
                        break;}
                    case 5:{
                        this.specialgroup.children[0].reset(630, 510);
                        this.specialgroup.children[1].reset(670, 510);
                        this.specialgroup.children[2].reset(630, 550);
                        this.specialgroup.children[3].reset(670, 550);
                        break;}
                    case 6:{
                        this.specialgroup.children[0].reset(710, 430);
                        this.specialgroup.children[1].reset(750, 430);
                        this.specialgroup.children[2].reset(710, 470);
                        this.specialgroup.children[3].reset(750, 470);
                        break;}
                    case 7:{
                        this.specialgroup.children[0].reset(550, 510);
                        this.specialgroup.children[1].reset(590, 510);
                        this.specialgroup.children[2].reset(550, 550);
                        this.specialgroup.children[3].reset(590, 550);
                        break;}
                    case 8:{
                        this.specialgroup.children[0].reset(630, 350);
                        this.specialgroup.children[1].reset(670, 350);
                        this.specialgroup.children[2].reset(630, 390);
                        this.specialgroup.children[3].reset(670, 390);
                        break;}
                }
            }        
            break;}
        case 8: {
            this.specialgroup.children[6].x += 5;
            if(this.specialgroup.children[6].x > 1999){this.specialgroup.children[6].x = 0;}
            this.specialgroup.children[7].x += 5;
            if(this.specialgroup.children[7].x > 1999){this.specialgroup.children[7].x = 0;}
            this.specialgroup.children[8].x += 5;
            if(this.specialgroup.children[8].x > 1999){this.specialgroup.children[8].x = 0;}
            this.specialgroup.children[9].x += 5;
            if(this.specialgroup.children[9].x > 1999){this.specialgroup.children[9].x = 0;}
            break;}
    }
},
    
specialUpdate: function(){
	if(this.despawn){return;}
    for(var i=0; i<this.specialgroup.length; i++){
        switch(this.specialgroup.children[i].design){
            case 0:{break;}
            case 1:{
                dist = this.getDistance(this.ball, this.specialgroup.children[i], 3);
				if(this.bigcheat){dist = dist * .75;}
                if(dist < 30){
                    this.ball.body.reset(this.ball.spawnx, this.ball.spawny);
                    this.ball.body.velocity.x = 0;
                    this.ball.body.velocity.y = 0;
                    this.ball.body.force.x = 2000;
                    this.balloverlay.alpha = .1;
                    this.balloverlay.tint = 0x000000;
                    this.rejectsound.play();
                    this.materializesound.play();
                    this.ball.respawning = true;
                }
                break;
            }
            case 2:{
                this.specialgroup.children[i].angle -= 2;
                if(this.ballspeed < 1){break;}
                if(this.specialgroup.children[i].timer){
                    this.specialgroup.children[i].timer -= 1;
                    break;}
                dist = this.getDistance(this.ball, this.specialgroup.children[i], 3);
				if(this.bigcheat){dist = dist * .75;}
                if(dist < 30){
                    this.ball.body.x = this.specialgroup.children[i+1].x;
                    this.ball.body.y = this.specialgroup.children[i+1].y;
                    this.specialgroup.children[i+1].timer = 30;
                    if(this.ballspeed < 100){this.specialgroup.children[i+1].timer = 160;}
                    this.portsound.play();
                }
                break;
            }
            case 3:{
                this.specialgroup.children[i].angle -= 2;
                if(this.ballspeed < 1){break;}
                if(this.specialgroup.children[i].timer){
                    this.specialgroup.children[i].timer -= 1;
                    break;}
                dist = this.getDistance(this.ball, this.specialgroup.children[i], 3);
				if(this.bigcheat){dist = dist * .75;}
                if(dist < 30){
                    this.ball.body.x = this.specialgroup.children[i-1].x;
                    this.ball.body.y = this.specialgroup.children[i-1].y;
                    this.specialgroup.children[i-1].timer = 30;
                    if(this.ballspeed < 100){this.specialgroup.children[i-1].timer = 160;}
                    this.portsound.play();
                }
                break;
            }
        }
    }
},
    
expandMenu: function(){
	if(this.despawn){return;}
	if(this.spawntimer){return;}
    if(this.menulock){
        this.menu2sound.play();
        this.menucontracting = true;
        this.menugroup.children[2].inputEnabled = false;
        this.menugroup.children[0].inputEnabled = false;
        this.menugroup.children[4].inputEnabled = false;
        if(this.soundflag){
            this.soundflag = false;
            this.soundcontracting = true;
            for(var i = 0; i < this.soundgroup.length; i++){
                this.soundgroup.children[i].inputEnabled = false;
            }
        }
        if(this.navflag){
            this.navflag = false;
            this.navcontracting = true;
            for(var i = 0; i < this.navgroup.length; i++){
                this.navgroup.children[i].inputEnabled = false;
            }
        }
        if(this.cheatsflag){
            this.cheatsflag = false;
            this.cheatscontracting = true;
            for(var i = 0; i < this.cheatsgroup.length; i++){
                this.cheatsgroup.children[i].inputEnabled = false;
            }
        }
    }
    else{
        this.menu2sound.play();
        this.menulock = true;
        this.rangeflag = true;
        this.menuflag = true;
        this.fireShot();
        this.menuexpanding = true;
        this.menugroup.children[6].scale.setTo(1);
        this.menugroup.children[6].frame = 0;
        this.menugroup.children[7].scale.setTo(1);
        for (var i = 0; i < this.menugroup.length; i++){
            this.menugroup.children[i].alpha = 1;
        }
    }
},
    
menuExpanding: function(){
    this.menugroup.children[4].y = this.menugroup.children[4].y - .12 * (this.menugroup.children[4].y - 375);
    this.menugroup.children[5].y = this.menugroup.children[4].y;
    this.menugroup.children[2].y = this.menugroup.children[2].y - .12 * (this.menugroup.children[2].y - 495);
    this.menugroup.children[3].y = this.menugroup.children[2].y;
    this.menugroup.children[0].y = this.menugroup.children[0].y - .12 * (this.menugroup.children[0].y - 615);
    this.menugroup.children[1].y = this.menugroup.children[0].y;
    if(Math.abs(this.menugroup.children[0].y-615) < 3){
        this.menugroup.children[0].y = 615;
        this.menugroup.children[4].y = 375;
        this.menugroup.children[2].y = 495;
        this.menuexpanding = false;
        this.menugroup.children[2].inputEnabled = true;
        this.menugroup.children[4].inputEnabled = true;
        this.menugroup.children[0].inputEnabled = true;
    }
},
    
menuContracting: function(){
    this.menugroup.children[4].y = this.menugroup.children[4].y - .12 * (this.menugroup.children[4].y - 255);
    this.menugroup.children[5].y = this.menugroup.children[4].y;
    this.menugroup.children[2].y = this.menugroup.children[2].y - .12 * (this.menugroup.children[2].y - 255);
    this.menugroup.children[3].y = this.menugroup.children[2].y;
    this.menugroup.children[0].y = this.menugroup.children[0].y - .12 * (this.menugroup.children[0].y - 255);
    this.menugroup.children[1].y = this.menugroup.children[0].y;
    if(Math.abs(this.menugroup.children[0].y-255) < 3){
        this.menugroup.children[0].y = 255;
        this.menugroup.children[4].y = 255;
        this.menugroup.children[2].y = 255;
        this.menugroup.children[0].inputEnabled = false;
        this.menugroup.children[2].inputEnabled = false;
        this.menugroup.children[4].inputEnabled = false;
        this.menucontracting = false;
        this.menugroup.children[6].scale.setTo(.7); this.menugroup.children[6].alpha = .6; this.menugroup.children[6].frame = 1;
        this.menugroup.children[7].scale.setTo(.7); this.menugroup.children[7].alpha = .6;
        for (var i = 0; i < 6; i++){
            this.menugroup.children[i].alpha = 0;
        }
        if(this.navgroup.children[0].alpha > 0){
            for(i=0; i<this.navgroup.children.length; i++){
                this.navgroup.children[i].alpha = 0;
            }
        }
        if(this.soundgroup.children[0].alpha > 0){
            for(i=0; i<this.soundgroup.children.length; i++){
                this.soundgroup.children[i].alpha = 0;
            }
        }
        if(this.cheatsgroup.children[0].alpha > 0){
            for(i=0; i<this.cheatsgroup.children.length; i++){
                this.cheatsgroup.children[i].alpha = 0;
            }
        }
        this.menulock = false;
    }
},
    
expandNav: function(){
    this.menu1sound.play();
    if(this.soundflag){
        this.soundflag = false;
        this.soundcontracting = true;
        for(var i = 0; i < this.soundgroup.length; i++){
            this.soundgroup.children[i].inputEnabled = false;
        }
    }
    if(this.cheatsflag){
        this.cheatsflag = false;
        this.cheatscontracting = true;
        for(var i = 0; i < this.cheatsgroup.length; i++){
            this.cheatsgroup.children[i].inputEnabled = false;
        }
    }
    this.navexpanding = true;
    this.navflag = true;
    for(var i = 0; i < this.navgroup.length; i++){
        this.navgroup.children[i].alpha = 1;
        this.navgroup.children[i].reset(this.menugroup.children[2].x, this.menugroup.children[2].y);
    }
},
    
navExpanding: function(){
    this.navgroup.children[0].x = this.navgroup.children[0].x - .12 * (this.navgroup.children[0].x - 375);
    this.navgroup.children[0].y = this.navgroup.children[0].y - .12 * (this.navgroup.children[0].y - 375);
    this.navgroup.children[1].x = this.navgroup.children[0].x; this.navgroup.children[1].y = this.navgroup.children[0].y;
    this.navgroup.children[2].x = this.navgroup.children[2].x - .12 * (this.navgroup.children[2].x - 500);
    this.navgroup.children[2].y = this.navgroup.children[2].y - .12 * (this.navgroup.children[2].y - 375);
    this.navgroup.children[3].x = this.navgroup.children[2].x; this.navgroup.children[3].y = this.navgroup.children[2].y;
    this.navgroup.children[4].x = this.navgroup.children[4].x - .12 * (this.navgroup.children[4].x - 625);
    this.navgroup.children[4].y = this.navgroup.children[4].y - .12 * (this.navgroup.children[4].y - 375);
    this.navgroup.children[5].x = this.navgroup.children[4].x; this.navgroup.children[5].y = this.navgroup.children[4].y;
    this.navgroup.children[6].x = this.navgroup.children[6].x - .12 * (this.navgroup.children[6].x - 375);
    this.navgroup.children[6].y = this.navgroup.children[6].y - .12 * (this.navgroup.children[6].y - 500);
    this.navgroup.children[7].x = this.navgroup.children[6].x; this.navgroup.children[7].y = this.navgroup.children[6].y;
    this.navgroup.children[8].x = this.navgroup.children[8].x - .12 * (this.navgroup.children[8].x - 500);
    this.navgroup.children[8].y = this.navgroup.children[8].y - .12 * (this.navgroup.children[8].y - 500);
    this.navgroup.children[9].x = this.navgroup.children[8].x; this.navgroup.children[9].y = this.navgroup.children[8].y;
    this.navgroup.children[10].x = this.navgroup.children[10].x - .12 * (this.navgroup.children[10].x - 625);
    this.navgroup.children[10].y = this.navgroup.children[10].y - .12 * (this.navgroup.children[10].y - 500);
    this.navgroup.children[11].x = this.navgroup.children[10].x; this.navgroup.children[11].y = this.navgroup.children[10].y;
    this.navgroup.children[12].x = this.navgroup.children[12].x - .12 * (this.navgroup.children[12].x - 375);
    this.navgroup.children[12].y = this.navgroup.children[12].y - .12 * (this.navgroup.children[12].y - 625);
    this.navgroup.children[13].x = this.navgroup.children[12].x; this.navgroup.children[13].y = this.navgroup.children[12].y;
    this.navgroup.children[14].x = this.navgroup.children[14].x - .12 * (this.navgroup.children[14].x - 500);
    this.navgroup.children[14].y = this.navgroup.children[14].y - .12 * (this.navgroup.children[14].y - 625);
    this.navgroup.children[15].x = this.navgroup.children[14].x; this.navgroup.children[15].y = this.navgroup.children[14].y;
    this.navgroup.children[16].x = this.navgroup.children[16].x - .12 * (this.navgroup.children[16].x - 625);
    this.navgroup.children[16].y = this.navgroup.children[16].y - .12 * (this.navgroup.children[16].y - 625);
    this.navgroup.children[17].x = this.navgroup.children[16].x; this.navgroup.children[17].y = this.navgroup.children[16].y;
    this.navgroup.children[18].x = this.navgroup.children[18].x - .12 * (this.navgroup.children[18].x - 500);
    this.navgroup.children[18].y = this.navgroup.children[18].y - .12 * (this.navgroup.children[18].y - 275);
    this.navgroup.children[19].x = this.navgroup.children[18].x; this.navgroup.children[19].y = this.navgroup.children[18].y;
    this.navgroup.children[20].x = this.navgroup.children[20].x - .12 * (this.navgroup.children[20].x - 850);
    this.navgroup.children[20].y = this.navgroup.children[20].y - .12 * (this.navgroup.children[20].y - 570);
    this.navgroup.children[21].x = this.navgroup.children[20].x; this.navgroup.children[21].y = this.navgroup.children[20].y;
    this.navgroup.children[22].x = this.navgroup.children[22].x - .12 * (this.navgroup.children[22].x - 850);
    this.navgroup.children[22].y = this.navgroup.children[22].y - .12 * (this.navgroup.children[22].y - 425);
    this.navgroup.children[23].x = this.navgroup.children[22].x; this.navgroup.children[23].y = this.navgroup.children[22].y;
   this.navgroup.children[24].x = this.navgroup.children[24].x - .12 * (this.navgroup.children[24].x - 850);
    this.navgroup.children[24].y = this.navgroup.children[24].y - .12 * (this.navgroup.children[24].y - 280);
    this.navgroup.children[25].x = this.navgroup.children[24].x; this.navgroup.children[25].y = this.navgroup.children[24].y;
    
    if(Math.abs(this.navgroup.children[0].x-375) < 3){
        this.navgroup.children[0].x = 375; this.navgroup.children[0].y = 375;
        this.navgroup.children[1].x = 375; this.navgroup.children[1].y = 375;
        this.navgroup.children[2].x = 500; this.navgroup.children[2].y = 375;
        this.navgroup.children[3].x = 500; this.navgroup.children[3].y = 375;
        this.navgroup.children[4].x = 625; this.navgroup.children[4].y = 375;
        this.navgroup.children[5].x = 625; this.navgroup.children[5].y = 375;
        this.navgroup.children[6].x = 375; this.navgroup.children[6].y = 500;
        this.navgroup.children[7].x = 375; this.navgroup.children[7].y = 500;
        this.navgroup.children[8].x = 500; this.navgroup.children[8].y = 500;
        this.navgroup.children[9].x = 500; this.navgroup.children[9].y = 500;
        this.navgroup.children[10].x = 625; this.navgroup.children[10].y = 500;
        this.navgroup.children[11].x = 625; this.navgroup.children[11].y = 500;
        this.navgroup.children[12].x = 375; this.navgroup.children[12].y = 625;
        this.navgroup.children[13].x = 375; this.navgroup.children[13].y = 625;
        this.navgroup.children[14].x = 500; this.navgroup.children[14].y = 625;
        this.navgroup.children[15].x = 500; this.navgroup.children[15].y = 625;
        this.navgroup.children[16].x = 625; this.navgroup.children[16].y = 625;
        this.navgroup.children[17].x = 625; this.navgroup.children[17].y = 625;
        this.navgroup.children[18].x = 500; this.navgroup.children[18].y = 275;
        this.navgroup.children[19].x = 500; this.navgroup.children[19].y = 275;
        this.navgroup.children[20].x = 850; this.navgroup.children[20].y = 570;
        this.navgroup.children[21].x = 850; this.navgroup.children[21].y = 570;
        this.navgroup.children[22].x = 850; this.navgroup.children[22].y = 425;
        this.navgroup.children[23].x = 850; this.navgroup.children[23].y = 425;
        this.navgroup.children[24].x = 850; this.navgroup.children[24].y = 280;
        this.navgroup.children[25].x = 850; this.navgroup.children[25].y = 280;
        
        this.navgroup.children[0].inputEnabled = true;
        this.navgroup.children[2].inputEnabled = true;
        this.navgroup.children[4].inputEnabled = true;
        this.navgroup.children[6].inputEnabled = true;
        this.navgroup.children[8].inputEnabled = true;
        this.navgroup.children[10].inputEnabled = true;
        this.navgroup.children[12].inputEnabled = true;
        this.navgroup.children[14].inputEnabled = true;
        this.navgroup.children[16].inputEnabled = true;
        this.navgroup.children[20].inputEnabled = true;
        this.navgroup.children[22].inputEnabled = true;
        this.navgroup.children[24].inputEnabled = true;
        
        this.navexpanding = false;
    }
},
    
navContracting: function(){
    for(var i = 0; i < this.navgroup.length; i++){
        this.navgroup.children[i].x = this.navgroup.children[i].x - .12 * (this.navgroup.children[i].x - this.menugroup.children[2].x);
        this.navgroup.children[i].y = this.navgroup.children[i].y - .12 * (this.navgroup.children[i].y - this.menugroup.children[2].y);
        this.navgroup.children[i].alpha = this.navgroup.children[i].alpha * .88;
    }
    if(Math.abs(this.navgroup.children[0].x-this.menugroup.children[2].x) < 3){
        for(var i = 0; i < this.navgroup.length; i++){
            this.navgroup.children[i].alpha = 0;
        }
        this.navcontracting = false;
    }
},
    
expandSound: function(){
    this.menu1sound.play();
    if(this.navflag){
        this.navflag = false;
        this.navcontracting = true;
        for(var i = 0; i < this.navgroup.length; i++){
            this.navgroup.children[i].inputEnabled = false;
        }
    }
    if(this.cheatsflag){
        this.cheatsflag = false;
        this.cheatscontracting = true;
        for(var i = 0; i < this.cheatsgroup.length; i++){
            this.cheatsgroup.children[i].inputEnabled = false;
        }
    }
    this.soundexpanding = true;
    this.soundflag = true;
    
    for(var i = 0; i < this.soundgroup.length; i++){
        this.soundgroup.children[i].alpha = 1;
        this.soundgroup.children[i].reset(this.menugroup.children[4].x, this.menugroup.children[4].y);
    }
},
    
soundExpanding: function(){
    this.soundgroup.children[0].x = this.soundgroup.children[0].x - .12 * (this.soundgroup.children[0].x - 700);
    this.soundgroup.children[0].y = this.soundgroup.children[0].y - .12 * (this.soundgroup.children[0].y - 315);
    this.soundgroup.children[1].x = this.soundgroup.children[1].x - .12 * (this.soundgroup.children[1].x - 475);
    this.soundgroup.children[1].y = this.soundgroup.children[1].y - .12 * (this.soundgroup.children[1].y - 315);
    this.soundgroup.children[2].x = this.soundgroup.children[1].x;
    this.soundgroup.children[2].y = this.soundgroup.children[1].y;
    this.soundgroup.children[3].x = this.soundgroup.children[3].x - .12 * (this.soundgroup.children[3].x - 925);
    this.soundgroup.children[3].y = this.soundgroup.children[3].y - .12 * (this.soundgroup.children[3].y - 315);
    this.soundgroup.children[4].x = this.soundgroup.children[3].x;
    this.soundgroup.children[4].y = this.soundgroup.children[3].y;
    this.soundgroup.children[5].x = this.soundgroup.children[5].x - .12 * (this.soundgroup.children[5].x - 700);
    this.soundgroup.children[5].y = this.soundgroup.children[5].y - .12 * (this.soundgroup.children[5].y - 450);
    this.soundgroup.children[6].x = this.soundgroup.children[6].x - .12 * (this.soundgroup.children[6].x - 475);
    this.soundgroup.children[6].y = this.soundgroup.children[6].y - .12 * (this.soundgroup.children[6].y - 450);
    this.soundgroup.children[7].x = this.soundgroup.children[6].x;
    this.soundgroup.children[7].y = this.soundgroup.children[6].y;
    this.soundgroup.children[8].x = this.soundgroup.children[8].x - .12 * (this.soundgroup.children[8].x - 925);
    this.soundgroup.children[8].y = this.soundgroup.children[8].y - .12 * (this.soundgroup.children[8].y - 450);
    this.soundgroup.children[9].x = this.soundgroup.children[8].x;
    this.soundgroup.children[9].y = this.soundgroup.children[8].y;
    this.soundgroup.children[10].x = this.soundgroup.children[10].x - .12 * (this.soundgroup.children[10].x - 700);
    this.soundgroup.children[10].y = this.soundgroup.children[10].y - .12 * (this.soundgroup.children[10].y - 585);
    this.soundgroup.children[11].x = this.soundgroup.children[11].x - .12 * (this.soundgroup.children[11].x - 475);
    this.soundgroup.children[11].y = this.soundgroup.children[11].y - .12 * (this.soundgroup.children[11].y - 585);
    this.soundgroup.children[12].x = this.soundgroup.children[11].x;
    this.soundgroup.children[12].y = this.soundgroup.children[11].y;
    this.soundgroup.children[13].x = this.soundgroup.children[13].x - .12 * (this.soundgroup.children[13].x - 925);
    this.soundgroup.children[13].y = this.soundgroup.children[13].y - .12 * (this.soundgroup.children[13].y - 585);
    this.soundgroup.children[14].x = this.soundgroup.children[13].x;
    this.soundgroup.children[14].y = this.soundgroup.children[13].y;
    this.soundgroup.children[15].x = this.soundgroup.children[15].x - .12 * (this.soundgroup.children[15].x - 325);
    this.soundgroup.children[15].y = this.soundgroup.children[15].y - .12 * (this.soundgroup.children[15].y - 315);
    this.soundgroup.children[16].x = this.soundgroup.children[15].x;
    this.soundgroup.children[16].y = this.soundgroup.children[15].y;
    this.soundgroup.children[17].x = this.soundgroup.children[17].x - .12 * (this.soundgroup.children[17].x - 325);
    this.soundgroup.children[17].y = this.soundgroup.children[17].y - .12 * (this.soundgroup.children[17].y - 450);
    this.soundgroup.children[18].x = this.soundgroup.children[17].x;
    this.soundgroup.children[18].y = this.soundgroup.children[17].y;
    this.soundgroup.children[19].x = this.soundgroup.children[19].x - .12 * (this.soundgroup.children[19].x - 325);
    this.soundgroup.children[19].y = this.soundgroup.children[19].y - .12 * (this.soundgroup.children[19].y - 585);
    this.soundgroup.children[20].x = this.soundgroup.children[19].x;
    this.soundgroup.children[20].y = this.soundgroup.children[19].y;
    this.soundgroup.children[23].x = this.soundgroup.children[23].x - .12 * (this.soundgroup.children[23].x - 700);
    this.soundgroup.children[23].y = this.soundgroup.children[23].y - .12 * (this.soundgroup.children[23].y - 585);
    
    if(Math.abs(this.soundgroup.children[15].x-325) < 3){
        this.soundgroup.children[0].x = 700; this.soundgroup.children[0].y = 315;
        this.soundgroup.children[1].x = 475; this.soundgroup.children[1].y = 315;
        this.soundgroup.children[2].x = 475; this.soundgroup.children[2].y = 315;
        this.soundgroup.children[3].x = 925; this.soundgroup.children[3].y = 315;
        this.soundgroup.children[4].x = 925; this.soundgroup.children[4].y = 315;
        this.soundgroup.children[5].x = 700; this.soundgroup.children[5].y = 450;
        this.soundgroup.children[6].x = 475; this.soundgroup.children[6].y = 450;
        this.soundgroup.children[7].x = 475; this.soundgroup.children[7].y = 450;
        this.soundgroup.children[8].x = 925; this.soundgroup.children[8].y = 450;
        this.soundgroup.children[9].x = 925; this.soundgroup.children[9].y = 450;
        this.soundgroup.children[10].x = 700; this.soundgroup.children[10].y = 585;
        this.soundgroup.children[11].x = 475; this.soundgroup.children[11].y = 585;
        this.soundgroup.children[12].x = 475; this.soundgroup.children[12].y = 585;
        this.soundgroup.children[13].x = 925; this.soundgroup.children[13].y = 585;
        this.soundgroup.children[14].x = 925; this.soundgroup.children[14].y = 585;
        this.soundgroup.children[15].x = 325; this.soundgroup.children[15].y = 315;
        this.soundgroup.children[16].x = 325; this.soundgroup.children[16].y = 315;
        this.soundgroup.children[17].x = 325; this.soundgroup.children[17].y = 450;
        this.soundgroup.children[18].x = 325; this.soundgroup.children[18].y = 450;
        this.soundgroup.children[19].x = 325; this.soundgroup.children[19].y = 585;
        this.soundgroup.children[20].x = 325; this.soundgroup.children[20].y = 585;
        this.soundgroup.children[21].x = 535 + 33 * musicvol; this.soundgroup.children[21].y = 315;
        this.soundgroup.children[22].x = 535 + 33 * sfxvol; this.soundgroup.children[22].y = 450;
        this.soundgroup.children[23].x = 700; this.soundgroup.children[23].y = 585;
        
        this.soundgroup.children[1].inputEnabled = true;
        this.soundgroup.children[3].inputEnabled = true;
        this.soundgroup.children[6].inputEnabled = true;
        this.soundgroup.children[8].inputEnabled = true;
        this.soundgroup.children[11].inputEnabled = true;
        this.soundgroup.children[13].inputEnabled = true;
        
        this.soundexpanding = false;
    }
},
    
soundContracting: function(){
    for(var i = 0; i < this.soundgroup.length; i++){
        this.soundgroup.children[i].x = this.soundgroup.children[i].x - .12 * (this.soundgroup.children[i].x - this.menugroup.children[4].x);
        this.soundgroup.children[i].y = this.soundgroup.children[i].y - .12 * (this.soundgroup.children[i].y - this.menugroup.children[4].y);
        this.soundgroup.children[i].alpha = this.soundgroup.children[i].alpha * .88;
    }
    if(Math.abs(this.soundgroup.children[16].x-this.menugroup.children[4].x) < 3){
        for(var i = 0; i < this.soundgroup.length; i++){
            this.soundgroup.children[i].alpha = 0;
        }
        this.soundcontracting = false;
    }
},
    
musicVolLeft: function(){
    if(musicvol > 0){
        this.soundgroup.children[21].x -= 33;
        musicvol -= 1;
        this.track0.volume = Math.pow(.6, 10-musicvol);
        if(track1unlocked){this.track1.volume = Math.pow(.6, 10-musicvol);}
        this.track2.volume = Math.pow(.6, 10-musicvol);
    }
    this.menu1sound.play();
},
    
musicVolRight: function(){
    if(musicvol < 10){
        this.soundgroup.children[21].x += 33;
        musicvol += 1;
        this.track0.volume = Math.pow(.6, 10-musicvol);
        if(track1unlocked){this.track1.volume = Math.pow(.6, 10-musicvol);}
        this.track2.volume = Math.pow(.6, 10-musicvol);
    }
    this.menu1sound.play();
},
    
sfxVolLeft: function(){
    if(sfxvol > 0){
        this.soundgroup.children[22].x -= 33;
        sfxvol -= 1;
        this.hitballsound.volume = sfxvol/10;
        this.materializesound.volume = sfxvol/10;
        this.teleportsound.volume = sfxvol/10;
        this.electronsound.volume = sfxvol/10;
        this.menu1sound.volume = sfxvol/10;
        this.menu2sound.volume = sfxvol/10;
    }
    this.menu1sound.play();
},
    
sfxVolRight: function(){
    if(sfxvol < 10){
        this.soundgroup.children[22].x += 33;
        sfxvol += 1;
        this.hitballsound.volume = sfxvol/10;
        this.materializesound.volume = sfxvol/10;
        this.teleportsound.volume = sfxvol/10;
        this.electronsound.volume = sfxvol/10;
        this.menu1sound.volume = sfxvol/10;
        this.menu2sound.volume = sfxvol/10;
    }
    this.menu1sound.play();
},
    
musicSelectLeft: function(){
    this.game.sound.stopAll();
    this.musicindex -= 1;
    if(this.musicindex < 0){this.musicindex = 3;}
    this.soundgroup.children[23].setText(this.musictext[this.musicindex]);
    switch(this.musicindex){
        case 0:{
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track0.loopFull(Math.pow(.6, 10-musicvol));
            break;}
        case 1:{
            if(track1unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track1.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;}
        case 2:{
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track2.loopFull(Math.pow(.6, 10-musicvol));
            break;
        }
        case 3:{
            if(track3unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                //this.track3.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;
        }
    }
    this.menu1sound.play();
    
},
    
musicSelectRight: function(){
    this.game.sound.stopAll();
    this.musicindex += 1;
    if(this.musicindex > 3){this.musicindex = 0;}
    this.soundgroup.children[23].setText(this.musictext[this.musicindex]);
    switch(this.musicindex){
        case 0:{
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track0.loopFull(Math.pow(.6, 10-musicvol));
            break;}
        case 1:{
            if(track1unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track1.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;}
        case 2:{
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track2.loopFull(Math.pow(.6, 10-musicvol));
            break;
        }
        case 3:{
            if(track3unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                //this.track3.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;
        }
    }
    this.menu1sound.play();
},
    
expandCheats: function(){
    this.menu1sound.play();
    if(this.navflag){
        this.navflag = false;
        this.navcontracting = true;
        for(var i = 0; i < this.navgroup.length; i++){
            this.navgroup.children[i].inputEnabled = false;
        }
    }
    if(this.soundflag){
        this.soundflag = false;
        this.soundcontracting = true;
        for(var i = 0; i < this.soundgroup.length; i++){
            this.soundgroup.children[i].inputEnabled = false;
        }
    }
    
    this.cheatsexpanding = true;
    this.cheatsflag = true;
    
    for(var i = 0; i < this.cheatsgroup.length; i++){
        this.cheatsgroup.children[i].alpha = 1;
        this.cheatsgroup.children[i].reset(this.menugroup.children[0].x, this.menugroup.children[0].y);
    }
},
    
cheatsExpanding: function(){
    this.cheatsgroup.children[0].x = this.cheatsgroup.children[0].x - .12 * (this.cheatsgroup.children[0].x - 325);
    this.cheatsgroup.children[0].y = this.cheatsgroup.children[0].y - .12 * (this.cheatsgroup.children[0].y - 315);
    this.cheatsgroup.children[1].x = this.cheatsgroup.children[0].x;
    this.cheatsgroup.children[1].y = this.cheatsgroup.children[0].y;
    this.cheatsgroup.children[2].x = this.cheatsgroup.children[2].x - .12 * (this.cheatsgroup.children[2].x - 500);
    this.cheatsgroup.children[2].y = this.cheatsgroup.children[2].y - .12 * (this.cheatsgroup.children[2].y - 315);
    this.cheatsgroup.children[3].x = this.cheatsgroup.children[2].x;
    this.cheatsgroup.children[3].y = this.cheatsgroup.children[2].y;
    this.cheatsgroup.children[4].x = this.cheatsgroup.children[4].x - .12 * (this.cheatsgroup.children[4].x - 750);
    this.cheatsgroup.children[4].y = this.cheatsgroup.children[4].y - .12 * (this.cheatsgroup.children[4].y - 315);
    this.cheatsgroup.children[5].x = this.cheatsgroup.children[4].x;
    this.cheatsgroup.children[5].y = this.cheatsgroup.children[4].y;
    this.cheatsgroup.children[6].x = this.cheatsgroup.children[6].x - .12 * (this.cheatsgroup.children[6].x - 325);
    this.cheatsgroup.children[6].y = this.cheatsgroup.children[6].y - .12 * (this.cheatsgroup.children[6].y - 450);
    this.cheatsgroup.children[7].x = this.cheatsgroup.children[6].x;
    this.cheatsgroup.children[7].y = this.cheatsgroup.children[6].y;
    this.cheatsgroup.children[8].x = this.cheatsgroup.children[8].x - .12 * (this.cheatsgroup.children[8].x - 500);
    this.cheatsgroup.children[8].y = this.cheatsgroup.children[8].y - .12 * (this.cheatsgroup.children[8].y - 450);
    this.cheatsgroup.children[9].x = this.cheatsgroup.children[8].x;
    this.cheatsgroup.children[9].y = this.cheatsgroup.children[8].y;
    this.cheatsgroup.children[10].x = this.cheatsgroup.children[10].x - .12 * (this.cheatsgroup.children[10].x - 750);
    this.cheatsgroup.children[10].y = this.cheatsgroup.children[10].y - .12 * (this.cheatsgroup.children[10].y - 450);
    this.cheatsgroup.children[11].x = this.cheatsgroup.children[10].x;
    this.cheatsgroup.children[11].y = this.cheatsgroup.children[10].y;
    this.cheatsgroup.children[12].x = this.cheatsgroup.children[12].x - .12 * (this.cheatsgroup.children[12].x - 325);
    this.cheatsgroup.children[12].y = this.cheatsgroup.children[12].y - .12 * (this.cheatsgroup.children[12].y - 585);
    this.cheatsgroup.children[13].x = this.cheatsgroup.children[12].x;
    this.cheatsgroup.children[13].y = this.cheatsgroup.children[12].y;
    this.cheatsgroup.children[14].x = this.cheatsgroup.children[14].x - .12 * (this.cheatsgroup.children[14].x - 500);
    this.cheatsgroup.children[14].y = this.cheatsgroup.children[14].y - .12 * (this.cheatsgroup.children[14].y - 585);
    this.cheatsgroup.children[15].x = this.cheatsgroup.children[14].x;
    this.cheatsgroup.children[15].y = this.cheatsgroup.children[14].y;
    this.cheatsgroup.children[16].x = this.cheatsgroup.children[16].x - .12 * (this.cheatsgroup.children[16].x - 750);
    this.cheatsgroup.children[16].y = this.cheatsgroup.children[16].y - .12 * (this.cheatsgroup.children[16].y - 585);
    this.cheatsgroup.children[17].x = this.cheatsgroup.children[16].x;
    this.cheatsgroup.children[17].y = this.cheatsgroup.children[16].y;
    
    if(Math.abs(this.cheatsgroup.children[0].x-325) < 3){
        this.cheatsgroup.children[0].reset(325, 315);
        this.cheatsgroup.children[1].reset(325, 315);
        this.cheatsgroup.children[2].reset(500, 315);
        this.cheatsgroup.children[3].reset(500, 315);
        this.cheatsgroup.children[4].reset(750, 315);
        this.cheatsgroup.children[5].reset(750, 315);
        this.cheatsgroup.children[6].reset(325, 450);
        this.cheatsgroup.children[7].reset(325, 450);
        this.cheatsgroup.children[8].reset(500, 450);
        this.cheatsgroup.children[9].reset(500, 450);
        this.cheatsgroup.children[10].reset(750, 450);
        this.cheatsgroup.children[11].reset(750, 450);
        this.cheatsgroup.children[12].reset(325, 585);
        this.cheatsgroup.children[13].reset(325, 585);
        this.cheatsgroup.children[14].reset(500, 585);
        this.cheatsgroup.children[15].reset(500, 585);
        this.cheatsgroup.children[16].reset(750, 585);
        this.cheatsgroup.children[17].reset(750, 585);

        if(bigcheatunlocked){
            this.cheatsgroup.children[2].inputEnabled = true;}
        if(slowcheatunlocked){
            this.cheatsgroup.children[8].inputEnabled = true;}
        if(freecheatunlocked){
            this.cheatsgroup.children[14].inputEnabled = true;} 
        
        this.cheatsexpanding = false;
    }
},
    
cheatsContracting: function(){
    for(var i = 0; i < this.cheatsgroup.length; i++){
      this.cheatsgroup.children[i].x = this.cheatsgroup.children[i].x - .12 * (this.cheatsgroup.children[i].x - this.menugroup.children[0].x);
      this.cheatsgroup.children[i].y = this.cheatsgroup.children[i].y - .12 * (this.cheatsgroup.children[i].y - this.menugroup.children[0].y);
        this.cheatsgroup.children[i].alpha = this.cheatsgroup.children[i].alpha * .88;
    }
    if(Math.abs(this.cheatsgroup.children[16].x-this.menugroup.children[0].x) < 3){
        for(var i = 0; i < this.cheatsgroup.length; i++){
            this.cheatsgroup.children[i].alpha = 0;
        }
        this.cheatscontracting = false;
    }
},
    
slowCheatActivate: function(){
    this.menu1sound.play();
    if(this.slowcheat){
        this.slowcheat = false;
        this.cheatsgroup.children[9].setText("OFF");}
    else{
        this.slowcheat = true;
        this.cheatsgroup.children[9].setText("ON");}
},
    
bigCheatActivate: function(){
    this.menu1sound.play();
    if(this.bigcheat){
        this.bigcheat = false;
        this.ball.body.setCircle(20, 0, 0, 0);
        this.balloverlay.scale.setTo(.15);
        this.cheatsgroup.children[3].setText("OFF");}
    else{
        this.bigcheat = true;
        this.ball.body.setCircle(30, 0, 0, 0);
        this.balloverlay.scale.setTo(.225);
        this.cheatsgroup.children[3].setText("ON");}
},
    
freeCheatActivate: function(){
    this.menu1sound.play();
    if(this.freecheat){
        this.freecheat = false;
        this.cheatsgroup.children[15].setText("OFF");}
    else{
        this.freecheat = true;
        this.cheatsgroup.children[15].setText("ON");}
},
    
generalAnimation: function(){
    this.animationtimer += 1;
    this.hole.angle += 1.5;
	if(this.animationtimer > 359){
		this.animationtimer = 0;
	}
	if(!(this.animationtimer%30)){
        for (var i = 0; i < this.electrongroup.length; i++){
            this.electrongroup.children[i].y += 2;}
    }
	if(!(this.animationtimer%60)){
        for (var i = 0; i < this.electrongroup.length; i++){
            this.electrongroup.children[i].y -= 4;
            if(i<this.electrongroup.length/2){this.electrongroup.children[i].angle += 30;}}
	}
},
    
collisionAnimation: function(){
    i = 0;
    while(i < 3){
        collision = this.collisiongroup.children[i];
        if(collision.timer){
            collision.timer -= 1;
            
            switch(collision.mode){
                case 1: {
                    collision.alpha -= .031;
                    collision.tint -= 131584;
                    collision.scale.x = (1 - .08 * Math.abs(collision.timer - 10));
                    collision.scale.y = collision.scale.x * 1.3;
                    break;
                }
                case 2: {
                    collision.alpha -= .015;
                    //collision.tint += 394752;
                    collision.scale.x = .3 + .001 * this.ballspeed - .04 * Math.abs(collision.timer - 10);
                    collision.scale.y = collision.scale.x * 1.3;
                    break;
                }
		      case 3: {
                collision.alpha -= .031;
                collision.scale.x = (.4 - .03 * Math.abs(collision.timer - 10));
                collision.scale.y = collision.scale.x * 1.3;
                break;
            }
            }
            if(!(collision.timer)){
                collision.alpha = 0;}
        }
        i += 1;
    }
},

ballTrail: function(){
	if(this.ballspeed > 35){
        this.balleffect1.angle = Math.atan2(this.ball.body.velocity.y, this.ball.body.velocity.x) / 3.1416 * 180;
    }
},
    
electronCollision: function(){
    for(var i = this.electrongroup.length/2; i < this.electrongroup.length; i++){
        electron = this.electrongroup.children[i];
        if(this.checkOverlap(this.ball, electron)){
            this.electronsound.play();
            this.goal -= 1;
            this.collisionindex += 1;
            this.collisiongroup.children[this.collisionindex%3].x = electron.x;
            this.collisiongroup.children[this.collisionindex%3].y = electron.y;
            this.collisiongroup.children[this.collisionindex%3].tint = 0xFFFF00;
            this.collisiongroup.children[this.collisionindex%3].mode = 1;
            this.collisiongroup.children[this.collisionindex%3].timer = 15;
            this.collisiongroup.children[this.collisionindex%3].scale.setTo(.1);
            this.collisiongroup.children[this.collisionindex%3].alpha = .6;
            this.collisiongroup.children[this.collisionindex%3].angle = this.angle + 90;
            electron.alpha = 0; electron.x = -400; electron.y = -400;
            this.electrongroup.children[i-this.electrongroup.length/2].x = -400; 
            this.electrongroup.children[i-this.electrongroup.length/2].y = -400;
        }
    }
    
},

holeCollision: function(){
    if(this.despawn){return;}
	this.getAngle(this.ball, this.hole, 2);
	this.getDistance(this.balloverlay, this.hole, 2);
	if(this.holedis < 45){
		this.ball.body.force.x = Math.cos(this.holerad) * (100 - this.holedis);
		this.ball.body.force.y = Math.sin(this.holerad) * (100 - this.holedis);}
	if(!(this.ball.inpit)){
		if(this.holedis < 15){
			if(this.ballspeed < 370){
				this.savespin = this.ballspeed;
				this.ballspeed = 0;
				this.ball.inpit = true;
                this.teleportsound.play();
				this.ball.body.velocity.x = 0;
				this.ball.body.velocity.y = 0;
				this.ball.body.reset(-200,-200);
			}
		}
	}
},
    
resetBall: function(){
    this.balloverlay.x = this.balloverlay.x - .08 * (this.balloverlay.x - this.hole.x);
    this.balloverlay.y = this.balloverlay.y - .08 * (this.balloverlay.y - this.hole.y);
    this.balloverlay.scale.setTo(.08 + this.holedis / 15 * .07);
    this.balloverlay.alpha = .2 + this.holedis / 15 * .8;
	this.balloverlay.tint -= 394758;
    if(this.balloverlay < this.hole.x){
        this.balloverlay.angle -= .03 * this.savespin;}
    else{
        this.balloverlay.angle += .03 * this.savespin;}
    
    if(Math.abs(this.balloverlay.x - this.hole.x) < 2){
        if(Math.abs(this.balloverlay.y - this.hole.y) < 2){
            if(this.goal){
                this.ball.inpit = false;
                this.balloverlay.x = this.ball.spawnx; this.balloverlay.y = this.ball.spawny;
                this.balloverlay.scale.setTo(.15);
                if(this.bigcheat){
                    this.balloverlay.scale.setTo(.225);}
                this.ball.body.reset(this.ball.spawnx, this.ball.spawny);
                this.ball.body.velocity.x = 0;
                this.ball.body.velocity.y = 0;
                this.ball.body.force.x = 2000;
                this.balloverlay.alpha = .1;
                this.balloverlay.tint = 0x000000;
                this.materializesound.play();
                this.ball.respawning = true;}
            else{
                this.spawnRoom();}
        }
    }
},
    
ballSpawn: function(){
    this.ball.idle = 0;
    this.balloverlay.alpha += .02;
	this.balloverlay.tint += 328965;
    if(this.hole.alpha < .97){
        this.hole.alpha += .022;
        this.pad.alpha += .022;
    }
    if(this.balloverlay.alpha > .98){
        this.ball.respawning = false;}
},

bgUpdate: function(){
    if(this.despawn){return;}
    if(this.bgcounter){
        if(this.bgcounter > 809){
            this.squares.alpha += .005;
            this.squares2.alpha += .005;
        }
        else if(this.bgcounter > 708){
            if(this.bgcounter < 809){
                this.squares.alpha -= .005;
                this.squares2.alpha -= .005;
            }
        }
        this.bgcounter -= 1;
    }
    else{
        this.bgcounter = 909;
    }
    
    
    for(var i=0; i<3; i++){
        line = this.linegroup.children[i];
        if(!(line.timer)){
            line.timer = 200 + Math.floor(Math.random() * 300);
            mode = -.6 + .1 * Math.floor(Math.random() * 13);
            if(line.speed > mode){line.speed -= .1;}
            else if(line.speed < mode){line.speed += .1;}
        }
        line.y += line.speed;
        if(line.y > 640){line.y = 260;}
        else if(line.y < 260){line.y = 640;}
        line.timer -= 1;
    }
    for(var i=3; i<8; i++){
        line = this.linegroup.children[i];
        if(!(line.timer)){
            line.timer = 200 + Math.floor(Math.random() * 300);
            mode = -.6 + .1 * Math.floor(Math.random() * 13);
            if(line.speed > mode){line.speed -= .1;}
            else if(line.speed < mode){line.speed += .1;}
        }
        line.x += line.speed;
        if(line.x > 997){line.x = 303;}
        else if(line.x < 303){line.x = 997;}
        line.timer -= 1;
    }
    
    this.scoretext.y = this.linegroup.children[0].y - 17;
    this.scoretext.x = this.linegroup.children[3].x + 7;
    this.stroketext.y = this.linegroup.children[1].y - 17;
    this.stroketext.x = this.linegroup.children[4].x + 7;
    
     switch(this.boundarymode){
		case 0:{
			this.boundarygroup.children[0].y += 2;
			this.boundarygroup.children[0].scale.x -= .04;
			this.boundarygroup.children[1].y -= 2;
			this.boundarygroup.children[1].scale.x -= .04;
			this.boundarygroup.children[2].x += 2;
			this.boundarygroup.children[2].scale.x -= .04;
			this.boundarygroup.children[3].x -= 2;
			this.boundarygroup.children[3].scale.x -= .04;
			this.boundarygroup.children[4].x += 2; this.boundarygroup.children[4].y += 2;
			this.boundarygroup.children[5].x -= 2; this.boundarygroup.children[5].y += 2;
			this.boundarygroup.children[6].x -= 2; this.boundarygroup.children[6].y -= 2;
			this.boundarygroup.children[7].x += 2; this.boundarygroup.children[7].y -= 2;
			if(this.boundarygroup.children[0].y > 190){this.boundarymode = 1;}
			break;
		}
		case 1:{
			this.boundarygroup.children[0].scale.y -= 2;
			this.boundarygroup.children[1].scale.y -= 2;
			this.boundarygroup.children[2].scale.y -= 2;
			this.boundarygroup.children[3].scale.y -= 2;
			this.boundarygroup.children[4].scale.x -= 2; this.boundarygroup.children[4].scale.y -= 2;
			this.boundarygroup.children[5].scale.x -= 2; this.boundarygroup.children[5].scale.y -= 2;
			this.boundarygroup.children[6].scale.x -= 2; this.boundarygroup.children[6].scale.y -= 2
			this.boundarygroup.children[7].scale.x -= 2; this.boundarygroup.children[7].scale.y -= 2;
			if(this.boundarygroup.children[0].scale.y < 3){
				this.boundarygroup.children[4].alpha = 0; this.boundarygroup.children[5].alpha = 0;
				this.boundarygroup.children[6].alpha = 0; this.boundarygroup.children[7].alpha = 0;
				this.boundarygroup.children[0].scale.x = 9.14;
				this.boundarygroup.children[1].scale.x = 9.14;
				this.boundarygroup.children[2].scale.x = 5.14;
				this.boundarygroup.children[3].scale.x = 5.14;
				this.boundarygroup.children[0].angle += 180;
				this.boundarygroup.children[1].angle += 180;
				this.boundarygroup.children[2].angle += 180;
				this.boundarygroup.children[3].angle += 180;
				this.boundarymode = 2;
			}
			break;
		}
		case 2:{
			this.boundarygroup.children[0].y -= 2;
			this.boundarygroup.children[1].y += 2;
			this.boundarygroup.children[2].x -= 2;
			this.boundarygroup.children[3].x += 2;
			this.boundarygroup.children[0].scale.x += .04;
			this.boundarygroup.children[1].scale.x += .04;
			this.boundarygroup.children[2].scale.x += .04;
			this.boundarygroup.children[3].scale.x += .04;
			this.boundarygroup.children[0].scale.y += 2;
			this.boundarygroup.children[1].scale.y += 2;
			this.boundarygroup.children[2].scale.y += 2;
			this.boundarygroup.children[3].scale.y += 2;
			if(this.boundarygroup.children[0].scale.y == 60){this.boundarymode = 3;}
			break;
		}
		case 3:{
			this.boundarygroup.children[0].y -= 2;
			this.boundarygroup.children[1].y += 2;
			this.boundarygroup.children[2].x -= 2;
			this.boundarygroup.children[3].x += 2;
			this.boundarygroup.children[0].scale.x += .04;
			this.boundarygroup.children[1].scale.x += .04;
			this.boundarygroup.children[2].scale.x += .04;
			this.boundarygroup.children[3].scale.x += .04;
			if(this.boundarygroup.children[0].y == -120){
				this.boundarygroup.children[4].alpha = 1; this.boundarygroup.children[5].alpha = 1;
				this.boundarygroup.children[6].alpha = 1; this.boundarygroup.children[7].alpha = 1;
				this.boundarygroup.children[4].reset(0,0); this.boundarygroup.children[5].reset(1300,0);
				this.boundarygroup.children[6].reset(1300,900); this.boundarygroup.children[7].reset(0,900);
				this.boundarygroup.children[4].scale.setTo(60); this.boundarygroup.children[5].scale.setTo(60);
				this.boundarygroup.children[6].scale.setTo(60); this.boundarygroup.children[7].scale.setTo(60);
				this.boundarygroup.children[0].reset(650, 0);
				this.boundarygroup.children[1].reset(650, 900);
				this.boundarygroup.children[2].reset(0, 450);
				this.boundarygroup.children[3].reset(1300, 450);
				this.boundarygroup.children[0].scale.setTo(13, 60);
				this.boundarygroup.children[1].scale.setTo(13, 60);
				this.boundarygroup.children[2].scale.setTo(9, 60);
				this.boundarygroup.children[3].scale.setTo(9, 60);
				this.boundarygroup.children[0].angle -= 180;
				this.boundarygroup.children[1].angle -= 180;
				this.boundarygroup.children[2].angle -= 180;
				this.boundarygroup.children[3].angle -= 180;
				this.boundarymode = 0;
			}
			break;
		}
	}
},
    
squareUpdate: function(){
    if(this.ball.idle > 84){return;}
    if(this.ball.idle > 42){this.squareSettle(); return;}
    this.squareindex += 1;
    if(this.squareindex > 41){this.squareindex = 0;}
	
	this.squaresgroup.children[this.squareindex].alpha = 1;
    
    if( (Math.round(this.ball.x) - 5) % 10 >= 5 ){this.ball.snapx = Math.round(this.ball.x) + 10 - Math.round(this.ball.x) % 10;}
    else{this.ball.snapx = Math.round(this.ball.x) + 5 - Math.round(this.ball.x) % 5;}
     if( (Math.round(this.ball.y) - 5) % 10 >= 5 ){this.ball.snapy = Math.round(this.ball.y) + 10 - Math.round(this.ball.y) % 10;}
    else{this.ball.snapy = Math.round(this.ball.y) + 5 - Math.round(this.ball.y) % 5;}
    
	distx = Math.abs(this.squaresgroup.children[this.squareindex].x - this.ball.x);
	disty = Math.abs(this.squaresgroup.children[this.squareindex].y - this.ball.y);
	if((distx < 20) && (disty < 20)){return;}
    
    corner = Math.floor(Math.random() * 4);
	switch(corner){
		case 0:{this.spawnUpLeft(); return}
		case 1:{this.spawnUpRight(); return;}
		case 2:{this.spawnDownLeft(); return;}
		case 3:{this.spawnDownRight(); return;}
	}
},
    
squareSettle: function(){
    this.squareindex += 1;
    if(this.squareindex > 41){this.squareindex = 0;}
    
    if(this.checkOccupancy2()){
        if( (Math.round(this.ball.x) - 5) % 10 >= 5 ){this.ball.snapx = Math.round(this.ball.x) + 10 - Math.round(this.ball.x) % 10;}
        else{this.ball.snapx = Math.round(this.ball.x) + 5 - Math.round(this.ball.x) % 5;}
        if( (Math.round(this.ball.y) - 5) % 10 >= 5 ){this.ball.snapy = Math.round(this.ball.y) + 10 - Math.round(this.ball.y) % 10;}
        else{this.ball.snapy = Math.round(this.ball.y) + 5 - Math.round(this.ball.y) % 5;}
        
        this.squaresgroup.children[this.squareindex].alpha = 1;
        
        distx = Math.abs(this.squaresgroup.children[this.squareindex].x - this.ball.x);
        disty = Math.abs(this.squaresgroup.children[this.squareindex].y - this.ball.y);
        if((distx < 20) && (disty < 20)){return;}
    
        corner = Math.floor(Math.random() * 4);
        switch(corner){
            case 0:{this.spawnUpLeft(); return}
            case 1:{this.spawnUpRight(); return;}
            case 2:{this.spawnDownLeft(); return;}
            case 3:{this.spawnDownRight(); return;}
        }
    }
},
    
spawnOn: function(inx, iny){
	coordx = this.ball.snapx - 40 + inx * 10;
	coordy = this.ball.snapy - 40 + iny * 10;
	this.squaresgroup.children[this.squareindex].reset(coordx, coordy);
},
    
checkOccupancy2: function(){
    for(var i = 0; i < this.squaresgroup.length; i++){
		if(this.squaresgroup.children[i].x == this.squaresgroup.children[this.squareindex].x - 10){
			if(this.squaresgroup.children[i].y == this.squaresgroup.children[this.squareindex].y){
				return 0;
			}
		}
        if(this.squaresgroup.children[i].x == this.squaresgroup.children[this.squareindex].x + 10){
			if(this.squaresgroup.children[i].y == this.squaresgroup.children[this.squareindex].y){
				return 0;
			}
		}
        if(this.squaresgroup.children[i].x == this.squaresgroup.children[this.squareindex].x){
			if(this.squaresgroup.children[i].y == this.squaresgroup.children[this.squareindex].y - 10){
				return 0;
			}
		}
        if(this.squaresgroup.children[i].x == this.squaresgroup.children[this.squareindex].x){
			if(this.squaresgroup.children[i].y == this.squaresgroup.children[this.squareindex].y + 10){
				return 0;
			}
		}
	}
    return 1;
},
    
checkOccupancy: function(inx, iny){
	coordx = this.ball.snapx - 40 + inx * 10;
	coordy = this.ball.snapy - 40 + iny * 10;
    if(coordx < 220){
        if(coordx > 190){
            this.squaresgroup.children[this.squareindex].alpha = 0; return 1;}}
    if(coordy < 220){
        if(coordx > 190){
            this.squaresgroup.children[this.squareindex].alpha = 0; return 1;}}
    if(coordx > 1080){
        if(coordx < 1110){
            this.squaresgroup.children[this.squareindex].alpha = 0; return 1;}}
    if(coordy > 680){
        if(coordy < 710){
        this.squaresgroup.children[this.squareindex].alpha = 0; return 1;}}
	for(var i = 0; i < this.squaresgroup.length; i++){
		if(this.squaresgroup.children[i].x == coordx){
			if(this.squaresgroup.children[i].y == coordy){
				return 0;
			}
		}
	}
	return 1;
},
    
spawnUpLeft: function(){
    
    spawnx = 3;
	spawny = 3;
	counter = 7;
    
	while(counter){
		if(this.checkOccupancy(spawnx, spawny)){
			this.spawnOn(spawnx, spawny);
			return;
		}
		else{
			dir = Math.floor(Math.random() * 2);
			if(dir){
				if(spawnx){
					spawnx -= 1;
				}
				else{
					spawny -= 1;
				}
			}
			else{
				if(spawny){
					spawny -= 1;
				}
				else{
					spawnx -= 1;
				}
			}
		}
		counter -= 1;
	}
	this.squareindex -= 1;
	if(this.squareindex == -1){this.squareindex = 41;}
	this.squareUpdate();
},

spawnUpRight: function(){
	spawnx = 4;
	spawny = 3;
	counter = 7;
	
	while(counter){
		if(this.checkOccupancy(spawnx, spawny)){
			this.spawnOn(spawnx, spawny);
			return;
		}
		else{
			dir = Math.floor(Math.random() * 2);
			if(dir){
				if(spawnx < 7){
					spawnx += 1;
				}
				else{
					spawny -= 1;
				}
			}
			else{
				if(spawny){
					spawny -= 1;
				}
				else{
					spawnx += 1;
				}
			}
		}
		counter -= 1;
	}
	this.squareindex -= 1;
	if(this.squareindex == -1){this.squareindex = 41;}
	this.squareUpdate();
},

spawnDownRight: function(){
	spawnx = 4;
	spawny = 4;
	counter = 7;
	
	while(counter){
		if(this.checkOccupancy(spawnx, spawny)){
			this.spawnOn(spawnx, spawny);
			return;
		}
		else{
			dir = Math.floor(Math.random() * 2);
			if(dir){
				if(spawnx < 7){
					spawnx += 1;
				}
				else{
					spawny += 1;
				}
			}
			else{
				if(spawny < 7){
					spawny += 1;
				}
				else{
					spawnx += 1;
				}
			}
		}
		counter -= 1;
	}
	this.squareindex -= 1;
	if(this.squareindex == -1){this.squareindex = 41;}
	this.squareUpdate();
},

spawnDownLeft: function(){
	spawnx = 3;
	spawny = 4;
	counter = 7;
	
	while(counter){
		if(this.checkOccupancy(spawnx, spawny)){
			this.spawnOn(spawnx, spawny);
			return;
		}
		else{
			dir = Math.floor(Math.random() * 2);
			if(dir){
				if(spawnx){
					spawnx -= 1;
				}
				else{
					spawny += 1;
				}
			}
			else{
				if(spawny < 7){
					spawny += 1;
				}
				else{
					spawnx -= 1;
				}
			}
		}
		counter -= 1;
	}
	this.squareindex -= 1;
	if(this.squareindex == -1){this.squareindex = 41;}
	this.squareUpdate();
},
    
ballAnimation: function(){
    if(this.ball.inpit){return;}
    if(this.ball.inactive){return;}
	this.balloverlay.x = this.ball.x;
	this.balloverlay.y = this.ball.y;
	this.ballspeed = this.getHype(this.ball.body.velocity.x, this.ball.body.velocity.y);
	if(this.ball.body.velocity.x > 0){
		this.balloverlay.angle += .03 * this.ballspeed;}
	else if(this.ball.body.velocity.x < 0){
		this.balloverlay.angle -= .03 * this.ballspeed;}
	if(this.ballspeed < 14){
        this.ball.idle += 1;
		this.ball.body.velocity.x = 0;
		this.ball.body.velocity.y = 0;}
},

ballBounce: function(){
    if(!(this.ball.inactive)){if(!(this.ball.inpit)){
        this.speedvolmod = this.ballspeed / 2400;
        if(this.speedvolmod > 1){this.speedvolmod = 1;}
        this.soundswitch = !(this.soundswitch);
        if(this.soundswitch){
            this.hitwallsound.volume = this.speedvolmod*sfxvol/10;
            this.hitwallsound.play();}
        else{
            this.hitwallsound2.volume = this.speedvolmod*sfxvol/10;
            this.hitwallsound2.play();}
        }}
    this.collisiongroup.children[this.collisionindex%3].x = this.ball.x + 20 * Math.cos(this.balleffect1.angle / 180 * 3.1416);
    this.collisiongroup.children[this.collisionindex%3].y = this.ball.y + 20 * Math.sin(this.balleffect1.angle / 180 * 3.1416);
    this.collisiongroup.children[this.collisionindex%3].tint = 0x00FF00;
    this.collisiongroup.children[this.collisionindex%3].mode = 2;
    this.collisiongroup.children[this.collisionindex%3].timer = 15;
    this.collisiongroup.children[this.collisionindex%3].scale.setTo(.001 * this.ballspeed);
    this.collisiongroup.children[this.collisionindex%3].alpha = .36;
    this.collisiongroup.children[this.collisionindex%3].angle = this.angle + 90;
},
    
aimShot: function(){
    if(this.freecheat){}
    else if(this.ballspeed){return;}
    if(this.menulock){return;}
	if(this.ball.inpit){return;}
    if(this.ball.inactive){return;}
    if(this.slowcheat){
		if(this.screen == 0){
			this.objectgroup.children[0].body.rotateRight(5); //jump
		}
        this.slowmode = true;}
	this.aimactive = true;
	this.getAngle(this.input, this.ball, 1);
    this.getDistance(this.ball, this.input, 1);
	this.distance -= 30;
    if(this.distance < 10){
        this.crossout.x = this.ball.x;
        this.crossout.y = this.ball.y;
        if(!(this.rangeflag)){
            this.rangeflag = true;
            this.shotarrow.x = -300; this.shotarrow.y = -300;
            this.sabody.x = -300; this.sabody.y = -300;
            this.shottext.alpha = 0;
            this.crossout.alpha = 1;
        }
    }
    else{
        if(this.rangeflag){
            this.rangeflag = false;
            this.crossout.alpha = 0;
        }
        this.shotarrow.angle = this.angle;
        this.shotarrow.x = this.ball.x - 16 * Math.cos(this.radians);
        this.shotarrow.y = this.ball.y - 16 * Math.sin(this.radians);
        this.sabody.angle = this.angle;
        this.sabody.x = this.ball.x - 38 * Math.cos(this.radians);
        this.sabody.y = this.ball.y - 38 * Math.sin(this.radians);
        if(this.distance > 500){this.distance = 500;}
        this.sabody.scale.x = this.distance / 20;
        
        this.shottext.alpha = 1;
        this.shottext.x = this.ball.x - 45 * Math.cos(this.radians + 3.14);
        this.shottext.y = this.ball.y - 45 * Math.sin(this.radians + 3.14);
        this.shottext.setText(Math.floor(this.distance) + '\n' + Math.floor(this.angle));
    
        if(this.input.x < 100){
            this.camfocus.x = 450 + this.input.x * 2.1;}
        else if(this.input.x > 800){
            this.camfocus.x = 650 + (this.input.x - 800) * 2.1;}
        else{this.camfocus.x = 650;}
        if(this.input.y < 100){
            this.camfocus.y = 250 + this.input.y * 2.1;}
        else if(this.input.y > 400){
            this.camfocus.y = 450 + (this.input.y-400) * 2.1;}
        else{this.camfocus.y = 450;}
        
        if(this.sabody.scale.x < 1){this.sabody.scale.x = 1;}
    }
},

fireShot: function(){
    if(this.menulock){return;}
	if(this.aimactive){
        this.ball.idle = 0;
		if(this.slowmode){
			this.objectgroup.children[0].body.rotateRight(20);
			this.slowmode = false;
		}
        this.slowcounter = 0;
		this.aimactive = false;
        this.camsnapback = true;
        if(this.rangeflag){
            this.crossout.alpha = 0;}
        else{
            this.speedvolmod = this.distance / 500;
            this.hitballsound.volume = this.speedvolmod*sfxvol/10;
            this.hitballsound.play();
            this.stroke += 1;
            this.stroketext.setText("STROKE: " + this.stroke);
            this.ball.body.velocity.x = (3.1 * this.distance + 10) * Math.cos(this.radians);
            this.ball.body.velocity.y = (3.1 * this.distance + 10) * Math.sin(this.radians);}
		this.shotarrow.x = -100; 
		this.shotarrow.y = -100;
		this.sabody.x = -100;
		this.sabody.y = -100;
		this.sabody.scale.x = 1;
        this.shottext.alpha = 0;
	}
},
    
cameraReturn: function(){
    this.camfocus.x = this.camfocus.x - .12 * (this.camfocus.x - 650);
    this.camfocus.y = this.camfocus.y - .12 * (this.camfocus.y - 450);
    if(Math.abs(this.camfocus.x-650) < 3){
        if(Math.abs(this.camfocus.y-450) < 3){
            this.camfocus.x = 650; this. camfocus.y = 450;
            this.camsnapback = false;
        }
    }
},
    
exitGame: function(){
    this.game.sound.stopAll();
    this.state.start('Menu', true, false);
},
    
completeGame: function(){
    this.state.start('Complete', true, false);
},
	
getAngle: function(obj1, obj2, subject){
	if(subject == 1){
		this.radians = Math.atan2(obj2.y - obj1.y - (this.camfocus.y - 250), obj2.x - obj1.x - (this.camfocus.x - 450));
		this.angle = this.radians / 3.1416 * 180;}
	else if(subject == 2){
		this.holerad = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
		this.holeang = this.holerad / 3.1416 * 180;}
    else if(subject == 3){
        radians = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        return radians;}
},
    
getDegrees: function(rads){
    degrees = rads / 3.1416 * 180;
    return degrees;
},

getHype: function(dim1, dim2){
	var y = Math.pow(dim1, 2);
	var x = Math.pow(dim2, 2);
	return Math.sqrt(x + y);
},

getDistance: function(obj1, obj2, subject){
	if(subject == 1){
		var y = Math.pow((obj2.y - obj1.y - 250 + this.camfocus.y), 2);
		var x = Math.pow((obj2.x - obj1.x - 450 + this.camfocus.x), 2);
		this.distance = Math.sqrt(x + y);}
	else if(subject == 2){
		var y = Math.pow((obj2.y - obj1.y), 2);
		var x = Math.pow((obj2.x - obj1.x), 2);
		this.holedis = Math.sqrt(x + y);}
    else if(subject == 3){
        var y = Math.pow((obj2.y - obj1.y), 2);
		var x = Math.pow((obj2.x - obj1.x), 2);
        distance = Math.sqrt(x + y);
        return distance;
    }
},
    
checkOverlap: function(spriteA, spriteB){
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
},
    
despawnUpdate: function(){
    this.ball.idle = 0;
    this.darkoverlay.alpha += .01;
    
    this.star.scale.x += .015;
    this.star.scale.y += .015;
    this.star.alpha += .008;
    this.star.counter += 1;
    if(!(this.star.counter % 4)){
        rnd = Math.floor(Math.random() * 180) - 90;
        this.star.angle += rnd;
    }
    
    for(var i=0; i<this.objectgroup.length; i++){
        object = this.objectgroup.children[i];
        rads = this.getAngle(object, this.camfocus, 3);
        degrees = this.getDegrees(rads);
        dist = this.getDistance(object, this.camfocus, 3);
        object.body.x -= (3 + 15 * dist/400) * Math.cos(rads);
        object.body.y -= (3 + 15 * dist/400) * Math.sin(rads);
        object.scale.x += .04; object.scale.y += .04;
    }
    for(i=0; i<this.specialgroup.length; i++){
        object = this.specialgroup.children[i];
        rads = this.getAngle(object, this.camfocus, 3);
        degrees = this.getDegrees(rads);
        dist = this.getDistance(object, this.camfocus, 3);
        object.x -= (3 + 15 * dist/400) * Math.cos(rads);
        object.y -= (3 + 15 * dist/400) * Math.sin(rads);
        object.scale.x += .04; object.scale.y += .04;
    }
    for(i=0; i<this.linegroup.length; i++){
        line = this.linegroup.children[i];
        line.alpha = 1;
        line.scale.x += 1; line.scale.y += .04;
        dist = this.getDistance(line, this.camfocus, 3);
        rads = this.getAngle(line, this.camfocus, 3);
        degrees = this.getDegrees(rads);
        if(i < 3){
            line.y -= (1.1 * line.scale.y + 2 * dist/400) * Math.sin(rads);}
        else{
            line.x -= (1.1 * line.scale.y + 2 * dist/400) * Math.cos(rads);}
    }
    this.bg1.scale.x += .007; this.bg1.scale.y += .007;
    this.bg2.scale.x += .007; this.bg2.scale.y += .007;
    rads = this.getAngle(this.hole, this.camfocus, 3);
    degrees = this.getDegrees(rads);
    dist = this.getDistance(this.hole, this.camfocus, 3);
    this.hole.x -= (3 + 15 * dist/400) * Math.cos(rads);
    this.hole.y -= (3 + 15 * dist/400) * Math.sin(rads);
    this.hole.scale.x += .04; this.hole.scale.y += .04;
    this.pad.reset(this.hole.x, this.hole.y);
    this.pad.scale.x += .04; this.pad.scale.y += .04;
    
    if(this.darkoverlay.alpha > .97){
        this.shadowfilter.alpha = .9;
        this.darkoverlay.alpha = 1;
        this.despawn = false;
        this.bg1.scale.setTo(.01);
        this.bg2.scale.setTo(.01);
        this.objectgroup.callAll('kill');
        this.objectgroup.removeAll();
        this.specialgroup.callAll('kill');
        this.specialgroup.removeAll();
        this.spawntimer = 80;
        this.hole.alpha = 0;
        this.hole.scale.setTo(1);
        this.pad.scale.setTo(1);
        this.pad.alpha = 0;
        for(i=0; i < this.linegroup.length; i++){
            this.linegroup.children[i].alpha = 0;
        }
        this.bgcounter = 700;
        this.squares.alpha = 0;
        this.squares2.alpha = 0;
    
        switch(this.screen){ //jumphere
            case 0: {this.ball.spawnx = 300; this.ball.spawny = 450; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 1000; this.hole.y = 630; this.pad.x = 1000; this.pad.y = 630; break;}
            case 1: {this.ball.spawnx = 300; this.ball.spawny = 450; this.goal = 3; this.sgoal = 3; this.coursetimer = 400;
                     this.hole.x = 500; this.hole.y = 300; this.pad.x = 500; this.pad.y = 300; break;}
            case 2: {this.ball.spawnx = 450; this.ball.spawny = 600; this.goal = 5; this.sgoal = 5;
                     this.hole.x = 650; this.hole.y = 650; this.pad.x = 650; this.pad.y = 650; break;}
            case 3: {this.ball.spawnx = 300; this.ball.spawny = 450; this.goal = 4; this.sgoal = 4;
                     this.hole.x = 1060; this.hole.y = 450; this.pad.x = 1060; this.pad.y = 450; break;}
            case 4: {this.ball.spawnx = 300; this.ball.spawny = 550; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 650; this.hole.y = 450; this.pad.x = 650; this.pad.y = 450; break;}
            case 5: {this.ball.spawnx = 410; this.ball.spawny = 300; this.goal = 5; this.sgoal = 5;
                     this.hole.x = 580; this.hole.y = 650; this.pad.x = 580; this.pad.y = 650; break;}
            case 6: {this.ball.spawnx = 450; this.ball.spawny = 350; this.goal = 4; this.sgoal = 4; 
                     this.hole.x = 450; this.hole.y = 450; this.pad.x = 450; this.pad.y = 450; break;}
            case 7: {this.ball.spawnx = 420; this.ball.spawny = 450; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 850; this.hole.y = 450; this.pad.x = 850; this.pad.y = 450; break;}
            case 8: {this.ball.spawnx = 620; this.ball.spawny = 620; this.goal = 7; this.sgoal = 7;
                     this.hole.x = 650; this.hole.y = 450; this.pad.x = 650; this.pad.y = 450; break;}
        }

        this.objectSpawn();
        this.specialSpawn();
        this.electronSpawn();
    }
},
    
spawnRoom: function(){
    this.screen += 1;
    totalstroke = totalstroke + this.stroke - this.sgoal;
    this.stroke = 0;
    this.stroketext.setText("STROKE: " + this.stroke);
    this.scoretext.setText("SCORE: " + totalstroke);
    if(this.screen == 9){this.completeGame();}
    else{
        this.stagechangesound.play();
        this.signnumber.frame = this.screen;
        this.electrongroup.callAll('kill');
        this.electrongroup.removeAll();
        this.despawn = true;
        this.shadowfilter.alpha = 0;
        this.scoretext.alpha = 0;
        this.stroketext.alpha = 0;

        this.sign.alpha = 1;
        this.signnumber.alpha = 1;

        this.ball.inpit = false;
        this.ball.inactive = true;
        this.balloverlay.x = this.ball.x; this.balloverlay.y = this.ball.y;
        this.balloverlay.scale.setTo(.15);
        if(this.bigcheat){
            this.balloverlay.scale.setTo(.225);}
    }
},
    
jumpRoom: function(input){
    this.scoretext.alpha = 0;
    this.stroketext.alpha = 0;
    this.ball.body.reset(-200, -200);
    this.balloverlay.reset(-200,-200);
    this.stroke = 0;
    totalstroke = 100;
    this.stroketext.setText("STROKE: " + this.stroke);
    this.scoretext.setText("SCORE: " + totalstroke);
    this.expandMenu();
    this.screen = input;
    this.signnumber.frame = this.screen;
    this.electrongroup.callAll('kill');
    this.electrongroup.removeAll();
    this.despawn = true;
    this.shadowfilter.alpha = 0;
    this.stagechangesound.play();
    
    this.sign.alpha = 1;
    this.signnumber.alpha = 1;
    
    this.ball.inpit = false;
    this.ball.inactive = true;
    this.balloverlay.scale.setTo(.15);
    if(this.bigcheat){
        this.balloverlay.scale.setTo(.225);}
},
    
specialSpawn: function(){
    switch(this.screen){
        case 0: {
            this.spawnRedGrid(1080, 350);
            this.spawnRedGrid(1080, 390);
            this.spawnRedGrid(1080, 430);
            this.spawnRedGrid(1080, 470);
            this.spawnRedGrid(1080, 510);
            this.spawnRedGrid(1080, 550);
            
            this.spawnRedGrid(1040, 350);
            this.spawnRedGrid(1000, 350);
            this.spawnRedGrid(960, 350);
            this.spawnRedGrid(920, 350);
            this.spawnRedGrid(880, 350);
            this.spawnRedGrid(840, 350);
            this.spawnRedGrid(800, 350);
            this.spawnRedGrid(760, 350);
            this.spawnRedGrid(720, 350);
            this.spawnRedGrid(680, 350);
            this.spawnRedGrid(640, 350);
            
            this.spawnRedGrid(1040, 550);
            this.spawnRedGrid(1000, 550);
            this.spawnRedGrid(960, 550);
            this.spawnRedGrid(920, 550);
            this.spawnRedGrid(880, 550);
            this.spawnRedGrid(840, 550);
            this.spawnRedGrid(800, 550);
            this.spawnRedGrid(760, 550);
            this.spawnRedGrid(720, 550);
            this.spawnRedGrid(680, 550);
            this.spawnRedGrid(640, 550);
            break;}
        case 1: {
             spec = this.specialgroup.create(450, 250, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(850, 650, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
            break;}
        case 2: {
            this.spawnRedGrid(690, 450);
            this.spawnRedGrid(305, 645);
            this.spawnRedGrid(740, 290);
            this.spawnRedGrid(780, 250);
             spec = this.specialgroup.create(650, 490, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(305, 605, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(445, 332, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(933, 475, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(485, 372, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(893, 435, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(780, 290, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF00FF;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(840, 613, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF00FF;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
            break;}
        case 3: {
			this.spawnRedGrid(1000, 450);
			break;}
        case 4: {
            this.spawnRedGrid(492, 430);
            this.spawnRedGrid(492, 470);
            this.spawnRedGrid(808, 430);
            this.spawnRedGrid(808, 470);
            this.spawnRedGrid(630, 292);
            this.spawnRedGrid(670, 292);
            this.spawnRedGrid(630, 608);
            this.spawnRedGrid(670, 608);
            this.specialgroup.children[0].rads = 3.044;
            this.specialgroup.children[1].rads = 3.236;
            this.specialgroup.children[2].rads = .096;
            this.specialgroup.children[3].rads = -.096;
            this.specialgroup.children[4].rads = 1.665;
            this.specialgroup.children[5].rads = 1.475;
            this.specialgroup.children[6].rads = 4.615;
            this.specialgroup.children[7].rads = 4.805;
            break;}
        case 5: {
             spec = this.specialgroup.create(610, 410, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(305, 605, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(690, 410, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(610, 490, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(690, 490, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(1000, 300, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
            break;}
        case 6: {
            this.spawnRedGrid(230, 270);
            this.spawnRedGrid(230, 310);
            this.spawnRedGrid(230, 350);
            this.spawnRedGrid(230, 390);
            this.spawnRedGrid(230, 430);
            this.spawnRedGrid(230, 470);
            this.spawnRedGrid(230, 510);
            this.spawnRedGrid(230, 550);
            this.spawnRedGrid(230, 590);
            this.spawnRedGrid(230, 630);
            this.spawnRedGrid(230, 670);
            
            this.spawnRedGrid(1070, 270);
            this.spawnRedGrid(1070, 310);
            this.spawnRedGrid(1070, 350);
            this.spawnRedGrid(1070, 390);
            this.spawnRedGrid(1070, 430);
            this.spawnRedGrid(1070, 470);
            this.spawnRedGrid(1070, 510);
            this.spawnRedGrid(1070, 550);
            this.spawnRedGrid(1070, 590);
            this.spawnRedGrid(1070, 630);
            this.spawnRedGrid(1070, 670);
            
			this.spawnRedGrid(230, 230);
			this.spawnRedGrid(270, 230);
            this.spawnRedGrid(310, 230);
            this.spawnRedGrid(350, 230);
            this.spawnRedGrid(390, 230);
            this.spawnRedGrid(430, 230);
            this.spawnRedGrid(470, 230);
            this.spawnRedGrid(510, 230);
            this.spawnRedGrid(550, 230);
            this.spawnRedGrid(590, 230);
            this.spawnRedGrid(630, 230);
            this.spawnRedGrid(670, 230);
            this.spawnRedGrid(710, 230);
            this.spawnRedGrid(750, 230);
            this.spawnRedGrid(790, 230);
            this.spawnRedGrid(830, 230);
            this.spawnRedGrid(870, 230);
            this.spawnRedGrid(910, 230);
            this.spawnRedGrid(950, 230);
            this.spawnRedGrid(990, 230);
            this.spawnRedGrid(1030, 230);
            this.spawnRedGrid(1070, 230);
            
            this.spawnRedGrid(270, 670);
            this.spawnRedGrid(310, 670);
            this.spawnRedGrid(350, 670);
            this.spawnRedGrid(390, 670);
            this.spawnRedGrid(430, 670);
            this.spawnRedGrid(470, 670);
            this.spawnRedGrid(510, 670);
            this.spawnRedGrid(550, 670);
            this.spawnRedGrid(590, 670);
            this.spawnRedGrid(630, 670);
            this.spawnRedGrid(670, 670);
            this.spawnRedGrid(710, 670);
            this.spawnRedGrid(750, 670);
            this.spawnRedGrid(790, 670);
            this.spawnRedGrid(830, 670);
            this.spawnRedGrid(870, 670);
            this.spawnRedGrid(910, 670);
            this.spawnRedGrid(950, 670);
            this.spawnRedGrid(990, 670);
            this.spawnRedGrid(1030, 670);
            
             spec = this.specialgroup.create(280, 280, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(1020, 620, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(280, 620, 'porta');
            spec.anchor.setTo(.5);
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(1020, 280, 'porta');
            spec.anchor.setTo(.5);
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(650, 280, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(650, 620, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(280, 450, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(1020, 450, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
            break;}
        case 7: {
            this.spawnRedGrid(630, 430);
            this.spawnRedGrid(670, 430);
            this.spawnRedGrid(630, 470);
            this.spawnRedGrid(670, 470);
            this.specialgroup.children[0].mode = 0;
            this.coursetimer = 100;
            break;}
        case 8: {
             spec = this.specialgroup.create(420, 280, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(880, 620, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x00FF00;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(420, 620, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(880, 280, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0xFF0000;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
             spec = this.specialgroup.create(1010, 450, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 2;
            spec.alpha = 0;
             spec = this.specialgroup.create(290, 450, 'porta');
            spec.anchor.setTo(.5);
            spec.tint = 0x0000FF;
            spec.timer = 0;
            spec.design = 3;
            spec.alpha = 0;
            this.spawnRedGrid(0, 450);
            this.spawnRedGrid(500, 450);
            this.spawnRedGrid(1000, 450);
            this.spawnRedGrid(1500, 450);
            break;}
    }
},

spawnRedGrid: function(x, y){
	spec = this.specialgroup.create(x, y, 'redgrid');
    spec.anchor.setTo(.5);
	spec.animations.add('buzz', [0,1,2,1,0,1,2,3,2,1], 4, true);
	spec.animations.play('buzz');
	spec.design = 1;
	spec.alpha = 0;
},
    
electronSpawn: function(){
    switch(this.screen){
        case 0: {
            glow= this.electrongroup.create(950, 450, 'electron');
            glow= this.electrongroup.create(980, 420, 'electron');
            glow= this.electrongroup.create(980, 480, 'electron');
            glow= this.electrongroup.create(1010, 450, 'electron');
            glow= this.electrongroup.create(1010, 390, 'electron');
            glow= this.electrongroup.create(1010, 510, 'electron');
            break;
        }
        case 1: {
            glow= this.electrongroup.create(990, 450, 'electron');
            glow= this.electrongroup.create(730, 380, 'electron');
            glow= this.electrongroup.create(730, 520, 'electron');
            break;
        }
        case 2: {
            glow= this.electrongroup.create(215, 560, 'electron');
            glow= this.electrongroup.create(537, 418, 'electron');
            glow= this.electrongroup.create(832, 364, 'electron');
            glow= this.electrongroup.create(977, 531, 'electron');
            glow= this.electrongroup.create(357, 260, 'electron');
            break;
        }
        case 3: {
            glow= this.electrongroup.create(650, 220, 'electron');
            glow= this.electrongroup.create(950, 340, 'electron');
            glow= this.electrongroup.create(950, 540, 'electron');
            glow= this.electrongroup.create(350, 540, 'electron');
            break;
        }
        case 4: {
            glow= this.electrongroup.create(450, 540, 'electron');
            glow= this.electrongroup.create(815, 540, 'electron');
            glow= this.electrongroup.create(815, 350, 'electron');
            glow= this.electrongroup.create(580, 350, 'electron');
            glow= this.electrongroup.create(580, 445, 'electron');
			glow = this.electrongroup.create(975, 450, 'electron');
            break;
        }
        case 5: {
            glow= this.electrongroup.create(415, 500, 'electron');
            glow= this.electrongroup.create(590, 570, 'electron');
            glow= this.electrongroup.create(1000, 500, 'electron');
            glow= this.electrongroup.create(1044, 579, 'electron');
            glow= this.electrongroup.create(690, 290, 'electron');
            break;
        }
        case 6: {
            glow= this.electrongroup.create(450, 550, 'electron');
            glow= this.electrongroup.create(850, 450, 'electron');
            glow= this.electrongroup.create(650, 363, 'electron');
            glow= this.electrongroup.create(850, 280, 'electron');
            break;
        }
        case 7: {
            glow= this.electrongroup.create(650, 425, 'electron');
            glow= this.electrongroup.create(650, 475, 'electron');
            glow= this.electrongroup.create(565, 365, 'electron');
            glow= this.electrongroup.create(735, 365, 'electron');
            glow= this.electrongroup.create(565, 535, 'electron');
            glow= this.electrongroup.create(735, 535, 'electron');
            break;
        }
        case 8: {
            glow= this.electrongroup.create(425, 450, 'electron');
            glow= this.electrongroup.create(575, 450, 'electron');
            glow= this.electrongroup.create(725, 450, 'electron');
            glow= this.electrongroup.create(875, 450, 'electron');
            glow= this.electrongroup.create(650, 280, 'electron');
            glow= this.electrongroup.create(280, 620, 'electron');
            glow= this.electrongroup.create(1020, 620, 'electron');
            break;
        }
    }
    for(var i=0; i<this.goal; i++){
		 glow = this.electrongroup.children[i];
		glow.anchor.setTo(.5);
        glow.alpha = .3;
        glow.scale.setTo(1.3);
		 electron = this.electrongroup.create(0, 0, 'electron');
		electron.x = glow.x;
		electron.y = glow.y;
		electron.anchor.setTo(.5);
        electron.scale.setTo(.75);
	}
},
    
objectSpawn: function(){
    switch(this.screen){
        case 0: {
             bump = this.objectgroup.create(650, -100, 'bumpcolumn');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 1: {
             bump = this.objectgroup.create(650, 278, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
             bump = this.objectgroup.create(650, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(502, 25, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
             bump = this.objectgroup.create(650, 622, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
            break;
        }
        case 2: {
             bump = this.objectgroup.create(650, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(690, 490, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(345, 605, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(345, 645, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(485, 332, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(445, 372, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(893, 475, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(933, 435, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(800, 613, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(840, 573, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(800, 573, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(740, 250, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 3: {
			 bump = this.objectgroup.create(340, 340, 'bumptri2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = 90;
            bump.alpha = 0;
             bump = this.objectgroup.create(340, 560, 'bumptri2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(960, 340, 'bumptri2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -180;
            bump.alpha = 0;
             bump = this.objectgroup.create(960, 560, 'bumptri2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -90;
            bump.alpha = 0;
            break;
        }
        case 4: {
             bump = this.objectgroup.create(550, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 3.14;
             bump = this.objectgroup.create(650, 340, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 1.57;
             bump = this.objectgroup.create(750, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 0;
             bump = this.objectgroup.create(650, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = -1.57;
            
             bump = this.objectgroup.create(947, 410, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = .134;
             bump = this.objectgroup.create(950, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 0;
             bump = this.objectgroup.create(947, 490, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = -.134;
             bump = this.objectgroup.create(690, 747, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = -1.436;
             bump = this.objectgroup.create(650, 750, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = -1.57;
             bump = this.objectgroup.create(610, 747, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = -1.704;
             bump = this.objectgroup.create(353, 490, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 3.274;
             bump = this.objectgroup.create(350, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 3.14;
             bump = this.objectgroup.create(353, 410, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 3.006;
             bump = this.objectgroup.create(610, 153, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 1.704;
             bump = this.objectgroup.create(650, 150, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 1.57;
             bump = this.objectgroup.create(690, 153, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.rads = 1.436;
            break;
        }
        case 5: {
             bump = this.objectgroup.create(650, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(500, 25, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
             bump = this.objectgroup.create(650, 278, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
             bump = this.objectgroup.create(650, 622, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 90;
            
             bump = this.objectgroup.create(552, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1000, 25, 49, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(380, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(208, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(748, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(920, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(1092, 450, 'bumprect1');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 6: {
             bump = this.objectgroup.create(650, 450, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.rotateRight(18);
            break;
        }
        case 7: {
             bump = this.objectgroup.create(670, 230, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(670, 270, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(670, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(630, 670, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(630, 630, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(630, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(240, 40, 0, 20, 0);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(630, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(240, 40, 20, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(590, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(550, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(510, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(710, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(750, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(790, 310, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(670, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(590, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(550, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(510, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(710, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(750, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(790, 590, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(510, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(40, 120, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(510, 510, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(510, 390, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(510, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(40, 120, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            
             bump = this.objectgroup.create(790, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(40, 120, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(790, 510, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(790, 390, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(1, 1, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(790, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(40, 120, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 8: {
             bump = this.objectgroup.create(350, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 45;
             bump = this.objectgroup.create(500, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(650, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 45;
             bump = this.objectgroup.create(800, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(950, 350, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 45;
            
             bump = this.objectgroup.create(350, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 45;
             bump = this.objectgroup.create(500, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(800, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(950, 550, 'bumpsquare2');
            bump.tint = 0x66FF66;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
            bump.body.angle = 45;
            break;
        }
    }
},
    
menuCreate: function(){
    this.cheatsgroup = this.add.group();
     menu = this.cheatsgroup.create(325, 315, 'menuwindow1');
     text = this.add.text(325, 315, 'BIG\nBALL', { font: "24px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
     button = this.cheatsgroup.create(500, 315, 'button');
    button.events.onInputDown.add(this.bigCheatActivate, this);
     text = this.add.text(500, 315, 'LOCKED', { font: "18px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
    if(bigcheatunlocked){text.setText("OFF");}
     menu = this.cheatsgroup.create(750, 315, 'menuwindow4');
     text = this.add.text(750, 315, 'Ball size increased 1/2', { font: "20px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text); 
    
     menu = this.cheatsgroup.create(325, 450, 'menuwindow1');
     text = this.add.text(325, 450, 'SLOW\n-MO', { font: "24px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
     button = this.cheatsgroup.create(500, 450, 'button');
    button.events.onInputDown.add(this.slowCheatActivate, this);
     text = this.add.text(500, 450, 'LOCKED', { font: "18px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
    if(slowcheatunlocked){text.setText("OFF");}
     menu = this.cheatsgroup.create(750, 450, 'menuwindow4');
     text = this.add.text(750, 450, 'Environment moves at 1/4 speed\nwhile aiming shots', { font: "20px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
    
     menu = this.cheatsgroup.create(325, 585, 'menuwindow1');
     text = this.add.text(325, 585, 'FREE\nSHOT', { font: "24px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
     button = this.cheatsgroup.create(500, 585, 'button');
    button.events.onInputDown.add(this.freeCheatActivate, this);
     text = this.add.text(500, 585, 'LOCKED', { font: "18px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
    if(freecheatunlocked){text.setText("OFF");}
     menu = this.cheatsgroup.create(750, 585, 'menuwindow4');
     text = this.add.text(750, 585, 'Can hit ball while it is moving', { font: "20px System", fill: "#ffffff", align: "center" });
    this.cheatsgroup.add(text);
    
    
    for(var i = 0; i < this.cheatsgroup.length; i++){
        this.cheatsgroup.children[i].alpha = 0;
        this.cheatsgroup.children[i].anchor.setTo(.5);
    }
    
    this.soundgroup = this.add.group();
     menu = this.soundgroup.create(700, 315, 'menuwindow2');
     button = this.soundgroup.create(475, 315, 'button');
    button.scale.setTo(-.7,.7);
    button.events.onInputDown.add(this.musicVolLeft, this);
    pic = this.soundgroup.create(475, 315, 'menuarrow');
     button = this.soundgroup.create(925, 315, 'button');
    button.scale.setTo(.7);
    button.events.onInputDown.add(this.musicVolRight, this);
     pic = this.soundgroup.create(925, 315, 'menuarrow');
    pic.scale.setTo(-1,1);
     menu = this.soundgroup.create(700, 450, 'menuwindow2');
     button = this.soundgroup.create(475, 450, 'button');
    button.scale.setTo(-.7,.7);
    button.events.onInputDown.add(this.sfxVolLeft, this);
    pic = this.soundgroup.create(475, 450, 'menuarrow');
     button = this.soundgroup.create(925, 450, 'button');
    button.scale.setTo(.7);
    button.events.onInputDown.add(this.sfxVolRight, this);
     pic = this.soundgroup.create(925, 450, 'menuarrow');
    pic.scale.setTo(-1,1);
     menu = this.soundgroup.create(700, 585, 'menuwindow3');
     button = this.soundgroup.create(475, 585, 'button');
    button.scale.setTo(-.7,.7);
    button.events.onInputDown.add(this.musicSelectLeft, this);
    pic = this.soundgroup.create(475, 585, 'menuarrow');
     button = this.soundgroup.create(925, 585, 'button');
    button.scale.setTo(.7);
    button.events.onInputDown.add(this.musicSelectRight, this);
     pic = this.soundgroup.create(925, 585, 'menuarrow');
    pic.scale.setTo(-1,1);
     menu = this.soundgroup.create(325, 315, 'menuwindow1');
     text = this.add.text(325, 315, 'MUSIC\nVOLUME', { font: "24px System", fill: "#ffffff", align: "center" });
    this.soundgroup.add(text);
     menu = this.soundgroup.create(325, 450, 'menuwindow1');
     text = this.add.text(325, 450, 'SFX\nVOLUME', { font: "24px System", fill: "#ffffff", align: "center" });
    this.soundgroup.add(text);
     menu = this.soundgroup.create(325, 585, 'menuwindow1');
     text = this.add.text(325, 585, 'SONG\nSELECT', { font: "24px System", fill: "#ffffff", align: "center" });
    this.soundgroup.add(text);
    dot = this.soundgroup.create(865, 315, 'menuselector');
    dot = this.soundgroup.create(865, 450, 'menuselector'); 
     text = this.add.text(700, 585, this.musictext[this.musicindex], { font: "24px System", fill: "#ffffff", align: "center" });
    this.soundgroup.add(text);

    
    for(var i = 0; i < this.soundgroup.length; i++){
        this.soundgroup.children[i].alpha = 0;
        this.soundgroup.children[i].anchor.setTo(.5);
    }
    
    this.navgroup = this.add.group();
      menu = this.navgroup.create(375, 375, 'button');
    menu.scale.setTo(.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(0)}, this);
     text = this.add.text(375, 375, '1', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(500, 375, 'button');
    menu.scale.setTo(-.7,.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(1)}, this);
     text = this.add.text(500, 375, '2', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(625, 375, 'button');
    menu.scale.setTo(.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(2)}, this);
     text = this.add.text(625, 375, '3', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(375, 500, 'button');
    menu.scale.setTo(-.7,.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(3)}, this);
     text = this.add.text(375, 500, '4', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(500, 500, 'button');
    menu.scale.setTo(.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(4)}, this);
     text = this.add.text(500, 500, '5', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(625, 500, 'button');
    menu.scale.setTo(-.7,.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(5)}, this);
     text = this.add.text(625, 500, '6', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(375, 625, 'button');
    menu.scale.setTo(.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(6)}, this);
     text = this.add.text(375, 625, '7', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(500, 625, 'button');
    menu.scale.setTo(-.7,.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(7)}, this);
     text = this.add.text(500, 625, '8', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(625, 625, 'button');
    menu.scale.setTo(.7);
    menu.events.onInputDown.add(function(){this.jumpRoom(8)}, this);
     text = this.add.text(625, 625, '9', { font: "35px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(275, 500, 'menuwindow1');
     text = this.add.text(275, 500, 'HOLE JUMP', { font: "28px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(850, 300, 'button');
    menu.scale.setTo(-1.2,1.2);
    menu.events.onInputDown.add(this.exitGame, this);
     text = this.add.text(850, 300, 'EXIT\nGAME', { font: "28px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(850, 600, 'button');
    menu.scale.setTo(1.2);
    menu.events.onInputDown.add(this.goFull, this);
     text = this.add.text(850, 600, '(Attempt to)\nFULLSCREEN', { font: "16px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
     menu = this.navgroup.create(0, 0, 'button');
    menu.scale.setTo(-1.2,1.2);
    menu.events.onInputDown.add(this.restartCourse, this);
     text = this.add.text(0, 0, 'RESTART', { font: "24px System", fill: "#ffffff", align: "center" });
    this.navgroup.add(text);
    
    for(var i = 0; i < this.navgroup.length; i++){
        this.navgroup.children[i].alpha = 0;
        this.navgroup.children[i].anchor.setTo(.5);
    }
    
    this.menugroup = this.add.group();
     menu = this.menugroup.create(1045, 255, 'button'); // 615
    menu.anchor.setTo(.5);
    menu.scale.setTo(-1,1);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandCheats, this);
     text = this.add.text(this.menugroup.children[0].x, this.menugroup.children[0].y, 'CHEATS', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button'); // 495
    menu.anchor.setTo(.5);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandNav, this);
     text = this.add.text(this.menugroup.children[2].x, this.menugroup.children[2].y, 'NAV', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button'); //375
    menu.anchor.setTo(.5);
    menu.scale.setTo(1);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandSound, this);
     text = this.add.text(this.menugroup.children[4].x, this.menugroup.children[4].y, 'SOUND', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
	menu.scale.setTo(-1,1);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button');
    menu.anchor.setTo(.5);
    menu.scale.setTo(.7);
	menu.frame = 1;
    menu.alpha = .6;
    menu.inputEnabled = true;
    menu.events.onInputDown.add(this.expandMenu, this);
     text = this.add.text(this.menugroup.children[6].x, this.menugroup.children[6].y, 'MENU', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = .6;
    text.scale.setTo(.7);
}
};