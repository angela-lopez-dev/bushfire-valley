// The game config that is used by Phaser
var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  //autoCenter : true,
  plugins: {
    scene: [
        { key: 'dialogManagerPlugin', plugin: DialogManagerPlugin, mapping: 'dialogs' },
        { key: 'videoManagerPlugin', plugin: VideoManagerPlugin, mapping: 'videos' }
    ]
},
  scene: {
    preload: preload,
    create: create
  }
};
 
// Create a new Phaser Game object
var game = new Phaser.Game(config);
 
function preload () {
  var assets = [{mapping: 'pereNoel', filepath: 'assets/videos/pere_noel.mp4'}];
  this.videos.preloadAll(assets);
}
 
function create () {
  
  this.dialogs.create();
  opts = {boundPluginDimensions : this.dialogs.getDimensions(), boundPlugin : this.dialogs};
  this.videos.create(opts);
  this.videos.add('pereNoel');
  this.videos.play('pereNoel');
}

function update(){
  
}