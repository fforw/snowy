var merge = require("./merge");
var blurImage = require("./blur");

var createFlake = require("./create-flake");
var readPalette = require("./read-palette");

var requestAnimationFrame = require("./requestAnimationFrame");

var TAU = Math.PI * 2;

// number of different flakes drawn
var NUM_FLAKE_KINDS = 16;
// number of perspectivic flake layers
var NUM_FLAKE_LAYERS = 10;
// number of flakes to draw.
var NUM_FLAKES = 160;

// Flake speed (actual speed will randomly vary by 0.75 to 1.0 times of that)
var SPEED = 64;

// configuration options for createFlakeSizes()
var opts = {
    // start distance
    minZ: 100,
    // end distance
    maxZ: 500,
    // distance steps to draw
    zSteps: NUM_FLAKE_LAYERS,
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

var latAngle = Math.random() * TAU;
var latAngle2 = Math.random() * TAU;

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
    this.speed = SPEED * 0.75 + (Math.random() * SPEED * 0.25);

    this.angle = 0;
    this.spin = (Math.random() - 0.5) / 200;

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
    var zPerStep = (opts.maxZ - opts.minZ) / opts.zSteps;
    var z = (opts.minZ + this.size * zPerStep);
    var dy = this.speed / z;

    var y = this.y;
    this.x += (Math.sin(latAngle + this.x * TAU * 0.5 / this.screenWidth ) * 16  + Math.sin(latAngle2) * 16)/ z;
    y += dy;

    if (y > this.screenHeight)
    {
        this.randomPos(true);
    }
    else
    {
        this.y = y;
    }

    this.angle += this.spin;

    ctx.save();
    var hw = this.width / 2;
    var hh = this.height / 2;
    ctx.translate(this.x + hw, this.y + hh);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -hw, -hh);
    ctx.restore();

};

function populateFlakeLayers(raster, width, height)
{
    var i, flakes = [];

    var flakesPerSize = NUM_FLAKES / NUM_FLAKE_LAYERS;

    // the number of flakes in each layer has to be reverse proportional to the flake size on that layer
    // because smaller flakes mean we get to see more cartesian space on that layer so it needs to
    // contain more flakes

    // there might be a much more elegant way to calculate this, but I can't think of it



    var largestWeight = 256 / opts.minZ;
    var layerWeight = [];
    var weightSum = 0;
    var zPos = opts.minZ;

    for (i = 0 ; i < NUM_FLAKE_LAYERS; i++)
    {
        // Assign a weight to every layer that is the largest flake width in relation to its own width
        var w = 256 / zPos;
        var weight = largestWeight / w;
        layerWeight.push(weight);

        //console.debug("width = %d", w);

        weightSum += weight;
        zPos += (opts.maxZ - opts.minZ) / opts.zSteps;
    }


    for (i = NUM_FLAKE_LAYERS - 1 ; i >= 0; i--)
    {
        var count = Math.round(NUM_FLAKES * (layerWeight[i]/weightSum));
        console.log("layer %d: %d flakes", i, count);
        for (var j=0; j < count; j++)
        {
            flakes.push(new Flake(raster, width, height, i));
        }
    }

    //console.log("weights: %o, sum = %s, actual number of flakes: %d", layerWeight, weightSum, flakes.length);

    return flakes;
}
window.onload = function ()
{
    var palette = readPalette(document.getElementById("palette"), 0.33);

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
    var flakes = populateFlakeLayers(raster, width, height);
    var drawLoop = function ()
    {
        ctx.clearRect(0,0,width,height);

        for (i=0; i < NUM_FLAKES; i++)
        {
            var f = flakes[i];
            f.draw(ctx);
        }

        latAngle += 0.0017;
        latAngle2 += 0.0013;

        requestAnimationFrame(drawLoop);
    };

    requestAnimationFrame(drawLoop);
};
