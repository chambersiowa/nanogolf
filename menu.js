var Nanogolf = Nanogolf || {};

Nanogolf.Menu = function(){};

Nanogolf.Menu.prototype = {
preload: function() {
	this.screen = 0;
	
    this.ballspeed = 0;
	this.aimactive = false;
	this.radians = 0;
	this.angle = 0;
	this.distance = 0;
    this.savespin = 0;
    
    this.camsnapback = false;
    this.rangeflag = false;
    
    this.speedvolmod = 0;
	
	this.animationtimer = 0;
    this.collisionindex = 0;
	
	this.boundarymode = 0;
	this.bgdarken = true;
    
    this.highscoreroom = false;
    this.hsdark = true;
	
	this.lootdistance = 400;
    this.lootcollected = 0;
	this.warpbright = false;
	this.warpcounter = 200;
    
    this.reboundflag = false;
    this.reboundcounter = 0;
	
	this.creditsflag = false;
	this.reverseflag = false;
},

    
create: function() {
    this.world.setBounds(0, 0, 1300, 900);
    
    this.track0 = this.add.audio('track0');
    this.track0.loopFull(Math.pow(.6, 10-musicvol));
    this.hitwallsound = this.add.audio('hitwall');
    this.hitwallsound.volume = sfxvol/10;
    this.hitwallsound.allowMultiple = true;
    this.hitballsound = this.add.audio('hitball');
    this.hitballsound.volume = sfxvol/10;
    this.materializesound = this.add.audio('materialize');
    this.materializesound.volume = sfxvol/10;
    this.laughsound = this.add.audio('laugh');
    
     this.bg2 = this.add.sprite(200, 200, 'menubg');
    this.bg2.alpha = .5;
	this.bg2.tint = 0xCCCCCC;
    this.bg3 = this.add.sprite(200, 200, 'menubg2');
    this.bg3.tint = 0xFFFFFF;
    this.bg3.alpha = 0;
    this.hsgroup = this.add.group();
    this.highscoretable = this.add.sprite(335, 190, 'highscoretable');
    this.highscoretable.alpha = 0;
    this.bg4 = this.add.sprite(200, 200, 'menubg2');
    this.bg4.tint = 0x999999;
    this.bg4.alpha = 0;
    this.scorefloor = this.add.sprite(779, 510, 'scoreplateau');
    this.scorefloor.tint = 0x888888;
    this.scorefloor.alpha = 0;
	 this.creditsbg = this.add.sprite(650, 450, 'creditsbg');
	 this.creditsbg.anchor.setTo(.5);
	this.creditsbg.scale.setTo(9,5);
	this.creditsbg.alpha = 0;

	 this.boundary3 = this.add.sprite(99, 450, 'menuboundary');
    this.game.physics.p2.enable(this.boundary3);
	this.boundary3.body.static = true;
    this.boundary3.body.angle = -90;
	this.boundary3.tint = 0x666666;
     this.boundary4 = this.add.sprite(1201, 450, 'menuboundary');
    this.game.physics.p2.enable(this.boundary4);
	this.boundary4.body.static = true;
    this.boundary4.body.angle = 90;
	this.boundary4.tint = 0x666666;
     this.boundary1 = this.add.sprite(650, 100, 'menuboundary');
    this.game.physics.p2.enable(this.boundary1);
	this.boundary1.body.static = true;
	this.boundary1.tint = 0x666666;
     this.boundary2 = this.add.sprite(650, 800, 'menuboundary');
    this.game.physics.p2.enable(this.boundary2);
	this.boundary2.body.static = true;
	this.boundary2.body.angle = 180;
	this.boundary2.tint = 0x666666;
    
     this.menusweep = this.add.sprite(194, 700, 'menusweep');
    this.menusweep.alpha = 1;
    this.menusweep.anchor.setTo(1,.5);
	this.menusweep.tint = 0x666666;
     this.menusweep2 = this.add.sprite(1102, 200, 'menusweep');
    this.menusweep2.alpha = 1;
    this.menusweep2.anchor.setTo(1,.5);
	this.menusweep2.tint = 0x666666;
	this.menusweep2.angle = 180;
	
    this.objectgroup = this.add.group();
    this.objectSpawn(); 
	
	this.textgroup = this.add.group();  // nano, golf, play, high, loot, credits
	this.textSpawn();
    
	this.warpgroup = this.add.group();
    this.warpSpawn();
	
     this.balleffect1 = this.add.sprite(300, 300, 'balleffect2');
    this.balleffect1.anchor.setTo(1, .5);
	this.balleffect1.tint = 0x222222;
    this.balleffect1.scale.setTo(2);
    this.balleffect1.alpha = .48;
    this.balleffect1.animations.add('buzz', [16, 17, 18, 19], 13, true);
    this.balleffect1.animations.play('buzz');
    
     this.balleffect2 = this.add.sprite(-400, -400, 'balleffect2');
    this.balleffect2.anchor.setTo(1, .5);
	this.balleffect2.tint = 0x222222;
    this.balleffect2.scale.setTo(2);
    this.balleffect2.alpha = .48;
    this.balleffect2.animations.add('buzz', [16, 17, 18, 19], 13, true);
    this.balleffect2.animations.play('buzz');
	
	 this.ball = this.add.sprite(400, 400, 'ballmarker');
	this.ball.anchor.setTo(.5);
	this.ball.alpha = 0;
    this.ball.inpit = false;
    this.ball.inactive = false;        
    this.ball.respawning = true;
	this.game.physics.p2.enable(this.ball);
	this.ball.body.setCircle(20, 0, 0, 0);
	this.ball.body.damping = .6;
    this.ball.body.onBeginContact.add(this.ballBounce, this);
    this.ball.body.force.x = 4000;
    
    this.materializesound.play();
	
	 this.balloverlay = this.add.sprite(this.ball.x, this.ball.y, 'ball')
	this.balloverlay.scale.setTo(.15);
	this.balloverlay.anchor.setTo(.5);
    this.balloverlay.alpha = .1;
    this.balloverlay.tint = 0x000000;
    
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
    
     this.crossout = this.add.sprite(0, 0, 'crossout');
    this.crossout.alpha = 0;
    this.crossout.anchor.setTo(.5);
    
    this.camfocus = this.add.sprite(650, 450, 'camfocus');
     this.camfocus.alpha = 0;
     this.camera.follow(this.camfocus, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    
    //this.testtext = this.add.text(300, 300, this.distance, { font: "30px Fixedsys", fill: "#ffffff", align: "center" });
	//this.testtext.setText(this.screen);
},
    
update: function(){
	if(this.input.activePointer.isDown){
		  this.aimShot();}
	else{
		this.fireShot();}
	
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
	
	this.creditsUpdate();
    
    this.bgUpdate();
	
	this.generalAnimation();
    
    this.collisionAnimation();
    
    this.lootBlock();
	
	this.warpCheck();
    
    this.highScoreRoom();
},
    
generalAnimation: function(){
    this.animationtimer += 1;
	if(this.animationtimer > 360){
		this.animationtimer = 0;
	}
	if(!(this.animationtimer%60)){
	
	}
	if(!(this.animationtimer%2)){
		if(this.bgdarken){
            for (var i = 0; i < this.objectgroup.length; i++){
			     this.objectgroup.children[i].tint -= 65793;}}
		else{
            for (var i = 0; i < this.objectgroup.length; i++){
			     this.objectgroup.children[i].tint += 65793;}}
	}
},

creditsUpdate: function(){
	if(this.creditsflag){
		for(var i = 0; i < this.objectgroup.length; i++){
		this.textgroup.children[i].x = this.objectgroup.children[i].x;
		this.textgroup.children[i].y = this.objectgroup.children[i].y;
		this.textgroup.children[i].angle = this.objectgroup.children[i].angle;}
	}
	if(this.screen == 5){
		box = this.objectgroup.children[1];
		box.body.rotateLeft(40);
		if(box.x > this.ball.x){
			box.body.force.x = -600;
		}
		else{
			box.body.force.x = 600;
		}
		if(box.y > this.ball.y){
			box.body.force.y = -300;
		}
		else{
			box.body.force.y = 300;
		}
		if(Math.abs(box.body.velocity.x) > 500){
			if(box.body.velocity.x > 0){box.body.velocity.x = 500;}
			else{box.body.velocity.x = -500;}
		}
		if(Math.abs(box.body.velocity.y) > 300){
			if(box.body.velocity.y > 0){box.body.velocity.y = 300;}
			else{box.body.velocity.y = -300;}
		}
	}
},
    
highScoreRoom: function(){
    if(this.highscoreroom){
        if(this.hsdark){
            this.bg4.alpha -= .01;
            if(this.bg4.alpha < .1){this.hsdark = false;}
        }
        else{
            this.bg4.alpha += .01;
            if(this.bg4.alpha > .7){this.hsdark = true;}
        }
    }
},
    
lootBlock: function(){
    if(this.screen){return;}
	if(this.ball.y > 450){
		if(this.ball.y < 575){
			this.lootdistance = this.getDistance(this.ball, this.warpgroup.children[2], 2);
			if(this.lootdistance < 140){this.lootdistance = 140;}
			if(this.lootdistance < 280){
				this.objectgroup.children[1].body.y = 450 + .1 * (280 - this.lootdistance);
				this.objectgroup.children[1].body.angle = -14/140 * (280 - this.lootdistance);
				this.objectgroup.children[2].body.y = 575 - .1 * (280 - this.lootdistance);
				this.objectgroup.children[2].body.angle = 14/140 * (280 - this.lootdistance);}}
		else if(this.objectgroup.children[1].body.y > 450){
			this.objectgroup.children[1].body.y = 450;
			this.objectgroup.children[1].body.angle = 0;
			this.objectgroup.children[2].body.y = 575;
			this.objectgroup.children[2].body.angle = 0;
		}
	}
	else if(this.objectgroup.children[1].body.y > 450){
		this.objectgroup.children[1].body.y = 450;
		this.objectgroup.children[1].body.angle = 0;
		this.objectgroup.children[2].body.y = 575;
		this.objectgroup.children[2].body.angle = 0;
	}
	
},
    
lootAccumulate: function(){
    this.lootcollected += 1;
    if(this.lootcollected > 20){
        this.lootcollected = 0;
        this.laughsound.play();
    }
},

warpCheck: function(){
	if(this.warpbright){
		this.warpcounter += 1;
		if(this.warpcounter > 199){
			this.warpbright = false;}}
	else{
		this.warpcounter -= 1;
		if(this.warpcounter < 1){
			this.warpbright = true;}}
			
	i = 0;
    while(i < this.warpgroup.length/2){
        if(this.checkOverlap(this.ball, this.warpgroup.children[i])){
            this.warpTo(i);
        }
        i += 1;
    }
	while(i < this.warpgroup.length){
		this.warpgroup.children[i].alpha = .3 + .001 * this.warpcounter;
		this.warpgroup.children[i].scale.setTo(.5 + .0007 * this.warpcounter, 1);
        if(this.warpgroup.children[i].angle == 90){
            this.warpgroup.children[i].scale.y = 1.15;}
        else if(this.warpgroup.children[i].angle == -90){
            this.warpgroup.children[i].scale.y = 1.15;}
		i += 1;
	}
},
    
warpTo: function(input){
    switch(this.screen){
		case 5:{
			switch(input){
				case 0:{this.screen = 4; this.reverseflag = true; this.spawnRoom(); return;}
				case 1:{this.screen = 0; this.creditsbg.alpha = 0; this.creditsflag = false; this.spawnRoom(); return;}
			}
		}
		case 4:{
			switch(input){
				case 0:{this.screen = 3; this.reverseflag = true; this.spawnRoom(); return;}
				case 1:{this.screen = 5; this.spawnRoom(); return;}
			}
		}
		case 3:{
			switch(input){
				case 0: {this.screen = 0; this.creditsflag = false; this.spawnRoom(); 
					this.creditsbg.alpha = 0; return;}
				case 1: {this.screen = 4; this.spawnRoom(); return;}
			}
		}
        case 2: {
            this.bg3.alpha = 0;
            this.bg4.alpha = 0;
            this.highscoretable.alpha = 0;
            this.highscoreroom = false;
            this.scorefloor.alpha = 0;
            this.hsgroup.callAll('kill');
            this.hsgroup.removeAll();
            this.screen = 0; this.spawnRoom(); return;
        }
        case 1: {
            switch(input){
                case 0: {
                    this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 1;
                    this.state.start('Circuita', true, false);
                    return;}
                case 1: {
					this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 2;
                    this.state.start('Circuitb', true, false);
                    return;}
                case 2: {
                    this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 3;
                    this.state.start('Digitala', true, false);
                    return;}
                case 3: {
					this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 4;
                    this.state.start('Digitalb', true, false);
                    return;}
                case 4: {
                    this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 5;
                    this.state.start('Noisea', true, false);
                    return;}
                case 5: {
                    this.balloverlay.alpha = 0; 
                    this.game.sound.stopAll(); 
                    modeflag = 0;
                    course = 6;
                    this.state.start('Noiseb', true, false);
                    return;}
                case 6: {this.screen = 0; this.spawnRoom(); return;}
            }
        }
        case 0: {
            switch(input){
                case 0: {this.screen = 1; this.spawnRoom(); return;}
                case 1: {this.screen = 2; this.spawnRoom(); return;}
                case 2: {return;}
                case 3: {this.screen = 3; this.spawnRoom(); return;}
            }
        }
		
    }
},
    
spawnRoom: function(){
    this.textgroup.callAll('kill');
    this.textgroup.removeAll();
    this.warpgroup.callAll('kill');
    this.warpgroup.removeAll();
	if(this.screen == 3 || this.screen == 4 || this.screen == 5){
		for(var i=0; i<this.objectgroup.length; i++){
			box = this.objectgroup.children[i];
			box.body.setZeroVelocity(); 
			box.body.setZeroRotation(); 
			box.body.setZeroForce();
		}
		
	}
    this.objectgroup.callAll('kill');
    this.objectgroup.removeAll();
    this.ballspeed = 0;
    this.ball.body.velocity.x = 0; this.ball.body.velocity.y = 0;
    
    switch(this.screen){
        case 0:{
			this.lootcollected = 0;
            this.ball.body.x = 400; this.ball.body.y = 400;
            this.balloverlay.x = 400; this.balloverlay.y = 400;
            this.ball.body.force.x = 4000;this.ball.body.force.x = 4000;
            this.balloverlay.alpha = .1;
			this.balloverlay.tint = 0x000000;
            this.ball.respawning = true;
            this.materializesound.play();
            this.balloverlay.alpha = .1;
			this.balloverlay.tint = 0x000000;
            break;
        }
        case 1:{
            this.ball.body.x = 570; this.ball.body.y = 240;
            this.balloverlay.x = 570; this.balloverlay.y = 240;
            this.ball.body.force.y = 7600;
            this.ball.body.force.x = 100;
            break;
        }
        case 2:{
            this.ball.body.x = 890; this.ball.body.y = 660;
            this.balloverlay.x = 890; this.balloverlay.y = 660;
            this.ball.body.force.y = -7600;
            this.ball.body.force.x = -100;
            break;
        }
		case 3:{
			if(this.reverseflag){
				this.ball.body.x = 1045; this.ball.body.y = 450;
				this.balloverlay.x = 1045; this.balloverlay.y = 450;
				this.ball.body.force.x = -7000;	
				this.reverseflag = false;	
			}
			else{
				this.ball.body.x = 255; this.ball.body.y = 450;
				this.balloverlay.x = 255; this.balloverlay.y = 450;
				this.ball.body.force.x = 7000;
			}
			break;
		}
		case 4:{
			if(this.reverseflag){
				this.ball.body.x = 1045; this.ball.body.y = 450;
				this.balloverlay.x = 1045; this.balloverlay.y = 450;
				this.ball.body.force.x = -7000;	
				this.reverseflag = false;	
			}
			else{
				this.ball.body.x = 255; this.ball.body.y = 450;
				this.balloverlay.x = 255; this.balloverlay.y = 450;
				this.ball.body.force.x = 7000;
			}
			break;
		}
		case 5:{
			this.ball.body.x = 255; this.ball.body.y = 450;
			this.balloverlay.x = 255; this.balloverlay.y = 450;
			this.ball.body.force.x = 7000;
		}
            
    }
    this.textSpawn();
    this.objectSpawn();
    this.warpSpawn();
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
        this.balleffect1.alpha = .48;
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
            this.ball.inpit = false;
            this.balloverlay.x = 575; this.balloverlay.y = 400;
            this.balloverlay.scale.setTo(.15);
            this.ball.body.velocity.x = 0;
            this.ball.body.velocity.y = 0;
            this.ball.body.force.x = 2000;
            this.balloverlay.alpha = .1;
			this.balloverlay.tint = 0x000000;
            this.ball.respawning = true;
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
	if(this.bgdarken){
		this.bg2.tint -= 65793;
		if(this.bg2.tint < 0x777777){
			this.bgdarken = false;}
	}
	else{
		this.bg2.tint += 65793;
		if(this.bg2.tint > 0xCCCCCB){
			this.bgdarken = true;}
	}
    
	switch(this.boundarymode){
        case 0: {this.menusweep.y -= 10; this.menusweep2.y += 10;
				if(this.menusweep.y < 201){this.boundarymode = 1;} break;}
        case 1: {this.menusweep.angle += 6; this.menusweep2.angle += 6; this.menusweep.x += .4; this.menusweep.y -= .4;
                 this.menusweep2.x -= .4; this.menusweep2.y += .4;
				if(this.menusweep.angle > 89){this.boundarymode = 2;} break;}
        case 2: {this.menusweep.x += 10; this.menusweep2.x -= 10;
				if(this.menusweep.x > 1099){this.boundarymode = 3;} break;}
        case 3: {this.menusweep.angle += 6; this.menusweep2.angle += 6; this.menusweep.x += .4; this.menusweep.y += .4;
                 this.menusweep2.x -= .4; this.menusweep2.y -= .4;
				if(this.menusweep.angle < 0){this.menusweep.x = 1106; this.menusweep.y = 200; this.boundarymode = 4;} break;}
        case 4: {this.menusweep.y += 10; this.menusweep2.y -= 10;
				if(this.menusweep.y > 699){this.boundarymode = 5;} break;}
        case 5: {this.menusweep.angle += 6; this.menusweep2.angle += 6; this.menusweep.x -= .4; this.menusweep.y += .4;
                 this.menusweep2.x += .4; this.menusweep2.y -= .4;
				if(this.menusweep.angle > -91){this.boundarymode = 6;} break;}
        case 6: {this.menusweep.x -= 10; this.menusweep2.x += 10;
				if(this.menusweep.x < 201){this.boundarymode = 7;} break;}
        case 7: {this.menusweep.angle += 6; this.menusweep2.angle += 6; this.menusweep.x -= .4; this.menusweep.y -= .4;
                 this.menusweep2.x += .4; this.menusweep2.y += .4;
				if(this.menusweep.angle > -1){this.boundarymode = 0;} break;}
    }
    
    if(this.screen > 1){return;}
    for (var i = 0; i < 2; i++){
        text = this.textgroup.children[i];
        rando = Math.floor(Math.random() * 26);
        if(rando == 0){
            if(text.xoffset < 4 ){
                text.x += 1; text.xoffset += 1;}}
        else if(rando == 1){
            if(text.xoffset){
                text.x -= 1; text.xoffset -= 1;}}
        else if(rando == 2){
            if(text.yoffset < 4){
                text.y += 1; text.yoffset += 1;}}
        else if(rando == 3){
            if(text.yoffset){
                text.y -= 1; text.yoffset -= 1;}}
        
        rando = Math.floor(Math.random() * 200);
        if(!(rando)){
            text.alpha = .1;}
        if(text.alpha < .9){
            text.alpha += .05;}
    
        text.timer -= 1;
        if(text.timer < 50){
            text.alpha = text.timer * .02;
            text.scale.setTo(.5 + text.timer * .01);
        }
        if(text.timer < 1){
            text.respawning = 49;
            rando = Math.floor(Math.random() * 500);
            text.timer = 500 + rando;
            if(this.screen){
                rando = Math.floor(Math.random() * 6);
                text.xpos = rando;
                text.x = 273 + text.xoffset + 150 * text.xpos;
                rando = Math.floor(Math.random() * 3);
                text.ypos = rando;
                text.y = 260 + text.yoffset + 124 * text.ypos;
                if(text.xpos == 2 && text.ypos == 0){text.timer = 1;}
            }
            else{
                rando = Math.floor(Math.random() * 5);
                text.xpos = rando;
                text.x = 273 + text.xoffset + 150 * text.xpos;
                rando = Math.floor(Math.random() * 4);
                text.ypos = rando;
                text.y = 260 + text.yoffset + 124 * text.ypos;
            }
        }
        if(text.respawning){
            text.respawning -= 1;
            text.alpha = (49-text.respawning)*.02;
            text.scale.setTo((49-text.respawning)*.02);
        }
    }
},

ballAnimation: function(){
    if(this.ball.inpit){
        return;}
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

ballBounce: function(){
    this.speedvolmod = this.ballspeed / 2400;
    if(this.speedvolmod > 1){this.speedvolmod = 1;}
    this.hitwallsound.volume = this.speedvolmod*sfxvol/10;
    this.hitwallsound.play();
    this.collisiongroup.children[this.collisionindex%3].x = this.ball.x + 20 * Math.cos(this.balleffect1.angle / 180 * 3.1416);
    this.collisiongroup.children[this.collisionindex%3].y = this.ball.y + 20 * Math.sin(this.balleffect1.angle / 180 * 3.1416);
    this.collisiongroup.children[this.collisionindex%3].tint = 0xDDDDDD;
    this.collisiongroup.children[this.collisionindex%3].mode = 2;
    this.collisiongroup.children[this.collisionindex%3].timer = 15;
    this.collisiongroup.children[this.collisionindex%3].scale.setTo(.001 * this.ballspeed);
    this.collisiongroup.children[this.collisionindex%3].alpha = .36;
    this.collisiongroup.children[this.collisionindex%3].angle = this.angle + 90;
    
    this.balleffect2.angle = this.balleffect1.angle;
    this.balleffect2.x = this.ball.x;
    this.balleffect2.y = this.ball.y;
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
	if(this.ball.inpit){return;}
    if(this.ball.inactive){return;}
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
	if(this.aimactive){
		this.aimactive = false;
        this.camsnapback = true;
        if(this.rangeflag){
            this.crossout.alpha = 0;}
        else{
            this.speedvolmod = this.distance / 500;
            this.hitballsound.volume = this.speedvolmod*sfxvol/10;
            this.hitballsound.play();
		  this.ball.body.velocity.x = (3.1 * this.distance + 10) * Math.cos(this.radians);
		  this.ball.body.velocity.y = (3.1 * this.distance + 10) * Math.sin(this.radians);}
		this.shotarrow.x = -100;
		this.shotarrow.y = -100;
		this.sabody.x = -100;
		this.sabody.y = -100;
		this.sabody.scale.x = 1;
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

getRads: function(input){
	radians = input / 3.1416 * 180;
	return radians;
},
	
getAngle: function(obj1, obj2, subject){
	if(subject == 1){
		this.radians = Math.atan2(obj2.y - obj1.y - (this.camfocus.y - 250), obj2.x - obj1.x - (this.camfocus.x - 450));
		this.angle = this.radians / 3.1416 * 180;}
	if(subject == 2){
		return Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);}
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
		return Math.sqrt(x + y);}
},
    
checkOverlap: function(spriteA, spriteB){
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
},
    
warpSpawn: function(){
    switch(this.screen){
        case 0: {			
             warp = this.warpgroup.create(1075, 229, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
             warp = this.warpgroup.create(1075, 354, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
             warp = this.warpgroup.create(1075, 479, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
             warp = this.warpgroup.create(1075, 604, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
             warp = this.warpgroup.create(1085, 263, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(1085, 390, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(1085, 513, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(1085, 636, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
            break;
        }
        case 1: {
             warp = this.warpgroup.create(245, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(395, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(545, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(695, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(845, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(995, 675, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(545, 215, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(275, 685, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.angle = 90;
            warp.alpha = .6;
             warp = this.warpgroup.create(425, 685, 'warp');
            warp.anchor.setTo(1,.5);
             warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(575, 685, 'warp');
            warp.anchor.setTo(1,.5);
             warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(725, 685, 'warp');
            warp.anchor.setTo(1,.5);
             warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(875, 685, 'warp');
            warp.anchor.setTo(1,.5);
             warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(1025, 685, 'warp');
            warp.anchor.setTo(1,.5);
             warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
             warp = this.warpgroup.create(575, 215, 'warp');
            warp.anchor.setTo(1,.5);
            warp.angle = -90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
            break;
        }
        case 2:{
             warp = this.warpgroup.create(845, 695, 'testmarker');
            warp.scale.setTo(8,1);
            warp.alpha = 0;
             warp = this.warpgroup.create(875, 705, 'warp');
            warp.anchor.setTo(1,.5);
            warp.angle = 90;
            warp.scale.setTo(.8);
            warp.alpha = .6;
            break;
        }
		case 3:{
			 warp = this.warpgroup.create(225, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(1075, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(215, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
			warp.angle = 180;
            warp.alpha = .6;
			 warp = this.warpgroup.create(1085, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
			break;
		}
		case 4:{
			 warp = this.warpgroup.create(225, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(1075, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(215, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
			warp.angle = 180;
            warp.alpha = .6;
			 warp = this.warpgroup.create(1085, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
			break;
		}
		case 5:{
			 warp = this.warpgroup.create(225, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(1075, 444, 'testmarker');
            warp.scale.setTo(1, 8);
            warp.alpha = 0;
			 warp = this.warpgroup.create(215, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
			warp.angle = 180;
            warp.alpha = .6;
			 warp = this.warpgroup.create(1085, 470, 'warp');
            warp.anchor.setTo(1,.5);
            warp.scale.setTo(.8);
            warp.alpha = .6;
			break;
		}
    }
},
    
objectSpawn: function(){
    switch(this.screen){
        case 0: {
             pillar = this.objectgroup.create(1025, 325, 'menupillar');
            this.game.physics.p2.enable(pillar);
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(1025, 450, 'menupillar');
            this.game.physics.p2.enable(pillar);
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
            pillar.body.onBeginContact.add(this.lootAccumulate, this);
             pillar = this.objectgroup.create(1025, 575, 'menupillar');
            this.game.physics.p2.enable(pillar);
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
            pillar.body.onBeginContact.add(this.lootAccumulate, this);
             blocker = this.objectgroup.create(975, 510, 'testmarker');
            blocker.alpha = 0;
            this.game.physics.p2.enable(blocker);
            blocker.body.static = true;
            break;
        }
        case 1: {
             pillar = this.objectgroup.create(500, 268, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.static = true;
            pillar.body.angle = 90;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(650, 268, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.static = true;
            pillar.body.angle = 90;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(350, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(500, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(650, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(800, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(950, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
            break;
        }
        case 2: {
            this.bg3.alpha = 1;
            this.bg4.alpha = .5;
            this.highscoretable.alpha = 1;
            this.highscoreroom = true;
            this.scorefloor.alpha = 1;
             pillar = this.objectgroup.create(800, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
             pillar = this.objectgroup.create(950, 632, 'menupillar2');
            this.game.physics.p2.enable(pillar);
            pillar.body.angle = 90;
            pillar.body.static = true;
            pillar.tint = 0xAAAAAA;
            break;
        }
		case 3: {
			this.creditsbg.alpha = 1;
			this.creditsflag = true;
			 box = this.objectgroup.create(650, 250, 'creditsbox1');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 2;
			box.body.damping = .4;
			box.body.angularDamping = .4;
			
			 box = this.objectgroup.create(525, 388, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			
			 box = this.objectgroup.create(875, 388, 'creditsbox3');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 4;
			box.body.damping = .6;
			box.body.angularDamping = .6;
			
			 box = this.objectgroup.create(525, 513, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			
			 box = this.objectgroup.create(875, 513, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			
			 box = this.objectgroup.create(525, 638, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			
			 box = this.objectgroup.create(875, 638, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			break;
		}
		case 4: {
			 box = this.objectgroup.create(650, 275, 'creditsbox3');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 4;
			box.body.damping = .6;
			box.body.angularDamping = .6;
			 box = this.objectgroup.create(530, 375, 'creditsbox1');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation(); box.body.setZeroForce();
			box.body.mass = 2;
			box.body.damping = .4;
			box.body.angularDamping = .4;
			 box = this.objectgroup.create(790, 350, 'creditsbox1');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation(); box.body.setZeroForce();
			box.body.mass = 2;
			box.body.damping = .4;
			box.body.angularDamping = .4;
             box = this.objectgroup.create(840, 400, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation(); box.body.setZeroForce();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			 box = this.objectgroup.create(480, 525, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation(); box.body.setZeroForce();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			 box = this.objectgroup.create(830, 525, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation(); box.body.setZeroForce();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			break;
		}
		case 5: {
			 box = this.objectgroup.create(650, 250, 'creditsbox2');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 3;
			box.body.damping = .5;
			box.body.angularDamping = .5;
			 box = this.objectgroup.create(650, 450, 'creditsbox1');
			box.tint = 0xAAAAAA;
			this.game.physics.p2.enable(box);
			box.body.setZeroVelocity(); box.body.setZeroRotation();
			box.body.mass = 2;
			box.body.damping = .4;
			box.body.angularDamping = .4;
			break;
		}
    }
},

textSpawn: function(){
	switch(this.screen){
		case 0: {
			 text = this.textgroup.create(0, 0, 'menutext');
			text.anchor.setTo(.5,.5);
			text.xpos = 2;  // .x = 275 + (150 * xpos)
			text.ypos = 0;  // .y = 262 + (124 * ypos)
			text.x = 275 + 150 * text.xpos;
			text.y = 262 + 124 * text.ypos;
			text.xoffset = 2; text.yoffset = 2;
			text.timer = 600;
			text.respawning = 0;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 1;
			text.anchor.setTo(.5,.5);
			text.xpos = 3; text.ypos = 0;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			text.xoffset = 2; text.yoffset = 2;
			text.timer = 800;
			text.respawning = 0;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 2;
			text.anchor.setTo(.5,.5);
			text.xpos = 5; text.ypos = 0;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 11;
			text.anchor.setTo(.5,.5);
			text.xpos = 5; text.ypos = 1;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 3;
			text.anchor.setTo(.5,.5);
			text.xpos = 5; text.ypos = 2;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 4;
			text.anchor.setTo(.5,.5);
			text.xpos = 5; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
            break;
		}
        case 1: {
			 text = this.textgroup.create(0, 0, 'menutext');
			text.anchor.setTo(.5,.5);
            text.frame = 13;
			text.xpos = 1;
			text.ypos = 0;
			text.x = 275 + 150 * text.xpos;
			text.y = 262 + 124 * text.ypos;
			text.xoffset = 2; text.yoffset = 2;
			text.timer = 600;
			text.respawning = 0;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 14;
			text.anchor.setTo(.5,.5);
			text.xpos = 3; text.ypos = 0;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			text.xoffset = 2; text.yoffset = 2;
			text.timer = 800;
			text.respawning = 0;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 5;
			text.anchor.setTo(.5,.5);
			text.xpos = 0; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 6;
			text.anchor.setTo(.5,.5);
			text.xpos = 1; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 7;
			text.anchor.setTo(.5,.5);
			text.xpos = 2; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
			 text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 8;
			text.anchor.setTo(.5,.5);
			text.xpos = 3; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
             text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 9;
			text.anchor.setTo(.5,.5);
			text.xpos = 4; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
             text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 10;
			text.anchor.setTo(.5,.5);
			text.xpos = 5; text.ypos = 3;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
             text = this.textgroup.create(0, 0, 'menutext');
			text.frame = 12;
			text.anchor.setTo(.5,.5);
			text.xpos = 2; text.ypos = 0;
			text.x = 275 + 150 * text.xpos; text.y = 262 + 124 * text.ypos;
            break;
		}
        case 2: {
            this.highScoreSpawn();
            break;
        }
		case 3: {
			 text = this.add.text(650, 250, "MUSIC", { font: "24px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(525, 388, "DJ K-ManZ", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(875, 388, "\'All Her Witches Undressed\'", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(525, 513, "Doppelganger", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(875, 513, "\'Underwater\'", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(525, 638, "SouljahdeShiva", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(875, 638, "\'Scannertek\'", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			break;
		}
		case 4: {
			 text = this.add.text(650, 275, "Assets Used With Perm.", { font: "24px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(530, 375, "SFX", { font: "24px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(790, 375, "p0ss", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
             text = this.add.text(790, 375, "Eric Matyas", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(480, 525, "Electricity VFX", { font: "24px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(830, 525, "Clint Bellanger", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			break;
		}
		case 5:{
			 text = this.add.text(650, 250, "Programming", { font: "24px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			 text = this.add.text(650, 450, "Tommy C", { font: "21px Fixedsys", fill: "#ffffff", align: "center" });
			text.anchor.setTo(.5);
			this.textgroup.add(text);
			break;
		}
	}
	
},
    
highScoreSpawn: function(){
    if(highscorea < 0){
        text = this.hsgroup.create(610, 273, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 273, 'menufont');
    text.frame = Math.floor(Math.abs(highscorea)/10) + 26;
    text = this.hsgroup.create(645, 273, 'menufont');
    text.frame = Math.abs(highscorea)%10 + 26;
    
    text = this.hsgroup.create(830, 273, 'menufont');
    text.frame = scorenames[0];
    text = this.hsgroup.create(850, 273, 'menufont');
    text.frame = scorenames[1];
    text = this.hsgroup.create(870, 273, 'menufont');
    text.frame = scorenames[2];
    
    if(highscoreb < 0){
        text = this.hsgroup.create(610, 311, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 311, 'menufont');
    text.frame = Math.floor(Math.abs(highscoreb)/10) + 26;
    text = this.hsgroup.create(645, 311, 'menufont');
    text.frame = Math.abs(highscoreb)%10 + 26;
    
    text = this.hsgroup.create(830, 311, 'menufont');
    text.frame = scorenames[3];
    text = this.hsgroup.create(850, 311, 'menufont');
    text.frame = scorenames[4];
    text = this.hsgroup.create(870, 311, 'menufont');
    text.frame = scorenames[5];
    
    if(highscorec < 0){
        text = this.hsgroup.create(610, 349, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 349, 'menufont');
    text.frame = Math.floor(Math.abs(highscorec)/10) + 26;
    text = this.hsgroup.create(645, 349, 'menufont');
    text.frame = Math.abs(highscorec)%10 + 26;
    
    text = this.hsgroup.create(830, 349, 'menufont');
    text.frame = scorenames[6];
    text = this.hsgroup.create(850, 349, 'menufont');
    text.frame = scorenames[7];
    text = this.hsgroup.create(870, 349, 'menufont');
    text.frame = scorenames[8];
    
    if(highscored < 0){
        text = this.hsgroup.create(610, 387, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 387, 'menufont');
    text.frame = Math.floor(Math.abs(highscored)/10) + 26;
    text = this.hsgroup.create(645, 387, 'menufont');
    text.frame = Math.abs(highscored)%10 + 26;
    
    text = this.hsgroup.create(830, 387, 'menufont');
    text.frame = scorenames[9];
    text = this.hsgroup.create(850, 387, 'menufont');
    text.frame = scorenames[10];
    text = this.hsgroup.create(870, 387, 'menufont');
    text.frame = scorenames[11];
    
    if(highscoree < 0){
        text = this.hsgroup.create(610, 425, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 425, 'menufont');
    text.frame = Math.floor(Math.abs(highscoree)/10) + 26;
    text = this.hsgroup.create(645, 425, 'menufont');
    text.frame = Math.abs(highscoree)%10 + 26;
    
    text = this.hsgroup.create(830, 425, 'menufont');
    text.frame = scorenames[12];
    text = this.hsgroup.create(850, 425, 'menufont');
    text.frame = scorenames[13];
    text = this.hsgroup.create(870, 425, 'menufont');
    text.frame = scorenames[14];
    
    if(highscoref < 0){
        text = this.hsgroup.create(610, 463, 'menufont');
        text.frame = 36;}
    text = this.hsgroup.create(625, 463, 'menufont');
    text.frame = Math.floor(Math.abs(highscoref)/10) + 26;
    text = this.hsgroup.create(645, 463, 'menufont');
    text.frame = Math.abs(highscoref)%10 + 26;
    
    text = this.hsgroup.create(830, 463, 'menufont');
    text.frame = scorenames[15];
    text = this.hsgroup.create(850, 463, 'menufont');
    text.frame = scorenames[16];
    text = this.hsgroup.create(870, 463, 'menufont');
    text.frame = scorenames[17];
}
};