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
        var logger, sentAppName, sentDepth;

        beforeEach(function() {
            debugCaller.__set__("_buildNamespace", function(appName, depth) {
                sentAppName = appName;
                sentDepth = depth;
            });
            sentAppName = null;
            sentDepth = null;

            logger = debugCaller.__get__("logger");
        });

        describe("logger with only app name", function() {
            beforeEach(function() {
                logger = logger(APP_NAME);
            });

            it("should return a log and error function", function() {
                expect(logger.log).toBeDefined();
                expect(logger.error).toBeDefined();
            });

            it("should assign the correct app name", function() {
                expect(sentAppName).toEqual(APP_NAME);
            });

            it("should assign the correct depth", function() {
                expect(sentDepth).toEqual(1);
            });

            it("should assign non-random colors", function() {
                expect(logger.log.color).toEqual(7);
                expect(logger.error.color).toEqual(1);
            });
        });

        describe("logger with all options", function() {
            var DEPTH;

            beforeEach(function() {
                DEPTH = 5;

                logger = logger(APP_NAME, {
                    depth: DEPTH,
                    randomColors: true
                });
            });

            it("should return a log and error function", function() {
                expect(logger.log).toBeDefined();
                expect(logger.error).toBeDefined();
            });

            it("should assign the correct app name", function() {
                expect(sentAppName).toEqual(APP_NAME);
            });

            it("should assign the correct depth", function() {
                expect(sentDepth).toEqual(DEPTH);
            });

            it("should assign random colors", function() {
                expect(logger.log.color).toBeUndefined();
                expect(logger.error.color).toBeUndefined();
            });
        });
    });


    it("should provide access to debug", function() {
        expect(debugCaller.debug).toBeDefined();
        expect(debugCaller.debug.enable).toBeDefined();
    });
});
