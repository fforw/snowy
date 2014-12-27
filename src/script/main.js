var merge = require("./merge");
var blurImage = require("./blur");

var createFlake = require("./create-flake");
var readPalette = require("./read-palette");

var requestAnimationFrame = require("./requestAnimationFrame");


var NUM_FLAKE_KINDS = 16;
var NUM_FLAKES = 128;

var SPEED = 64;

// configuration options for createFlakeSizes()
var opts = {
    // start distance
    minZ: 100,
    // end distance
    maxZ: 500,
    // distance steps to draw
    zSteps: 16,
    // Z-position for which there is no blur
    focusZ: 125,
    // can be used to adjust the overall blur strength
    blurMultiplier: 2
};

/**
 * Creates an array of canvases containing the different sizes and blurriness resulting from both
 * a perspective projection and a simulated lens focus blurriness.
 *
 * See sizesRenderConfig above for configuration options.
 *
 * @param flakeOpts     options for createFlake
 * @returns {Array}     array of flake canvases in decreasing order
 */
function createFlakeSizes(flakeOpts)
{

    var canvas = createFlake(flakeOpts);

    var width = canvas.width;
    var height = canvas.height;

    var xSize = width * opts.minZ;
    var ySize = height * opts.minZ;

    var dz = (opts.maxZ - opts.minZ) / opts.zSteps;

    var l = [];

    for (var z = opts.minZ; z < opts.maxZ; z += dz)
    {
        var w = xSize / z;
        var h = ySize / z;

        var blurStrength = Math.abs( ((z - opts.focusZ) / ( (opts.maxZ - opts.focusZ) / (flakeOpts.space * opts.blurMultiplier))) | 0);
        //console.debug("blur = ", blur);

        var canvasWidth = w + 2 * blurStrength;
        var canvasHeight = h + 2 * blurStrength;

        var scaled = document.createElement("canvas");
        scaled.width = canvasWidth;
        scaled.height = canvasHeight;

        scaled.getContext("2d").drawImage(canvas, blurStrength, blurStrength, w, h);

        var blurred = document.createElement("canvas");
        blurred.width = canvasWidth;
        blurred.height = canvasHeight;

        blurImage(scaled, blurred, blurStrength, true);
        l.push(blurred);
    }

    return l;
}

/**
 * Encapsulates runtime information for every single flake
 *
 * @param raster        the array of canvases arrays
 * @param width
 * @param height
 * @param screenWidth
 * @param screenHeight
 * @param size
 * @constructor
 */
function Flake(raster, screenWidth, screenHeight, size)
{
    var kind = ((Math.random() * raster.length) | 0);
    this.img = raster[kind][size];
    this.size = size;

    this.width = this.img.width;
    this.height = this.img.height;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.randomPos(false);
}

Flake.prototype.randomPos = function(top)
{

    this.x = -this.width +  Math.random() * ( this.screenWidth + this.width);
    this.y = -this.height;
    if (!top)
    {
        this.y += Math.random() * ( this.screenHeight + this.height);
    }
};
Flake.prototype.draw = function(ctx)
{
    var number = (opts.maxZ - opts.minZ) / opts.zSteps;
    var dy = SPEED / (opts.minZ + this.size * number);

    var y = this.y;
    y += dy;

    if (y > this.screenHeight)
    {
        this.randomPos(true);
    }
    else
    {
        this.y = y;
    }

    ctx.drawImage(this.img, this.x, this.y);
};


window.onload = function ()
{
    var palette = readPalette(document.getElementById("palette"));

    //console.log("palette = ", palette);

    var i, raster = [];

    for (i=0; i < NUM_FLAKE_KINDS; i++)
    {
        raster.push(createFlakeSizes({
            size: 96,
            lineWidth: [18, 16, 14, 8, 6, 3],
            space: 16,
            palette: palette
        }));
    }

    var screen = document.createElement("canvas");
    var width = (window.innerWidth) & ~15;
    var height = window.innerHeight - 4;
    screen.width = width;
    screen.height = height;

    document.body.appendChild(screen);

    var ctx = screen.getContext("2d");

    var flakes = [];

    var flakesPerSize =  NUM_FLAKES / NUM_FLAKE_KINDS;

    for (i=0; i < NUM_FLAKES; i++)
    {
        var sizeIndex = NUM_FLAKE_KINDS - 1 - (i / flakesPerSize) | 0;
        flakes.push(new Flake(raster, width, height, sizeIndex));
    }

    var drawLoop = function ()
    {
        ctx.clearRect(0,0,width,height);

        for (i=0; i < NUM_FLAKES; i++)
        {
            var f = flakes[i];

            f.draw(ctx);
        }

        requestAnimationFrame(drawLoop);
    };

    requestAnimationFrame(drawLoop);
};
