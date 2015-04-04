var common = require('./common'),
    jade = require('jade/lib/runtime');

module.exports = function(Templatist) {
    var loader = function(name, callback) {
        window.require(['/templates/' + name + '.js'], function(jadeRender) {
            callback(null, common.mkRender(jadeRender(jade)));
        }, function(err) {
            callback(err);
        });
    };

    common.addCommonMethods(loader);

    Templatist.registerLoader('jade', loader);
};
