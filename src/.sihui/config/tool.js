const { routePath } = require('./path.js');
const fs = require('fs');
const preprocessedRouting = (from, to) => {
    const str = fs.readFileSync(from);
    const result = str.toString();
    const reg3 = /component.*(\"|\')/g;
    const newStr = result.replace(reg3, (str) => {
        const arr = str.split(':');
        arr[1] = `()=>import(${arr[1]})`;
        return arr.join(':');
    });
    fs.writeFileSync(to, newStr, (err) => console.log('err', err));
};

fs.watchFile('./test.js', (pre, current) => {
    console.log('监听');
    // fs.writeFileSync(coreRoutePath, current, (err) => console.log('err', err))
});

// preprocessedRouting(routePath, '../core/routes.js');
module.exports = { preprocessedRouting };
