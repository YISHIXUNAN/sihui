const pluginName = 'ModuleWebpackPlugin';
const { preprocessedRouting } = require('./tool.js');
const fs = require('fs');
const { routePath, coreRoutePath } = require('./path.js');

class ModuleWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
        // console.log('Plugin options', this.options);
    }

    apply(compiler) {
        compiler.hooks.environment.tap(pluginName, (compilation) => {
            console.log('webpack APPLY');
            preprocessedRouting(routePath, coreRoutePath);
            fs.watchFile(routePath, (pre, current) => {
                console.log('监听');
                // fs.writeFileSync(coreRoutePath, current, (err) => console.log('err', err))
            });
        });
    }
}

module.exports = ModuleWebpackPlugin;
