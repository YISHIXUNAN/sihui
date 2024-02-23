const path = require('path');

const curPath = path.resolve(__dirname, '..');
const getPath = (str) => curPath + str;

const pagePath = path.resolve(__dirname, '../../pages');

const entryPath = getPath('/index.js');

const htmlTemPath = getPath('/index.html');

const outputPath = getPath('/../../dist');

const configPath = path.resolve(__dirname, '../core');

const routePath = path.resolve(__dirname, '../../config/routes.tsx');
const coreRoutePath = path.resolve(__dirname, '../core/routes.jsx');

const jsIncludePath = [path.resolve(__dirname, '../'), pagePath, configPath];

const cssIncludePath = [pagePath, configPath];

module.exports = {
    entryPath,
    htmlTemPath,
    outputPath,
    jsIncludePath,
    cssIncludePath,
    routePath,
    coreRoutePath
};
