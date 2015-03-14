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

    describe("_getDecorator", function() {
        var _getDecorator;

        beforeEach(function() {
            _getDecorator = debugCaller.__get__("_getDecorator");
        });

        it("should return the correct decorator", function() {
            expect(_getDecorator(APP_NAME)).toEqual(APP_NAME + ":debug-caller-test");
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
