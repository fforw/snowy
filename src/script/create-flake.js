var merge = require("./merge");
var blur = require("./blur");

var TAU = Math.PI * 2;

var FLAKE_STEP = TAU / 6;
var GOLDEN = 0.618034;

var defaultOptions = {
    lineWidth: [32,28,24,16,12,6],
    lineCap: "round",
    lineJoin: "bevel",
    bgStyle: "rgba(0,0,0,0)",
    size: 256,
    space: 32,
    maxSpokeCount: 5,
    palette: ["rgba(0,35,14,1)", "rgba(0,35,14,1)", "rgba(1,36,16,1)", "rgba(3,37,17,1)", "rgba(4,38,18,1)", "rgba(5,39,20,1)", "rgba(6,40,22,1)", "rgba(7,41,23,1)", "rgba(9,42,25,1)", "rgba(10,43,27,1)", "rgba(11,44,28,1)", "rgba(12,45,29,1)", "rgba(13,46,31,1)", "rgba(14,48,32,1)", "rgba(15,48,34,1)", "rgba(17,49,36,1)", "rgba(18,50,38,1)", "rgba(20,52,40,1)", "rgba(21,52,41,1)", "rgba(21,54,42,1)", "rgba(23,54,44,1)", "rgba(24,56,46,1)", "rgba(26,57,47,1)", "rgba(27,57,48,1)", "rgba(28,59,50,1)", "rgba(29,59,52,1)", "rgba(30,61,53,1)", "rgba(31,62,55,1)", "rgba(33,62,56,1)", "rgba(34,64,58,1)", "rgba(35,64,59,1)", "rgba(36,65,61,1)", "rgba(38,66,62,1)", "rgba(38,67,64,1)", "rgba(40,69,66,1)", "rgba(41,69,68,1)", "rgba(42,70,68,1)", "rgba(44,71,71,1)", "rgba(45,72,72,1)", "rgba(46,73,73,1)", "rgba(47,75,75,1)", "rgba(49,75,77,1)", "rgba(50,77,78,1)", "rgba(51,78,79,1)", "rgba(52,79,81,1)", "rgba(53,80,83,1)", "rgba(54,81,85,1)", "rgba(55,82,86,1)", "rgba(57,83,87,1)", "rgba(58,84,89,1)", "rgba(60,85,90,1)", "rgba(60,86,92,1)", "rgba(62,87,94,1)", "rgba(62,88,95,1)", "rgba(64,89,97,1)", "rgba(65,90,98,1)", "rgba(67,91,100,1)", "rgba(67,92,102,1)", "rgba(69,93,103,1)", "rgba(70,94,105,1)", "rgba(71,95,106,1)", "rgba(72,96,108,1)", "rgba(74,97,110,1)", "rgba(75,98,111,1)", "rgba(76,99,113,1)", "rgba(78,100,114,1)", "rgba(79,101,116,1)", "rgba(80,103,117,1)", "rgba(82,103,119,1)", "rgba(82,104,121,1)", "rgba(84,105,122,1)", "rgba(85,106,124,1)", "rgba(86,108,125,1)", "rgba(87,109,126,1)", "rgba(88,109,128,1)", "rgba(90,110,130,1)", "rgba(91,112,131,1)", "rgba(92,112,133,1)", "rgba(93,114,134,1)", "rgba(94,115,136,1)", "rgba(95,115,138,1)", "rgba(97,117,139,1)", "rgba(98,118,141,1)", "rgba(99,119,142,1)", "rgba(100,119,144,1)", "rgba(102,121,145,1)", "rgba(103,122,147,1)", "rgba(104,123,148,1)", "rgba(105,124,150,1)", "rgba(106,125,151,1)", "rgba(108,126,153,1)", "rgba(109,127,155,1)", "rgba(110,128,156,1)", "rgba(111,129,158,1)", "rgba(112,130,160,1)", "rgba(113,130,161,1)", "rgba(115,132,163,1)", "rgba(116,133,164,1)", "rgba(117,134,166,1)", "rgba(119,135,167,1)", "rgba(120,136,169,1)", "rgba(121,137,171,1)", "rgba(122,138,172,1)", "rgba(124,139,174,1)", "rgba(125,140,175,1)", "rgba(126,141,177,1)", "rgba(127,142,179,1)", "rgba(128,143,180,1)", "rgba(129,144,181,1)", "rgba(131,145,183,1)", "rgba(132,146,185,1)", "rgba(133,147,186,1)", "rgba(134,148,188,1)", "rgba(135,149,189,1)", "rgba(136,150,190,1)", "rgba(138,151,192,1)", "rgba(139,152,194,1)", "rgba(141,153,196,1)", "rgba(141,154,197,1)", "rgba(143,155,199,1)", "rgba(144,156,200,1)", "rgba(145,158,201,1)", "rgba(147,158,203,1)", "rgba(148,159,205,1)", "rgba(149,160,206,1)", "rgba(150,162,208,1)", "rgba(151,163,210,1)", "rgba(152,163,211,1)", "rgba(153,165,213,1)", "rgba(154,165,212,1)", "rgba(155,166,213,1)", "rgba(156,166,213,1)", "rgba(156,167,214,1)", "rgba(157,168,214,1)", "rgba(158,169,215,1)", "rgba(159,170,214,1)", "rgba(160,170,215,1)", "rgba(161,171,216,1)", "rgba(162,172,215,1)", "rgba(163,173,216,1)", "rgba(163,173,216,1)", "rgba(164,174,217,1)", "rgba(165,174,216,1)", "rgba(166,175,217,1)", "rgba(166,176,218,1)", "rgba(167,177,218,1)", "rgba(168,177,219,1)", "rgba(168,178,219,1)", "rgba(169,179,219,1)", "rgba(170,180,220,1)", "rgba(171,180,220,1)", "rgba(172,181,220,1)", "rgba(173,181,220,1)", "rgba(173,183,221,1)", "rgba(175,183,221,1)", "rgba(175,184,221,1)", "rgba(176,185,222,1)", "rgba(177,185,223,1)", "rgba(178,186,223,1)", "rgba(178,187,223,1)", "rgba(179,187,223,1)", "rgba(180,188,223,1)", "rgba(181,189,224,1)", "rgba(182,190,224,1)", "rgba(182,190,224,1)", "rgba(183,191,225,1)", "rgba(184,192,225,1)", "rgba(185,193,225,1)", "rgba(186,193,226,1)", "rgba(186,193,226,1)", "rgba(187,195,226,1)", "rgba(188,196,227,1)", "rgba(189,197,228,1)", "rgba(189,197,228,1)", "rgba(190,197,227,1)", "rgba(192,198,228,1)", "rgba(192,199,229,1)", "rgba(193,199,229,1)", "rgba(193,201,229,1)", "rgba(194,201,230,1)", "rgba(195,202,230,1)", "rgba(196,203,230,1)", "rgba(197,203,230,1)", "rgba(198,204,231,1)", "rgba(199,205,231,1)", "rgba(199,205,232,1)", "rgba(200,206,231,1)", "rgba(201,207,232,1)", "rgba(201,207,233,1)", "rgba(202,208,233,1)", "rgba(203,209,234,1)", "rgba(204,210,233,1)", "rgba(205,211,233,1)", "rgba(205,211,234,1)", "rgba(206,212,235,1)", "rgba(207,213,235,1)", "rgba(208,213,236,1)", "rgba(209,214,235,1)", "rgba(210,215,236,1)", "rgba(211,215,236,1)", "rgba(212,216,237,1)", "rgba(213,217,237,1)", "rgba(213,217,237,1)", "rgba(214,219,237,1)", "rgba(215,219,238,1)", "rgba(216,220,239,1)", "rgba(216,220,238,1)", "rgba(217,221,239,1)", "rgba(218,222,239,1)", "rgba(218,223,239,1)", "rgba(219,223,240,1)", "rgba(221,224,240,1)", "rgba(221,225,241,1)", "rgba(222,225,241,1)", "rgba(223,226,241,1)", "rgba(224,227,242,1)", "rgba(225,228,243,1)", "rgba(225,229,242,1)", "rgba(226,229,243,1)", "rgba(227,230,243,1)", "rgba(228,231,243,1)", "rgba(228,231,244,1)", "rgba(230,232,244,1)", "rgba(230,233,244,1)", "rgba(230,233,245,1)", "rgba(231,235,245,1)", "rgba(232,235,246,1)", "rgba(233,236,246,1)", "rgba(234,237,246,1)", "rgba(234,237,247,1)", "rgba(236,237,247,1)", "rgba(237,239,247,1)", "rgba(238,239,247,1)", "rgba(238,240,248,1)", "rgba(239,240,248,1)", "rgba(240,242,249,1)", "rgba(241,242,248,1)", "rgba(242,243,249,1)", "rgba(242,244,249,1)", "rgba(243,245,250,1)", "rgba(244,245,250,1)", "rgba(245,245,250,1)", "rgba(245,246,251,1)", "rgba(247,247,252,1)", "rgba(247,247,251,1)", "rgba(247,248,252,1)", "rgba(249,249,252,1)", "rgba(250,250,253,1)", "rgba(250,251,253,1)", "rgba(251,251,254,1)", "rgba(252,252,253,1)", "rgba(253,253,254,1)", "rgba(253,253,255,1)", "rgba(254,254,254,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]

};

/**
 * Draw a random snow flake according to the given options and return canvas
 *
 * @param opts.lineWidth        Array of line widths to draw
 * @param opts.lineCap          HTML5 canvas lineCap value
 * @param opts.lineJoin         HTML5 canvas lineJoin value
 * @param opts.bgStyle          fillStyle to clear the canvas with
 * @param opts.size             Flake area size
 * @param opts.space            Free space to leave on all sides ( width = space + size + space etc)
 * @param opts.maxSpokeCount    Maximum number of flake spokes to draw
 * @param opts.palette          Array of strokeStyle values. Can be larger than the numbers of lines to draw. Drawing
 *                              will spread over available palette.
 * @returns {HTMLElement}   canvas
 */
module.exports = function (opts)
{
    var w, color;

    opts = merge({}, defaultOptions, opts);

    var size = (opts.size + opts.space + opts.space) | 0;

    var flakeSize = opts.size / 2;

    //console.log("opts = ", opts, ", size = ", size);
    var canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = opts.bgStyle;
    ctx.fillRect(0, 0, size, size);

    var cx = size / 2;
    var cy = size / 2;

    ctx.lineCap = opts.lineCap;
    ctx.lineJoin = opts.lineJoin;

    // randomize spoke length for current flake
    var spokes = (2 + Math.random() * opts.maxSpokeCount) | 0;
    var spokeLen = [];
    for (i = 0; i < spokes; i++)
    {
        spokeLen[i] = (Math.random() * flakeSize * GOLDEN / (i + 1)) | 0;
    }

    var numLineWidths = opts.lineWidth.length;

    // chose colors in regular intervals from the palette making sure
    // we're landing on the very last color with our very last snow flake
    var colorStep = (opts.palette.length / numLineWidths)|0;
    var colIdx = 255 - colorStep * (numLineWidths - 1);

    var startAngle = Math.random() * FLAKE_STEP;

    // we draw one flake for line width
    for (var i = 0; i < numLineWidths; i++)
    {
        w = opts.lineWidth[i];
        color = opts.palette[colIdx];
        //console.debug("Color = %s, width = %n", color, w);

        // set current line width and color for snow flake
        ctx.lineWidth = w;
        ctx.strokeStyle = color;

        for (var currentAngle = startAngle; currentAngle < TAU; currentAngle += FLAKE_STEP)
        {
            var x = cx;
            var y = cy;
            var dx = Math.cos(currentAngle) * flakeSize;
            var dy = Math.sin(currentAngle) * flakeSize;

            // draw central axes for angle a
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();

            dx = (dx / (spokes + 1)) | 0;
            dy = (dy / (spokes + 1)) | 0;

            // draw spokes on current central axis
            for (var j = 0; j < spokes; j++)
            {
                x += dx;
                y += dy;

                var len = spokeLen[j];

                var lowerAngle = currentAngle - FLAKE_STEP / 2;
                var higherAngle = currentAngle + FLAKE_STEP / 2;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(lowerAngle) * len, y + Math.sin(lowerAngle) * len);
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(higherAngle) * len, y + Math.sin(higherAngle) * len);
                ctx.stroke();
            }
        }
        colIdx += colorStep;
    }

    return canvas;
};

