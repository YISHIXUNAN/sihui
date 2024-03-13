const pluginName = 'ModuleWebpackPlugin';
const { preprocessedRouting } = require('./tool.js');
const { routePath, coreRoutePath } = require('./path.js');

class ModuleWebpackPlugin {
    constructor(isDev) {
        this.isDev = isDev;
    }

    apply(compiler) {
        compiler.hooks.environment.tap(pluginName, (compilation) => {
            preprocessedRouting(routePath, coreRoutePath);
            if (this.isDev) {
                console.log('Dev', this.isDev);
                const fs = require('fs');
                fs.watch(routePath, (pre, current) => {
                    preprocessedRouting(routePath, coreRoutePath);
                });
            }
        });
    }
}

module.exports = ModuleWebpackPlugin;
