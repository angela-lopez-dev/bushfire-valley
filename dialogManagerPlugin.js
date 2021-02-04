/**This class is largely based  on Scott Westover's article for gamedevacademy.
 * The source code is available at https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/.
 */
class DialogManagerPlugin extends ContentManagerPlugin{

    constructor(scene, pluginManager){
        super(scene,pluginManager);
        //default settings for a dialog manager
        this.default = Object.freeze({
            borderThickness : 3,
            borderColor : 0x907748,
            borderAlpha :  1,
            windowAlpha :  0.8,
            windowColor :  0x303030, 
            windowHeight :  150,
            setWidthToMax: true,
            padding :  32,
            closeBtnColor :  'darkgoldenrod',
            dialogSpeed :  3
        });

        
    }

    create(opts){
        super.create(opts);
        this._createInnerWindow(this.dimensions.x, this.dimensions.y, this.dimensions.rectWidth,this.dimensions.rectHeight);
    }

    _createInnerWindow (x, y, rectWidth, rectHeight){
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);  
    }

    setText(text,animate){
    
        // Reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();
       
        var tempText = animate ? '' : text;
        this._setText(tempText);
       
        if (animate) {
          this.timedEvent = this.scene.time.addEvent({
            delay: 150 - (this.dialogSpeed * 30),
            callback: this._animateText,
            callbackScope: this,
            loop: true
          });
        }
      
    }

    	
    // Slowly displays the text in the window to make it appear annimated
    _animateText() {
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
        this.timedEvent.remove();
        }
    }
    
    // Calcuate the position of the text in the dialog window
    _setText(text) {
    // Reset the dialog
    if (this.text) this.text.destroy();
    
        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;
        
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
            wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 }
            }
        });
    }

   shutdown(){
        super.shutdown();
        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
    }

  

    
}