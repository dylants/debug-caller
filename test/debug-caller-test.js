"use strict";

var rewire = require("rewire");

describe("The debugCaller library", function() {
    var APP_NAME;
    var debugCaller;

    beforeEach(function() {
        APP_NAME = "myApp";

        debugCaller = rewire("../lib/debug-caller");
    });

    it("should exist", function() {
        expect(debugCaller).toBeDefined();
    });

    describe("_buildNamespace", function() {
        var _buildNamespace;

        beforeEach(function() {
            _buildNamespace = debugCaller.__get__("_buildNamespace");
        });

        it("should return the correct namespace", function() {
            // use depth of -1 here to get around the depth default settings
            // (and get depth to equal 1, which is only useful in testing)
            expect(_buildNamespace(APP_NAME, -1)).toEqual(APP_NAME + ":debug-caller-test");
        });
    });

    describe("logger", function() {
        var logger;

        beforeEach(function() {
            logger = debugCaller.__get__("logger")(APP_NAME);
        });

        it("should return a log and error function", function() {
            expect(logger.log).toBeDefined();
            expect(logger.error).toBeDefined();
        });
    });
});
