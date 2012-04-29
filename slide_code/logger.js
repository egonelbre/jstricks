logToDiv = (function(){
    var logDiv = document.getElementById("logDiv");
    return function(context, args){
        logDiv.innerHTML = 
            "<p>" + context + " : " + JSON.stringify(args) + "</p>" + 
            logDiv.innerHTML;
    };
})();

logToDiv("ctx1", ["alpha", 123, "test"]);
logToDiv("ctx2", ["alpha", 123, "test"]);
logToDiv("ctx3", ["alpha", 123, "test"]);


// dynamic prototypal logger

function NewLogger( def ) {
    var logger = {},
        tree   = {},
        sup  = {};

    var reservedKeys = /^(log|enabled|enabled?|disable|isEnabled|create|leave|enter|parent|fqn|_logger|\$|)$/;     
    sup.$ = tree;
    sup._logger = logger;
    sup.fqn = "";
    
    sup.log = function(args){
        logToDiv(this.fqn, args);
    };
    
    sup.enabled = true;
    sup.isEnabled = function(){
        var isRoot = this._logger.__proto__ === this,
            parentEnabled = (this === this.parent) 
                            || this.parent.isEnabled();
        return this.enabled && parentEnabled;
    };
    
    sup.enable = function(){ this.enabled = true; };
    sup.disable = function(){ this.enabled = false; };

    sup.create = function(name, enabled){
        var name = name;
        
        var f = function(){
            if( f.isEnabled() ){
                f.log( arguments );
            }
        };
        f.__proto__ = sup;
        
        f.fqn = this.fqn + "." + name;
        f.enabled = enabled;
        f.parent = this;
        
        f.enter = function(){
            this.log("-->");
            this._logger.__proto__ = f;
        };
        
        this[name] = f;
    };
    
    sup.leave = function(){
        this.log("<--");
        this._logger.__proto__ = this.parent;
    }
        
    var recurse = function( tree, def ){
        for(var n in def){
            if( reservedKeys.test(n) )
                continue;
            
            tree.create(n, true);
            if( def[n].log ){
                tree[n].log = def[n].log;
            };
            
            recurse(tree[n], def[n]);
        }
    };
    
    tree.__proto__ = sup;
    tree.fqn = "";
    tree.parent = tree;
    recurse(tree, def);
    
    logger.__proto__ = tree;
    
    return logger;
}

var def = {
    render  : { img : {} },
    physics : { world : {} },
    img : {}
};

def.render.img.log = function(args){
    logToDiv("!SPECIAL!", args);
};


var log = NewLogger(def);

log.img("testing image");
log.render("testing render");
log.render.img("testing render.img");
log.physics("testing physics");
log.physics.world("testing physics");

log.render.enter();
log.img("testing sub img");
log.leave();

log.physics.enter();
log.world("testing sub world");
log.world.disable();
log.world("testing sub world disabled");
log.$.render("testing full path");
log.leave();

​