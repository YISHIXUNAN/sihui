const { routePath } = require('./path.js');
const fs = require('fs');
const preprocessedRouting = (from, to) => {
    const str = fs.readFileSync(from);
    let headStr = 'import React from "react";\n';
    const result = str.toString();
    const newStr = result
        .replace(/lazy.*(\"|\')/g, (str) => {
            const arr = str.split(':');
            const name = arr[1].split('/').join('_');
            arr[1] = `()=>import(/* webpackChunkName: ${name} */${arr[1]})`;
            return arr.join(':');
        })
        .replace(/component.*(\"|\')/g, (str) => {
            const arr = str.split(':');
            const name = 'S' + arr[1].replace(/(@|\/|\"|\'|\s)/g, '');
            headStr += `import ${name} from ${arr[1]};\n`;
            return `component:<${name} />`;
        });

    fs.writeFileSync(to, headStr + newStr, (err) => console.log('err', err));
};

// preprocessedRouting(routePath, '../core/routes.js');
module.exports = { preprocessedRouting };
