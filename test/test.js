var assert = require("power-assert");

describe("Testing", function(){
	it("Mocha is integrated", function()
	{
		assert(true);
	});
	it("Power Assert works", function()
	{
        var foo = "abc";
        var bar = 123;

        try
        {
            assert(foo == bar);
        }
        catch(e)
        {
            assert(/"abc"/.test(e));
            return
        }
		assert(false);
	});
});
