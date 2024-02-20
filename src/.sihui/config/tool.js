const fs = require('fs');

const preprocessedRouting = (from, to) => {

    const str = fs.readFileSync(from);
    const result = str.toString();
    console.log('result *&& *', result);
    const reg1 = /component.*,/g;
    const newStr = result.replace(reg1, (str) => {
        const arr = str.split(':');
        arr[1] = `()=>import(${arr[1]}),`;
        return arr.join(":")
    })
    fs.writeFile(to, newStr, (err) => console.log('err', err))
}

const path = require('path');
preprocessedRouting(path.resolve(__dirname, './routes.tsx'), path.resolve(__dirname, '../core/routes.js'))
module.exports = { preprocessedRouting };