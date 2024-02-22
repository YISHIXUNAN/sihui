const { routePath } = require('./path.js');
const fs = require('fs');
const preprocessedRouting = (from, to) => {
    const str = fs.readFileSync(from);
    const result = str.toString();
    const reg3 = /component.*(\"|\')/g;
    const newStr = result.replace(reg3, (str) => {
        const arr = str.split(':');
        const chunkName = arr[1].split('/').join('_');
        arr[1] = `()=>import(/* webpackChunkName: ${chunkName} */${arr[1]})`;
        return arr.join(':');
    });
    fs.writeFileSync(to, newStr, (err) => console.log('err', err));
};

// preprocessedRouting(routePath, '../core/routes.js');
module.exports = { preprocessedRouting };
