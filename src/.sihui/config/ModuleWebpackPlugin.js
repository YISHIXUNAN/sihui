const pluginName = "ModuleWebpackPlugin";
const { preprocessedRouting } = require('./tool.js')
const path = require('path');

class ModuleWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
        // console.log('Plugin options', this.options);
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tap(pluginName, compilation => {
            console.log('It is beforeRun!');
            preprocessedRouting(path.resolve(__dirname, '../routes.tsx'), path.resolve(__dirname, '../core/routes.js'))
        });
    }
}

module.exports = ModuleWebpackPlugin;