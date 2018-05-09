var Nanogolf = Nanogolf || {};

//loading the game assets
Nanogolf.Preload = function(){};

Nanogolf.Preload.prototype = {
    preload: function() {
		this.downflag = true;
		this.loadingflag = true;
		
         this.splash = this.add.image(this.game.world.centerX, this.game.world.centerY, 'loadlogo');
        this.splash.scale.setTo(.5);
		this.splash.anchor.setTo(0.5);
		 this.shadow = this.add.image(305, 240, 'loadshadow');
		this.shadow.anchor.setTo(.5);
		this.shadow.scale.setTo(5);
		this.shadow.alpha = .3;
		 this.shadow2 = this.add.image(305, 240, 'loadshadow');
		this.shadow2.anchor.setTo(.5);
		this.shadow2.scale.setTo(5.2);
		this.shadow2.alpha = .3;
		 this.shadow3 = this.add.image(305, 240, 'loadshadow');
		this.shadow3.anchor.setTo(.5);
		this.shadow3.scale.setTo(5.4);
		this.shadow3.alpha = .3;
		 this.shadow4 = this.add.image(305, 240, 'loadshadow');
		this.shadow4.anchor.setTo(.5);
		this.shadow4.scale.setTo(5.6);
		this.shadow4.alpha = .3;
		 this.shadow5 = this.add.image(305, 240, 'loadshadow');
		this.shadow5.anchor.setTo(.5);
		this.shadow5.scale.setTo(5.8);
		this.shadow5.alpha = .3;
		 this.shadow6 = this.add.image(305, 240, 'loadshadow');
		this.shadow6.anchor.setTo(.5);
		this.shadow6.scale.setTo(6);
		this.shadow6.alpha = 1;
		
		 this.loading = this.add.image(730, 250, 'loading');
		this.loading.anchor.setTo(.5);
		this.loading.scale.setTo(.7);
		
		 this.subtle = this.add.image(750, 450, 'loadsubtle');
		this.subtle.anchor.setTo(.5);
		 this.cover = this.add.image(810, 407, 'loadblack');
		this.cover.anchor.setTo(.5);
		 this.icon = this.add.image(590, 470, 'loadicon');
		this.icon.anchor.setTo(.5);
		this.icon.scale.setTo(.8);
        this.load.onFileComplete.add(this.fileComplete, this);
		
		//menu
		this.load.image('menubg', 'assets/images/menubg.png');
        this.load.image('menubg2', 'assets/images/menubg2.png');
        this.load.image('menupillar', 'assets/images/menupillar.png');
        this.load.image('menupillar2', 'assets/images/menupillar2.png');
        this.load.image('menuboundary', 'assets/images/menuboundary.png');
        this.load.image('menusweep', 'assets/images/menusweep2.png');
        this.load.image('scoreplateau', 'assets/images/scoreplateau.png');
        this.load.image('highscoretable', 'assets/images/highscoretable.png');
		this.load.spritesheet('menufont', 'assets/images/menufont.png', 21, 18);
		this.load.spritesheet('scorenametext', 'assets/images/scorenametext.png', 16, 16);
		this.load.spritesheet('menutext', 'assets/images/menutext.png', 85, 44);
		this.load.image('warp', 'assets/images/warp.png');
		this.load.image('creditsbg', 'assets/images/creditsbg.png');
		this.load.image('creditsbox1', 'assets/images/creditbox1.png');
		this.load.image('creditsbox2', 'assets/images/creditbox2.png');
		this.load.image('creditsbox3', 'assets/images/creditbox3.png');
        
        //complete
        this.load.image('ballblack', 'assets/images/ball3.png');
		
		//circuit
        this.load.image('bg1', 'assets/images/bg1.png');
		this.load.image('overlay', 'assets/images/overlay2.jpg');
		this.load.image('spark', 'assets/images/spark.png');
		this.load.image('sparkglow', 'assets/images/sparkglow.png');
		this.load.image('scorewindow1', 'assets/images/scorewindow1.png');
		this.load.spritesheet('signnumber', 'assets/images/signnumber.png', 14, 18);
        this.load.spritesheet('sign', 'assets/images/sign.png', 108, 108);
		this.load.spritesheet('veyerbelt', 'assets/images/veyerbelt.png', 42, 30);
		
        //digital
        this.load.image('line', 'assets/images/line.png');
        this.load.image('bg', 'assets/images/bgtest.png');
        this.load.image('bgbottom', 'assets/images/bgtest2.png');
        this.load.image('squares', 'assets/images/squares.png');
        this.load.image('singlesquare', 'assets/images/singlesquare.png');
        this.load.image('shadowfilter1', 'assets/images/shadowfilter1.png');
        this.load.image('digitalboundary1', 'assets/images/digitalboundary1.png');
		this.load.image('digitalboundary2', 'assets/images/digitalboundary2.png');
        this.load.image('digitalboundary3', 'assets/images/digitalboundary3.png');
        this.load.image('digitalbline', 'assets/images/digitalbline.png');
		this.load.image('digitalbcorner', 'assets/images/digitalbcorner.png');
        this.load.image('digitaldarkoverlay', 'assets/images/digitaldarkoverlay.png');
        this.load.image('star', 'assets/images/flare_0.png');
        this.load.spritesheet('redgrid', 'assets/images/redgrid.png', 40, 40);
        this.load.image('porta', 'assets/images/porta.png');
        
        this.load.audio('reject', 'assets/audio/reject.mp3');
        this.load.audio('portsound', 'assets/audio/port.mp3');
        this.load.audio('stagechange', 'assets/audio/Cyber-Chime.mp3');
        this.load.audio('track2', 'assets/audio/scanttrek.mp3');
		
		//noise
		this.load.image('noisebg', 'assets/images/noisebg2.png');
        this.load.image('noisegrid', 'assets/images/noisegrid.png');
		this.load.image('noiseoverlay', 'assets/images/noiseoverlay.png');
        this.load.image('noiseboundary', 'assets/images/noiseboundary.png');
        this.load.image('noisebline', 'assets/images/noisebline.png');
        this.load.image('noisebline2', 'assets/images/noisebline2.png');
        this.load.image('noisebline3', 'assets/images/noisebline3.png');
        this.load.image('noisebline4', 'assets/images/noisebline4.png');
        this.load.image('noisebcorner', 'assets/images/noisebcorner.png');
        this.load.image('noiseorb', 'assets/images/noiseorb.png');
        this.load.image('noiseorb2', 'assets/images/noiseorb2.png');
        this.load.image('noisering', 'assets/images/noisering2.png');
        this.load.image('noisehill', 'assets/images/noisehill.png');
		this.load.image('noisehill2', 'assets/images/noisehill2.png');
		this.load.image('noisehill3', 'assets/images/noisehill3.png');
		this.load.image('noisehill4', 'assets/images/noisehill4.png');
        this.load.image('pit', 'assets/images/pit.png');
        
        this.load.audio('curse', 'assets/audio/curse.mp3');
        this.load.audio('track3', 'assets/audio/underwater.mp3');
        this.load.audio('swoosh', 'assets/audio/swoosh.mp3');
        
        this.load.image('ball', 'assets/images/ball2.png');
		this.load.image('shotarrow', 'assets/images/shotarrow.png');
		this.load.image('sabody', 'assets/images/sabody.png');
		this.load.image('ballmarker', 'assets/images/ballmarker.png');
		this.load.image('testmarker', 'assets/images/testmarker.png');
        this.load.image('camfocus', 'assets/images/camfocus.png');
        this.load.image('boundary', 'assets/images/boundary2.png');
        this.load.image('crossout', 'assets/images/crossout.png');
		this.load.image('pad', 'assets/images/pad.png');
		this.load.image('electron', 'assets/images/electron.png');
        this.load.image('collision', 'assets/images/collision.png');
		this.load.image('bumpcross', 'assets/images/bumpcross.png');
		this.load.image('bumpcolumn', 'assets/images/bumpcolumn.png');
        this.load.image('bumpsquare', 'assets/images/bumpsquare.png');
		this.load.image('bumpsquare2', 'assets/images/bumpsquare2.png');
		this.load.image('bumptri1', 'assets/images/bumptri1.png');
        this.load.image('bumptri2', 'assets/images/bumptri2.png');
        this.load.image('bumptri3', 'assets/images/bumptri3.png');
        this.load.image('bumprect1', 'assets/images/bumprect1.png');
        
		//game menu
        this.load.image('menuwindow1', 'assets/images/menuwindow1.png');
        this.load.image('menuwindow2', 'assets/images/menuwindow2.png');
        this.load.image('menuwindow3', 'assets/images/menuwindow3.png');
        this.load.image('menuwindow4', 'assets/images/menuwindow4.png');
        this.load.image('menuarrow', 'assets/images/menuarrow.png');
        this.load.image('menuselector', 'assets/images/menuselector.png');
        this.load.spritesheet('button', 'assets/images/button.png', 104, 104);
        
        this.load.spritesheet('balleffect2', 'assets/images/shock.png', 64, 64);
		this.load.spritesheet('hole', 'assets/images/hole.png', 52, 52);
        
		
		this.load.physics("sprite_physics", "assets/sprite_physics.json");
		
        this.load.audio('track0', 'assets/audio/loadingscreenloop.mp3');
        this.load.audio('track1', 'assets/audio/allherwitchesundressed.mp3');
        this.load.audio('hitwall', 'assets/audio/hitwall2.mp3');
        this.load.audio('hitball', 'assets/audio/hitball.mp3');
        this.load.audio('materialize', 'assets/audio/materialize.mp3');
        this.load.audio('teleport', 'assets/audio/teleport.mp3');
        this.load.audio('collect', 'assets/audio/collect.mp3');
        this.load.audio('getspark', 'assets/audio/getspark.mp3');
        this.load.audio('electricity', 'assets/audio/electricity.mp3');
        this.load.audio('menu1', 'assets/audio/menu1.mp3');
        this.load.audio('menu2', 'assets/audio/menu2.mp3');
        this.load.audio('laugh', 'assets/audio/laugh.mp3');
        this.load.audio('highscoremusic', 'assets/audio/highscore.mp3');
        this.load.audio('celebrate', 'assets/audio/celebrate.mp3');
  },
    
fileComplete: function() {
	this.icon.angle += 2;
    this.shadow.angle += 1;
	this.shadow2.angle += 1.2;
	this.shadow3.angle += 1.4;
	this.shadow4.angle += 1.6;
	this.shadow5.angle += 1.8;
	this.shadow6.angle += 2;
	this.cover.x += 2.6;
},
	
update: function(){
	if(this.loadingflag){
		this.loading.kill();
		this.icon.kill();
		this.play = this.add.image(730, 250, 'loadplay');
		this.play.anchor.setTo(.5);
		this.loadingflag = false;
	}
	this.shadow.angle += 1;
	this.shadow2.angle += 1.2;
	this.shadow3.angle += 1.4;
	this.shadow4.angle += 1.6;
	this.shadow5.angle += 1.8;
	this.shadow6.angle += 2;
	if(this.downflag){
		this.shadow.y += .1;
		this.shadow2.y += .1;
		this.shadow3.y += .1;
		this.shadow4.y += .1;
		this.shadow5.y += .1;
		this.shadow6.y += .1;
		if(this.shadow.y > 248){this.downflag = false;}
	}
	else{
		this.shadow.y -= .1;
		this.shadow2.y -= .1;
		this.shadow3.y -= .1;
		this.shadow4.y -= .1;
		this.shadow5.y -= .1;
		this.shadow6.y -= .1;
		if(this.shadow.y < 232){this.downflag = true;}
	}
	if(this.input.activePointer.isDown){
		this.state.start('Menu');
	}
},

  create: function() {
  	
  }
};