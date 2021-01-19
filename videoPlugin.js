class VideoPlugin extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.eventEmitter = this.scene.sys.events;
        this.eventEmitter.on('shutdown', this.shutdown, this);
        this.eventEmitter.on('destroy', this.destroy, this);
    }

    load(mapping,filepath){
        this.mapping = mapping;
        this.scene.load.video(mapping, filepath);
        console.log("loaded "+mapping+" @ "+ filepath);
    }

    create(opts){
        if(!opts)
            opts = {}
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 300;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.visible = true;
        this.mediaHeight = opts.mediaHeight || 300;
        this.mediaWidth = opts.mediaWidth || 400;
        this.graphics;
        this.closeBtn;
        this._createWindow();
    }

    add(){
        this.currentMedia = this.scene.add.video(0,0,this.mapping);
    }

    play(){
        this.currentMedia.play(true);
    }

    _getGameWidth() {
        return this.scene.sys.game.config.width;
      }
       
      // Gets the height of the game (based on the scene)
      _getGameHeight() {
        return this.scene.sys.game.config.height;
      }
      
      // Calculates where to place the dialog window based on the game size
      _calculateWindowDimensions (width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
          x,
          y,
          rectWidth,
          rectHeight
        };
      }

      _createOuterWindow (x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
      }

      _createWindow(){
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
       
        this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this._createCloseModalButton();	
        this._createCloseModalButtonBorder();
      }

      _createCloseModalButton() {
        var self = this;
        this.closeBtn = this.scene.make.text({
          x: this._getGameWidth() - this.padding - 14,
          y: this._getGameHeight() - this.windowHeight - this.padding + 3,
          text: 'X',
          style: {
            font: 'bold 12px Arial',
            fill: this.closeBtnColor
          }
        });
       
        this.closeBtn.setInteractive().on('pointerover', function () {
          this.setTint(0xff0000);
        });
        this.closeBtn.setInteractive().on('pointerout', function () {
          this.clearTint();
        });
        this.closeBtn.setInteractive().on('pointerdown', function () {
          self.toggleWindow();
        });
      
      }

      _createCloseModalButtonBorder(){
        var x = this._getGameWidth() - this.padding - 20;
        var y = this._getGameHeight() - this.windowHeight - this.padding;
        this.graphics.strokeRect(x, y, 20, 20);
      }
      
      toggleWindow() {
        this.visible = !this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.closeBtn) this.closeBtn.visible = this.visible;
      }
      

    shutdown(){

    }

    destroy(){

    }
}