/**This class is largely based  on Scott Westover's article for gamedevacademy.
 * The source code is available at https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/.
 */
class ContentManagerPlugin extends Phaser.Plugins.ScenePlugin{
    /**
     * 
     * @param {*} scene 
     * @param {*} pluginManager 
     * */
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.eventEmitter = this.scene.sys.events;
        //this.eventEmitter.on('shutdown', this.shutdown, this);  
    }

    
    create(opts){
        
        if (!opts) opts = {};
        // set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || this.default.borderThickness;
        this.borderColor = opts.borderColor || this.default.borderColor;
        this.borderAlpha = opts.borderAlpha || this.default.borderAlpha;
        this.windowAlpha = opts.windowAlpha || this.default.windowAlpha;
        this.windowColor = opts.windowColor || this.default.windowColor;
        this.setWidthToMax = opts.setWidthToMax || this.default.setWidthToMax;
        this.setHeightToMax = opts.setHeightToMax|| this.default.setHeightToMax;
        this.windowHeight = opts.windowHeight || this.default.windowHeight;//will be ignored if setHeightToMax is true
        this.windowWidth = opts.windowWidth || this.default.windowHeight;//will be ignored if setWidthToMax is true
        this.padding = opts.padding || this.default.padding;
        this.closeBtnColor = opts.closeBtnColor || this.default.closeBtnColor;
        this.boundPlugin = opts.boundPlugin || null;
        this.boundPluginDimensions = opts.boundPluginDimensions|| null;

        this.addCloseButton = opts.addCloseButton || this.default.addCloseButton;
        
        // if the dialog window is shown
        this.visible = true;
        this.graphics = this.scene.add.graphics();
        this.closeBtn;
       
        // Create the dialog window
        this._createWindow();
      }

      _createWindow(){
        let width = this._getGameWidth();
        let height = this._getGameHeight();
        this.dimensions = this._calculateWindowDimensions(width,height);
        this._createOuterWindow(this.dimensions.x,this.dimensions.y,this.dimensions.rectWidth,this.dimensions.rectHeight);
        
        if(this.addCloseButton == true){
            this._createCloseModalButton();
            this._createCloseModalButtonBorder();
        }
      }
      
      // Gets the width of the game (based on the scene)
    _getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    // Gets the height of the game (based on the scene)
    _getGameHeight() {
    return this.scene.sys.game.config.height;
    }

    _calculateMaxWidth(width) {
           return width - (this.padding * 2);
    }

    _calculateMaxHeight(height,boundWith=null){
       console.log(boundWith);
        let maxHeight;
        if(boundWith != null)
            maxHeight = height - (this.padding * 2) - boundWith.rectHeight;
        else
            maxHeight = height - (this.padding * 2);
            console.log(maxHeight);
        return maxHeight;
        
    }

    _calculateWindowDimensions (width, height) {
        let x, y, rectWidth,rectHeight;
        
        if(this.setHeightToMax){
            y = this.padding;
            rectHeight = this._calculateMaxHeight(height, this.boundPluginDimensions);
            
        }
        else{
            y =  height - this.windowHeight - this.padding;
            rectHeight = this.windowHeight;
        }

        if(this.setWidthToMax){
            x = this.padding;
            rectWidth = this._calculateMaxWidth(width);
        }
        else{
            x = width - this.windowWidth - this.padding;
            rectWidth = this.windowWidth;
        }
        return {
          x,
          y,
          rectWidth,
          rectHeight
        };
    }
    _createCloseModalButton(){
        console.log("button");
        console.log(this.dimensions.rectHeight);
        var self = this;
        this.closeBtn = this.scene.make.text({
          x: this._getGameWidth() - this.padding - 14,
          y: this.dimensions.y + 3,
          text: 'X',
          style: {
            font: 'bold 12px Arial',
            fill: this.closeBtnColor
          }
        });
        this.closeBtn.setInteractive();
       
        this.closeBtn.on('pointerover', function () {
          this.setTint(0xff0000);
        });
        this.closeBtn.on('pointerout', function () {
          this.clearTint();
        });
        this.closeBtn.on('pointerdown', function () {
          self.toggleWindow();
        });
      }
    // Creates the close dialog button border
    _createCloseModalButtonBorder(){
      var x = this._getGameWidth() - this.padding - 20;
      var y =  this.dimensions.y;
      this.graphics.strokeRect(x, y, 20, 20);
    }
    // Creates the border rectangle of the dialog window
    _createOuterWindow (x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }
	
  // Hide/Show the dialog window
  toggleWindow() {
    this.shutdown();
    if(this.boundPlugin != null) this.boundPlugin.shutdown();
  }

    shutdown(){
      if(this.graphics) this.graphics.destroy();
      console.log("shutting down");//debug
    }

    destroy(){
          this.shutdown();
          this.scene = undefined;
    }

    getDimensions(){
        return this.dimensions;
    }
      



}
