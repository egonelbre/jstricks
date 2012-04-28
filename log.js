// tavaliselt palju topelt
// trükkimist...
log.log("render", 1,2,3)
log.log("physics", 1,2,3)
log.log("mouse", 1)


// palju mõnusam oleks
log.render(1,2,3);
log.physics(1,2,3);
log.mouse(1,2,3);




function Log(){
    this.log = function( name, data ){
        console.log( name, ": ", data );
    };
    
    this.create = function(name){
        var name = name,
            logger = this;
        if( typeof( this[ name ] ) !== "undefined" )
            throw "Cannot use name : " + name + ". Already in use.";
        this[name] = function(){ logger.log( name, arguments ) };
    };
};

log = new Log();
log.create("render");
log.create("physics");
log.create("mouse");

log.render("alpha");
log.physics("1", 2, 3);
log.mouse("down", 100, 100);


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
        if( typeof( this[ name ] ) !== "undefined" )
            throw "Cannot use name : " + name + ". Already in use.";
        
        logger[name] = function(){ logger.log( name, arguments ) };
        logger.enabled[ name ] = enabled;
        logger[name].enable = function(){ logger[enabled]}
    };
    
    this.enable  = function(name){ this.enabled[ name ] = true; };
    this.disable = function(name){ this.enabled[ name ] = false; };
};
