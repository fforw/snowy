function merge()
{
    var objects = Array.prototype.slice.call(arguments);

    var target = objects[0];

    for (var i = 1; i < objects.length; i++)
    {
        var src = objects[i];
        if (src)
        {
            for (var k in src)
            {
                if (src.hasOwnProperty(k))
                {
                    target[k] = src[k];
                }
            }
        }
    }
    return  target;
}

module.exports = merge;