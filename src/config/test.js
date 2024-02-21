const fs = require('fs');

const preprocessedRouting = (from, to) => {

    const str = fs.readFileSync(from);
    const result = str.toString();
    const reg1 = /component.*,/g;
    const newStr = result.replace(reg1, (str) => {
        const arr = str.split(':');
        arr[1] = `()=>import(${arr[1]}),`;
        return arr.join(":")
    })
    fs.writeFile(to, newStr, (err) => console.log('err', err))
}

module.exports = { preprocessedRouting };

preprocessedRouting('./testroute.tsx', './file.tsx')

// 这里其实可以匹配 { },然后用 ， 和 ： 把数据都分离出来，然后决定最终生成文件的样子
// 1. 在 webpack 打包之前先把 处理好的路由文件生成到指定位置，然后再打包。



