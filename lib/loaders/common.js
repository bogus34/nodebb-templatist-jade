(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('nodebb-templatist-jade/loaders/common', factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TemplatistJadeLoaderCommon = factory();
    }
}(this, function () {
    var helpers = {},
        globals = {};

    var addHelpers = function(data) {
        data.function = data.function || {};
        for (name in helpers) {
            data.function[name] = helpers[name];
        }
    };
    var addGlobals = function(data) {
        for (name in globals) {
            if (!data.hasOwnProperty(name)) {
                data[name] = globals[name];
            }
        }
    };

    return {
        mkRender: function(template) {
            return function(name, block, data, callback) {
                data['render-block'] = block;
                addHelpers(data);
                addGlobals(data);
                callback(null, template(data));
            };
        },

        addCommonMethods: function(loader) {
            loader.registerHelper = function(name, helper) {
                helpers[name] = helper;
            };
            loader.setGlobal = function(name, value) {
                globals[name] = value;
            };
        }
    };
}));
