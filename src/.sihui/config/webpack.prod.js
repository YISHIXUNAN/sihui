const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common(false), {
    mode: 'production',
    optimization: {
        minimizer: [new CssMinimizerPlugin(), `...`]
    }
});