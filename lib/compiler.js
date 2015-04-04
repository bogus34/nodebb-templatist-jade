var fs = require('fs'),
    path = require('path'),
    jade = require('jade');

var umd =
"(function (root, factory) {                               \n" +
"    if (typeof define === 'function' && define.amd) {     \n" +
"        define('<module-name>', factory);                 \n" +
"    } else if (typeof exports === 'object') {             \n" +
"        module.exports = factory();                       \n" +
"    } else {                                              \n" +
"        root.TemplatistTplLoader = factory();             \n" +
"    }                                                     \n" +
"}(this, function() {                                      \n" +
"   return function(jade) {                                \n" +
"      <template>                                          \n" +
"      return template;                                    \n" +
"   };                                                     \n" +
"}));                                                      \n";


function compiler(paths, relativePath, callback) {
    var filePath = paths[relativePath],
        moduleName = 'templates' + relativePath.substr(0, relativePath.length - path.extname(relativePath).length);
    fs.readFile(filePath, function(err, file) {
        if (err) {
            callback(err);
            return;
        }

        var templateFn = jade.compileClient(file, {filename: filePath, cache: false}),
            template = umd.replace('<module-name>', moduleName).replace('<template>', templateFn),
            compiledName = relativePath.substr(0, relativePath.length - path.extname(relativePath).length) + '.js';
            files = {};
        files[compiledName] = template;
        callback(null, {files: files});
    });
}

module.exports = function(Templatist) {
    Templatist.registerCompiler('jade', compiler);
};