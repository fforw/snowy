module.exports = function(img)
{
    var width = img.width;
    var height = img.height;

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0);

    var l = [];

    var imgData = ctx.getImageData(0,0, width, height);
    var data = imgData.data;
    for (var i = 0; i < data.length; i += 4)
    {
        l.push("rgba(" +
            (data[i    ]|0) + "," +
            (data[i + 1]|0) + "," +
            (data[i + 2]|0) + "," +
            (data[i + 3]/255) +
        ")")
    }

    return l;
};