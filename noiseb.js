var Nanogolf = Nanogolf || {};

Nanogolf.Noiseb = function(){};

Nanogolf.Noiseb.prototype = {
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
    
    this.orbtimer = 0;
    this.orblap = 1;
    this.orbleader = 0;
    
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
    this.musicindex = 3;
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
    
    this.track3 = this.add.audio('track3');
    if(!(modeflag)){
        this.track3.loopFull(Math.pow(.6, 10-musicvol));}
    this.track0 = this.add.audio('track0');
    if(track1unlocked){this.track1 = this.add.audio('track1');}
    if(track2unlocked){this.track2 = this.add.audio('track2');}
    
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
    this.stagechangesound = this.add.audio('curse');
    this.swooshsound = this.add.audio('swoosh');
    
     this.bg1 = this.add.sprite(650, 450, 'noisebg');
    this.bg1.tint = 0x222222;
    this.bg1.anchor.setTo(.5);
    
    this.specialgroup = this.add.group();
    this.specialSpawn();
	
	 this.pad = this.add.sprite(930, 450, 'pad');
	this.pad.anchor.setTo(.5);
    this.pad.alpha = 0;
	 this.hole = this.add.sprite(930, 450, 'hole');
	this.hole.anchor.setTo(.5);
	this.hole.animations.add('spin', [1,2], 2, true);
    this.hole.animations.add('spinslow', [1,2], .5, true);
	this.hole.animations.play('spin');
    this.hole.alpha = 0;
	
	this.objectgroup = this.add.group();
    this.objectSpawn();
    
     this.bg2 = this.add.sprite(650, 450, 'noiseoverlay');
    this.bg2.tint = 0x777777;
    this.bg2.anchor.setTo(.5);
    this.bg2.alpha = .15;
    
    this.ringtimer = 30 + Math.floor(Math.random() * 70);
    this.ringindex = 0;
    this.noiseringgroup = this.add.group();
    for (i=0; i<5; i++){
        ring = this.noiseringgroup.create(0, 0, 'noisering');
        ring.alpha = 0;
        ring.anchor.setTo(.5);
        ring.tint = 0xBBBBBB;
        ring.angle = Math.floor(Math.random() * 180);
        ring.spin = 0;
        ring.dimx = 0;
        ring.dimy = 0;
    }
    
    this.textring = this.add.sprite(100, 50, 'noisering');
    this.textring.anchor.setTo(.5);
    this.textring.scale.setTo(3);
    this.textring.alpha = .2;
    this.textring.tint = 0xAAAAAA;
    this.stroketext = this.add.text(210, 240, "STROKE: " + this.stroke, { font: "16px Fixedsys", fill: "#000044", align: "left" });
    this.stroketext.alpha = .6;
    this.stroketext.angle = -30;
    this.scoretext = this.add.text(210, 260, "SCORE: " + totalstroke, { font: "16px Fixedsys", fill: "#000044", align: "left" });
    this.scoretext.alpha = .6;
    this.scoretext.angle = -30;
    
	this.boundarywalls = this.add.group();
     this.boundary3 = this.boundarywalls.create(99, 450, 'noiseboundary');
    this.game.physics.p2.enable(this.boundary3);
	this.boundary3.body.static = true;
    this.boundary3.body.angle = -90;
     this.boundary4 = this.boundarywalls.create(1201, 450, 'noiseboundary');
    this.game.physics.p2.enable(this.boundary4);
	this.boundary4.body.static = true;
    this.boundary4.body.angle = 90;
     this.boundary1 = this.boundarywalls.create(650, 100, 'noiseboundary');
    this.game.physics.p2.enable(this.boundary1);
	this.boundary1.body.static = true;
     this.boundary2 = this.boundarywalls.create(650, 800, 'noiseboundary');
    this.game.physics.p2.enable(this.boundary2);
	this.boundary2.body.static = true;
	this.boundary2.body.angle = 180;

    this.boundarylines = this.add.group();
    line = this.boundarylines.create(650, 200, 'noisebline');
     line = this.boundarylines.create(650, 700, 'noisebline');
    line.angle = 180;
     line = this.boundarylines.create(1100, 450, 'noisebline2');
    line.angle = 90;
     line = this.boundarylines.create(200, 450, 'noisebline2');
    line.angle = 270;
     line = this.boundarylines.create(650, 0, 'noisebline3');
    line.angle = 180;
    line = this.boundarylines.create(650, 900, 'noisebline3');
     line = this.boundarylines.create(1300, 450, 'noisebline4');
    line.angle = 270;
     line = this.boundarylines.create(0, 450, 'noisebline4');
    line.angle = 90;
    for(var i=0; i<this.boundarylines.length; i++){
        line = this.boundarylines.children[i];
        line.alpha = .5;
        line.anchor.setTo(.5,1);
        line.scale.setTo(4,3);
    }
    line = this.boundarylines.create(200, 200, 'noisebcorner');
     line = this.boundarylines.create(1100, 200, 'noisebcorner');
    line.angle = 90;
     line = this.boundarylines.create(1100, 700, 'noisebcorner');
    line.angle = 180;
     line = this.boundarylines.create(200, 700, 'noisebcorner');
    line.angle = 270;
    for(var i=8; i<this.boundarylines.length; i++){
        line = this.boundarylines.children[i];
        line.anchor.setTo(1);
        line.alpha = .5;
        line.scale.setTo(3,3);
    }
    
    this.orbgroup1 = this.add.group();
    orb = this.orbgroup1.create(100,100, 'noiseorb2');
    orb.dir = 0;
    orb.tint = 0x990000;
    orb = this.orbgroup1.create(100,150, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x009900;
    orb = this.orbgroup1.create(130,200, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x000099;
    orb = this.orbgroup1.create(70,200, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x009999;
    orb = this.orbgroup1.create(130,250, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x620776;
    orb = this.orbgroup1.create(70,250, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x999900;
    orb = this.orbgroup1.create(130,300, 'noiseorb2');
    orb.dir = 3;
    orb = this.orbgroup1.create(70,300, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0xea2e9d;
    orb = this.orbgroup1.create(130,350, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0x777777;
    orb = this.orbgroup1.create(70,350, 'noiseorb2');
    orb.dir = 3;
    orb.tint = 0xc97e03;
    for(i=0; i<this.orbgroup1.length; i++){
        orb = this.orbgroup1.children[i];
        orb.pos = i;
        orb.anchor.setTo(.5);
        orb.alpha = .8;
        orb.seco = 0;
    }
    this.firstplacetext = this.add.text(0, 0, '1st', { font: "11px System", fill: "#BB0000", align: "center" });
    this.firstplacetext.anchor.setTo(.5);
    this.laptext = this.add.text(100, 100, 'Lap: ' + this.orblap + ' / ∞', { font: "20px System", fontstyle: "bold", fill: "#BB0000", align: "center" });
    this.laptext.anchor.setTo(.5);
    
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
    this.ball.spawnx = 325;
    this.ball.spawny = 450;
    this.ball.z = 0;
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
    
    this.spawnorbgroup = this.add.group();
    for(i=0; i<100; i++){
        orb = this.spawnorbgroup.create(0, 0, 'noiseorb');
        orb.anchor.setTo(.5);
        orb.rads = -1.4;
        orb.alpha = .7;
        orb.tint = 0x777777;
    }
    
    this.menuCreate();
    
        this.ball.inpit = false;
        this.ball.inactive = false;
        this.ball.body.reset(325, 520);
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
        for(var i=0;i<3; i++){
            this.electrongroup.children[i].alpha = .3;}
        for(i=3;i<6; i++){
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
    this.ringUpdate();
	
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
},
    
ringUpdate: function(){
    this.ringtimer -= 1;
    if(!(this.ringtimer)){
        this.ringtimer = 40 + Math.floor(Math.random() * 10);
        this.ringindex += 1;
        if(this.ringindex == 5){this.ringindex = 0;}
        
        ring = this.noiseringgroup.children[this.ringindex];
        ring.reset(this.ball.x, this.ball.y);
        ring.scale.setTo(.1);
        ring.alpha = .2;
        if(this.ball.body.velocity.x > 0){ring.spin = 1 + this.ballspeed / 200;}
        else{ring.spin = 1 - this.ballspeed / 200;}
        rando = Math.floor(Math.random() * 6)
    }
    
    for(var i=0; i<this.noiseringgroup.length; i++){
        ring = this.noiseringgroup.children[i];
        if(ring.alpha){
            ring.alpha -= .002;
            ring.scale.x += .02;
            ring.scale.y += .02;
            ring.angle += ring.spin;
            if(ring.y < 350){ring.x += 1;}
            else if(ring.y > 550){ring.x -= 1;}
            if(ring.x < 525){ring.y -= 1;}
            else if(ring.x > 775){ring.y += 1;}
            if(ring.alpha < .004){ring.alpha = 0;}
        }
    }
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
    this.scoretext.alpha = 0;
    this.stroketext.alpha = 0;
    this.stroketext.setText("STROKE: " + this.stroke);
    this.scoretext.setText("SCORE: " + totalstroke);
    this.expandMenu();
    this.screen = 0;
    this.signnumber.frame = this.screen;
    this.electrongroup.callAll('kill');
    this.electrongroup.removeAll();
    this.despawn = true;
    this.spawntimer = 130;
    for(i=0; i<100; i++){
        orb = this.spawnorbgroup.children[i];
        orb.reset(0,0);
        orb.rads = -1.4;
        orb.alpha = .7;
    }
    
    this.sign.alpha = 1;
    this.signnumber.alpha = 1;
    
    this.ball.inpit = false;
    this.ball.inactive = true;
    this.balloverlay.x = this.ball.x; this.balloverlay.y = this.ball.y;
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
    this.spawntimer -= 1;
    
    if(this.spawntimer == 120){this.stagechangesound.play();}
    if(this.spawntimer < 120 && this.spawntimer > 19){
        this.spawnorbgroup.children[119 - this.spawntimer].reset(640, 188);
        for(var i=0; i<(119-this.spawntimer); i++){
            orb = this.spawnorbgroup.children[i];
            orb.angle += 2;
            orb.rads += .19 + .01 * Math.floor(Math.random() * 20);
            dist = .983 * this.getDistance(orb, this.camfocus, 3);
            orb.reset(650 + dist * Math.cos(orb.rads), 450 + dist * Math.sin(orb.rads));
        }
    }
    if(this.spawntimer < 20){
        modifier = .002 * (20 - this.spawntimer);
        for(i=0; i<this.spawnorbgroup.length; i++){
            orb = this.spawnorbgroup.children[i];
            orb.angle += 2;
            orb.rads += .19 - 5 * modifier;
            dist = (modifier +.983) * this.getDistance(orb, this.camfocus, 3);
            orb.reset(650 + dist * Math.cos(orb.rads), 450 + dist * Math.sin(orb.rads));
        }
    }
    
    if(!(this.spawntimer)){
        this.objectSpawn();
        this.specialSpawn();
        this.electronSpawn();
        
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
        this.swooshsound.play();
    }
},
    
fadeIn: function(){
    this.cycle = 0;
    for(var i=0; i<this.spawnorbgroup.length; i++){
        orb = this.spawnorbgroup.children[i];
        orb.angle += 2;
        orb.alpha -= .0066;
        if(this.cycle == this.objectgroup.length + this.specialgroup.length + 1){this.cycle = 0;}
        else if(this.cycle == this.objectgroup.length + this.specialgroup.length){
            orb.x = orb.x - .09 * (orb.x - this.hole.x);
            orb.y = orb.y - .09 * (orb.y - this.hole.y);
        }
        else if(this.cycle >= this.objectgroup.length){
            orb.x = orb.x - .09 * (orb.x - this.specialgroup.children[this.cycle - this.objectgroup.length].x);
            orb.y = orb.y - .09 * (orb.y - this.specialgroup.children[this.cycle - this.objectgroup.length].y);
        }
        if(this.cycle < this.objectgroup.length){
            orb.x = orb.x - .09 * (orb.x - this.objectgroup.children[this.cycle].x);
            orb.y = orb.y - .09 * (orb.y - this.objectgroup.children[this.cycle].y);
        }
        this.cycle += 1;
    }
    
    
    for(var i=0; i<this.objectgroup.length; i++){
        this.objectgroup.children[i].alpha += .01;
    }
    for(i=0; i<this.electrongroup.length/2; i++){
        this.electrongroup.children[i].alpha += .003;
    }
    for(i=this.electrongroup.length/2; i<this.electrongroup.length; i++){
        this.electrongroup.children[i].alpha += .01;
    }
    
    this.hole.alpha += .01;
    this.pad.alpha += .01;
    
    if(this.hole.alpha > .98){
        for(i=0; i<this.objectgroup.length; i++){
            this.objectgroup.children[i].alpha = 1;
        }
        for(i=0; i<this.electrongroup.length/2; i++){
            this.electrongroup.children[i].alpha = .3;
        }
        for(i=this.electrongroup.length/2; i<this.electrongroup.length; i++){
            this.electrongroup.children[i].alpha = 1;
        }
        for(i=0; i<this.spawnorbgroup.length; i++){
            this.spawnorbgroup.children[i].alpha = 0;
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
        case 1: {break;}
        case 2: {
			for(var i=0;i<this.objectgroup.length; i++){
				bump = this.objectgroup.children[i];
				bump.body.force.y = 350;
				if(bump.body.velocity.y > 700){bump.body.velocity.y = 700;}
				if(bump.alpha < .95){bump.alpha += .055;}
				if(bump.y > 650){
					bump.body.velocity.x = 0;
					rander = 410 + Math.floor(Math.random() * 480);
					bump.body.velocity.y = 100 + (rander * .2);
					bump.body.x = rander; bump.body.y = 220;
					bump.alpha = 0;
				}
			}
            break;}
        case 3: {break;}
        case 4: {
			this.coursetimer -= 1;
			if(this.coursetimer == 275){
				for(var i=12;i<17; i++){
					bump = this.objectgroup.children[i];
					bump.body.x = 0; bump.body.y = 0;
				}
			}
			else if(this.coursetimer == 205){
					this.objectgroup.children[12].body.x = 650;
					this.objectgroup.children[12].body.y = 350;
					this.objectgroup.children[13].body.x = 250;
					this.objectgroup.children[13].body.y = 450;
					this.objectgroup.children[14].body.x = 1050;
					this.objectgroup.children[14].body.y = 450;
					this.objectgroup.children[15].body.x = 500;
					this.objectgroup.children[15].body.y = 650;
					this.objectgroup.children[16].body.x = 800;
					this.objectgroup.children[16].body.y = 650;
					this.objectgroup.children[0].body.x = 350;
					this.objectgroup.children[2].body.x = 950;
					this.objectgroup.children[5].body.x = 550;
					this.objectgroup.children[6].body.x = 750;
			}
			else if(this.coursetimer == 70){
				for(var i=12;i<17; i++){
					bump = this.objectgroup.children[i];
					bump.body.x = 0; bump.body.y = 0;
				}
			}
			else if(this.coursetimer == 0){
				this.objectgroup.children[12].body.x = 450;
				this.objectgroup.children[12].body.y = 450;
				this.objectgroup.children[13].body.x = 850;
				this.objectgroup.children[13].body.y = 450;
				this.objectgroup.children[14].body.x = 650;
				this.objectgroup.children[14].body.y = 550;
				this.objectgroup.children[15].body.x = 450;
				this.objectgroup.children[15].body.y = 250;
				this.objectgroup.children[16].body.x = 850;
				this.objectgroup.children[16].body.y = 250;
				this.objectgroup.children[0].body.x = 550;
				this.objectgroup.children[2].body.x = 750;
				this.objectgroup.children[5].body.x = 350;
				this.objectgroup.children[6].body.x = 950;
				this.coursetimer = 410;
			}
			break;}
        case 5: {
			if(this.coursetimer){
				this.objectgroup.children[16].body.x += 2;
				this.objectgroup.children[17].body.x -= 2;
				this.objectgroup.children[18].body.x -= 2;
				this.objectgroup.children[19].body.x += 2;
				this.objectgroup.children[23].body.y += 1;
				this.objectgroup.children[24].body.y -= 1;
				this.objectgroup.children[25].body.y -= 1;
				this.specialgroup.children[0].x -= 1;
				this.specialgroup.children[1].x += 1;
				if(this.objectgroup.children[16].body.x > 580){this.coursetimer = 0;}
			}
			else{
				this.objectgroup.children[16].body.x -= 2;
				this.objectgroup.children[17].body.x += 2;
				this.objectgroup.children[18].body.x += 2;
				this.objectgroup.children[19].body.x -= 2;
				this.objectgroup.children[23].body.y -= 1;
				this.objectgroup.children[24].body.y += 1;
				this.objectgroup.children[25].body.y += 1;
				this.specialgroup.children[0].x += 1;
				this.specialgroup.children[1].x -= 1;
				if(this.objectgroup.children[16].body.x < 360){this.coursetimer = 1;}
			}
			break;}
        case 6: {
			if(this.slowmode){
				this.objectgroup.children[0].body.rotateRight(5);
				this.objectgroup.children[1].body.rotateRight(5);
				this.objectgroup.children[2].body.rotateRight(5);
				this.objectgroup.children[3].body.rotateRight(5);
				this.objectgroup.children[4].body.rotateRight(5);
				this.objectgroup.children[5].body.rotateRight(5);
				this.objectgroup.children[6].body.rotateRight(5);
			}
			else{
				this.objectgroup.children[0].body.rotateRight(18);
				this.objectgroup.children[1].body.rotateRight(18);
				this.objectgroup.children[2].body.rotateRight(18);
				this.objectgroup.children[3].body.rotateRight(18);
				this.objectgroup.children[4].body.rotateRight(18);
				this.objectgroup.children[5].body.rotateRight(18);
				this.objectgroup.children[6].body.rotateRight(18);
			}
			break;}
        case 7: {
			if(this.coursetimer){
				this.objectgroup.children[4].body.y += 2;
				if(this.objectgroup.children[4].body.y > 575){this.coursetimer = 0;}
			}
			else{
				this.objectgroup.children[4].body.y -= 2;
				if(this.objectgroup.children[4].body.y < 325){this.coursetimer = 1;}
			}
			break;}
        case 8: {
			for(var i = 0; i < this.objectgroup.length; i++){
				bump = this.objectgroup.children[i];
				bump.rads += .03;
				bump.body.x = 650 + bump.dist*Math.cos(bump.rads);
				bump.body.y = 450 + bump.dist*Math.sin(bump.rads);
				bump.body.rotation += .03;
			}
			break;}
    }
},
    
specialUpdate: function(){
    this.ball.z = 0;
    for(var i=0;i<this.specialgroup.length; i++){
        spec = this.specialgroup.children[i];
        switch(spec.design){
            case 2:{
                if(this.checkOverlap(this.ball, spec)){
                    if(spec.y - this.ball.y < 100){
                        if(spec.y - this.ball.y > 15){
							dist = this.getDistance(this.ball, spec, 3);
                            this.ball.z = 90 - dist;
							if(spec.y - this.ball.y > 50){this.ball.body.force.y = -200+2*Math.abs(this.ball.x-spec.x);}
							if(this.ball.body.force.y > 0){this.ball.body.force.y = 0;}
                        }
                    }
                    if(Math.abs(this.ball.x - spec.x) < 75){
                        if(this.ball.x < spec.x){
                            this.ball.body.force.x = -(240-2*Math.abs(this.ball.y-spec.y));
                            if(this.ball.body.force.x > 0){this.ball.body.force.x = 0;}
                        }
                        else{
                            this.ball.body.force.x = 240-2*Math.abs(this.ball.y-spec.y);
                            if(this.ball.body.force.x < 0){this.ball.body.force.x = 0;}
                        }
                    }
                }
                break;
            }
            case 3:{
                if(this.checkOverlap(this.ball, spec)){
                    if(this.ball.y - spec.y < 100){
                        if(this.ball.y - spec.y > 15){
                            dist = this.getDistance(this.ball, spec, 3);
                            this.ball.z = 90 - dist;
							if(this.ball.y - spec.y > 50){this.ball.body.force.y = 200-2*Math.abs(this.ball.x-spec.x);}
                            if(this.ball.body.force.y < 0){this.ball.body.force.y = 0;}
                        }
                    }
                    if(Math.abs(this.ball.x - spec.x) < 75){
                        if(this.ball.x < spec.x){
                            this.ball.body.force.x = -(240-2*Math.abs(this.ball.y-spec.y));
                            if(this.ball.body.force.x > 0){this.ball.body.force.x = 0;}
                        }
                        else{
                            this.ball.body.force.x = 240-2*Math.abs(this.ball.y-spec.y);
                            if(this.ball.body.force.x < 0){this.ball.body.force.x = 0;}
                        }
                    }
                }
                break;
            }
			case 1:{
                if(this.checkOverlap(this.ball, spec)){
                    if(Math.abs(this.ball.x - spec.x) < 75){
                        this.ball.z = 75 - Math.abs(this.ball.x - spec.x);
                        if(this.ball.x < spec.x){this.ball.body.force.x = -240;}
                        else{this.ball.body.force.x = 240;}
                    }
                }
                break;
            }
            case 4:{
                dist = this.getDistance(this.ball, spec, 3);
                if(dist < 52){
                    this.ball.z = 1.29*(52 - dist);
                    rads = this.getAngle(spec, this.ball, 3);
                    this.ball.body.force.x = 230 * Math.cos(rads);
                    this.ball.body.force.y = 230 * Math.sin(rads);
                }
                break;
            }
            case 5:{
                distx = Math.abs(this.ball.x - spec.x);
                if(distx < 39){
					disty = Math.abs(this.ball.y - spec.y);
					if(disty < 39){
						this.ball.body.velocity.x = this.ball.body.velocity.x * .965;
						this.ball.body.velocity.y = this.ball.body.velocity.y * .965;
						if(this.ballspeed < 8){
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
							this.ball.respawning = true;
						}
						return;
					}
				}
                break;
            }
			case 6:{
				if(spec.orient == 0){
					if(Math.abs(spec.y - this.ball.y) < 2.5*spec.scale.y){
						if(this.ball.x > spec.x){
							dist = spec.x+1.5*spec.scale.x;
							if(this.ball.x < dist){
								this.ball.z = 94-.48*(this.ball.x-spec.x);
								this.ball.body.force.x = 230;
							}
						}
					}
				}
				else if(spec.orient == 1){
					if(Math.abs(spec.y - this.ball.y) < 2.5*spec.scale.y){
						if(this.ball.x < spec.x){
							dist = spec.x-1.5*spec.scale.x;
							if(this.ball.x > dist){
								this.ball.z = 94-.48*(spec.x-this.ball.x);
								this.ball.body.force.x = -230;
							}
						}
					}
				}
				break;
			}
        }
    }
	if(this.ball.z < 0){this.ball.z = 0;}
    if(!(this.ball.inpit)){this.balloverlay.scale.setTo(.15 + .0004 * this.ball.z);}
	if(this.bigcheat){this.balloverlay.scale.setTo(.225 + .00055 * this.ball.z);}
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
        if(track2unlocked){this.track2.volume = Math.pow(.6, 10-musicvol);}
        this.track3.volume = Math.pow(.6, 10-musicvol);
    }
    this.menu1sound.play();
},
    
musicVolRight: function(){
    if(musicvol < 10){
        this.soundgroup.children[21].x += 33;
        musicvol += 1;
        this.track0.volume = Math.pow(.6, 10-musicvol);
        if(track1unlocked){this.track1.volume = Math.pow(.6, 10-musicvol);}
        if(track2unlocked){this.track2.volume = Math.pow(.6, 10-musicvol);}
        this.track3.volume = Math.pow(.6, 10-musicvol);
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
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track3.loopFull(Math.pow(.6, 10-musicvol));
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
            this.soundgroup.children[23].tint = 0xFFFFFF;
            this.track3.loopFull(Math.pow(.6, 10-musicvol));
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
    this.textring.angle -= 1;
    
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
            if(i < this.electrongroup.length/2){this.electrongroup.children[i].angle += 30;}}
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
    if(this.hole.alpha < .97){
        this.hole.alpha += .022;
        this.pad.alpha += .022;
    }
    if(this.balloverlay.alpha > .98){
        this.ball.respawning = false;}
},

bgUpdate: function(){
    this.bg2.angle += .4;
    
    rand1 = Math.floor(Math.random() *3);
    rand2 = Math.floor(Math.random() *3);
    rand3 = Math.floor(Math.random() *3);
    if(rand1 == 0){
        if(this.scoretext.x > 203){this.stroketext.x -= .1; this.scoretext.x -= .1;}}
    else if(rand1 == 1){
        if(this.scoretext.x < 217){this.stroketext.x += .1; this.scoretext.x += .1;}}
    if(rand2 == 0){
        if(this.scoretext.y > 253){this.stroketext.y -= .1; this.scoretext.y -= .1;}}
    else if(rand2 == 1){
        if(this.scoretext.y < 267){this.stroketext.y += .1; this.scoretext.y += .1;}}
    if(rand3 == 0){
        if(this.scoretext.angle > -33){this.stroketext.angle -= .1; this.scoretext.angle -= .1;}}
    else if(rand3 == 1){
        if(this.scoretext.angle < -27){this.stroketext.angle += .1; this.scoretext.angle += .1;}}
    
    if(!(this.orbtimer)){
        this.orbtimer = 20 + Math.floor(Math.random() * 70);}
    this.orbtimer -= 1;
    
    for(var i=0; i<this.orbgroup1.length; i++){
        orb = this.orbgroup1.children[i];
        orb.angle += 3;
        if(!(this.orbtimer)){
            orb.seco = Math.floor(Math.random() * 5);}
        
        if(orb.dir == this.orbgroup1.children[this.orbleader].dir){
            if(i != this.orbleader){
                switch(orb.dir){
                    case 0:{
                        if(orb.x > this.orbgroup1.children[this.orbleader].x){
                            this.orbleader = i;}
                        break;
                    }
                    case 1:{
                        if(orb.y > this.orbgroup1.children[this.orbleader].y){
                            this.orbleader = i;}
                        break;
                    }
                    case 2:{
                        if(orb.x < this.orbgroup1.children[this.orbleader].x){
                            this.orbleader = i;}
                        break;
                    }
                    case 3:{
                        if(orb.y < this.orbgroup1.children[this.orbleader].y){
                            this.orbleader = i;}
                        break;
                    }
                }
            }
        }
        
        switch(orb.dir){
            case 0:{
                orb.x += 1.5;
                if(orb.x > 1195){orb.dir = 1;}
                switch(orb.seco){
                    case 0: {break;}
                    case 1: {orb.x += .5; break;}
                    case 2: {orb.x -= .5; break;}
                    case 3: {if(orb.y < 170){orb.y += .5;} break;}
                    case 4: {if(orb.y > 30){orb.y -= .5;} break;}
                }
                break;
            }
            case 1:{
                orb.y += 1.5;
                if(orb.y > 798){orb.dir = 2;}
                switch(orb.seco){
                    case 0: {break;}
                    case 1: {orb.y += .5; break;}
                    case 2: {orb.y -= .5; break;}
                    case 3: {if(orb.x < 1270){orb.x += .5;} break;}
                    case 4: {if(orb.x > 1130){orb.x -= .5;} break;}
                }
                break;
            }
            case 2:{
                orb.x -= 1.5;
                if(orb.x < 105){orb.dir = 3;}
                switch(orb.seco){
                    case 0: {break;}
                    case 1: {orb.x += .5; break;}
                    case 2: {orb.x -= .5; break;}
                    case 3: {if(orb.y < 870){orb.y += .5;} break;}
                    case 4: {if(orb.y > 730){orb.y -= .5;} break;}
                }
                break;
            }
            case 3:{
                orb.y -= 1.5;
                if(orb.y < 103){
                    orb.dir = 0;
                    if(i == this.orbleader){this.orblap += 1; this.laptext.setText('Lap: ' + this.orblap + ' / ∞');}}
                switch(orb.seco){
                    case 0: {break;}
                    case 1: {orb.y += .5; break;}
                    case 2: {orb.y -= .5; break;}
                    case 3: {if(orb.x < 170){orb.x += .5;} break;}
                    case 4: {if(orb.x > 30){orb.x -= .5;} break;}
                }
                break;
            }
        }
    }
    this.firstplacetext.x = this.orbgroup1.children[this.orbleader].x;
    this.firstplacetext.y = this.orbgroup1.children[this.orbleader].y - 15;
    
    this.noisetimer -= 1;
    if(this.noisetimer > 49){
        for(var i=0; i<this.boundarylines.length; i++){
            this.boundarylines.children[i].alpha += .01;
            this.boundarylines.children[i].scale.y += .46;
            if(i > 5){this.boundarylines.children[i].scale.x += .46;}
        }
    }
    else{
        for(var i=0; i<this.boundarylines.length; i++){
            this.boundarylines.children[i].alpha -= .01;
            this.boundarylines.children[i].scale.y -= .46;
            if(i > 7){this.boundarylines.children[i].scale.x -= .46;}
        }
    }
    if(!(this.noisetimer)){this.noisetimer = 100;}
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
    this.collisiongroup.children[this.collisionindex%3].tint = 0xAA00AA;
    this.collisiongroup.children[this.collisionindex%3].mode = 2;
    this.collisiongroup.children[this.collisionindex%3].timer = 15;
    this.collisiongroup.children[this.collisionindex%3].scale.setTo(.001 * this.ballspeed);
    this.collisiongroup.children[this.collisionindex%3].alpha = .36;
    this.collisiongroup.children[this.collisionindex%3].angle = this.angle + 90;
},
    
aimShot: function(){
    if(this.freecheat){}
    else if(this.ballspeed > 8){return;}
    if(this.menulock){return;}
	if(this.ball.inpit){return;}
    if(this.ball.inactive){return;}
    if(this.slowcheat){
		if(this.screen == 3){
			this.objectgroup.children[0].body.rotateRight(5);
			this.objectgroup.children[1].body.rotateRight(5);
			this.objectgroup.children[2].body.rotateRight(5);
		}
		else if(this.screen == 5){
			this.objectgroup.children[26].body.rotateRight(9);
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
		if(this.slowmode){
			if(this.screen == 3){
				this.objectgroup.children[0].body.rotateRight(18);
				this.objectgroup.children[1].body.rotateRight(18);
				this.objectgroup.children[2].body.rotateRight(18);
			}
			else if(this.screen == 5){
				this.objectgroup.children[26].body.rotateRight(36);
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
    for(var i=0; i<this.objectgroup.length; i++){
        object = this.objectgroup.children[i];
        if(object.scale.x > .03){object.scale.x -= .02;}
        if(object.scale.y > .03){object.scale.y -= .02;}
        object.alpha -= .012;
    }
	for(i=0; i<this.specialgroup.length; i++){
        spec = this.specialgroup.children[i];
        spec.scale.x = spec.scale.x * .95;
        spec.scale.y = spec.scale.y * .95;
        spec.alpha = spec.alpha * .95;
    }
    this.hole.scale.x -= .02; this.hole.scale.y -= .02; this.hole.alpha -= .012;
    this.pad.scale.x -= .02; this.pad.scale.y -= .02; this.pad.alpha -= .012;
    
    if(this.hole.scale.x < .03){
        this.despawn = false;
        this.objectgroup.callAll('kill');
        this.objectgroup.removeAll();
        this.specialgroup.callAll('kill');
        this.specialgroup.removeAll();
        this.hole.alpha = 0;
        this.pad.alpha = 0;
        this.bgcounter = 700;
    
        switch(this.screen){
            case 0: {this.ball.spawnx = 325; this.ball.spawny = 520; this.goal = 3; this.sgoal = 3;
                     this.hole.x = 930; this.hole.y = 450; this.pad.x = 930; this.pad.y = 450; break;}
            case 1: {this.ball.spawnx = 300; this.ball.spawny = 385; this.goal = 5; this.sgoal = 5;
                     this.hole.x = 1015; this.hole.y = 610; this.pad.x = 1015; this.pad.y = 610; break;}
            case 2: {this.ball.spawnx = 300; this.ball.spawny = 500; this.goal = 7; this.sgoal = 7;
                     this.hole.x = 600; this.hole.y = 500; this.pad.x = 600; this.pad.y = 500; break;}
            case 3: {this.ball.spawnx = 510; this.ball.spawny = 550; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 650; this.hole.y = 650; this.pad.x = 650; this.pad.y = 650; break;}
            case 4: {this.ball.spawnx = 325; this.ball.spawny = 450; this.goal = 7; this.sgoal = 7; this.coursetimer = 410;
                     this.hole.x = 650; this.hole.y = 350; this.pad.x = 650; this.pad.y = 350; break;}
            case 5: {this.ball.spawnx = 450; this.ball.spawny = 505; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 315; this.hole.y = 255; this.pad.x = 315; this.pad.y = 255; break;}
            case 6: {this.ball.spawnx = 625; this.ball.spawny = 620; this.goal = 5; this.sgoal = 5;
                     this.hole.x = 650; this.hole.y = 450; this.pad.x = 650; this.pad.y = 450; break;}
            case 7: {this.ball.spawnx = 800; this.ball.spawny = 450; this.goal = 6; this.sgoal = 6;
                     this.hole.x = 1050; this.hole.y = 450; this.pad.x = 1050; this.pad.y = 450; break;}
            case 8: {this.ball.spawnx = 380; this.ball.spawny = 450; this.goal = 12; this.sgoal = 12;
                     this.hole.x = 650; this.hole.y = 450; this.pad.x = 650; this.pad.y = 450; break;}
        }
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
        this.signnumber.frame = this.screen;
        this.electrongroup.callAll('kill');
        this.electrongroup.removeAll();
        this.despawn = true;
        this.spawntimer = 130;
        for(i=0; i<100; i++){
            orb = this.spawnorbgroup.children[i];
            orb.reset(0,0);
            orb.rads = -1.4;
            orb.alpha = .7;
        }
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
    this.spawntimer = 130;
    for(i=0; i<100; i++){
        orb = this.spawnorbgroup.children[i];
        orb.reset(0,0);
        orb.rads = -1.4;
        orb.alpha = .7;
    }
    
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
        case 1: {
			 spec = this.specialgroup.create(695, 400, 'noisehill');
            spec.anchor.setTo(.5);
            spec.alpha = .2;
            spec.scale.setTo(18);
            spec.design = 4;
			 spec = this.specialgroup.create(850, 500, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			break;}
        case 2: {
			 spec = this.specialgroup.create(435, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
             spec = this.specialgroup.create(521, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(607, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(693, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(779, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(865, 655, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
            break;}
        case 3: { 		
			 spec = this.specialgroup.create(350, 250, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(550, 250, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(750, 250, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(950, 250, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			
			 spec = this.specialgroup.create(250, 350, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(450, 350, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(650, 350, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(850, 350, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(1050, 350, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			
			 spec = this.specialgroup.create(350, 450, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(550, 450, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(750, 450, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(950, 450, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			
			 spec = this.specialgroup.create(250, 550, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(450, 550, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(650, 550, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(850, 550, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(1050, 550, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			
			 spec = this.specialgroup.create(350, 650, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(550, 650, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(750, 650, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(950, 650, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			break;}
        case 4: {break;}
        case 5: {
			 spec = this.specialgroup.create(750, 508, 'pit');
            spec.anchor.setTo(.5);
            spec.alpha = .3;
            spec.scale.setTo(4);
            spec.design = 5;
			spec.tint = 0xFF0000;
			 spec = this.specialgroup.create(420, 385, 'noisehill');
            spec.anchor.setTo(.5);
            spec.alpha = .2;
            spec.scale.setTo(18);
            spec.design = 4;
			break;}
        case 6: {break;}
        case 7: {
			 spec = this.specialgroup.create(200, 450, 'noisehill4');
            spec.anchor.setTo(0,.5);
            spec.alpha = .3;
            spec.scale.setTo(400, 100);
			spec.design = 6;
			spec.orient = 0;
			break;}
		case 8:{break;}
    }
},
    
electronSpawn: function(){
    switch(this.screen){
        case 0: {
            glow= this.electrongroup.create(530, 340, 'electron');
            glow= this.electrongroup.create(705, 550, 'electron');
            glow= this.electrongroup.create(870, 340, 'electron');
            break;
        }
        case 1: {
            glow= this.electrongroup.create(525, 530, 'electron');
            glow= this.electrongroup.create(690, 450, 'electron');
            glow= this.electrongroup.create(850, 370, 'electron');
			glow= this.electrongroup.create(790, 650, 'electron');
			glow= this.electrongroup.create(590, 250, 'electron');
            break;
        }
        case 2: {
            glow= this.electrongroup.create(525, 290, 'electron');
            glow= this.electrongroup.create(650, 340, 'electron');
            glow= this.electrongroup.create(740, 390, 'electron');
			glow= this.electrongroup.create(470, 440, 'electron');
			glow= this.electrongroup.create(825, 490, 'electron');
			glow= this.electrongroup.create(765, 540, 'electron');
			glow= this.electrongroup.create(705, 590, 'electron');
            break;
        }
        case 3: {
            glow= this.electrongroup.create(285, 450, 'electron');
            glow= this.electrongroup.create(725, 350, 'electron');
            glow= this.electrongroup.create(850, 400, 'electron');
            glow= this.electrongroup.create(1050, 650, 'electron');
			glow= this.electrongroup.create(350, 350, 'electron');
			glow= this.electrongroup.create(800, 595, 'electron');
            break;
        }
        case 4: {
            glow= this.electrongroup.create(650, 250, 'electron');
            glow= this.electrongroup.create(650, 550, 'electron');
            glow= this.electrongroup.create(350, 550, 'electron');
            glow= this.electrongroup.create(970, 650, 'electron');
            glow= this.electrongroup.create(950, 450, 'electron');
			glow= this.electrongroup.create(350, 250, 'electron');
			glow= this.electrongroup.create(550, 450, 'electron');
            break;
        }
        case 5: {
            glow= this.electrongroup.create(900, 450, 'electron');
			glow= this.electrongroup.create(470, 380, 'electron');
            glow= this.electrongroup.create(355, 370, 'electron');
            glow= this.electrongroup.create(307, 632, 'electron');
            glow= this.electrongroup.create(986, 635, 'electron');
            glow= this.electrongroup.create(955, 255, 'electron');
            break;
        }
        case 6: {
            glow= this.electrongroup.create(1015, 630, 'electron');
            glow= this.electrongroup.create(840, 440, 'electron');
            glow= this.electrongroup.create(640, 290, 'electron');
            glow= this.electrongroup.create(300, 230, 'electron');
			glow= this.electrongroup.create(388, 404, 'electron');
            break;
        }
        case 7: {
            glow= this.electrongroup.create(680, 400, 'electron');
            glow= this.electrongroup.create(680, 500, 'electron');
            glow= this.electrongroup.create(423, 214, 'electron');
			glow= this.electrongroup.create(320, 488, 'electron');
			glow= this.electrongroup.create(397, 566, 'electron');
			glow= this.electrongroup.create(245, 334, 'electron');
            break;
        }
        case 8: {
            glow= this.electrongroup.create(530, 450, 'electron');
            glow= this.electrongroup.create(770, 450, 'electron');
            glow= this.electrongroup.create(650, 360, 'electron');
            glow= this.electrongroup.create(650, 540, 'electron');
			glow= this.electrongroup.create(600, 300, 'electron');
            glow= this.electrongroup.create(700, 600, 'electron');
            glow= this.electrongroup.create(400, 500, 'electron');
			glow= this.electrongroup.create(900, 400, 'electron');
			glow= this.electrongroup.create(510, 250, 'electron');
			glow= this.electrongroup.create(790, 650, 'electron');
			glow= this.electrongroup.create(315, 625, 'electron');
			glow= this.electrongroup.create(985, 275, 'electron');
            break;
        }
    }
    for(var i=0; i<this.goal; i++){
		 glow = this.electrongroup.children[i];
		glow.anchor.setTo(.5);
        glow.alpha = .3;
        glow.scale.setTo(1.3);
		 electron = this.electrongroup.create(glow.x, glow.y, 'electron');
		electron.anchor.setTo(.5);
        electron.scale.setTo(.75);
	}
},
    
objectSpawn: function(){
    switch(this.screen){
        case 0: {
             bump = this.objectgroup.create(580, 320, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(705, 580, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
			bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(830, 320, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
			bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
            break;
        }
        case 1: { 
             bump = this.objectgroup.create(450, 286, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(610, 614, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(770, 286, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(930, 614, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			
			 bump = this.objectgroup.create(450, 458, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(610, 442, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(770, 458, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(930, 442, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 10;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.angle = 90;
			
			 bump = this.objectgroup.create(1015, 420, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
            break;
        }
        case 2: {
			rander = 410 + Math.floor(Math.random() * 480);
			rander2 = 220 + Math.floor(Math.random() * 400);
             bump = this.objectgroup.create(rander, rander2, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 3;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.velocity.y = 150;
            
			rander = 410 + Math.floor(Math.random() * 480);
			rander2 = 220 + Math.floor(Math.random() * 400);
             bump = this.objectgroup.create(rander, rander2, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 3;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.velocity.y = 150;
			
			rander = 410 + Math.floor(Math.random() * 480);
			rander2 = 220 + Math.floor(Math.random() * 400);
             bump = this.objectgroup.create(rander, rander2, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 3;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.velocity.y = 150;
			
			rander = 410 + Math.floor(Math.random() * 480);
			rander2 = 220 + Math.floor(Math.random() * 400);
             bump = this.objectgroup.create(rander, 450, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 3;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			bump.body.velocity.y = 150;
            break;
        }
        case 3: { 
			 bump = this.objectgroup.create(1100, 450, 'bumpcross');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "cross1");
            bump.body.static = true;
            bump.body.rotateRight(18);
             bump = this.objectgroup.create(200, 450, 'bumpcross');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "cross1");
            bump.body.static = true;
            bump.body.rotateRight(18);
			 bump = this.objectgroup.create(650, 250, 'bumpcross');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "cross1");
            bump.body.static = true;
            bump.body.rotateRight(18);
			
			 bump = this.objectgroup.create(650, 450, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(450, 650, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(850, 650, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
            break;
        }
        case 4: {
			 bump = this.objectgroup.create(550, 350, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(450, 350, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(750, 350, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(850, 350, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			
			 bump = this.objectgroup.create(450, 550, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(350, 550, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(950, 550, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			 bump = this.objectgroup.create(850, 550, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "square1");
            bump.body.static = true;
			
			 bump = this.objectgroup.create(240, 240, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(240, 660, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
			 bump = this.objectgroup.create(1060, 240, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -180;
			 bump = this.objectgroup.create(1060, 660, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -90;
			
			 bump = this.objectgroup.create(450, 450, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(850, 450, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(650, 550, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(450, 250, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(850, 250, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 5: {
             bump = this.objectgroup.create(180, 325, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			 bump = this.objectgroup.create(352, 325, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			 bump = this.objectgroup.create(524, 325, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(852, 25, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
             bump = this.objectgroup.create(696, 325, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			 bump = this.objectgroup.create(868, 325, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			
			 bump = this.objectgroup.create(938, 402, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(938, 497, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			
			 bump = this.objectgroup.create(868, 575, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			 bump = this.objectgroup.create(696, 575, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
			bump.body.clearShapes();
            bump.body.setRectangle(605, 25, -52, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(524, 575, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			 bump = this.objectgroup.create(427, 575, 'bumprect1');
            bump.tint = 0xFF6666;
            bump.anchor.setTo(.5);
            bump.alpha = 0;
			
			 bump = this.objectgroup.create(355, 500, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			
			 bump = this.objectgroup.create(453, 450, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(655, 450, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(554, 450, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(750, 450, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			
			 bump = this.objectgroup.create(360, 680, 'bumptri3');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -90;
			bump.alpha = 0;
			 bump = this.objectgroup.create(580, 610, 'bumptri3');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 90;
			bump.alpha = 0;
			 bump = this.objectgroup.create(910, 680, 'bumptri3');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = -90;
			bump.alpha = 0;
			 bump = this.objectgroup.create(690, 610, 'bumptri3');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.static = true;
            bump.body.angle = 90;
			bump.alpha = 0;
			
			 bump = this.objectgroup.create(1074, 545, 'bumpcolumn');
            bump.tint = 0xAA6666;;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(976, 450, 'bumptri3');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle3");
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(1078, 355, 'bumpsquare2');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
		
			 bump = this.objectgroup.create(650, 270, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(800, 305, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(500, 305, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
			
			 bump = this.objectgroup.create(350, 500, 'bumpsquare');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
			bump.body.rotateRight(36); 
            bump.alpha = 0;
			
			 bump = this.objectgroup.create(240, 240, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
			bump.body.angle = 90;
			 bump = this.objectgroup.create(240, 660, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
			 bump = this.objectgroup.create(1060, 240, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -180;
			 bump = this.objectgroup.create(1060, 660, 'bumptri2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.clearShapes();
            bump.body.loadPolygon("sprite_physics", "triangle2");
            bump.body.static = true;
            bump.body.angle = -90;
            break;
        }
        case 6: {
             bump = this.objectgroup.create(650, 450, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(1000, 450, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(300, 450, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(450, 325, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(850, 325, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(450, 575, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
			 bump = this.objectgroup.create(850, 575, 'bumprect1');
            bump.tint = 0xAA6666;
            this.game.physics.p2.enable(bump);
            bump.body.mass = 5;
			bump.body.damping = .5;
			bump.body.angularDamping = .5;
            bump.alpha = 0;
            break;
        }
        case 7: {
             bump = this.objectgroup.create(360, 240, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
			bump.body.angle = 60;
            bump.alpha = 0;
			 bump = this.objectgroup.create(500, 240, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
			bump.body.angle = 60;
            bump.alpha = 0;
			 bump = this.objectgroup.create(430, 660, 'bumprect1');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
			bump.body.angle = -60;
            bump.alpha = 0;
			 bump = this.objectgroup.create(322, 531, 'bumpsquare2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			 bump = this.objectgroup.create(680, 325, 'bumpcolumn');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.setCircle(24, 0, 0, 0);
            bump.body.static = true;
            bump.alpha = 0;
            break;
        }
        case 8: {
             bump = this.objectgroup.create(570, 400, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 94.34;
			bump.rads = 3.7;
			 bump = this.objectgroup.create(570, 360, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 120.42;
			bump.rads = 3.986;
			 bump = this.objectgroup.create(570, 320, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 152.643;
			bump.rads = 4.161;
			
			 bump = this.objectgroup.create(730, 400, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 94.34;
			bump.rads = -.559;
			 bump = this.objectgroup.create(730, 360, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 120.42;
			bump.rads = -.844;
			 bump = this.objectgroup.create(730, 320, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 152.643;
			bump.rads = -1.019;
			
			 bump = this.objectgroup.create(630, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 101.98;
			bump.rads = 1.768;
			 bump = this.objectgroup.create(590, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 116.619;
			bump.rads = 2.111;
			 bump = this.objectgroup.create(550, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 141.421;
			bump.rads = 2.356;
			 bump = this.objectgroup.create(670, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 101.98;
			bump.rads = 1.373;
			 bump = this.objectgroup.create(710, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 116.619;
			bump.rads = 1.03;
			 bump = this.objectgroup.create(750, 550, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 141.421;
			bump.rads = .785;
			
			 bump = this.objectgroup.create(790, 510, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 152.315;
			bump.rads = .404;
			 bump = this.objectgroup.create(510, 510, 'bumpsquare2');
            bump.tint = 0x000000;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 152.315;
			bump.rads = 2.737;
			
			 bump = this.objectgroup.create(710, 590, 'bumpsquare2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 152.315;
			bump.rads = 1.166;
			 bump = this.objectgroup.create(710, 630, 'bumpsquare2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 189.737;
			bump.rads = 1.249;
			 bump = this.objectgroup.create(670, 590, 'bumpsquare2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 141.421;
			bump.rads = 1.429;
			 bump = this.objectgroup.create(670, 630, 'bumpsquare2');
            bump.tint = 0xFF6666;
            this.game.physics.p2.enable(bump);
            bump.body.static = true;
            bump.alpha = 0;
			bump.dist = 181.108;
			bump.rads = 1.46;
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
     menu = this.menugroup.create(1045, 255, 'button');
    menu.anchor.setTo(.5);
    menu.scale.setTo(-1,1);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandCheats, this);
     text = this.add.text(this.menugroup.children[0].x, this.menugroup.children[0].y, 'CHEATS', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button');
    menu.anchor.setTo(.5);
    menu.alpha = 0;
    menu.events.onInputDown.add(this.expandNav, this);
     text = this.add.text(this.menugroup.children[2].x, this.menugroup.children[2].y, 'NAV', { font: "22px System", fill: "#ffffff", align: "center" });
    this.menugroup.add(text);
    text.anchor.setTo(.5);
    text.alpha = 0;
     menu = this.menugroup.create(1045, 255, 'button');
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