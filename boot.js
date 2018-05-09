var Nanogolf = Nanogolf || {};
 
Nanogolf.Boot = function(){};
 
Nanogolf.Boot.prototype = {
    init: function() {
        
    },
  preload: function() {
    this.load.image('loading', 'assets/images/loading.png');
	this.load.image('loadshadow', 'assets/images/loadshadow.png');
	this.load.image('loadsubtle', 'assets/images/loadsubtle.png');
	this.load.image('loadicon', 'assets/images/loadicon.png');
	this.load.image('loadblack', 'assets/images/loadblack.png');
	this.load.image('loadlogo', 'assets/images/loadlogo.png');
	this.load.image('loadplay', 'assets/images/loadplay.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#000000';
    /*this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;
	this.scale.pageAlignHorizontally = true;*/
      
    if (this.game.device.desktop){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = gameWidth/2;
        this.scale.minHeight = gameHeight/2;
        this.scale.maxWidth = gameWidth;
        this.scale.maxHeight = gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //this.scale.setScreenSize(true);
    }
    else{
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.scale.minWidth = gameWidth/2;
        this.scale.minHeight = gameHeight/2;
        this.scale.maxWidth = 2048;     //You can change this to gameWidth*2.5 if needed
        this.scale.maxHeight = 1535;     //Make sure these values are proportional to the gameWidth and gameHeight
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        //this.scale.hasResized.add(this.gameResized, this);
        //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        //this.scale.setScreenSize(true);
    }
    
      var ow = parseInt(this.game.canvas.style.width,10);
      var oh = parseInt(this.game.canvas.style.height,10);
      var r = Math.max(window.innerWidth/ow,window.innerHeight/oh);
      var nw = ow*r;
      var nh = oh*r;
      this.game.canvas.style.width = nw+"px";
      this.game.canvas.style.height= nh+"px";
      this.game.canvas.style.marginLeft = (window.innerWidth/2 - nw/2)+"px";
      this.game.canvas.style.marginTop = (window.innerHeight/2 - nh/2)+"px";
      //document.getElementById("game").style.width = window.innerWidth+"px";
      //document.getElementById("game").style.height = window.innerHeight-1+"px";
      //document.getElementById("game").style.overflow = "hidden"; //
	
	this.game.physics.startSystem(Phaser.Physics.P2JS);
	this.game.physics.p2.restitution = 0.94;
    this.state.start('Preload');
  }
};