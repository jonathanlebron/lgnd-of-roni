var CANVAS_WIDTH = 800,     // Canvas width
    CANVAS_HEIGHT = 600,    // Canvas height
    FPS = 30,               // Frames per second
    mouse = { x:0, y:0 },
    isPlaying = true,
    canvas,
    ctx,
    roni;

function mouseUp(e)
{
    isPlaying  = !isPlaying;
}

// Handler for mouseMove events. Computes mouseX and mouseY properties.
function mouseMove(e)
{
    if (e.pageX) {
        mouse.x = e.pageX;
    } else if (e.clientX) {
        mouse.x = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
    }
    mouse.x = mouse.x - canvas.offsetLeft;

    if (e.pageY) {
        mouse.y = e.pageY;
    } else if (e.clientY) {
        mouse.y = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    mouse.y = mouse.y - canvas.offsetTop;
}

// Update the model data.
function update()
{
    if (isPlaying)
    {
        roni.update();
    }
}
// Draw the views
function draw()
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = "red";
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(.5, .5, CANVAS_WIDTH-1, CANVAS_HEIGHT-1);
    roni.draw();
}

function startGame(){
    canvas = document.getElementById("stage");
    ctx = canvas.getContext("2d");

    // Add event listeners
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);

    // load images
    roniImg = new Image();
    roniImg.src = "roni.png";

    roni = {
        strokeColor: "#8ED6FF",
        fillColor: "#0000ff",
        x: -50,     // Starting x
        y: -25,     // Starting y
        _radians:0, // Rotation value required for the canvas rotate method.
        centerX: 0, // Center x point on canvas to draw
        centerY: 0, // Center y point on canvas to draw.
        mouse: {},  // Mouse object
        _dx:0,
        _dy:0,
        update: function()
        {
            // Distance from mouse x and center of canvas.
            this._dx = mouse.x - this.centerX;
            // Distance from mouse y and center of canvas.
            this._dy = mouse.y - this.centerY;
            // Radians for the canvas rotate method.
            this._radians = Math.atan2(this._dy,this._dx);
        },
        draw: function() // Draw.
        {
            // Draw off canvas
            ctx.save();
            //Translate canvas to center
            ctx.translate(this.centerX, this.centerY);
            // Rotate
            ctx.rotate(this._radians);
            ctx.drawImage(roniImg, -26.5, -19);
            // Put it on the canvas
            ctx.restore();
        }
    };

    // Initialization. Since arrow is a singleton, need to set initalization values.
    roni.centerX = CANVAS_WIDTH / 2;
    roni.centerY = CANVAS_HEIGHT / 2;
    roni.mouse = mouse;

    // main game loop
    setInterval(function(){
        update();
        draw();
    }, 1000/FPS);
}
