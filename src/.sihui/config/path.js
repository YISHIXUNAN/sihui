const path = require('path');

const curPath = path.resolve(__dirname, '..');
const getPath = (str) => curPath + str;

const pagePath = path.resolve(__dirname, '../../pages');

const entryPath = getPath('/index.js');

const htmlTemPath = getPath('/index.html');

const outputPath = getPath('/../../dist');

const configPath = path.resolve(__dirname, '../../config');

const jsIncludePath = [path.resolve(__dirname, '../'), pagePath, configPath];

const cssIncludePath = pagePath;

module.exports = { entryPath, htmlTemPath, outputPath, jsIncludePath, cssIncludePath };

