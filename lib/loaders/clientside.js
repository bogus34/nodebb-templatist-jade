(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('nodebb-templatist-jade/loaders/clientside', ['nodebb-templatist-jade/loaders/common'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./common'));
    } else {
        // Browser globals (root is window)
        root.TemplatistJadeLoader = factory(root.TemplatistJadeLoaderCommon);
    }
}(this, function (common) {
    return function(Templatist) {
        var loader = function(name, callback) {
            require(['templates/' + name], function(jadeRender) {
                callback(null, common.mkRender(jadeRender));
            }, function(err) {
                callback(err);
            });
        };

        common.addCommonMethods(loader);

        Templatist.registerLoader('jade', loader);
    };
}));
