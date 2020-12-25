
class ContentManagerPlugin extends Phaser.Plugins.ScenePlugin{
    /**
     * 
     * @param {*} scene 
     * @param {*} pluginManager 
     * @param {*} contentType VIDEO, DIALOG, SOUND
     */
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.eventEmitter = this.scene.sys.events;
        this.eventEmitter.on('shutdown', this.shutdown, this);
        
    }

}
