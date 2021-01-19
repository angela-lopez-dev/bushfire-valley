class VideoManagerPlugin extends ContentManagerPlugin{

    constructor(scene,pluginManager){
        super(scene,pluginManager);
        this.default = Object.freeze({
            borderThickness : 3,
            borderColor : 0x907748,
            borderAlpha :  1,
            windowAlpha :  0.8,
            windowColor :  0x303030, 
            padding :  32,
            closeBtnColor :  'darkgoldenrod',
            setWidthToMax : true, //video should occupy the whole width of the game
            setHeightToMax : true,//same for the height
            addCloseButton : true 
        });

        this.type = "VIDEO";
        this.videos = {};
        this.currentVideo = null;
    }

    /**
     * 
     * @param {*} assets array of {mapping,filepath} objects
     */
    preloadAll(assets){
        
        for(let i = 0; i < assets.length;i++){
            this.videos[assets[i].mapping] = i;
            this.scene.load.video(assets[i].mapping,assets[i].filepath);
        }

        
    }
    add(mapping){
            let video = this.scene.add.video(0,0,mapping);
            if(video.width > this.dimensions.rectWidth || video.height > this.dimensions.rectHeight){
                let ratio = this.computeIdealScale(video.width,video.height);
    
                video.setScale(ratio);
            }
            this.center(video);
            
            this.videos[mapping] = video;
            this.currentVideo = video;

    }

    computeIdealScale(width, height){
     let widthRatio= width/this.dimensions.rectWidth; 
     let heightRatio = height/this.dimensions.rectHeight;
     return (1/Math.max(widthRatio,heightRatio));
    }

    center(video){
        video.setOrigin(0,0); 
       let x  = game.config.width / 2 - video.displayWidth/2 ;
       let y = this.dimensions.y;
        video.setPosition(x,y);
    }

    

    play(mapping){
        
        this.videos[mapping].play(true);
    }

    create(opts){
        super.create(opts);
        this._createCloseModalButton();
        console.log(this.padding);
        console.log(this.addCloseButton);
    }

    shutdown(){
        super.shutdown();
        if(this.currentVideo) this.currentVideo.destroy();
    }

}