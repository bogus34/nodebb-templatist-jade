var path = require('path'),
    common = require('./common'),
    jade = require('jade');

module.exports = function(Templatist, viewsDir) {
    var loader = function(name, callback) {
        var filename = path.join(viewsDir, name) + '.js';
        try {
            var jadeRender = require(filename)(jade);
            callback(null, common.mkRender(jadeRender));
        } catch (e) {
            //callback(new Error('Template not found: ' + name + '.jade'));
            throw e;
        }
    };

    common.addCommonMethods(loader);

    Templatist.registerLoader('jade', loader);
};
