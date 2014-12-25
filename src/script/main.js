var merge = require("./merge");
var blurImage = require("./blur");

var createFlake = require("./create-flake");
var readPalette = require("./read-palette");

var requestAnimationFrame = require("./requestAnimationFrame");


var NUM_FLAKE_KINDS = 16;
var NUM_FLAKES = 128;

var SPEED = 64;

var sizesRenderDefaults = {
    minZ: 100,
    maxZ: 500,
    zSteps: 16,
    focusZ: 125
};

function createFlakeSizes(opts, flakeOpts)
{
    opts = merge({}, sizesRenderDefaults, opts);

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

        var blur = Math.abs( ((z - opts.focusZ) / ( (opts.maxZ - opts.focusZ) / (flakeOpts.space * 2))) | 0);
        //console.debug("blur = ", blur);

        var newCanvas = document.createElement("canvas");
        newCanvas.width = width;
        newCanvas.height = height;

        var x = width/2 - w/2;
        var y = height/2 - h/2;
        newCanvas.getContext("2d").drawImage(canvas, x, y, w, h);

        var final = document.createElement("canvas");
        final.width = width;
        final.height = height;

        blurImage(newCanvas, final, blur, true);
        l.push(final);
    }

    return l;
}


function Flake(raster, width, height, screenWidth, screenHeight, size)
{
    var kind = ((Math.random() * raster.length) | 0);
    this.img = raster[kind][size];
    this.size = size;

    this.width = width;
    this.height = height;
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
    var number = (sizesRenderDefaults.maxZ - sizesRenderDefaults.minZ) / sizesRenderDefaults.zSteps;
    var dy = SPEED / (sizesRenderDefaults.minZ + this.size * number);

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
        raster.push(createFlakeSizes({}, {
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
    var imgWidth = raster[0][0].width;
    var imgHeight = raster[0][0].height;


    var flakes = [];

    var flakesPerSize =  NUM_FLAKES / NUM_FLAKE_KINDS;

    for (i=0; i < NUM_FLAKES; i++)
    {
        flakes.push(new Flake(raster, imgWidth, imgHeight, width, height, NUM_FLAKE_KINDS - 1 - (i / flakesPerSize)|0));
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
