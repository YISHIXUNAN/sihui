const fs = require('fs');

const str = fs.readFileSync('./testroute.tsx');

const result = str.toString();

const reg1 = /component.*,/g;


// 这里其实可以匹配 { },然后用 ， 和 ： 把数据都分离出来，然后决定最终生成文件的样子

const newStr = result.replace(reg1, (str) => {
    const arr = str.split(':');
    arr[1] = `()=>import(${arr[1]}),`;
    return arr.join(":")
})

console.log(result, newStr);
console.log('******************************************');


fs.writeFile('./file.tsx', newStr, (err) => console.log('err', err))


