function Log(){
    this.enabled = {};
    
    this.log = function( name, data ){
        if( this.enabled[ name ] ){
            console.log( name, ": ", data );
        }
    };
    
    this.create = function(name, enabled){
        var name = name,
            logger = this;
        if( typeof this[ name ] !== "undefined" )
            throw "Cannot use name : " + name + ". Already in use.";
        
        logger[name] = function(){ logger.log( name, arguments ) };
        logger.enabled[ name ] = enabled;
        logger[name].enable  = function(){ logger.enable(name);  };
        logger[name].disable = function(){ logger.disable(name); };
    };
    
    this.enable  = function(name){ this.enabled[ name ] = true; };
    this.disable = function(name){ this.enabled[ name ] = false; };
};

Log.prototype.create = function(name, enabled){
    var logger = this;
    if( typeof logger[name] !== "undefined" )
        throw "Cannot use name : " + name + ". Already in use.";

    logFun = function(){ logger.log( name, arguments ); };
    logFun.enable = function(){ logger.enable(name); };
    logFun.disable = function(){ logger.disable(name); };
    logger[name] = logFun;
    logger.enabled[name] = enabled || false;
};

Log.prototype.init = function(names, enabled){
    for(var i = 0; i < names.length; i += 1)
        this.create(names[i], enabled);
};

Log.prototype.enable = function(name){
    this.enabled[name] = true;
};

Log.prototype.disable = function(name){
    this.enabled[name] = false;
};

log = new Log();
log.init(["physics"])

log.physics.enable();
log.physics("1", 2, 3);
log.physics.disable();
log.physics("1", 2, 3);

// local alias
lg = log.physics;
lg("alpha", 1, 2, 3)