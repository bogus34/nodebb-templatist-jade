/* global jQuery */
$(window).one('action:init-templatist', function() {
    require(['nodebb-templatist', 'nodebb-templatist-jade/loaders/clientside'],
        function(Templatist, initJadeLoader) {
            initJadeLoader(Templatist);
        });
});
