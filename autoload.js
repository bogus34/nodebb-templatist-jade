/* global jQuery */
$(window).one('action:init-templatist', function() {
    window.require(['nodebb-templatist'],
        function(Templatist) {
            var initJadeLoader = require('./lib/loaders/clientside');
            initJadeLoader(Templatist);
        });
});
