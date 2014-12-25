var blur = require("./blur");

var createFlake = require("./create-flake");
var readPalette = require("./read-palette");


window.onload = function ()
{
    var palette = readPalette(document.getElementById("palette"));
    var img = createFlake({
        palette: palette
    });
    document.body.appendChild(img);
};
