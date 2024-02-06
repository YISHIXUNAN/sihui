const path = require('path');

const curPath = path.resolve(__dirname, '..');
const getPath = (str) => curPath + str;

const entryPath = getPath('/index.js');

const htmlTemPath = getPath('/index.html');

const outputPath = getPath('/../../dist');

const jsIncludePath = [path.resolve(__dirname, '../index.js'), path.resolve(__dirname, '../../pages')];

const cssIncludePath = path.resolve(__dirname, '../../pages');

module.exports = { entryPath, htmlTemPath, outputPath, jsIncludePath, cssIncludePath };

