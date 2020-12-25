const contentType = Object.freeze({
    VIDEO : 0,
    DIALOG : 1,
    SOUND : 2
});
class ContentManagerPlugin extends Phaser.Plugins.ScenePlugin{
    /**
     * 
     * @param {*} scene 
     * @param {*} pluginManager 
     * @param {*} contentType VIDEO, DIALOG, SOUND
     */
    constructor(scene, pluginManager, contentType){
        super(scne, pluginManager);
        this.eventEmitter = this.scene.sys.events;
        this.eventEmitter.on('shutdown', this.shutdown, this);
        this.eventEmitter.on('destroy', this.destroy, this);
    }
}
