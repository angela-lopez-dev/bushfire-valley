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

        this.type = "DIALOG"; //debug
    }

    create(opts){
        super.create(opts);
        
    }

    


    
}