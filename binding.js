
main = {
    mouseAction: function(action, e){
        if( action == "move" ) {
            ...
        }
    },
};
input = {mouse:{down=false}};

mouseBinding = function(action){
    return function(e){
        if((action != "move") && (action != "wheel"))
            input.mouse.down = action == "down";
        main.mouseAction(action, e);
        if(input.mouse.down)
            modified();
        e.preventDefault();
    }
};

canvas.onmousemove=mouseBinding("move");
canvas.onmousedown=mouseBinding("down");
canvas.onmouseup=mouseBinding("up");
canvas.onmousewheel=mouseBinding("wheel");


