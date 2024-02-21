const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common(true), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '/dist',
        historyApiFallback: true
    }
});
