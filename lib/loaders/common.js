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

module.exports = {
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
