var Nanogolf = Nanogolf || {};

Nanogolf.Circuita = function(){};

Nanogolf.Circuita.prototype = {
preload: function() {
    this.screen = 0;
    this.goal = 3;
    this.sgoal = 3;
    this.stroke = 0;
    this.coursetimer = 0;
    
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
    this.musicindex = 1;
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
    
    this.positionbgx = 5;
    this.counterbgx = 0;
    this.statusbgx = 1;
    this.positionbgy = 1;
    this.counterbgy = 10;
    this.statusbgy = 0;
    this.textstate = 0;
    
    this.reboundflag = false;
    this.reboundcounter = 0;
},

    
create: function() {
    this.world.setBounds(0, 0, 1300, 900);
    
    this.screen = 0;
    
    this.track0 = this.add.audio('track0');
    this.track1 = this.add.audio('track1');
    if(!(modeflag)){
        this.track1.loopFull(Math.pow(.6, 10-musicvol));}
    if(track2unlocked){this.track2 = this.add.audio('track2');}
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
    this.getsparksound = this.add.audio('getspark');
    this.getsparksound.volume = sfxvol/10;
    this.electricitysound = this.add.audio('electricity');
    this.electricitysound.volume = sfxvol/10;
    this.electricitysound.play();
    this.menu1sound = this.add.audio('menu1');
    this.menu1sound.allowMultiple = true;
    this.menu1sound.volume = sfxvol/10;
    this.menu2sound = this.add.audio('menu2');
    this.menu2sound.allowMultiple = true;
    this.menu2sound.volume = sfxvol/10;
    
     this.bg1 = this.add.sprite(200, 200, 'bg1');
    this.bg1.alpha = .2;
    
    this.scorewindow = this.add.sprite(220, 595, 'scorewindow1');
    this.stroketext2 = this.add.text(230, 605, "STROKE: " + this.stroke, { font: "12px Fixedsys", fill: "#888888", align: "left" });
    this.stroketext = this.add.text(230, 605, "STROKE: " + this.stroke, { font: "12px Fixedsys", fill: "#999999", align: "left" });
    this.scoretext2 = this.add.text(230, 623, "SCORE: " + totalstroke, { font: "12px Fixedsys", fill: "#888888", align: "left" });
    this.scoretext = this.add.text(230, 623, "SCORE: " + totalstroke, { font: "12px Fixedsys", fill: "#999999", align: "left" });

     this.overlay = this.add.tileSprite(-50, 100, 1150, 600, 'overlay');
    this.overlay.alpha = .03;
    
     this.spark1 = this.add.sprite(200, 200, 'spark');
    this.spark1.anchor.setTo(.5);
	this.spark1.mode = 0;
    this.spark1.pos = Math.floor(Math.random() * 32);
     this.sparkglow1 = this.add.sprite(0, 0, 'sparkglow');
     this.sparkglow1.anchor.setTo(.5);
    this.sparkglow1.alpha = .2;
	  this.spark2 = this.add.sprite(200, 200, 'spark');
    this.spark2.anchor.setTo(.5);
	this.spark2.mode = 0;
    this.spark2.pos = Math.floor(Math.random() * 32);
     this.sparkglow2 = this.add.sprite(0, 0, 'sparkglow');
     this.sparkglow2.anchor.setTo(.5);
    this.sparkglow2.alpha = .2;
	  this.spark3 = this.add.sprite(200, 200, 'spark');
    this.spark3.anchor.setTo(.5);
	this.spark3.mode = 0;
    this.spark3.pos = Math.floor(Math.random() * 32);
     this.sparkglow3 = this.add.sprite(0, 0, 'sparkglow');
     this.sparkglow3.anchor.setTo(.5);
    this.sparkglow3.alpha = .2;
     this.spark4 = this.add.sprite(-100, -100, 'spark');
    this.spark4.anchor.setTo(.5);
	this.spark4.mode = 0;
     this.sparkglow4 = this.add.sprite(-100, -100, 'sparkglow');
    this.sparkglow4.anchor.setTo(.5);
    this.sparkglow4.alpha = .2;
    
    this.specialgroup = this.add.group();
    this.specialSpawn();
    
    this.objectgroup = this.add.group();
    this.objectSpawn();
	
	 this.pad = this.add.sprite(800, 500, 'pad');
	this.pad.anchor.setTo(.5);
    this.pad.alpha = 0;
	 this.hole = this.add.sprite(800, 500, 'hole');
	this.hole.anchor.setTo(.5);
	this.hole.animations.add('spin', [1,2], 2, true);
    this.hole.animations.add('spinslow', [1,2], .5, true);
	this.hole.animations.play('spin');
    this.hole.alpha = 0;
	
	 this.boundary3 = this.add.sprite(99, 450, 'boundary');
    this.game.physics.p2.enable(this.boundary3);
	this.boundary3.body.static = true;
    this.boundary3.body.angle = -90;
	this.boundary3.tint = 0x0A0A88;
     this.boundary4 = this.add.sprite(1201, 450, 'boundary');
    this.game.physics.p2.enable(this.boundary4);
	this.boundary4.body.static = true;
    this.boundary4.body.angle = 90;
	this.boundary4.tint = 0x0A0A88;
     this.boundary1 = this.add.sprite(650, 100, 'boundary');
    this.game.physics.p2.enable(this.boundary1);
	this.boundary1.body.static = true;
	this.boundary1.tint = 0x0A0A88;
     this.boundary2 = this.add.sprite(650, 800, 'boundary');
    this.game.physics.p2.enable(this.boundary2);
	this.boundary2.body.static = true;
	this.boundary2.body.angle = 180;
	this.boundary2.tint = 0x0A0A88;
    
     this.balleffect1 = this.add.sprite(300, 300, 'balleffect2');
    this.balleffect1.anchor.setTo(1, .5);
    this.balleffect1.scale.setTo(2);
    this.balleffect1.alpha = .12;
    this.balleffect1.animations.add('buzz', [16, 17, 18, 19], 13, true);
    this.balleffect1.animations.play('buzz');
    
     this.balleffect2 = this.add.sprite(-400, -400, 'balleffect2');
    this.balleffect2.anchor.setTo(1, .5);
    this.balleffect2.scale.setTo(2);
    this.balleffect2.alpha = .12;
    this.balleffect2.animations.add('buzz', [16, 17, 18, 19], 13, true);
    this.balleffect2.animations.play('buzz');
	
	 this.ball = this.add.sprite(-200, -200, 'ballmarker');
	this.ball.anchor.setTo(.5);
	this.ball.alpha = 0;
    this.ball.inpit = false;
    this.ball.inactive = true;
    this.ball.respawning = false;
    this.ball.spawnx = 850;
    this.ball.spawny = 400;
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
    menu.events.onInputUp.add(this.goFull, this);
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
    menu.scale.setTo(1);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandNav, this);
     text = this.add.text(this.menugroup.children[2].x, this.menugroup.children[2].y, 'NAV', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button'); //375
    menu.anchor.setTo(.5);
    menu.scale.setTo(-1,1);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandSound, this);
     text = this.add.text(this.menugroup.children[4].x, this.menugroup.children[4].y, 'SOUND', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button');
	menu.frame = 1;
    menu.anchor.setTo(.5);
    menu.scale.setTo(.7);
    menu.alpha = .6;
    menu.inputEnabled = true;
    menu.events.onInputDown.add(this.expandMenu, this);
     text = this.add.text(this.menugroup.children[6].x, this.menugroup.children[6].y, 'MENU', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = .6;
    text.scale.setTo(.7);
    
    this.spawngroup = this.add.group();
     bolt = this.spawngroup.create(-50, 188, 'balleffect2');
    bolt.scale.setTo(3.4, 4);
    bolt.animations.add('buzz', [0, 1, 2, 3], 12, true);
    bolt.animations.play('buzz');
    bolt.anchor.setTo(0,.5);
    bolt.angle = 90;
     bolt = this.spawngroup.create(-50, 712, 'balleffect2');
    bolt.scale.setTo(3.4, 4);
    bolt.animations.add('buzz', [2, 3, 1, 0], 12, true);
    bolt.animations.play('buzz');
    bolt.anchor.setTo(0,.5);
    bolt.angle = -90;
    
     this.sign = this.add.sprite(650, 450, 'sign');
    this.sign.anchor.setTo(.5);
    this.sign.animations.add('play', [0, 1, 2], 3, true);
    this.sign.animations.play('play');
     this.signnumber = this.add.sprite(650, 462, 'signnumber');
    this.signnumber.anchor.setTo(.5);
    
    this.camfocus = this.add.sprite(650, 450, 'camfocus');
     this.camfocus.alpha = 0;
     this.camera.follow(this.camfocus, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
    //this.testtext = this.add.text(300, 300, this.game.scale.compatibility.supportsFullScreen, { font: "30px Fixedsys", fill: "#ffffff", align: "center" });
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
		
	this.sparkglow1.reset(this.spark1.x, this.spark1.y);
    this.sparkglow2.reset(this.spark2.x, this.spark2.y);
    this.sparkglow3.reset(this.spark3.x, this.spark3.y);
    this.sparkglow4.reset(this.spark4.x, this.spark4.y);
	this.sparkUpdate(this.spark1);
	this.sparkUpdate(this.spark2);
	this.sparkUpdate(this.spark3);
    this.sparkUpdate2(this.spark4);

    this.bgUpdate();
	
	this.ballTrail();
	
    if(this.balleffect2.alpha){
        this.balleffect2.alpha -= .012;}
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
    
    if(this.despawn){
        this.despawnUpdate();
    }
    this.spawnUpdate();
    
    if(this.menulock){
        this.menuUpdate();}
},
    
goFull: function(){
    if (this.game.scale.isFullScreen){
        this.menu1sound.play();
        this.game.scale.stopFullScreen();}
    else{
        this.menu2sound.play();
        this.game.scale.startFullScreen(false, false);}
},
    
restartCourse: function(){
    this.stroke = 0;
    totalstroke = 0;
    this.ball.body.reset(-200, -200);
    this.balloverlay.reset(-200,-200);
    this.spark4.mode = 1; this.spark4.reset(656, 511);
    this.expandMenu();
    if(this.screen == 8){
        for(var i = 0; i < 30; i++){
            this.scorewindow.moveDown();
            this.stroketext2.moveDown();
            this.stroketext.moveDown();
            this.scoretext2.moveDown();
            this.scoretext.moveDown();
        }
        this.scorewindow.moveUp();
        this.stroketext2.moveUp();
        this.stroketext.moveUp();
        this.scoretext2.moveUp();
        this.scoretext.moveUp();
    }
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
    if(this.spawngroup.children[0].x > 1350){return;}
    
    for (var i = 0; i < this.spawngroup.length; i++){
        bolt = this.spawngroup.children[i];
        bolt.x += 5 + 10 * Math.abs(bolt.x-650)/500;
    }
    
    this.sign.x = this.spawngroup.children[0].x;
    this.signnumber.x = this.sign.x;
    
	if(this.hole.x > this.spawngroup.children[0].x){
		this.hole.alpha = 0;
		this.pad.alpha = 0;}
    else if(this.hole.alpha < .9){
		this.hole.alpha += .125;
		this.pad.alpha += .125;}
    for (i = 0; i < this.objectgroup.length; i++){
        if(this.objectgroup.children[i].x > this.spawngroup.children[0].x){
            this.objectgroup.children[i].alpha = 0;}
        else if(this.objectgroup.children[i].alpha < .9){
            this.objectgroup.children[i].alpha += .125;}
    }
    for (i = 0; i < this.specialgroup.length; i++){
        if(this.specialgroup.children[i].x > this.spawngroup.children[0].x){
            this.specialgroup.children[i].alpha = 0;}
        else if(this.specialgroup.children[i].alpha < .9){
            this.specialgroup.children[i].alpha += .125;}
    }
    for (i = 0; i < this.electrongroup.length/2; i++){
        if(this.electrongroup.children[i].x > this.spawngroup.children[0].x){
            this.electrongroup.children[i].alpha = 0;}
        else if(this.electrongroup.children[i].alpha < .3){
            this.electrongroup.children[i].alpha += .05;}
    }
    for (i = this.electrongroup.length/2; i < this.electrongroup.length; i++){
        if(this.electrongroup.children[i].x > this.spawngroup.children[0].x){
            this.electrongroup.children[i].alpha = 0;}
        else if(this.electrongroup.children[i].alpha < .75){
            this.electrongroup.children[i].alpha += .15;}
    }
    
    if(this.spawngroup.children[0].x > 1300){
		for (i = 0; i < this.objectgroup.length; i++){
			this.objectgroup.children[i].alpha = 1;}
		for (i = 0; i < this.specialgroup.length; i++){
			this.specialgroup.children[i].alpha = 1;}
		this.hole.alpha = 1;
		this.pad.alpha = 1;
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
    }
},
    
bumpUpdate: function(){
    if(this.despawn){return;}
    switch(this.screen){
        case 0: {break;}
        case 1: {break;}
        case 2: {break;}
        case 3: {break;}
        case 4: {break;}
        case 5: {break;}
        case 6: {
            this.coursetimer -= 1;
            if(!(this.coursetimer)){this.coursetimer = 260;}
            this.objectgroup.children[0].body.y = 364 - Math.abs(this.coursetimer - 130) * .5;
            this.objectgroup.children[1].body.y = 536 + Math.abs(this.coursetimer - 130) * .5;
            break;}
        case 7: {break;}
        case 8: {
            this.objectgroup.children[0].rads += .05;
            this.objectgroup.children[0].body.x = 650 + 110 * Math.cos(this.objectgroup.children[0].rads);
            this.objectgroup.children[0].body.y = 450 + 110 * Math.sin(this.objectgroup.children[0].rads);
            this.objectgroup.children[1].rads += .05;
            this.objectgroup.children[1].body.x = 650 + 110 * Math.cos(this.objectgroup.children[1].rads);
            this.objectgroup.children[1].body.y = 450 + 110 * Math.sin(this.objectgroup.children[1].rads);
            this.objectgroup.children[2].rads += .05;
            this.objectgroup.children[2].body.x = 650 + 110 * Math.cos(this.objectgroup.children[2].rads);
            this.objectgroup.children[2].body.y = 450 + 110 * Math.sin(this.objectgroup.children[2].rads);
            this.objectgroup.children[3].rads += .05;
            this.objectgroup.children[3].body.x = 650 + 110 * Math.cos(this.objectgroup.children[3].rads);
            this.objectgroup.children[3].body.y = 450 + 110 * Math.sin(this.objectgroup.children[3].rads);
            
            break;}
    }
},
    
specialUpdate: function(){
    for(var i=0;i<this.specialgroup.length; i++){
        spec = this.specialgroup.children[i];
        switch(spec.design){
            case 1:{
                if(this.checkOverlap(this.ball, spec)){
					if(spec.angle == 0){this.ball.body.x += 1.3;}
					else if(spec.angle == 90){this.ball.body.y += 1.3;}
                    else if(spec.angle == -180){this.ball.body.x -= 1.3;}
                    else if(spec.angle == -90){this.ball.body.y -= 1.3;}
					return;
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
        this.track1.volume = Math.pow(.6, 10-musicvol);
        if(track2unlocked){this.track2.volume = Math.pow(.6, 10-musicvol);}
        if(track3unlocked){this.track3.volume = Math.pow(.6, 10-musicvol);}
    }
    this.menu1sound.play();
},
    
musicVolRight: function(){
    if(musicvol < 10){
        this.soundgroup.children[21].x += 33;
        musicvol += 1;
        this.track0.volume = Math.pow(.6, 10-musicvol);
        this.track1.volume = Math.pow(.6, 10-musicvol);
        if(track2unlocked){this.track2.volume = Math.pow(.6, 10-musicvol);}
        if(track3unlocked){this.track3.volume = Math.pow(.6, 10-musicvol);}
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
        this.getsparksound.volume = sfxvol/10;
        this.electricitysound.volume = sfxvol/10;
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
        this.getsparksound.volume = sfxvol/10;
        this.electricitysound.volume = sfxvol/10;
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
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track1.loopFull(Math.pow(.6, 10-musicvol));
            break;}
        case 2:{
            if(track2unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track2.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;
        }
        case 3:{
            if(track3unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track3.loopFull(Math.pow(.6, 10-musicvol));
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
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track1.loopFull(Math.pow(.6, 10-musicvol));
            break;}
        case 2:{
            if(track2unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track2.loopFull(Math.pow(.6, 10-musicvol));
            }
            else{
                this.soundgroup.children[23].tint = 0x666666;
            }
            break;
        }
        case 3:{
            if(track3unlocked){
                this.soundgroup.children[23].tint = 0xFFFFFF;
                this.track3.loopFull(Math.pow(.6, 10-musicvol));
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
    if(!(this.animationtimer%6)){
        this.textstate += 1;
        if(this.textstate == 4){this.textstate = 0;}
        switch(this.textstate){
            case 0:{this.stroketext2.x = 231; this.scoretext2.x = 231; break;}
            case 1:{this.stroketext2.x = 230; this.scoretext2.x = 230; break;}
            case 2:{this.stroketext2.y = 606; this.scoretext2.y = 624; break;}
            case 3:{this.stroketext2.y = 605; this.scoretext2.y = 623; break;}
        }
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
                    collision.tint += 394752;
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
        this.balleffect1.alpha = .12;
        this.balleffect1.x = this.ball.x;
        this.balleffect1.y = this.ball.y;
        this.balleffect1.scale.x = .1 + .003 * this.ballspeed;
        this.balleffect1.angle = Math.atan2(this.ball.body.velocity.y, this.ball.body.velocity.x) / 3.1416 * 180;
    }
    else{
        this.reboundflag = false;
        this.reboundcounter = 0;
        this.balleffect1.alpha = 0;
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
    this.balloverlay.alpha += .02;
	this.balloverlay.tint += 328965;
    if(this.balloverlay.alpha > .98){
        this.ball.respawning = false;}
},

bgUpdate: function(){
	if(this.boundaryflag){
		this.boundary1.tint -= 1; this.boundary2.tint -= 1; this.boundary3.tint -= 1;
		this.boundary4.tint -= 1;
		if(this.boundary2.tint < 657922){this.boundaryflag = false;}
	}
	else{this.boundary1.tint += 1; this.boundary2.tint += 1; this.boundary3.tint += 1;
		this.boundary4.tint += 1;
		if(this.boundary2.tint > 658020){this.boundaryflag = true;}
	}
	
	this.counterbgx += 1;
    if(this.counterbgx > 300){
        this.counterbgx = 0;
        if(this.positionbgx < 3){
            this.statusbgx = 1;
            this.positionbgx += 1;
        }
        else if(this.positionbgx > 7){
            this.statusbgx = 2;
            this.positionbgx -= 1;
        }
        else{
            this.statusbgx = 1 + Math.floor(Math.random() * 2);
            if(this.statusbgx == 1){this.positionbgx += 1;}
            else if(this.statusbgx == 2){this.positionbgx -= 1;}
        }
        
    }
    if(this.statusbgx == 1){
        this.overlay.tilePosition.x += (150-Math.abs(150-this.counterbgx))*.005;}
    else if(this.statusbgx == 2){
        this.overlay.tilePosition.x -= (150-Math.abs(150-this.counterbgx))*.005;}
    
    this.counterbgy += 1;
    if(this.counterbgy > 350){
        this.counterbgy = 0;
        if(this.positionbgy < 1){
            this.statusbgy = 1;
            this.positionbgy += 1;
        }
        else if(this.positionbgy > 1){
            this.statusbgy = 2;
            this.positionbgy -= 1;
        }
        else{
            this.statusbgy = Math.floor(Math.random() * 3);
            if(this.statusbgy == 1){this.positionbgy += 1;}
            else if(this.statusbgy == 2){this.positionbgy -= 1;}
            else if(this.statusbgy == 0){this.counterbgy = 20;}
        }
        
    }
    if(this.statusbgy == 1){
        this.overlay.tilePosition.y += (175-Math.abs(175-this.counterbgy))*.003;}
    else if(this.statusbgy == 2){
        this.overlay.tilePosition.y -= (175-Math.abs(175-this.counterbgy))*.003;}
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
		this.ball.body.velocity.x = 0;
		this.ball.body.velocity.y = 0;}
},
    
sparkUpdate: function(spark){
    if(this.checkOverlap(spark, this.ball)){
        this.getsparksound.play();
        spark.mode = 0;
        this.collisionindex += 1;
        this.collisiongroup.children[this.collisionindex%3].x = spark.x;
        this.collisiongroup.children[this.collisionindex%3].y = spark.y;
        this.collisiongroup.children[this.collisionindex%3].tint = 0x319AB6;
        this.collisiongroup.children[this.collisionindex%3].mode = 3;
        this.collisiongroup.children[this.collisionindex%3].timer = 15;
        this.collisiongroup.children[this.collisionindex%3].scale.setTo(.1);
        this.collisiongroup.children[this.collisionindex%3].alpha = .6;
        spark.pos = Math.floor(Math.random() * 32);}

    switch(spark.pos){
        case 0: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x +611; spark.y = this.bg1.y + 32; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x >  this.bg1.x +836){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 252){spark.mode = 3;}
                    break;}
                case 3: {
                    spark.x -= 2;
                    if(spark.x <  this.bg1.x +656){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
        case 1: {
            switch(spark.mode){
                case 0: {spark.x =  this.bg1.x +683; spark.y = this.bg1.y + 59; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 234){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
        case 2: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 672; spark.y = this.bg1.y + 59; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 86){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.x -= 1.43; spark.y += 1.43;
                    if(spark.y > this.bg1.y + 219){spark.mode = 3;}
                    break;}
                case 3: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 294){spark.mode = 4;}
                    break;}
                case 4: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 512){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                }
            }
            break;
        }
		case 3: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 887; spark.y = this.bg1.y + 326; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 512){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 4: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 887; spark.y = this.bg1.y + 332; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 2; 
                    if(spark.x < this.bg1.x + 718){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.x -= 1.43; spark.y += 1.43;
                    if(spark.y > this.bg1.y + 375){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 5: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 688; spark.y = this.bg1.y + 420; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 1.43; spark.y -= 1.43; 
                    if(spark.x < this.bg1.x + 636){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 553){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 6: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 629; spark.y = this.bg1.y + 351; spark.mode = 1; break;}
                case 1: {
                    spark.x += 1.43; spark.y += 1.43; 
                    if(spark.x > this.bg1.x + 701){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 476){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 7: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 493; spark.y = this.bg1.y + 240; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 504){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.x += 1.43; spark.y -= 1.43; 
                    if(spark.x > this.bg1.x + 661){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.y -= 2; 
                    if(spark.y < this.bg1.y + 60){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 8: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 652; spark.y = this.bg1.y + 59; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 77){spark.mode = 2;}
                    break;}
                case 2: {
                    spark.x -= 1.43; spark.y += 1.43; 
                    if(spark.y > this.bg1.y + 230){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x -= 2; 
                    if(spark.x < this.bg1.x + 486){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 9: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 432; spark.y = this.bg1.y + 152; spark.mode = 1; break;}
                case 1: {
                    spark.y -= 2;
                    if(spark.y < this.bg1.y + 17){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 10: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 301; spark.y = this.bg1.y + 146; spark.mode = 1; break;}
                case 1: {
                    spark.y -= 2;
                    if(spark.y < this.bg1.y + 67){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 262){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 11: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 204; spark.y = this.bg1.y + 19; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 263){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 60){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 12: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 201; spark.y = this.bg1.y + 43; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 220){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x += 1.43; spark.y += 1.43;
                    if(spark.x > this.bg1.x + 238){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 257){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 13: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 35; spark.y = this.bg1.y + 39; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 176){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x += 1.43; spark.y += 1.43;
                    if(spark.x > this.bg1.x + 307){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 425){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 14: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 35; spark.y = this.bg1.y + 45; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 173){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x += 1.43; spark.y += 1.43;
                    if(spark.x > this.bg1.x + 304){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 425){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 15: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 426; spark.y = this.bg1.y + 182; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 303){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 1.43; spark.y -= 1.43;
                    if(spark.x < this.bg1.x + 172){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 36){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 16: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 132; spark.y = this.bg1.y + 60; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 153){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 87){spark.mode = 0 ; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 17: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 86; spark.y = this.bg1.y + 83; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 118){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 145){spark.mode = 3 ;}
                    break;}
				case 3: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 87){spark.mode = 0 ; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 18: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 86; spark.y = this.bg1.y + 92; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 108){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 135){spark.mode = 3 ;}
                    break;}
				case 3: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 87){spark.mode = 0 ; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 19: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 86; spark.y = this.bg1.y + 101; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 97){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 125){spark.mode = 3 ;}
                    break;}
				case 3: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 87){spark.mode = 0 ; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 20: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 89; spark.y = this.bg1.y + 107; spark.mode = 1; break;}
                case 1: {
                    spark.y += 1;
                    if(spark.y > this.bg1.y + 120){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 21: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 109; spark.y = this.bg1.y + 242; spark.mode = 1; break;}
                case 1: {
                    spark.y -= 2;
                    if(spark.y < this.bg1.y + 165){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 87){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 22: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 36; spark.y = this.bg1.y + 111; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 264){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x += 1.43; spark.y += 1.43;
                    if(spark.x > this.bg1.x + 65){spark.mode = 3;}
                    break;}
				case 3: {
					spark.x += 2;
					if(spark.x > this.bg1.x + 459){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
				}
            }
            break;
        }
		case 23: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 15; spark.y = this.bg1.y + 303; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 459){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 24: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 458; spark.y = this.bg1.y + 311; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.y + 58){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y += 2;
                    if(spark.y > this.bg1.x + 392){
                        spark.mode = 0; 
                        spark.pos = Math.floor(Math.random() * 32);
                        this.stroketext.setText("STROKE: " + this.stroke);
                        this.scoretext.setText("SCORE: " + totalstroke);
                        this.stroketext2.setText("STROKE: " + this.stroke);
                        this.scoretext2.setText("SCORE: " + totalstroke);}
                    break;}
            }
            break;
        }
		case 25: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 458; spark.y = this.bg1.y + 319; spark.mode = 1; break;}
                case 1: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 259){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 1.43; spark.y += 1.43;
                    if(spark.x < this.bg1.x + 104){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 26: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 219; spark.y = this.bg1.y + 469; spark.mode = 1; break;}
                case 1: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 327){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.y -= 2;
                    if(spark.y < this.bg1.y + 328){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.x += 2;
                    if(spark.x > this.bg1.x + 459){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 27: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 470; spark.y = this.bg1.y + 338; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 364){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 1.43; spark.y += 1.43;
                    if(spark.x < this.bg1.x + 437){spark.mode = 3;}
                    break;}
				case 3: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 423){spark.mode = 4;}
                    break;}
				case 4: {
                    spark.x += 1.43; spark.y += 1.43;
                    if(spark.x > this.bg1.x + 493){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 28: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 478; spark.y = this.bg1.y + 338; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 400){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 449){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 29: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 486; spark.y = this.bg1.y + 338; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 406){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 449){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 30: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 494; spark.y = this.bg1.y + 338; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 412){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 449){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
		case 31: {
            switch(spark.mode){
                case 0: {spark.x = this.bg1.x + 502; spark.y = this.bg1.y + 338; spark.mode = 1; break;}
                case 1: {
                    spark.y += 2;
                    if(spark.y > this.bg1.y + 418){spark.mode = 2;}
                    break;}
				case 2: {
                    spark.x -= 2;
                    if(spark.x < this.bg1.x + 449){spark.mode = 0; spark.pos = Math.floor(Math.random() * 32);}
                    break;}
            }
            break;
        }
    }
},
    
sparkUpdate2: function(spark){
    if(spark.mode){
        if(this.checkOverlap(spark, this.ball)){
            this.getsparksound.play();
            spark.mode = 0; spark.reset(-100, -100);
            this.collisionindex += 1;
            this.collisiongroup.children[this.collisionindex%3].x = spark.x;
            this.collisiongroup.children[this.collisionindex%3].y = spark.y;
            this.collisiongroup.children[this.collisionindex%3].tint = 0x319AB6;
            this.collisiongroup.children[this.collisionindex%3].mode = 3;
            this.collisiongroup.children[this.collisionindex%3].timer = 15;
            this.collisiongroup.children[this.collisionindex%3].scale.setTo(.1);
            this.collisiongroup.children[this.collisionindex%3].alpha = .6;}
        switch(spark.mode){
            case 1:{
                spark.x -= 2;
                if(spark.x < this.bg1.x + 57){spark.mode = 2;}
                break;
            }
            case 2:{
                spark.y += 2;
                if(spark.y > this.bg1.y + 391){
                    spark.mode = 0; spark.x = -100; spark.y = -100;
                    this.stroketext.setText("STROKE: " + this.stroke);
                    this.scoretext.setText("SCORE: " + totalstroke);
                    this.stroketext2.setText("STROKE: " + this.stroke);
                    this.scoretext2.setText("SCORE: " + totalstroke);}
                break;
            }
        }
    }
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
    this.collisiongroup.children[this.collisionindex%3].tint = 0x0000FF;
    this.collisiongroup.children[this.collisionindex%3].mode = 2;
    this.collisiongroup.children[this.collisionindex%3].timer = 15;
    this.collisiongroup.children[this.collisionindex%3].scale.setTo(.001 * this.ballspeed);
    this.collisiongroup.children[this.collisionindex%3].alpha = .36;
    this.collisiongroup.children[this.collisionindex%3].angle = this.angle + 90;
    
    this.balleffect2.angle = this.balleffect1.angle;
    this.balleffect2.x = this.ball.x;
    this.balleffect2.y = this.ball.y;
    this.balleffect2.alpha = .012;
    if(!(this.reboundflag)){
        this.balleffect2.scale.x = this.balleffect1.scale.x;}
    this.reboundflag = true;
    this.reboundcounter = 10;
},
    
reboundAnimation: function(){
    this.balleffect2.scale.x = this.balleffect1.scale.x * this.reboundcounter/10;
    this.balleffect1.scale.x = this.balleffect1.scale.x * (10-this.reboundcounter)/10;
    this.reboundcounter -= 1;
    if(this.reboundcounter < 1){
        this.reboundflag = false;
        this.balleffect2.x = -200;
        this.balleffect2.y = -200;
        this.balleffect2.scale.x = 1;}
},
    
aimShot: function(){
    if(this.freecheat){}
    else if(this.ballspeed > 1){return;}
    if(this.menulock){return;}
	if(this.ball.inpit){return;}
    if(this.ball.inactive){return;}
    if(this.slowcheat){
		if(!(this.slowmode)){this.slowChange();}
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

slowChange: function(){
		for(var i=0; i<this.specialgroup.length; i++){
			belt = this.specialgroup.children[i];
			if(!(belt.design)){
				belt.animations.stop();
				belt.animations.play('slowroll');
			}
		}
		if(this.screen == 4){
			this.objectgroup.children[0].body.rotateRight(5);
			this.objectgroup.children[1].body.rotateLeft(5);
			this.objectgroup.children[2].body.rotateRight(5);
		}
		else if(this.screen == 6){
			this.objectgroup.children[6].body.rotateRight(10);
			this.objectgroup.children[7].body.rotateLeft(10);
		}
},

fireShot: function(){
    if(this.menulock){return;}
	if(this.aimactive){
		if(this.slowmode){
			for(var i=0; i<this.specialgroup.length; i++){
				belt = this.specialgroup.children[i];
				if(!(belt.design)){
					belt.animations.stop();
					belt.animations.play('roll');
				}
			}
			if(this.screen == 4){
				this.objectgroup.children[0].body.rotateRight(18);
				this.objectgroup.children[1].body.rotateLeft(18);
				this.objectgroup.children[2].body.rotateRight(18);
			}
			else if(this.screen == 6){
				this.objectgroup.children[6].body.rotateRight(40);
				this.objectgroup.children[7].body.rotateLeft(40);
			}
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
            this.spark4.mode = 1; this.spark4.reset(656, 511);
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
	if(subject == 2){
		this.holerad = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
		this.holeang = this.holerad / 3.1416 * 180;}
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
	if(subject == 2){
		var y = Math.pow((obj2.y - obj1.y), 2);
		var x = Math.pow((obj2.x - obj1.x), 2);
		this.holedis = Math.sqrt(x + y);}
},
    
checkOverlap: function(spriteA, spriteB){
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
},
    
despawnUpdate: function(){
    for (var i = 0; i < this.objectgroup.length; i++){
        this.objectgroup.children[i].alpha -= .125;
    }
	for (var i = 0; i < this.specialgroup.length; i++){
        this.specialgroup.children[i].alpha -= .125;
    }
    this.pad.alpha -= .125;
    this.hole.alpha -= .125;
    if(this.objectgroup.children[0].alpha == 0){
        this.despawn = false;
        this.objectgroup.callAll('kill');
        this.objectgroup.removeAll();
		this.specialgroup.callAll('kill');
        this.specialgroup.removeAll();
        this.electricitysound.play();
        for (var i = 0; i < this.spawngroup.length; i++){
            this.spawngroup.children[i].x = -50;}
    
        switch(this.screen){ //jumphere
            case 0: {this.ball.spawnx = 850; this.ball.spawny = 400; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 800; this.hole.y = 500; this.pad.x = 800; this.pad.y = 500; break;}
            case 1: {this.ball.spawnx = 800; this.ball.spawny = 300; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 750; this.hole.y = 400; this.pad.x = 750; this.pad.y = 400; break;}
            case 2: {this.ball.spawnx = 630; this.ball.spawny = 450; this.goal = 4; this.sgoal = 4;
                     this.hole.x = 250; this.hole.y = 450; this.pad.x = 250; this.pad.y = 450; break;}
            case 3: {this.ball.spawnx = 350; this.ball.spawny = 330; this.goal = 2; this.sgoal = 2;
                     this.hole.x = 900; this.hole.y = 300; this.pad.x = 900; this.pad.y = 300; break;}
            case 4: {this.ball.spawnx = 500; this.ball.spawny = 500; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 350; this.hole.y = 350; this.pad.x = 350; this.pad.y = 350; break;}
            case 5: {this.ball.spawnx = 250; this.ball.spawny = 450; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 1050; this.hole.y = 450; this.pad.x = 1050; this.pad.y = 450; break;}
            case 6: {this.ball.spawnx = 500; this.ball.spawny = 450; this.goal = 3; this.coursetimer = 270; this.sgoal = 3;
                     this.hole.x = 940; this.hole.y = 300; this.pad.x = 940; this.pad.y = 300; break;}
            case 7: {this.ball.spawnx = 250; this.ball.spawny = 250; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 780; this.hole.y = 533; this.pad.x = 780; this.pad.y = 533; break;} 
            case 8: {this.ball.spawnx = 625; this.ball.spawny = 650; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 650; this.hole.y = 250; this.pad.x = 650; this.pad.y = 250; break;}
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
    if(this.screen == 9){this.completeGame();}
    else{
        this.signnumber.frame = this.screen;
        this.electrongroup.callAll('kill');
        this.electrongroup.removeAll();
        this.despawn = true;

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
    this.stroke = 0;
    totalstroke = 100;
	this.ball.body.reset(-200, -200);
    this.balloverlay.reset(-200,-200);
    this.spark4.mode = 1; this.spark4.reset(656, 511);
    this.expandMenu();
    if(this.screen == 8){
        for(var i = 0; i < 30; i++){
            this.scorewindow.moveDown();
            this.stroketext2.moveDown();
            this.stroketext.moveDown();
            this.scoretext2.moveDown();
            this.scoretext.moveDown();
        }
        this.scorewindow.moveUp();
        this.stroketext2.moveUp();
        this.stroketext.moveUp();
        this.scoretext2.moveUp();
        this.scoretext.moveUp();
    }
    this.screen = input;
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
    
specialSpawn: function(){
    switch(this.screen){
        case 0: {break;}
        case 1: {break;}
        case 2: {break;}
        case 3: {
			this.spawnVeyerBelt(545, 360, 90);
			this.spawnVeyerBelt(545, 440, 90);
			this.spawnVeyerBelt(545, 520, 90);
			this.spawnVeyerBelt(545, 600, 90);
            this.spawnVeyerBelt(615, 360, 90);
			this.spawnVeyerBelt(615, 440, 90);
			this.spawnVeyerBelt(615, 520, 90);
			this.spawnVeyerBelt(615, 600, 90);
			this.spawnVeyerBelt(685, 360, 90);
			this.spawnVeyerBelt(685, 440, 90);
			this.spawnVeyerBelt(685, 520, 90);
			this.spawnVeyerBelt(685, 600, 90);
			this.spawnVeyerBelt(755, 360, 90);
			this.spawnVeyerBelt(755, 440, 90);
			this.spawnVeyerBelt(755, 520, 90);
			this.spawnVeyerBelt(755, 600, 90);
			break;}
        case 4: {break;}
        case 5: {
             belt = this.specialgroup.create(460, 234, 'veyerbelt');
            belt.scale.setTo(1.6, .9);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
             belt = this.specialgroup.create(460, 250, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
			
            this.spawnVeyerBelt(540, 250, 0);
			this.spawnVeyerBelt(620, 250, 0);
			this.spawnVeyerBelt(700, 250, 0);
	
             belt = this.specialgroup.create(790, 250, 'veyerbelt');
            belt.scale.setTo(1.6);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
             belt = this.specialgroup.create(780, 250, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
             belt = this.specialgroup.create(850, 260, 'veyerbelt');
            belt.scale.setTo(1.6);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
			belt.angle = 90;
             belt = this.specialgroup.create(850, 270, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
			belt.angle = 90;
			
			this.spawnVeyerBelt(850, 350, 90);
			this.spawnVeyerBelt(850, 430, 90);
            this.spawnVeyerBelt(850, 510, 90);
            
             belt = this.specialgroup.create(850, 590, 'veyerbelt');
            belt.scale.setTo(1.6);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
			belt.angle = 90;
             belt = this.specialgroup.create(850, 580, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
			belt.angle = 90;
			
			this.spawnVeyerBelt(840, 650, 180);
            this.spawnVeyerBelt(760, 650, 180);
			this.spawnVeyerBelt(680, 650, 180);
			this.spawnVeyerBelt(600, 650, 180);
            
             belt = this.specialgroup.create(510, 650, 'veyerbelt');
            belt.scale.setTo(1.6);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
			belt.angle = 180;
             belt = this.specialgroup.create(520, 650, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
			belt.angle = 180;
			
			this.spawnVeyerBelt(450, 640, -90);
			this.spawnVeyerBelt(450, 560, -90);
            this.spawnVeyerBelt(450, 480, -90);
            this.spawnVeyerBelt(450, 400, -90);
            
             belt = this.specialgroup.create(450, 310, 'veyerbelt');
            belt.scale.setTo(1.6);
            belt.anchor.setTo(.5);
            belt.design = 1;
            belt.alpha = 0;
			belt.angle = -90;
             belt = this.specialgroup.create(450, 320, 'veyerbelt');
            belt.scale.setTo(2);
            belt.anchor.setTo(.5);
			belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
            belt.animations.add('roll', [0,1,2,3,4], 14, true);
            belt.animations.play('roll');
            belt.tint = 0x666699;
            belt.design = 0;
            belt.alpha = 0;
			belt.angle = -90;
            break;}
        case 6: {break;}
        case 7: {break;}
        case 8: {break;}
    }
},

spawnVeyerBelt: function(x, y, a){
	 belt = this.specialgroup.create(x, y, 'veyerbelt');
	belt.scale.setTo(1.6);
	belt.anchor.setTo(.5);
	belt.design = 1;
	belt.alpha = 0;
	belt.angle = a;
	 belt = this.specialgroup.create(x, y, 'veyerbelt');
	belt.scale.setTo(2);
	belt.anchor.setTo(.5);
	belt.animations.add('slowroll', [0,1,2,3,4], 4, true);
	belt.animations.add('roll', [0,1,2,3,4], 14, true);
	belt.animations.play('roll');
	belt.tint = 0x666699;
	belt.design = 0;
	belt.alpha = 0;
	belt.angle = a;
},
    
electronSpawn: function(){
    switch(this.screen){
        case 0: {
            glow= this.electrongroup.create(463, 550, 'electron');
            glow= this.electrongroup.create(640, 350, 'electron');
            glow= this.electrongroup.create(700, 540, 'electron');
            break;
        }
        case 1: {
            glow= this.electrongroup.create(500, 430, 'electron');
            glow= this.electrongroup.create(650, 470, 'electron');
            glow= this.electrongroup.create(350, 470, 'electron');
            break;
        }
        case 2: {
            glow= this.electrongroup.create(880, 325, 'electron');
			glow= this.electrongroup.create(880, 575, 'electron');
            glow= this.electrongroup.create(565, 320, 'electron');
            glow= this.electrongroup.create(600, 605, 'electron');
            break;
        }
        case 3: {
            glow= this.electrongroup.create(650, 450, 'electron');
            glow= this.electrongroup.create(900, 400, 'electron');
            break;
        }
        case 4: {
            glow= this.electrongroup.create(772, 622, 'electron');
            glow= this.electrongroup.create(790, 320, 'electron');
            glow= this.electrongroup.create(425, 310, 'electron');
            break;
        }
        case 5: {
            glow= this.electrongroup.create(650, 250, 'electron');
            glow= this.electrongroup.create(650, 650, 'electron');
            glow= this.electrongroup.create(970, 550, 'electron');
            break;
        }
        case 6: {
            glow= this.electrongroup.create(350, 450, 'electron');
            glow= this.electrongroup.create(780, 450, 'electron');
            glow= this.electrongroup.create(940, 600, 'electron');
            break;
        }
        case 7: {
            glow= this.electrongroup.create(275, 400, 'electron');
            glow= this.electrongroup.create(275, 595, 'electron');
            glow= this.electrongroup.create(780, 583, 'electron');
            break;
        }
        case 8: {
            glow= this.electrongroup.create(650, 450, 'electron');
            glow= this.electrongroup.create(450, 450, 'electron');
            glow= this.electrongroup.create(850, 450, 'electron');
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
             bump = this.objectgroup.create(400, 550, 'bumpsquare');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
            break;
        }
        case 1: {
             bump = this.objectgroup.create(500, 400, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = 135;
             bump = this.objectgroup.create(350, 500, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -45;
             bump = this.objectgroup.create(650, 500, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -45;
			
			 bump = this.objectgroup.create(216, 216, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -135;
			 bump = this.objectgroup.create(1084, 216, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -45;
			 bump = this.objectgroup.create(1084, 684, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 45;
			 bump = this.objectgroup.create(216, 684, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 135;
            break;
        }
        case 2: {
             bump = this.objectgroup.create(900, 300, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1reflected");
            bump.body.static = true;
			bump.scale.x = -1;
			bump.body.angle = -90;
			 bump = this.objectgroup.create(900, 600, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1");
            bump.body.static = true;
			bump.body.angle = -90;
             bump = this.objectgroup.create(810, 450, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
			 bump = this.objectgroup.create(600, 640, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -45;
			 bump = this.objectgroup.create(600, 570, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = 135;
			 bump = this.objectgroup.create(500, 320, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
			 bump = this.objectgroup.create(630, 320, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
            break;
        }
        case 3: {
			 bump = this.objectgroup.create(550, 250, 'bumpsquare');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
             bump = this.objectgroup.create(650, 250, 'bumpsquare');
            bump.tint = 0x6666FF;
			this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(300, 100, 0, 0, 0);
            bump.body.static = true;
             bump = this.objectgroup.create(750, 250, 'bumpsquare');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
			
             bump = this.objectgroup.create(815, 240, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(344, 25, 86, 0, 0);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(815, 412, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
			bump.angle = 90;
			
             bump = this.objectgroup.create(815, 700, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(485, 640, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
			bump.angle = 90;
             bump = this.objectgroup.create(485, 468, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(344, 25, 86, 0, 0);
            bump.body.static = true;
            bump.body.angle = 90;
			
             bump = this.objectgroup.create(870, 620, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 180;
             bump = this.objectgroup.create(945, 620, 'bumpsquare');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
            break;
        }
        case 4: {
             bump = this.objectgroup.create(850, 650, 'bumpcross');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "cross1");
            bump.body.static = true;
            bump.body.rotateRight(18);
             bump = this.objectgroup.create(840, 200, 'bumpsquare');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
            bump.body.rotateLeft(18);
             bump = this.objectgroup.create(460, 200, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.rotateRight(18);
            
             bump = this.objectgroup.create(450, 600, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1reflected");
            bump.body.static = true;
			bump.scale.x = -1;
			bump.body.angle = 90;
            break;
        }
        case 5: {
             bump = this.objectgroup.create(550, 350, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(650, 350, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(750, 350, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(550, 450, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(650, 450, 'bumpsquare');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(298, 298, 0, 0, 0);
            bump.body.static = true;
             bump = this.objectgroup.create(750, 450, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(550, 550, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(650, 550, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(750, 550, 'bumpsquare');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(970, 630, 'bumpsquare');
            bump.tint = 0x6666FF;
			this.game.physics.p2.enable(bump);
            bump.body.static = true;
            break;
        }
        case 6: {
             bump = this.objectgroup.create(800, 364, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(300, 25, -62, 0, 0);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(800, 536, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(300, 25, 62, 0, 0);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(800, 139, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.angle = 90;
	    bump.anchor.setTo(.5);
             bump = this.objectgroup.create(800, 311, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.angle = 90;
	    bump.anchor.setTo(.5);
             bump = this.objectgroup.create(800, 589, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.angle = 90;
	    bump.anchor.setTo(.5);
             bump = this.objectgroup.create(800, 761, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.angle = 90;
	    bump.anchor.setTo(.5);
             bump = this.objectgroup.create(340, 380, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
            bump.body.rotateRight(40);
             bump = this.objectgroup.create(340, 520, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
            bump.body.rotateLeft(40);
             bump = this.objectgroup.create(940, 450, 'bumpsquare');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
            bump.body.angle = 45;
            break;
        }
        case 7: {
             bump = this.objectgroup.create(455, 300, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(264, 300, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
             bump = this.objectgroup.create(420, 250, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -180;
             bump = this.objectgroup.create(420, 350, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.angle = -90;
            bump.body.static = true;
             bump = this.objectgroup.create(215, 410, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(250, 460, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
             bump = this.objectgroup.create(250, 360, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.angle = 90;
            bump.body.static = true;
             bump = this.objectgroup.create(420, 450, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -180;
             bump = this.objectgroup.create(496, 597, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -90;
             bump = this.objectgroup.create(420, 650, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.angle = -90;
            bump.body.static = true;
             bump = this.objectgroup.create(250, 650, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
             bump = this.objectgroup.create(250, 560, 'bumptri2');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.angle = 90;
            bump.body.static = true;
             bump = this.objectgroup.create(596, 503, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 90;
             bump = this.objectgroup.create(696, 597, 'bumptri3');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -90;
             bump = this.objectgroup.create(555, 490, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(344, 25, 88, 0, 0);
            bump.body.static = true;
             bump = this.objectgroup.create(555, 610, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.setRectangle(344, 25, 172, 0, 0);
            bump.body.static = true;
             bump = this.objectgroup.create(727, 490, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(727, 610, 'bumprect1');
            bump.tint = 0x6666FF;
            bump.anchor.setTo(.5);
             bump = this.objectgroup.create(825, 550, 'bumprect1');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.body.angle = 90;
            break;
        }
        case 8: {
             bump = this.objectgroup.create(650, 350, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
            bump.rads = -1.57;
             bump = this.objectgroup.create(650, 550, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
            bump.rads = 1.57;
             bump = this.objectgroup.create(750, 450, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
            bump.rads = 0;
             bump = this.objectgroup.create(550, 450, 'bumpcolumn');
            bump.tint = 0x6666FF;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "column1");
            bump.body.static = true;
            bump.rads = -3.14;
             bump = this.objectgroup.create(965, 320, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1reflected");
            bump.body.static = true;
			bump.scale.x = -1;
			bump.body.angle = -90;
             bump = this.objectgroup.create(335, 580, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1reflected");
            bump.body.static = true;
			bump.scale.x = -1;
			bump.body.angle = 90;
             bump = this.objectgroup.create(335, 320, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1");
            bump.body.static = true;
			bump.body.angle = 90;
             bump = this.objectgroup.create(965, 580, 'bumptri1');
            bump.tint = 0x6666FF;
			bump.anchor.setTo(.5);
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle1");
            bump.body.static = true;
			bump.body.angle = -90;
            
            this.scorewindow.bringToTop();
            this.stroketext2.bringToTop();
            this.stroketext.bringToTop();
            this.scoretext2.bringToTop();
            this.scoretext.bringToTop();
            break;
        }
    }
}
};